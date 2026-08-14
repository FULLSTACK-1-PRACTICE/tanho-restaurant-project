import {
  Cake,
  ChevronRight,
  Coffee,
  Gift,
  Grid2X2,
  Heart,
  Percent,
  ShoppingCart,
  Star,
  UtensilsCrossed,
  Wine,
} from "lucide-react";

const MenuPage = () => {
  const categories = [
    { name: "Barchasi", icon: Grid2X2 },
    { name: "Salatlar", icon: SaladIcon },
    { name: "Issiq taomlar", icon: UtensilsCrossed },
    { name: "Milliy taomlar", icon: Cake },
    { name: "Shashliklar", icon: UtensilsCrossed },
    { name: "Ichimliklar", icon: Wine },
    { name: "Desertlar", icon: Coffee },
  ];

  const foods = [
    {
      name: "Lag'mon Tanho",
      description: "Qo'l cho'zma lag'mon, go'sht va sabzavotlar bilan.",
      price: "25 000 so'm",
      image:
        "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Qozon kabob",
      description: "Qozonda sekin damlangan go'sht va kartoshka.",
      price: "40 000 so'm",
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Manti",
      description: "Uy uslubida tayyorlangan manti, qatiq bilan.",
      price: "28 000 so'm",
      image:
        "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Shashlik",
      description: "Tandirda pishirilgan shirali qo'zichoq shashlik.",
      price: "35 000 so'm",
      image:
        "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Norin",
      description: "Maxsus usulda tayyorlangan urfona norin.",
      price: "30 000 so'm",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Somsa",
      description: "Tandirda pishirilgan go'shtli somsa.",
      price: "8 000 so'm",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Salat Tanho",
      description: "Yangi sabzavotlar va maxsus sous bilan.",
      price: "18 000 so'm",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Achichuk",
      description: "Achchiq va nordon ta'mli achichuk salat.",
      price: "10 000 so'm",
      image:
        "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Sho'rva",
      description: "An'anaviy o'zbek sho'rvasi, issiq va to'yimli.",
      price: "12 000 so'm",
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Olivye",
      description: "Kartoshka, sabzavot, kolbasa va mayonezli salat.",
      price: "15 000 so'm",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Choy (0,5 l)",
      description: "Yangi damlangan qora choy.",
      price: "6 000 so'm",
      image:
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Kompot (1 l)",
      description: "Mavsumiy mevalardan tayyorlangan kompot.",
      price: "10 000 so'm",
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Limonad Tanho",
      description: "Yangi limon, yalpiz va muz bilan.",
      price: "12 000 so'm",
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Coca Cola (1 l)",
      description: "Gazlangan ichimlik.",
      price: "12 000 so'm",
      image:
        "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Cheesecake",
      description: "Yumshoq va mazali desert, berry sous bilan.",
      price: "20 000 so'm",
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0e10] text-white">
      <section className="relative min-h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=90"
          alt="Tanho restaurant"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0e10] via-[#0b0e10]/80 to-transparent" />

        <div className="relative mx-auto flex min-h-[500px] max-w-[1200px] items-center px-6">
          <div className="max-w-[430px]">
            <p className="mb-4 text-sm uppercase tracking-[3px] text-[#d9a441]">
              TANHO RESTAURANT
            </p>

            <h1 className="font-serif text-5xl leading-tight md:text-6xl">
              Menyu
            </h1>

            <p className="mt-4 text-lg text-[#d9a441]">
              Eng mazali taomlar, siz uchun tayyor!
            </p>

            <p className="mt-5 max-w-[370px] text-sm leading-7 text-gray-300">
              TANHO restoranida sizga eng sifatli va mazali taomlarni taqdim
              etamiz.
            </p>

            <div className="mt-7 h-[1px] w-28 bg-[#d9a441]" />
          </div>
        </div>
      </section>

      {/* Kategoriya menyusi */}
      <section className="relative z-10 mx-auto -mt-8 max-w-[1200px] px-5">
        <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-[#121619] p-2 backdrop-blur-md sm:grid-cols-4 lg:grid-cols-7">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                type="button"
                className={`group flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-4 text-xs transition-all duration-300 ${
                  index === 0
                    ? "border border-[#8c651d]/50 bg-[#191e22] text-[#e5ad45]"
                    : "text-gray-300 hover:-translate-y-0.5 hover:bg-[#191e22] hover:text-[#e5ad45]"
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  className="text-[#d9a441] transition-transform duration-300 group-hover:scale-110"
                />

                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Taomlar ro'yxati (Mutlaqo tiniq rasmlar) */}
      <section className="mx-auto max-w-[1200px] px-5 py-12">
        <div className="mb-7 flex items-center justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[3px] text-[#d9a441]">
              TANHO RESTAURANT
            </p>

            <h2 className="font-serif text-3xl md:text-4xl">Mazali taomlar</h2>
          </div>

          <button
            type="button"
            className="group flex cursor-pointer items-center gap-2 text-sm text-[#d9a441] transition-all duration-300 hover:gap-3"
          >
            Barchasini ko'rish
            <ChevronRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {foods.map((food) => (
            <div
              key={food.name}
              className="group cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#121619] transition-all duration-300 hover:-translate-y-1 hover:border-[#d9a441]/60"
            >
              <div className="relative h-[190px] w-full overflow-hidden bg-[#121619] transform-gpu">
                <img
                  src={food.image}
                  alt={food.name}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu"
                />

                <button
                  type="button"
                  className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/50 text-[#e0ad49] backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-[#d9a441] hover:text-black"
                >
                  <Heart size={15} />
                </button>
              </div>

              <div className="relative z-10 bg-[#121619] p-4">
                <h3 className="text-base font-semibold transition-colors duration-300 group-hover:text-[#e5ad45]">
                  {food.name}
                </h3>

                <p className="mt-2 min-h-[42px] text-xs leading-5 text-gray-400">
                  {food.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#e5ad45]">
                    {food.price}
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-4 flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#8c651d]/40 px-3 py-2 text-xs text-[#e5ad45] transition-all duration-300 hover:bg-[#d9a441] hover:text-black"
                >
                  <span>Buyurtma berish</span>
                  <ShoppingCart
                    size={15}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Aksiyalar bloki */}
      <section className="mx-auto max-w-[1200px] px-5 pb-12">
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
                <p className="text-xs uppercase tracking-[2px] text-[#d9a441]">
                  MAXSUS TAKLIF
                </p>

                <h2 className="mt-2 font-serif text-2xl md:text-3xl">
                  Maxsus taomlar va aksiyalar
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  Doimiy mijozlarimiz uchun eng yaxshi takliflar!
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="group cursor-pointer">
                  <Gift
                    size={28}
                    strokeWidth={1.3}
                    className="text-[#d9a441] transition-transform duration-300 group-hover:-translate-y-0.5"
                  />

                  <h3 className="mt-3 text-sm font-semibold">
                    Doimiy aksiyalar
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-gray-400">
                    Har hafta yangi takliflar va chegirmalar.
                  </p>
                </div>

                <div className="group cursor-pointer">
                  <Percent
                    size={28}
                    strokeWidth={1.3}
                    className="text-[#d9a441] transition-transform duration-300 group-hover:-translate-y-0.5"
                  />

                  <h3 className="mt-3 text-sm font-semibold">
                    Sodiqlik dasturi
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-gray-400">
                    Bonuslar to'plang va chegirmalar oling.
                  </p>
                </div>

                <div className="group cursor-pointer">
                  <Star
                    size={28}
                    strokeWidth={1.3}
                    className="text-[#d9a441] transition-transform duration-300 group-hover:-translate-y-0.5"
                  />

                  <h3 className="mt-3 text-sm font-semibold">
                    Maxsus tadbirlar
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-gray-400">
                    Bayramlar va tadbirlar uchun maxsus menyu.
                  </p>
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

const SaladIcon = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#d9a441]"
    >
      <path d="M4 12c0 5 3.5 8 8 8s8-3 8-8H4Z" />
      <path d="M7 12c.5-3 2.5-5 5-5s4.5 2 5 5" />
      <path d="M12 7V4" />
      <path d="M9 5c1.5-.5 2.5 0 3 2" />
    </svg>
  );
};

export default MenuPage;