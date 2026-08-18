import { useState } from "react";
import { useRestaurant } from "../../../context/RestaurantContext";

import {
  Cake,
  ChevronRight,
  Coffee,
  Gift,
  Grid2X2,
  Heart,
  Loader2,
  Percent,
  ShoppingCart,
  Star,
  UtensilsCrossed,
  Wine,
} from "lucide-react";

interface MenuItem {
  id?: string;
  name: string;
  category: string;
  price: number;
  status: "Mavjud" | "Mavjud emas";
  image?: string;
  description?: string;
}

const categories = [
  { name: "Barchasi", icon: Grid2X2 },
  { name: "Salatlar", icon: SaladIcon },
  { name: "Osh", icon: UtensilsCrossed },
  { name: "Milliy taomlar", icon: Cake },
  { name: "Grill", icon: UtensilsCrossed },
  { name: "Ichimliklar", icon: Wine },
  { name: "Desertlar", icon: Coffee },
];

const MenuPage = () => {
  const [items] = useState<MenuItem[]>([
    {
      id: "menu-1",
      name: "Osh",
      category: "Osh",
      price: 35000,
      status: "Mavjud",
      description: "An'anaviy o'zbek palovi.",
      image: "",
    },
    {
      id: "menu-2",
      name: "Mol go'shtli Grill",
      category: "Grill",
      price: 65000,
      status: "Mavjud",
      description: "Yumshoq mol go'shti va maxsus garnir.",
      image: "",
    },
    {
      id: "menu-3",
      name: "Sezar salati",
      category: "Salatlar",
      price: 40000,
      status: "Mavjud",
      description: "Yangi sabzavotlar va maxsus sous.",
      image: "",
    },
    {
      id: "menu-4",
      name: "Qozon kabob",
      category: "Milliy taomlar",
      price: 70000,
      status: "Mavjud",
      description: "An'anaviy usulda tayyorlangan qozon kabob.",
      image: "",
    },
    {
      id: "menu-5",
      name: "Choy",
      category: "Ichimliklar",
      price: 10000,
      status: "Mavjud",
      description: "Issiq qora choy.",
      image: "",
    },
    {
      id: "menu-6",
      name: "Mevali desert",
      category: "Desertlar",
      price: 30000,
      status: "Mavjud",
      description: "Yengil va mazali mevali desert.",
      image: "",
    },
  ]);
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const { requestAddItem, activeTableNumber } = useRestaurant();
  const loading = false;

  const visibleItems = items
    .filter((it) => it.status === "Mavjud")
    .filter((it) => activeCategory === "Barchasi" || it.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0b0e10] text-white">
      <section className="relative min-h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=90"
          alt="Tanho restaurant"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0e10] via-[#0b0e10]/80 to-transparent" />

        <div className="relative mx-auto flex min-h-[500px] max-w-[1240px] items-center px-6">
          <div className="max-w-[430px]">
            <p className="mb-4 text-sm uppercase tracking-[3px] text-[#d9a441]">TANHO RESTAURANT</p>
            <h1 className="font-serif text-5xl leading-tight md:text-6xl">Menyu</h1>
            <p className="mt-4 text-lg text-[#d9a441]">Eng mazali taomlar, siz uchun tayyor!</p>
            <p className="mt-5 max-w-[370px] text-sm leading-7 text-gray-300">
              TANHO restoranida sizga eng sifatli va mazali taomlarni taqdim etamiz.
            </p>
            <div className="mt-7 h-[1px] w-28 bg-[#d9a441]" />
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-8 max-w-[1240px] px-5">
        <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-[#121619] p-2 backdrop-blur-md sm:grid-cols-4 lg:grid-cols-7">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.name;
            return (
              <button
                key={category.name}
                type="button"
                onClick={() => setActiveCategory(category.name)}
                className={`group flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-4 text-xs transition-all duration-300 ${
                  isActive
                    ? "border border-[#8c651d]/50 bg-[#191e22] text-[#e5ad45]"
                    : "text-gray-300 hover:-translate-y-0.5 hover:bg-[#191e22] hover:text-[#e5ad45]"
                }`}
              >
                <Icon size={20} strokeWidth={1.5} className="text-[#d9a441] transition-transform duration-300 group-hover:scale-110" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-12">
        <div className="mb-7 flex items-center justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[3px] text-[#d9a441]">TANHO RESTAURANT</p>
            <h2 className="font-serif text-3xl md:text-4xl">Mazali taomlar</h2>
          </div>
          {activeTableNumber && (
            <span className="rounded-full border border-[#d9a441]/40 bg-[#191e22] px-4 py-2 text-xs text-[#e5ad45]">
              Sizning stolingiz: {activeTableNumber}
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-gray-400">
            <Loader2 className="animate-spin" size={22} /> Yuklanmoqda...
          </div>
        ) : visibleItems.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-[#121619] py-20 text-center text-gray-400">
            Hozircha bu bo'limda taom yo'q
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {visibleItems.map((food) => (
              <div
                key={food.id}
                className="group cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#121619] transition-all duration-300 hover:-translate-y-1 hover:border-[#d9a441]/60"
              >
                <div className="relative h-[190px] w-full overflow-hidden bg-[#191e22] transform-gpu">
                  {food.image ? (
                    <img
                      src={food.image}
                      alt={food.name}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-600">
                      <UtensilsCrossed size={32} />
                    </div>
                  )}

                  <button
                    type="button"
                    className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/50 text-[#e0ad49] backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-[#d9a441] hover:text-black"
                  >
                    <Heart size={15} />
                  </button>
                </div>

                <div className="relative z-10 bg-[#121619] p-4">
                  <h3 className="text-base font-semibold transition-colors duration-300 group-hover:text-[#e5ad45]">{food.name}</h3>
                  <p className="mt-2 min-h-[42px] text-xs leading-5 text-gray-400">{food.description || food.category}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-[#e5ad45]">{food.price.toLocaleString()} so'm</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => requestAddItem({ id: food.id!, name: food.name, price: food.price })}
                    className="mt-4 flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#8c651d]/40 px-3 py-2 text-xs text-[#e5ad45] transition-all duration-300 hover:bg-[#d9a441] hover:text-black"
                  >
                    <span>Buyurtma berish</span>
                    <ShoppingCart size={15} className="transition-transform duration-300 group-hover:scale-110" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-12">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121619]">
          <div className="grid md:grid-cols-[280px_1fr]">
            <div className="relative h-[220px] overflow-hidden bg-[#121619] transform-gpu md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                alt="Maxsus taomlar"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 transform-gpu"
              />
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-7">
                <p className="text-xs uppercase tracking-[2px] text-[#d9a441]">MAXSUS TAKLIF</p>
                <h2 className="mt-2 font-serif text-2xl md:text-3xl">Maxsus taomlar va aksiyalar</h2>
                <p className="mt-2 text-sm text-gray-400">Doimiy mijozlarimiz uchun eng yaxshi takliflar!</p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="group cursor-pointer">
                  <Gift size={28} strokeWidth={1.3} className="text-[#d9a441] transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <h3 className="mt-3 text-sm font-semibold">Doimiy aksiyalar</h3>
                  <p className="mt-2 text-xs leading-5 text-gray-400">Har hafta yangi takliflar va chegirmalar.</p>
                </div>
                <div className="group cursor-pointer">
                  <Percent size={28} strokeWidth={1.3} className="text-[#d9a441] transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <h3 className="mt-3 text-sm font-semibold">Sodiqlik dasturi</h3>
                  <p className="mt-2 text-xs leading-5 text-gray-400">Bonuslar to'plang va chegirmalar oling.</p>
                </div>
                <div className="group cursor-pointer">
                  <Star size={28} strokeWidth={1.3} className="text-[#d9a441] transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <h3 className="mt-3 text-sm font-semibold">Maxsus tadbirlar</h3>
                  <p className="mt-2 text-xs leading-5 text-gray-400">Bayramlar va tadbirlar uchun maxsus menyu.</p>
                </div>
              </div>

              <button
                type="button"
                className="mt-7 flex cursor-pointer items-center gap-2 rounded-lg bg-[#d9a441] px-5 py-2.5 text-sm font-medium text-black transition-all duration-300 hover:bg-[#edbd58]"
              >
                Aksiyalarni ko'rish
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </section>

        
    </div>
  );
};

function SaladIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#d9a441]">
      <path d="M4 12c0 5 3.5 8 8 8s8-3 8-8H4Z" />
      <path d="M7 12c.5-3 2.5-5 5-5s4.5 2 5 5" />
      <path d="M12 7V4" />
      <path d="M9 5c1.5-.5 2.5 0 3 2" />
    </svg>
  );
}

export default MenuPage;