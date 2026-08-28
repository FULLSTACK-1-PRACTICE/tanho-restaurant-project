import { useEffect, useMemo, useRef, useState } from "react";
import yangiliklar from "../../../assets/images/Layout/Header/yangiliklar.webp";
import mevaliAssorti from "../../../assets/images/Menu/Cards/Mevali-Assorti.webp";
import initialImg from "../../../assets/images/Menu/Additional-Images/Initial.webp";
import Container from "../../../components/ui/container/Container";
import NewSalad from "../../../assets/images/Menu/Additional-Images/three-salad.webp";
import {
  Search,
  ChevronDown,
  ArrowUpRight,
  Send,
  Sparkles,
  X,
  CheckCircle2,
  BellRing,
  AlertCircle,
} from "lucide-react";

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
    id: 2,
    category: "yangilik",
    badge: "YANGILIK",
    date: "10.08.2026",
    title: "Mevali assorti qo'shildi",
    description:
      "Restoranimiz taomlar ro'yxatiga yangi va sarxil mevali assorti qo'shildi. Yaqinlaringiz davrasida mazali va vitaminlarga boy mevaxonalardan bahramand bo'ling.",
    image: mevaliAssorti,
  },
  {
    id: 3,
    category: "yangilik",
    badge: "YANGILIK",
    date: "02.08.2026",
    title: "Menyuyimizga yangi salatlar qo'shildi",
    description:
      "Mijozlarimiz talabiga binoan restoranimiz menyusi yangi va mazali salatlar bilan boyitildi. Har bir salat o'ziga xosiga ta'm va sifatga ega.",
    image: NewSalad,
  },
  {
    id: 4,
    category: "maxsus",
    badge: "MAXSUS TAKLIF",
    date: "25.07.2026",
    title: "Yangi kengaytirilgan bo'limimiz o'z ishini boshladi",
    description:
      "Sizga yanada qulaylik yaratish maqsadida restoranimiz yonidan qo'shimcha shinam zalimiz ochildi. Barcha qulayliklar va zamonaviy interyer sizni kutmoqda.",
    image: initialImg,
  },
];

