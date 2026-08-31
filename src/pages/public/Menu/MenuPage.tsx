import { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { menuItems, type MenuItem } from "../../../data/menuData";
import Initial from "../../../assets/images/Menu/Additional-Images/Initial.webp";
import AuthModal from "../../../features/auth/components/AuthModal";
import MenuBackground from "../../../assets/images/Menu/Additional-Images/Menu-Background.webp";
import useAuthAndFavorites, {
  type FavoriteItem,
} from "../../../context/useAuthAndFavorites";

import {
  Cake,
  ChevronLeft,
  ChevronRight,
  Flame,
  Grid2X2,
  Heart,
  Loader2,
  Eye,
  UtensilsCrossed,
  Wine,
  Sparkles,
  Users,
  PartyPopper,
  Salad as SaladIcon,
  Soup,
} from "lucide-react";

const categories = [
  { name: "Barchasi", icon: Grid2X2 },
  { name: "Salatlar", icon: SaladIcon },
  { name: "Osh", icon: Soup },
  { name: "Milliy taomlar", icon: UtensilsCrossed },
  { name: "Grill", icon: Flame },
  { name: "Ichimliklar", icon: Wine },
  { name: "Desertlar", icon: Cake },
];

interface CategoryTabsProps {
  activeCategory: string;
  onChange: (category: string) => void;
}

function CategoryTabs({
  activeCategory,
  onChange,
}: CategoryTabsProps) {
  return (
    <div className="w-full rounded-[20px] border border-white/10 bg-[#161a1d]/90 p-2.5 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="flex w-full items-center justify-between gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.name;

          return (
            <button
              key={category.name}
              type="button"
              onClick={() => onChange(category.name)}
              className={`group flex flex-1 min-w-fit shrink-0 cursor-pointer select-none items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-xs font-medium transition-colors duration-300 focus:outline-none focus-visible:outline-none focus:ring-0 active:outline-none ${
                isActive
                  ? "bg-gradient-to-r from-[#e5ad45] to-[#c89228] text-black font-semibold"
                  : "text-gray-300 hover:bg-white/5 hover:text-[#e5ad45]"
              }`}
            >
              <Icon
                size={18}
                strokeWidth={1.8}
                className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? "text-black" : "text-[#d9a441]"
                }`}
              />

              <span className="whitespace-nowrap">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-10 flex w-full justify-center sm:hidden">
      <div className="relative flex items-center gap-1.5 rounded-2xl border border-white/10 bg-[#121619] p-1.5 shadow-[0_15px_45px_rgba(0,0,0,0.35)]">
        <div className="pointer-events-none absolute inset-x-6 -bottom-1 h-px bg-gradient-to-r from-transparent via-[#d9a441]/50 to-transparent" />

        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`group flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-all duration-300 ${
            currentPage === 1
              ? "cursor-not-allowed text-gray-700"
              : "text-gray-400 hover:bg-[#1d2226] hover:text-[#d9a441]"
          }`}
        >
          <ChevronLeft
            size={18}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
        </button>

        {pages.map((page) => {
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`relative flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-xl px-3 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-[#d9a441] text-black"
                  : "text-gray-400 hover:bg-[#1d2226] hover:text-[#e5ad45]"
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-xl border border-[#f2c76b]/50" />
              )}

              <span className="relative z-10">
                {page}
              </span>
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`group flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-all duration-300 ${
            currentPage === totalPages
              ? "cursor-not-allowed text-gray-700"
              : "text-gray-400 hover:bg-[#1d2226] hover:text-[#d9a441]"
          }`}
        >
          <ChevronRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </div>
  );
}

const MenuPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null);

  const [isOpenAuthModal, setIsOpenAuthModal] =
    useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  const {
    isLoggedIn,
    favorites,
    toggleFavorite,
  } = useAuthAndFavorites();

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categoryQuery = searchParams.get("category");

  const categoryFromState = (
    location.state as { category?: string }
  )?.category;

  const matchedQueryCategory = categoryQuery
    ? categories.find(
        (c) =>
          c.name.toLowerCase() ===
          categoryQuery.toLowerCase(),
      )?.name
    : null;

  const activeCategory =
    selectedCategory ??
    matchedQueryCategory ??
    categoryFromState ??
    "Barchasi";

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const [items] = useState<MenuItem[]>(menuItems);

  const loading = false;

  const handleFavoriteClick = (
    e: React.MouseEvent,
    food: MenuItem,
  ) => {
    e.stopPropagation();

    if (!food.id) return;

    if (!isLoggedIn) {
      setIsOpenAuthModal(true);
      return;
    }

    const item: FavoriteItem = {
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      category: food.category,
      description: food.description,
    };

    toggleFavorite(item);
  };

  // Ekranda ko'rinadigan barcha mahsulotlar
  const visibleItems = items
    .filter((it) => it.status === "Mavjud")
    .filter(
      (it) =>
        activeCategory === "Barchasi" ||
        it.category === activeCategory,
    );

  // Faqat Asosiy taomlar (Osh, Milliy taomlar, Grill) soni
  const foodOnlyCount = items.filter(
    (it) =>
      it.status === "Mavjud" &&
      ["Osh", "Milliy taomlar", "Grill"].includes(it.category)
  ).length;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(
    visibleItems.length / itemsPerPage,
  );

  const safeCurrentPage = Math.max(
    1,
    Math.min(currentPage, totalPages || 1),
  );

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;

  const displayedItems = isMobile
    ? visibleItems.slice(startIndex, startIndex + itemsPerPage)
    : visibleItems;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b0e10] text-white">
      <section className="relative flex min-h-[450px] items-center overflow-hidden sm:min-h-[500px]">
        <img
          loading="lazy"
          src={MenuBackground}
          alt="Tanho restaurant"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e10] via-[#0b0e10]/80 to-transparent sm:bg-gradient-to-r" />

        <div className="relative mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-6">
          <div className="max-w-[430px]">
            <p className="mb-3 text-xs uppercase tracking-[3px] text-[#d9a441] sm:text-sm">
              TANHO RESTAURANT
            </p>

            <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
              Menyu
            </h1>

            <p className="mt-3 text-base text-[#d9a441] sm:text-lg">
              Eng mazali taomlar, siz uchun tayyor!
            </p>

            <p className="mt-4 max-w-[370px] text-xs leading-6 text-gray-300 sm:text-sm sm:leading-7">
              TANHO restoranida sizga eng sifatli va mazali
              taomlarni taqdim etamiz.
            </p>

            <div className="mt-6 h-px w-24 bg-[#d9a441] sm:w-28" />
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-6 w-full max-w-[1240px] px-4 sm:-mt-8 sm:px-6">
        <CategoryTabs
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
        />
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-12">
        <div className="mb-6 flex items-end justify-between sm:mb-7">
          <div>
            <p className="mb-1 text-xs uppercase tracking-[3px] text-[#d9a441] sm:mb-2">
              TANHO RESTAURANT
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl">
              {activeCategory === "Barchasi"
                ? "Mazali taomlar"
                : activeCategory}
            </h2>
          </div>

          {visibleItems.length > 0 && (
            <span className="hidden text-xs text-gray-500 sm:block">
              {activeCategory === "Barchasi"
                ? `${foodOnlyCount} ta taom`
                : activeCategory === "Salatlar"
                ? `${visibleItems.length} ta salat`
                : activeCategory === "Ichimliklar"
                ? `${visibleItems.length} ta ichimlik`
                : activeCategory === "Desertlar"
                ? `${visibleItems.length} ta desert`
                : `${visibleItems.length} ta taom`}
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-gray-400">
            <Loader2
              className="animate-spin"
              size={22}
            />
          </div>
        ) : visibleItems.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-[#121619] py-20 text-center text-sm text-gray-400">
            Hozircha bu bo'limda taom yo'q
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {displayedItems.map((food) => {
                const isFavorite = favorites.some(
                  (fav) => fav.id === food.id,
                );

                return (
                  <div
                    key={food.id}
                    onClick={() =>
                      navigate(`/menu/${food.id}`)
                    }
                    className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#121619] transition-all duration-300 hover:-translate-y-1 hover:border-[#d9a441]/60"
                  >
                    <div>
                      <div
                        className="relative flex h-[170px] w-full items-center justify-center overflow-hidden p-2 sm:h-[220px] md:h-[240px]"
                        style={{
                          backgroundColor: "#FEFEFE",
                        }}
                      >
                        {food.image ? (
                          <img
                            loading="lazy"
                            src={food.image}
                            alt={food.name}
                            className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#121619] text-gray-600">
                            <UtensilsCrossed size={32} />
                          </div>
                        )}

                        <button
                          type="button"
                          aria-label="Sevimlilarga qo'shish"
                          onClick={(e) =>
                            handleFavoriteClick(e, food)
                          }
                          className={`absolute right-2.5 top-2.5 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 outline-none hover:scale-110 active:scale-95 sm:right-3 sm:top-3 sm:h-10 sm:w-10 ${
                            isFavorite
                              ? "bg-[#d9a441] text-neutral-900 shadow-[0_0_15px_rgba(217,164,65,0.5)]"
                              : "border border-white/10 bg-black/50 text-[#d9a441] hover:bg-black/70"
                          }`}
                        >
                          <Heart
                            size={18}
                            className={`transition-transform duration-300 ${
                              isFavorite
                                ? "scale-110 fill-neutral-900"
                                : "fill-transparent"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="relative z-10 bg-[#121619] p-3 pb-2 sm:p-4">
                        <h3 className="truncate text-xs font-semibold transition-colors duration-300 group-hover:text-[#e5ad45] sm:text-base">
                          {food.name}
                        </h3>

                        <p className="mt-1.5 line-clamp-2 min-h-[32px] text-[11px] leading-4 text-gray-400 sm:mt-2 sm:min-h-[42px] sm:text-xs sm:leading-5">
                          {food.description ||
                            food.category}
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#121619] p-3 pt-2 sm:p-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/menu/${food.id}`);
                        }}
                        className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#8c651d]/40 px-2.5 py-2 text-[11px] text-[#e5ad45] transition-all duration-300 outline-none hover:bg-[#d9a441] hover:text-black sm:px-3 sm:py-2.5 sm:text-xs"
                      >
                        <span className="truncate">
                          Batafsil
                        </span>

                        <Eye
                          size={14}
                          className="ml-1 shrink-0 transition-transform duration-300 group-hover:scale-110"
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
              }}
            />
          </>
        )}
      </section>

      <section className="mx-auto max-w-[1240px] px-4 pb-12 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121619]">
          <div className="grid md:grid-cols-[280px_1fr]">
            <div className="relative h-[200px] overflow-hidden bg-[#121619] sm:h-[220px] md:h-auto">
              <img
                loading="lazy"
                src={Initial}
                alt="TANHO Marosimlar va Zallar"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="p-5 sm:p-6 md:p-8">
              <div className="mb-6 sm:mb-7">
                <p className="text-xs uppercase tracking-[2px] text-[#d9a441]">
                  TADBIRLAR VA MAROSIMLAR
                </p>

                <h2 className="mt-2 font-serif text-2xl md:text-3xl">
                  Maxsus kunlaringizni biz bilan o'tkazing
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Oilaviy bayramlar, tug'ilgan kunlar va
                  ishchi uchrashuvlar uchun shohona
                  sharoitlar.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="group cursor-pointer">
                  <Sparkles
                    size={26}
                    strokeWidth={1.3}
                    className="text-[#d9a441] transition-transform duration-300 group-hover:-translate-y-0.5"
                  />

                  <h3 className="mt-2.5 text-sm font-semibold sm:mt-3">
                    Maxsus Kabinalar
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Aholidan holi, tinch va shinam muhitda
                    suhbatlashish uchun maxsus xonalar.
                  </p>
                </div>

                <div className="group cursor-pointer">
                  <PartyPopper
                    size={26}
                    strokeWidth={1.3}
                    className="text-[#d9a441] transition-transform duration-300 group-hover:-translate-y-0.5"
                  />

                  <h3 className="mt-2.5 text-sm font-semibold sm:mt-3">
                    Bayramona Stollar
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Tug'ilgan kun va tantanalar uchun
                    dasturxonni maxsus bezatish xizmati.
                  </p>
                </div>

                <div className="group cursor-pointer">
                  <Users
                    size={26}
                    strokeWidth={1.3}
                    className="text-[#d9a441] transition-transform duration-300 group-hover:-translate-y-0.5"
                  />

                  <h3 className="mt-2.5 text-sm font-semibold sm:mt-3">
                    Banket Zallari
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Ko'p kishilik korporativ kechalar va
                    yirik tadbirlar uchun zallarni oldindan
                    bron qilish.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/reservation")
                }
                className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#d9a441] px-5 py-3 text-sm font-medium text-black transition-all duration-300 outline-none hover:bg-[#edbd58] sm:mt-7 sm:w-auto sm:py-2.5"
              >
                Stol band qilish
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={isOpenAuthModal}
        onClose={() => setIsOpenAuthModal(false)}
      />
    </div>
  );
};

export default MenuPage;