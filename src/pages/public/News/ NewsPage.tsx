import { useEffect, useMemo, useState } from "react";
import yangiliklar from "../../../assets/images/Layout/Header/yangiliklar.png";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Bookmark,
  Send,
  Sparkles,
  X,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CategoryKey = "barchasi" | "maxsus" | "tadbir" | "yangilik" | "elon";

interface NewsItem {
  id: number;
  category: Exclude<CategoryKey, "barchasi">;
  badge: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

interface CategoryOption {
  key: CategoryKey;
  label: string;
}

// ---------------------------------------------------------------------------
// Static data — bularni keyinchalik backenddan kelayotgan array bilan
// almashtirasiz (masalan: useEffect + fetch("/api/news"))
// ---------------------------------------------------------------------------

const CATEGORIES: CategoryOption[] = [
  { key: "barchasi", label: "Barchasi" },
  { key: "maxsus", label: "Maxsus takliflar" },
  { key: "tadbir", label: "Tadbirlar" },
  { key: "yangilik", label: "Yangiliklar" },
  { key: "elon", label: "E'lonlar" },
];

const BADGE_STYLES: Record<NewsItem["category"], string> = {
  maxsus: "bg-[#dcae4d] text-black",
  tadbir: "bg-[#dcae4d] text-black",
  yangilik: "bg-[#dcae4d] text-black",
  elon: "bg-[#dcae4d] text-black",
};

const NEWS: NewsItem[] = [
  {
    id: 1,
    category: "maxsus",
    badge: "MAXSUS TAKLIF",
    date: "01.05.2024",
    title: "Yangi yozgi menyu taqdim etildi!",
    description:
      "Yoz fasli uchun maxsus tayyorlangan yengil va mazali taomlar bilan tanishing. Yangi menyuda tabiiy sabzavotlar, dengiz mahsulotlari va yengil souslar asosida tayyorlangan taomlar o'z o'rnini topdi. Har bir taom mehmonlarimizning yozgi kayfiyatini his qilishlari uchun maxsus tanlab olingan.",
    image: "https://picsum.photos/seed/tanho-salad/900/650",
  },
  {
    id: 2,
    category: "tadbir",
    badge: "TADBIR",
    date: "28.04.2024",
    title: "Ramazon hayiti munosabati bilan maxsus menyu",
    description:
      "Bayraminigiz muborak bo'lsin! Maxsus taomlar bilan sizni kutib olamiz. Hayit kunlari uchun tayyorlangan an'anaviy va zamonaviy taomlar, shirinliklar hamda ichimliklar oilaviy davralarga mos ravishda tanlab chiqilgan.",
    image: "https://picsum.photos/seed/tanho-dinner/900/650",
  },
  {
    id: 3,
    category: "tadbir",
    badge: "TADBIR",
    date: "20.04.2024",
    title: "Jonli musiqa kechalarimiz davom etadi!",
    description:
      "Har juma va shanba kunlari jonli musiqa va ajoyib atmosfera. Professional musiqachilar tomonidan ijro etiladigan jonli kontsertlar restoranimizning maxsus sahnasida kechqurun soat 20:00 dan boshlanadi.",
    image: "https://picsum.photos/seed/tanho-music/900/650",
  },
  {
    id: 4,
    category: "yangilik",
    badge: "YANGILIK",
    date: "15.04.2024",
    title: "Yangi «TANHO Steak» taomi endi menyuda",
    description:
      "Maxsus sous va ziravorlar bilan tayyorlangan shefning yangi imzoli taomi. Faqat eng sifatli mol go'shtidan tayyorlangan ushbu steak, maxsus tayyorlangan qorong'i sous va yangi sabzavotlar bilan serviruyetsya qilinadi.",
    image: "https://picsum.photos/seed/tanho-steak/900/650",
  },
  {
    id: 5,
    category: "elon",
    badge: "E'LON",
    date: "10.04.2024",
    title: "Ish vaqti uzaytirildi!",
    description:
      "Sizlarning iltimosingizga binoan endilikda har kuni 10:00 dan 24:00 gacha xizmatdamiz. Endi kech tushgan mehmonlarimiz ham TANHO'ning mazali taomlari va o'ziga xos atmosferasidan bahramand bo'lishlari mumkin.",
    image: "https://picsum.photos/seed/tanho-facade/900/650",
  },
  {
    id: 6,
    category: "maxsus",
    badge: "MAXSUS TAKLIF",
    date: "05.04.2024",
    title: "Desertlarimizga 20% chegirma!",
    description:
      "Shirinliklarga bo'lgan muhabbatimizni siz bilan baham ko'ramiz. 5-7 aprel kunlari barcha desert turlariga 20% chegirma amal qiladi. Aksiya faqat restoran ichida iste'mol qilinganda amal qiladi.",
    image: "https://picsum.photos/seed/tanho-cake/900/650",
  },
  {
    id: 7,
    category: "yangilik",
    badge: "YANGILIK",
    date: "01.04.2024",
    title: "Yangi ichimliklar menyusi",
    description:
      "Tabiiy mevalardan tayyorlangan sovuq va issiq ichimliklar endi menyuda. Fasldagi mevalardan siqilgan sharbatlar, mokteyllar va issiq choy turlari yangi menyuda o'z joyini egalladi.",
    image: "https://picsum.photos/seed/tanho-drinks/900/650",
  },
  {
    id: 8,
    category: "tadbir",
    badge: "TADBIR",
    date: "28.03.2024",
    title: "Korporativ tadbirlar uchun maxsus taklif",
    description:
      "Katta guruhlar uchun alohida shartlar va menyu. Kompaniyangiz uchun tadbir tashkil qilmoqchi bo'lsangiz, bizning tadbirlar bo'limi sizga individual yondashuv bilan menyu va zal tayyorlab beradi.",
    image: "https://picsum.photos/seed/tanho-event/900/650",
  },
  {
    id: 9,
    category: "yangilik",
    badge: "YANGILIK",
    date: "25.03.2024",
    title: "Non mahsulotlari yangilandi",
    description:
      "Endi non va somsa mahsulotlarimiz yanada mazali va xushbo'y bo'ldi. Har kuni ertalab yangilanadigan xamir mahsulotlari o'zining tabiiy tarkibi va yangiligi bilan mehmonlarimizni xursand qiladi.",
    image: "https://picsum.photos/seed/tanho-bread/900/650",
  },
  {
    id: 10,
    category: "elon",
    badge: "E'LON",
    date: "10.04.2024",
    title: "Ramazon oyi uchun ish jadvali",
    description:
      "Ro'za tutuvchi mehmonlarimiz uchun iftor va saharlik menyularimiz haqida ma'lumot. Ramazon oyi davomida maxsus iftorlik dasturxonlari va saharlik uchun buyurtmalar qabul qilinadi.",
    image: "https://picsum.photos/seed/tanho-lantern/900/650",
  },
];

const SORT_OPTIONS = ["Eng yangi", "Eng eski", "Nomi bo'yicha"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

const PAGE_SIZE = 10;

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------

interface NewsModalProps {
  item: NewsItem;
  onClose: () => void;
}

const NewsModal = ({ item, onClose }: NewsModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0b0d10] shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Yopish"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-[#dcae4d]"
        >
          <X size={17} strokeWidth={1.8} />
        </button>

        <div className="overflow-y-auto">
          <div className="relative h-[280px] w-full shrink-0 sm:h-[380px]">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-transparent to-transparent" />

            <span
              className={`absolute left-4 top-4 rounded px-2.5 py-1 text-[10px] font-semibold tracking-wide ${
                BADGE_STYLES[item.category]
              }`}
            >
              {item.badge}
            </span>
          </div>

          <div className="flex flex-col gap-4 p-6 sm:p-8">
            <span className="text-[12px] text-white/35">{item.date}</span>

            <h2 className="font-serif text-[26px] leading-snug text-white sm:text-[30px]">
              {item.title}
            </h2>

            <p className="whitespace-pre-line text-[14.5px] leading-relaxed text-white/60">
              {item.description}
            </p>

            <button
              onClick={onClose}
              className="mt-4 flex w-fit cursor-pointer items-center gap-2 rounded-md border border-[#dcae4d]/40 px-5 py-2.5 text-[12.5px] font-medium text-[#dcae4d] transition-all duration-300 hover:border-[#dcae4d] hover:bg-[#dcae4d] hover:text-black"
            >
              <span>Yopish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("barchasi");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("Eng yangi");
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  const parseDate = (d: string) => {
    const [day, month, year] = d.split(".").map(Number);
    return new Date(year, month - 1, day).getTime();
  };
  
  
  const filtered = useMemo(() => {
    let list = NEWS.filter((item) => {
      const matchesCategory =
        activeCategory === "barchasi" || item.category === activeCategory;
      const matchesQuery =
        query.trim() === "" ||
        item.title.toLowerCase().includes(query.trim().toLowerCase()) ||
        item.description.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });

    list = [...list].sort((a, b) => {
      if (sort === "Eng yangi") return parseDate(b.date) - parseDate(a.date);
      if (sort === "Eng eski") return parseDate(a.date) - parseDate(b.date);
      return a.title.localeCompare(b.title);
    });

    return list;
  }, [activeCategory, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleCategoryChange = (key: CategoryKey) => {
    setActiveCategory(key);
    setPage(1);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen w-full bg-[#020305]">  
      {/* ------------------------------------------------------------- */}
      {/* Hero */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b max-w-[1200px] m-auto  border-white/5">
        <div className="absolute inset-0 ">
          <img
            src={yangiliklar}
            alt="Yangiliklar"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020305] via-[#020305]/85 to-[#020305]/20" />
        </div>

        <div className="relative mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-20">
          <h1 className="font-serif text-[42px] leading-tight text-white sm:text-[52px]">
            Yangiliklar
          </h1>
          <p className="max-w-[520px] text-[15px] leading-relaxed text-white/60">
            TANHO restoranidagi eng so'nggi yangiliklar, maxsus takliflar va
            tadbirlar bilan tanishing.
          </p>

          <div className="mt-3 flex items-center gap-3 text-[#dcae4d]">
            <span className="h-px w-10 bg-[#dcae4d]/50" />
            <Sparkles size={14} strokeWidth={1.5} />
            <span className="h-px w-10 bg-[#dcae4d]/50" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Filters */}
      {/* ------------------------------------------------------------- */}
      <section className="mx-auto max-w-[1200px] px-5 pt-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-[280px]">
            <Search
              size={16}
              strokeWidth={1.8}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />
            <input
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Yangiliklar ichidan qidiring..."
              className="h-11 w-full rounded-md border border-white/10 bg-[#0b0d10] pl-10 pr-4 text-[13px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#dcae4d]/50"
            />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = cat.key === activeCategory;
              return (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`h-9 cursor-pointer rounded-md px-4 text-[12.5px] font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#dcae4d] text-black"
                      : "border border-white/10 bg-transparent text-white/70 hover:border-[#dcae4d]/40 hover:text-[#dcae4d]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <div className="relative shrink-0">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex h-11 w-full min-w-[160px] cursor-pointer items-center justify-between gap-3 rounded-md border border-white/10 bg-[#0b0d10] px-4 text-[13px] text-white/80 transition-colors hover:border-white/20"
            >
              <span>{sort}</span>
              <ChevronDown
                size={14}
                strokeWidth={1.8}
                className={`text-white/40 transition-transform duration-300 ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sortOpen && (
              <div className="absolute right-0 top-[calc(100%+6px)] z-20 w-full min-w-[160px] overflow-hidden rounded-md border border-white/10 bg-[#0b0d10] shadow-xl">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSort(opt);
                      setSortOpen(false);
                    }}
                    className={`block w-full cursor-pointer px-4 py-2.5 text-left text-[13px] transition-colors ${
                      opt === sort
                        ? "text-[#dcae4d]"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* News grid */}
      {/* ------------------------------------------------------------- */}
      <section className="mx-auto max-w-[1200px] px-5 py-10">
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#0b0d10] py-24 text-center">
            <p className="text-[15px] text-white/60">
              Hech qanday yangilik topilmadi.
            </p>
            <p className="text-[13px] text-white/30">
              Boshqa kalit so'z yoki bo'lim bilan qayta urinib ko'ring.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {paginated.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedNews(item)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-white/8 bg-[#0b0d10] transition-all duration-300 hover:-translate-y-1 hover:border-[#dcae4d]/30"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span
                    className={`absolute left-3 top-3 rounded px-2.5 py-1 text-[10px] font-semibold tracking-wide ${
                      BADGE_STYLES[item.category]
                    }`}
                  >
                    {item.badge}
                  </span>

                  {/* <button
                    aria-label="Saqlash"
                    className="absolute right-3 top-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white/70 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-[#dcae4d]"
                  >
                    <Bookmark size={13} strokeWidth={1.8} />
                  </button> */}
                </div>

                <div className="flex flex-1 flex-col gap-2 p-4">
                  <span className="text-[11px] text-white/35">{item.date}</span>

                  <h3 className="text-[14.5px] font-semibold leading-snug text-white">
                    {item.title}
                  </h3>

                  <p className="line-clamp-2 text-[12.5px] leading-relaxed text-white/45">
                    {item.description}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNews(item);
                    }}
                    className="group/btn mt-auto flex cursor-pointer items-center gap-1.5 pt-3 text-[12.5px] font-medium text-[#dcae4d]"
                  >
                    <span>Batafsil o'qish</span>
                    <ArrowUpRight
                      size={14}
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-white/10 text-white/50 transition-colors hover:border-[#dcae4d]/40 hover:text-[#dcae4d] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={16} strokeWidth={1.8} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-[13px] font-medium transition-colors ${
                  n === page
                    ? "bg-[#dcae4d] text-black"
                    : "border border-white/10 text-white/60 hover:border-[#dcae4d]/40 hover:text-[#dcae4d]"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-white/10 text-white/50 transition-colors hover:border-[#dcae4d]/40 hover:text-[#dcae4d] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={16} strokeWidth={1.8} />
            </button>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Newsletter */}
      {/* ------------------------------------------------------------- */}
      <section className="mx-auto max-w-[1200px] px-5 pb-16">
        <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-white/8 bg-[#0b0d10] lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
            <h3 className="font-serif text-[26px] text-white">
              Yangiliklardan xabardor bo'ling!
            </h3>
            <p className="max-w-[420px] text-[13.5px] leading-relaxed text-white/45">
              Yangi taomlar, maxsus takliflar va tadbirlar haqida
              birinchilardan bo'lib bilib oling.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-2 flex w-full max-w-[420px] items-center gap-3"
            >
              <input
                type="email"
                required
                placeholder="Email manzilingizni kiriting"
                className="h-11 flex-1 rounded-md border border-white/10 bg-[#020305] px-4 text-[13px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#dcae4d]/50"
              />
              <button
                type="submit"
                className="flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-md bg-[#dcae4d] px-5 text-[12.5px] font-semibold text-black transition-colors duration-300 hover:bg-[#f3c766]"
              >
                <span>Obuna bo'lish</span>
                <Send size={14} strokeWidth={2} />
              </button>
            </form>
          </div>

          <div className="relative hidden min-h-[220px] lg:block">
            <img
              src="https://barvikhagroup.ru/storage/uploads/c34e5e40-5783-476a-b14e-963fdfe37682.webp"
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0b0d10]/80" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* News detail modal */}
      {/* ------------------------------------------------------------- */}
      {selectedNews && (
        <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </div>
  );
};

export default NewsPage;