const SORT_OPTIONS = ["Eng yangi", "Eng eski", "Nomi bo'yicha"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

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

  const isMevali = item.id === 2;

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
          type="button"
          onClick={onClose}
          aria-label="Yopish"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-[#dcae4d] outline-none"
        >
          <X size={17} strokeWidth={1.8} />
        </button>

        <div className="overflow-y-auto">
          <div
            className={`relative h-[280px] w-full shrink-0 sm:h-[380px] flex items-center justify-center ${
              isMevali ? "bg-[#FEFEFE]" : "bg-[#020305]/50"
            }`}
          >
            <img
              loading="lazy"
              src={item.image}
              alt={item.title}
              className={
                isMevali
                  ? "h-full w-full object-contain p-4"
                  : "h-full w-full object-cover"
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-transparent to-transparent pointer-events-none" />

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
              type="button"
              onClick={onClose}
              className="mt-4 flex w-fit cursor-pointer items-center gap-2 rounded-md border border-[#dcae4d]/40 px-5 py-2.5 text-[12.5px] font-medium text-[#dcae4d] transition-all duration-300 hover:border-[#dcae4d] hover:bg-[#dcae4d] hover:text-black outline-none"
            >
              <span>Yopish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryScroller = ({
  activeCategory,
  onChange,
}: {
  activeCategory: CategoryKey;
  onChange: (key: CategoryKey) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isCompact, setIsCompact] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragState = useRef({
    startX: 0,
    startOffset: 0,
    moved: false,
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const containerEl = containerRef.current;
    const trackEl = trackRef.current;
    if (!containerEl || !trackEl) return;

    const measure = () => {
      setContainerWidth(containerEl.clientWidth);
      setTrackWidth(trackEl.scrollWidth);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(containerEl);
    resizeObserver.observe(trackEl);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const maxOffset = Math.max(0, trackWidth - containerWidth);
  const currentOffset = Math.min(Math.max(offset, 0), maxOffset);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isCompact) return;
    setIsDragging(true);
    dragState.current = {
      startX: e.clientX,
      startOffset: currentOffset,
      moved: false,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isCompact || !isDragging) return;

    const delta = dragState.current.startX - e.clientX;
    if (Math.abs(delta) > 3) dragState.current.moved = true;

    const newOffset = dragState.current.startOffset + delta;
    setOffset(Math.min(Math.max(newOffset, 0), maxOffset));
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
    setIsDragging(false);
  };

  const isScrollable = isCompact && maxOffset > 0;
  const thumbWidthPct = containerWidth
    ? Math.max(15, (containerWidth / Math.max(trackWidth, containerWidth)) * 100)
    : 100;
  const thumbLeftPct =
    maxOffset > 0 ? (currentOffset / maxOffset) * (100 - thumbWidthPct) : 0;

  return (
    <div className="relative w-full sm:max-w-none">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        className="cursor-grab overflow-hidden rounded-md p-1 active:cursor-grabbing [touch-action:pan-y] sm:cursor-auto sm:overflow-visible sm:p-0"
      >
        <div
          ref={trackRef}
          className="flex w-max items-center gap-2 sm:w-full sm:flex-wrap"
          style={{
            transform: isCompact ? `translateX(-${currentOffset}px)` : "none",
            transition: isDragging ? "none" : "transform 200ms ease-out",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat.key === activeCategory;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  if (dragState.current.moved) {
                    dragState.current.moved = false;
                    return;
                  }
                  onChange(cat.key);
                }}
                className={`h-9 shrink-0 cursor-pointer select-none rounded-md px-4 text-[12.5px] font-medium transition-all duration-300 outline-none focus:outline-none focus:ring-0 ${
                  isActive
                    ? "border-transparent bg-[#dcae4d] text-black"
                    : "border border-white/10 bg-transparent text-white/70 hover:border-[#dcae4d]/40 hover:text-[#dcae4d]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-9 rounded-l-md bg-gradient-to-r from-[#020305] via-[#020305]/80 to-transparent transition-opacity duration-200 sm:hidden ${
          currentOffset > 4 ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 rounded-r-md bg-gradient-to-l from-[#020305] from-40% via-[#020305]/90 to-transparent transition-opacity duration-200 sm:hidden ${
          currentOffset < maxOffset - 4 ? "opacity-100" : "opacity-0"
        }`}
      />

      {isScrollable && (
        <div className="relative mt-1.5 h-[3px] w-full sm:hidden">
          <div
            className="absolute inset-y-0 rounded-full bg-[#dcae4d]"
            style={{
              width: `${thumbWidthPct}%`,
              left: `${thumbLeftPct}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("barchasi");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("Eng yangi");
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

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

  const handleCategoryChange = (key: CategoryKey) => {
    setActiveCategory(key);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  const handleSortChange = (opt: SortOption) => {
    setSort(opt);
    setSortOpen(false);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setEmailError("Iltimos, elektron pochtangizni kiriting");
      return;
    }

    if (!emailRegex.test(email.trim())) {
      setEmailError("Iltimos, yaroqli email manzilini kiriting (masalan: user@gmail.com)");
      return;
    }

    setEmailError("");
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <div className="min-h-screen w-full bg-[#020305] overflow-x-hidden">
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <img
            loading="lazy"
            src={yangiliklar}
            alt="Yangiliklar"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#020305]/80 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020305] via-[#020305]/90 to-transparent" />
        </div>

        <Container>
          <div className="relative flex flex-col gap-4 py-16 sm:py-24 z-10">
            <h1 className="font-serif text-[36px] sm:text-[42px] md:text-[52px] leading-tight text-white">
              Yangiliklar
            </h1>
            <p className="max-w-[520px] text-[14px] sm:text-[15px] leading-relaxed text-white/70">
              Qarshi shahridagi TANHO restoranining eng so'nggi yangiliklari, maxsus takliflari va tadbirlari bilan tanishing.
            </p>

            <div className="mt-3 flex items-center gap-3 text-[#dcae4d]">
              <span className="h-px w-10 bg-[#dcae4d]/50" />
              <Sparkles size={14} strokeWidth={1.5} />
              <span className="h-px w-10 bg-[#dcae4d]/50" />
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-8 sm:pt-10">
        <Container>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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

            <div className="w-full lg:w-auto lg:flex-1 lg:px-4">
              <CategoryScroller
                activeCategory={activeCategory}
                onChange={handleCategoryChange}
              />
            </div>

            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setSortOpen((v) => !v)}
                className="flex h-11 w-full min-w-[160px] cursor-pointer items-center justify-between gap-3 rounded-md border border-white/10 bg-[#0b0d10] px-4 text-[13px] text-white/80 transition-colors hover:border-white/20 outline-none focus:outline-none"
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
                      type="button"
                      onClick={() => handleSortChange(opt)}
                      className={`block w-full cursor-pointer px-4 py-2.5 text-left text-[13px] transition-colors outline-none ${
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
        </Container>
      </section>

      <section className="py-8 sm:py-10">
        <Container>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#0b0d10] py-24 text-center">
              <p className="text-[15px] text-white/60">
                Hech qanday yangilik topilmadi.
              </p>
              <p className="text-[13px] text-white/30">
                Boshqa kalit so'z yoki bo'lim bilan qayta urinib ko'ring.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {filtered.map((item) => {
                const isMevali = item.id === 2;

                return (
                  <article
                    key={item.id}
                    onClick={() => setSelectedNews(item)}
                    className="group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-white/8 bg-[#0b0d10] transition-all duration-300 hover:-translate-y-1 hover:border-[#dcae4d]/30"
                  >
                    <div
                      className={`relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden flex items-center justify-center ${
                        isMevali ? "bg-[#FEFEFE]" : "bg-[#020305]/40"
                      }`}
                    >
                      <img
                        loading="lazy"
                        src={item.image}
                        alt={item.title}
                        className={
                          isMevali
                            ? "h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                            : "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        }
                      />

                      <span
                        className={`absolute left-3 top-3 rounded px-2.5 py-1 text-[10px] font-semibold tracking-wide shadow-md ${
                          BADGE_STYLES[item.category]
                        }`}
                      >
                        {item.badge}
                      </span>
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
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedNews(item);
                        }}
                        className="group/btn mt-auto flex w-full cursor-pointer items-center justify-between pt-3 text-[12.5px] font-medium text-[#dcae4d] outline-none"
                      >
                        <span>Batafsil o'qish</span>
                        <ArrowUpRight
                          size={15}
                          strokeWidth={2}
                          className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b0d10] via-[#0b0d10] to-[#12161d] shadow-2xl">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#dcae4d]/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[#dcae4d]/5 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center relative z-10">
              <div className="flex flex-col justify-center gap-5 p-6 sm:p-10 lg:col-span-7">
                <div className="flex items-center gap-2.5 w-fit rounded-full border border-[#dcae4d]/30 bg-[#dcae4d]/10 px-3.5 py-1 text-[11.5px] font-medium text-[#dcae4d]">
                  <BellRing size={13} className="animate-bounce" />
                  <span>Eksklyuziv Yangiliklar</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-[26px] sm:text-[32px] leading-tight text-white tracking-wide">
                    Maxsus takliflar va yangi taomlardan birinchi bo'lib xabardor bo'ling!
                  </h3>
                  <p className="max-w-[500px] text-[13.5px] sm:text-[14.5px] leading-relaxed text-white/60">
                    Email manzilingizni qoldiring va Qarshi shahridagi TANHO restorani aksiyalari, chegirmalari hamda bayramona dasturlari haqida tezkor xabarlar oling.
                  </p>
                </div>

                {isSubscribed ? (
                  <div className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 max-w-[460px]">
                    <CheckCircle2 size={22} className="text-emerald-400 shrink-0" />
                    <div>
                      <h4 className="text-[13.5px] font-semibold text-emerald-300">
                        Muvaffaqiyatli obuna bo'ldingiz!
                      </h4>
                      <p className="text-[12px] text-emerald-400/80 mt-0.5">
                        Endi barcha yangiliklar elektron pochtangizga borib turadi.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col w-full max-w-[460px] gap-2 mt-1"
                  >
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError("");
                          }}
                          placeholder="Email manzilingizni kiriting..."
                          className={`h-12 w-full rounded-xl border bg-[#020305]/80 px-4 text-[13.5px] text-white placeholder:text-white/35 outline-none transition-all focus:ring-2 shadow-inner ${
                            emailError
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                              : "border-white/10 focus:border-[#dcae4d] focus:ring-[#dcae4d]/20"
                          }`}
                        />
                      </div>
                      <button
                        type="submit"
                        className="flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#dcae4d] px-6 text-[13px] font-semibold text-black transition-all duration-300 hover:bg-[#f3c766] hover:shadow-lg hover:shadow-[#dcae4d]/20 active:scale-95 outline-none"
                      >
                        <span>Obuna bo'lish</span>
                        <Send size={15} strokeWidth={2} />
                      </button>
                    </div>
                    {emailError && (
                      <div className="flex items-center gap-1.5 text-red-400 text-[12px] mt-1 pl-1">
                        <AlertCircle size={14} className="shrink-0" />
                        <span>{emailError}</span>
                      </div>
                    )}
                  </form>
                )}
              </div>

              <div className="relative hidden min-h-[380px] lg:flex lg:col-span-5 h-full w-full overflow-hidden rounded-r-2xl">
                <img
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80"
                  alt="Restaurant Atmosphere"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d10] via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {selectedNews && (
        <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </div>
  );
};

export default NewsPage;