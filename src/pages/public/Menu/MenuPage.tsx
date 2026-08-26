import { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { menuItems, type MenuItem } from "../../../data/menuData";
import Initial from "../../../assets/images/Menu/Additional-Images/Initial.png";
import AuthModal from "../../../features/auth/components/AuthModal";
import MenuBackground from "../../../assets/images/Menu/Additional-Images/Menu-Background.png";

import {
  Cake,
  ChevronRight,
  Coffee,
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
} from "lucide-react";

const categories = [
  { name: "Barchasi", icon: Grid2X2 },
  { name: "Salatlar", icon: SaladIcon },
  { name: "Osh", icon: UtensilsCrossed },
  { name: "Milliy taomlar", icon: Cake },
  { name: "Grill", icon: UtensilsCrossed },
  { name: "Ichimliklar", icon: Wine },
  { name: "Desertlar", icon: Coffee },
];

interface CategoryTabsProps {
  activeCategory: string;
  onChange: (category: string) => void;
}

function CategoryTabs({ activeCategory, onChange }: CategoryTabsProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#121619] p-2.5 backdrop-blur-md">
      <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-7 overflow-x-auto sm:overflow-x-visible gap-2 scrollbar-thin scrollbar-thumb-black scrollbar-track-[#121619] pb-1 sm:pb-0">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.name;
          return (
            <button
              key={category.name}
              type="button"
              onClick={() => onChange(category.name)}
              className={`group flex shrink-0 sm:shrink cursor-pointer select-none items-center justify-center gap-2 rounded-lg px-3.5 py-3 text-xs transition-all duration-300 outline-none focus:outline-none focus:ring-0 ${
                isActive
                  ? "border border-[#8c651d]/50 bg-[#191e22] text-[#e5ad45]"
                  : "border border-transparent text-gray-300 hover:-translate-y-0.5 hover:bg-[#191e22] hover:text-[#e5ad45]"
              }`}
            >
              <Icon
                size={16}
                strokeWidth={1.5}
                className="text-[#d9a441] transition-transform duration-300 group-hover:scale-110 shrink-0"
              />
              <span className="whitespace-nowrap">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const MenuPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOpenAuthModal, setIsOpenAuthModal] = useState<boolean>(false);

  // User auth holatini localStorage'dan aniqlash
  const [isLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("is_logged_in") === "true";
  });

  // Sevimlilar ro'yxatini localStorage bilan bog'lash
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("user_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categoryQuery = searchParams.get("category");
  const categoryFromState = (location.state as { category?: string })?.category;

  const matchedQueryCategory = categoryQuery
    ? categories.find((c) => c.name.toLowerCase() === categoryQuery.toLowerCase())?.name
    : null;

  const activeCategory =
    selectedCategory ?? matchedQueryCategory ?? categoryFromState ?? "Barchasi";

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const [items] = useState<MenuItem[]>(menuItems);
  const loading = false;

  const handleFavoriteClick = (e: React.MouseEvent, foodId: string | undefined) => {
    e.stopPropagation();

    if (!foodId) return;

    if (!isLoggedIn) {
      setIsOpenAuthModal(true);
      return;
    }

    setFavorites((prev) => {
      const updated = prev.includes(foodId)
        ? prev.filter((id) => id !== foodId)
        : [...prev, foodId];
      localStorage.setItem("user_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const visibleItems = items
    .filter((it) => it.status === "Mavjud")
    .filter(
      (it) => activeCategory === "Barchasi" || it.category === activeCategory,
    );

  return (
    <div className="min-h-screen bg-[#0b0e10] text-white overflow-x-hidden">
      <section className="relative min-h-[450px] sm:min-h-[500px] overflow-hidden flex items-center">
        <img
          src={MenuBackground}
          alt="Tanho restaurant"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0b0e10] via-[#0b0e10]/80 to-transparent" />

        <div className="relative mx-auto w-full max-w-[1240px] px-4 sm:px-6 py-16">
          <div className="max-w-[430px]">
            <p className="mb-3 text-xs sm:text-sm uppercase tracking-[3px] text-[#d9a441]">
              TANHO RESTAURANT
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight">
              Menyu
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#d9a441]">
              Eng mazali taomlar, siz uchun tayyor!
            </p>
            <p className="mt-4 max-w-[370px] text-xs sm:text-sm leading-6 sm:leading-7 text-gray-300">
              TANHO restoranida sizga eng sifatli va mazali taomlarni taqdim
              etamiz.
            </p>
            <div className="mt-6 h-[1px] w-24 sm:w-28 bg-[#d9a441]" />
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 -mt-6 sm:-mt-8">
        <CategoryTabs
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
        />
      </section>

      <section className="mx-auto max-w-[1240px] px-4 sm:px-6 py-10 sm:py-12">
        <div className="mb-6 sm:mb-7 flex items-center justify-between">
          <div>
            <p className="mb-1 sm:mb-2 text-xs uppercase tracking-[3px] text-[#d9a441]">
              TANHO RESTAURANT
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl">
              {activeCategory === "Barchasi"
                ? "Mazali taomlar"
                : activeCategory}
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-gray-400">
            <Loader2 className="animate-spin" size={22} /> Yuklanmoqda...
          </div>
        ) : visibleItems.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-[#121619] py-20 text-center text-gray-400 text-sm">
            Hozircha bu bo'limda taom yo'q
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleItems.map((food) => {
              const isFavorite = food.id ? favorites.includes(food.id) : false;
              return (
                <div
                  key={food.id}
                  onClick={() => navigate(`/menu/${food.id}`)}
                  className="group cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#121619] transition-all duration-300 hover:-translate-y-1 hover:border-[#d9a441]/60 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="relative h-[170px] sm:h-[220px] md:h-[240px] w-full overflow-hidden p-2 flex items-center justify-center"
                      style={{ backgroundColor: "#FEFEFE" }}
                    >
                      {food.image ? (
                        <img
                          src={food.image}
                          alt={food.name}
                          className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-600 bg-[#121619]">
                          <UtensilsCrossed size={32} />
                        </div>
                      )}

                      <button
                        type="button"
                        aria-label="Sevimlilarga qo'shish"
                        onClick={(e) => handleFavoriteClick(e, food.id)}
                        className={`absolute right-2.5 top-2.5 sm:right-3 sm:top-3 flex h-7 w-7 sm:h-8 sm:w-8 cursor-pointer items-center justify-center rounded-full border border-white/10 backdrop-blur-sm transition-all duration-300 outline-none focus:outline-none hover:scale-105 z-10 ${
                          isFavorite
                            ? "bg-[#d9a441] text-black"
                            : "bg-black/50 text-[#e0ad49] hover:bg-[#d9a441] hover:text-black"
                        }`}
                      >
                        <Heart size={14} fill={isFavorite ? "currentColor" : "none"} />
                      </button>
                    </div>

                    <div className="relative z-10 bg-[#121619] p-3 sm:p-4 pb-2">
                      <h3 className="text-xs sm:text-base font-semibold transition-colors duration-300 group-hover:text-[#e5ad45] truncate">
                        {food.name}
                      </h3>
                      <p className="mt-1.5 sm:mt-2 min-h-[32px] sm:min-h-[42px] text-[11px] sm:text-xs leading-4 sm:leading-5 text-gray-400 line-clamp-2">
                        {food.description || food.category}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 pt-2 bg-[#121619]">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/menu/${food.id}`);
                      }}
                      className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#8c651d]/40 px-2.5 sm:px-3 py-2 sm:py-2.5 text-[11px] sm:text-xs text-[#e5ad45] transition-all duration-300 outline-none focus:outline-none hover:bg-[#d9a441] hover:text-black"
                    >
                      <span className="truncate">Batafsil</span>
                      <Eye
                        size={14}
                        className="transition-transform duration-300 group-hover:scale-110 shrink-0 ml-1"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-[1240px] px-4 pb-12 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121619]">
          <div className="grid md:grid-cols-[280px_1fr]">
            <div className="relative h-[200px] overflow-hidden bg-[#121619] sm:h-[220px] md:h-auto">
              <img
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
                  Oilaviy bayramlar, tug'ilgan kunlar va ishchi uchrashuvlar
                  uchun shohona sharoitlar.
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
                    Aholidan holi, tinch va shinam muhitda suhbatlashish uchun
                    maxsus xonalar.
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
                    Tug'ilgan kun va tantanalar uchun dasturxonni maxsus
                    bezatish xizmati.
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
                    Ko'p kishilik korporativ kechalar va yirik tadbirlar uchun
                    zallarni oldindan bron qilish.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/reservation")}
                className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#d9a441] px-5 py-3 text-sm font-medium text-black transition-all duration-300 outline-none hover:bg-[#edbd58] focus:outline-none sm:mt-7 sm:w-auto sm:py-2.5"
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