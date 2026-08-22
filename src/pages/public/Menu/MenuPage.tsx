import { useState } from "react";
import { useNavigate } from "react-router-dom";

import oshimg from "../../../assets/images/Menu/Cards/osh.png";
import lagmonimg from "../../../assets/images/Menu/Cards/suyuk lag'mon.png";

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
  const navigate = useNavigate();
  const [items] = useState<MenuItem[]>([
    {
      id: "menu-1",
      name: "To'y Oshi",
      category: "Osh",
      price: 38000,
      status: "Mavjud",
      description: "An'anaviy Toshkent to'y palovi, qazi va tuxum bilan.",
      image: oshimg,
    },
    {
      id: "menu-2",
      name: "Samarqandcha Osh",
      category: "Osh",
      price: 36000,
      status: "Mavjud",
      description: "Qat-qat sabzi va mayin mol go'shti bilan Samarqandcha palov.",
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-3",
      name: "Choyxona Oshi",
      category: "Osh",
      price: 35000,
      status: "Mavjud",
      description: "To'q qip-qizil guruch va qo'y go'shtli maxsus palov.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-4",
      name: "Farg'ona Oshi",
      category: "Osh",
      price: 37000,
      status: "Mavjud",
      description: "Devzira guruchidan tayyorlangan achchiqroq an'anaviy osh.",
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-5",
      name: "Mol go'shtli Grill",
      category: "Grill",
      price: 65000,
      status: "Mavjud",
      description: "Yumshoq mol go'shti va maxsus garnir.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-6",
      name: "Tovuq Grill",
      category: "Grill",
      price: 48000,
      status: "Mavjud",
      description: "Olovda pishirilgan butun tovuq grill va sabzavotlar.",
      image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-7",
      name: "Koreyka Grill",
      category: "Grill",
      price: 75000,
      status: "Mavjud",
      description: "Qo'y qoburg'alari ziravorlar bilan grillda pishirilgan.",
      image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-8",
      name: "Grill Assorti",
      category: "Grill",
      price: 120000,
      status: "Mavjud",
      description: "Mol, tovuq va kolbasa assorti grill to'plami.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-9",
      name: "Sezar salati",
      category: "Salatlar",
      price: 40000,
      status: "Mavjud",
      description: "Tovuq go'shti, krutonlar va parmesan pishlog'i bilan.",
      image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-10",
      name: "Grecheskiy salat",
      category: "Salatlar",
      price: 35000,
      status: "Mavjud",
      description: "Yangi bodring, pomidor, oliviya va feta pishlog'i.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-11",
      name: "Achchiq-chuchuk",
      category: "Salatlar",
      price: 18000,
      status: "Mavjud",
      description: "Osh uchun mo'ljallangan yupqa to'g'ralgan pomidor va piyoz.",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb12765?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-12",
      name: "Tovuqli Warm salat",
      category: "Salatlar",
      price: 42000,
      status: "Mavjud",
      description: "Issiq tovuq bo'laklari va qovurilgan sabzavotlar salati.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-13",
      name: "Qozon kabob",
      category: "Milliy taomlar",
      price: 70000,
      status: "Mavjud",
      description: "Qozonda qizartirib qovurilgan go'sht va kartoshka.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-14",
      name: "Lag'mon (Qovurma)",
      category: "Milliy taomlar",
      price: 38000,
      status: "Mavjud",
      description: "Qo'lda cho'zilgan xamir va qovurilgan go'sht-sabzavotlar.",
      image: lagmonimg,
    },
    {
      id: "menu-15",
      name: "Chuchvara",
      category: "Milliy taomlar",
      price: 32000,
      status: "Mavjud",
      description: "Kichik manti shaklidagi sho'rva va qatiq bilan xamir taom.",
      image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-16",
      name: "Manti (Go'shtli)",
      category: "Milliy taomlar",
      price: 35000,
      status: "Mavjud",
      description: "Bug'da pishirilgan qiymali va piyozli bug' dori.",
      image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-17",
      name: "Somsa (Go'shtli)",
      category: "Milliy taomlar",
      price: 12000,
      status: "Mavjud",
      description: "Tandirda pishirilgan varaqi qiymali somsa.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-18",
      name: "Norin",
      category: "Milliy taomlar",
      price: 45000,
      status: "Mavjud",
      description: "Yupqa kesilgan xamir va ot go'shti (qazi) aralashmasi.",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-19",
      name: "Kebab / Shashlik",
      category: "Milliy taomlar",
      price: 18000,
      status: "Mavjud",
      description: "Ko'mirda pishirilgan yumshoq mol go'shti shashlik.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-20",
      name: "Tovuq Shashlik",
      category: "Milliy taomlar",
      price: 16000,
      status: "Mavjud",
      description: "Marinovka qilingan tovuq go'shti shashlik.",
      image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-21",
      name: "Cheesecake San-Sebastian",
      category: "Desertlar",
      price: 35000,
      status: "Mavjud",
      description: "Issiq shokolad sousi bilan taqdim etiladigan chizkeyk.",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-22",
      name: "Tiramisu",
      category: "Desertlar",
      price: 32000,
      status: "Mavjud",
      description: "Italiya uslubidagi kofe va maskarpone pishloqli desert.",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-23",
      name: "Mevali desert",
      category: "Desertlar",
      price: 30000,
      status: "Mavjud",
      description: "Mavsumiy yangi mevalar to'plami va qaymoq.",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-24",
      name: "Shokoladli Fondan",
      category: "Desertlar",
      price: 38000,
      status: "Mavjud",
      description: "Ichida suyuq shokolad va yonida muzqaymoq bilan.",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-25",
      name: "Napoleon pirogi",
      category: "Desertlar",
      price: 28000,
      status: "Mavjud",
      description: "Mayin krem va varaqi xamirdan tayyorlangan klassik desert.",
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-26",
      name: "Medovik",
      category: "Desertlar",
      price: 27000,
      status: "Mavjud",
      description: "Tabiiy asal va xushbo'y krem bilan tayyorlangan tort.",
      image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-27",
      name: "Muzqaymoq Assorti",
      category: "Desertlar",
      price: 22000,
      status: "Mavjud",
      description: "Shokolad, vanil va qulupnayli muzqaymoq shariklari.",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-28",
      name: "Brauni Muzqaymoq bilan",
      category: "Desertlar",
      price: 34000,
      status: "Mavjud",
      description: "To'q shokoladli brauni va vanilli muzqaymoq.",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-29",
      name: "Pancake (Asal bilan)",
      category: "Desertlar",
      price: 26000,
      status: "Mavjud",
      description: "Yumshoq pankeyklar, asal va rezavor mevalar.",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "menu-30",
      name: "Vafli va Mevalar",
      category: "Desertlar",
      price: 31000,
      status: "Mavjud",
      description: "Vena vaflisi, Nutella va yangi banan/qulupnay.",
      image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "drink-1",
      name: "Ko'k Choy (Chayxona)",
      category: "Ichimliklar",
      price: 8000,
      status: "Mavjud",
      description: "Xushbo'y va tetiklashtiruvchi an'anaviy ko'k choy.",
      image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "drink-2",
      name: "Qora Choy (Limonli)",
      category: "Ichimliklar",
      price: 10000,
      status: "Mavjud",
      description: "Issiq qora choy, yangi limon bo'laklari bilan.",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "drink-3",
      name: "Mavsumiy Mevali Choy",
      category: "Ichimliklar",
      price: 22000,
      status: "Mavjud",
      description: "Yalpiz, malina va sitrus mevalari qo'shilgan choy.",
      image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "drink-4",
      name: "Klassik Limonad",
      category: "Ichimliklar",
      price: 25000,
      status: "Mavjud",
      description: "Yangi siqilgan limon sharbati va muzli uy limonadi.",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "drink-5",
      name: "Mojito (Bezalkogolny)",
      category: "Ichimliklar",
      price: 28000,
      status: "Mavjud",
      description: "Yalpiz, laym, soda va muzdan tayyorlangan salqin ichimlik.",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "drink-6",
      name: "Yagodny Limonad",
      category: "Ichimliklar",
      price: 30000,
      status: "Mavjud",
      description: "Malina, qulupnay va klubnika ezmasidan limonad.",
      image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "drink-7",
      name: "Espresso",
      category: "Ichimliklar",
      price: 15000,
      status: "Mavjud",
      description: "Quyuq va achchiq klassik italyancha kofe.",
      image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "drink-8",
      name: "Cappuccino",
      category: "Ichimliklar",
      price: 22000,
      status: "Mavjud",
      description: "Mayin sut ko'pigi va espresso aralashmasi.",
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "drink-9",
      name: "Latte Macchiato",
      category: "Ichimliklar",
      price: 24000,
      status: "Mavjud",
      description: "Ko'p miqdordagi sut va yengil espresso qatlami.",
      image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "drink-10",
      name: "Milkshake (Shokoladli)",
      category: "Ichimliklar",
      price: 26000,
      status: "Mavjud",
      description: "Sut va shokoladli muzqaymoqdan tayyorlangan kokteyl.",
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "drink-11",
      name: "Tazhe Siqilgan Oportokal Sharbati",
      category: "Ichimliklar",
      price: 32000,
      status: "Mavjud",
      description: "100% tabiy yangi siqilgan apelsin sharbati (Fresh).",
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "drink-12",
      name: "Coca-Cola / Fanta / Sprite",
      category: "Ichimliklar",
      price: 12000,
      status: "Mavjud",
      description: "0.5l idishdagi salqin gazlangan drink.",
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "drink-13",
      name: "Mavsumiy Kompot",
      category: "Ichimliklar",
      price: 15000,
      status: "Mavjud",
      description: "Uy sharoitida gilos va olmadorlardan tayyorlangan kompot.",
      image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80",
    },
  ]);

  const [activeCategory, setActiveCategory] = useState("Barchasi");
  
  const loading = false;

  const visibleItems = items
    .filter((it) => it.status === "Mavjud")
    .filter((it) => activeCategory === "Barchasi" || it.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0b0e10] text-white overflow-x-hidden">
      <section className="relative min-h-[450px] sm:min-h-[500px] overflow-hidden flex items-center">
        <img
          src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=90"
          alt="Tanho restaurant"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0b0e10] via-[#0b0e10]/80 to-transparent" />

        <div className="relative mx-auto w-full max-w-[1240px] px-4 sm:px-6 py-16">
          <div className="max-w-[430px]">
            <p className="mb-3 text-xs sm:text-sm uppercase tracking-[3px] text-[#d9a441]">TANHO RESTAURANT</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight">Menyu</h1>
            <p className="mt-3 text-base sm:text-lg text-[#d9a441]">Eng mazali taomlar, siz uchun tayyor!</p>
            <p className="mt-4 max-w-[370px] text-xs sm:text-sm leading-6 sm:leading-7 text-gray-300">
              TANHO restoranida sizga eng sifatli va mazali taomlarni taqdim etamiz.
            </p>
            <div className="mt-6 h-[1px] w-24 sm:w-28 bg-[#d9a441]" />
          </div>
        </div>
      </section>

      {/* Kategoriya tugmalari moslashtirildi */}
      <section className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 -mt-6 sm:-mt-8">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 lg:grid-cols-7 rounded-xl border border-white/10 bg-[#121619] p-2 backdrop-blur-md [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.name;
            return (
              <button
                key={category.name}
                type="button"
                onClick={() => setActiveCategory(category.name)}
                className={`group flex shrink-0 sm:shrink cursor-pointer items-center justify-center gap-1.5 sm:gap-2 rounded-lg px-3 sm:px-2.5 py-3 sm:py-3.5 text-[11px] sm:text-xs transition-all duration-300 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none ${
                  isActive
                    ? "border border-[#8c651d]/50 bg-[#191e22] text-[#e5ad45]"
                    : "border border-transparent text-gray-300 hover:-translate-y-0.5 hover:bg-[#191e22] hover:text-[#e5ad45]"
                }`}
              >
                <Icon size={16} strokeWidth={1.5} className="text-[#d9a441] transition-transform duration-300 group-hover:scale-110 shrink-0" />
                <span className="whitespace-nowrap">{category.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 sm:px-6 py-10 sm:py-12">
        <div className="mb-6 sm:mb-7 flex items-center justify-between">
          <div>
            <p className="mb-1 sm:mb-2 text-xs uppercase tracking-[3px] text-[#d9a441]">TANHO RESTAURANT</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl">
              {activeCategory === "Barchasi" ? "Mazali taomlar" : activeCategory}
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
          /* Mobil va planshetlarda 2 tadan, keng ekranlarda 3-4 tadan chiqishi uchun grid to'g'irlandi */
          <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleItems.map((food) => (
              <div
                key={food.id}
                className="group cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#121619] transition-all duration-300 hover:-translate-y-1 hover:border-[#d9a441]/60 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-[130px] sm:h-[180px] md:h-[190px] w-full overflow-hidden bg-[#191e22]">
                    {food.image ? (
                      <img
                        src={food.image}
                        alt={food.name}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-600">
                        <UtensilsCrossed size={32} />
                      </div>
                    )}

                    <button
                      type="button"
                      aria-label="Sevimlilarga qo'shish"
                      className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 flex h-7 w-7 sm:h-8 sm:w-8 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/50 text-[#e0ad49] backdrop-blur-sm transition-all duration-300 outline-none focus:outline-none hover:scale-105 hover:bg-[#d9a441] hover:text-black"
                    >
                      <Heart size={14} />
                    </button>
                  </div>

                  <div className="relative z-10 bg-[#121619] p-3 sm:p-4">
                    <h3 className="text-xs sm:text-base font-semibold transition-colors duration-300 group-hover:text-[#e5ad45] truncate">{food.name}</h3>
                    <p className="mt-1.5 sm:mt-2 min-h-[32px] sm:min-h-[42px] text-[11px] sm:text-xs leading-4 sm:leading-5 text-gray-400 line-clamp-2">{food.description || food.category}</p>

                    <div className="mt-3 sm:mt-4 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium text-[#e5ad45]">{food.price.toLocaleString()} so'm</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4 pt-0">
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#8c651d]/40 px-2.5 sm:px-3 py-2 sm:py-2.5 text-[11px] sm:text-xs text-[#e5ad45] transition-all duration-300 outline-none focus:outline-none hover:bg-[#d9a441] hover:text-black"
                  >
                    <span className="truncate">Buyurtma berish</span>
                    <ShoppingCart size={14} className="transition-transform duration-300 group-hover:scale-110 shrink-0 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-[1240px] px-4 sm:px-6 pb-12">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121619]">
          <div className="grid md:grid-cols-[280px_1fr]">
            <div className="relative h-[200px] sm:h-[220px] overflow-hidden bg-[#121619] md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                alt="Maxsus taomlar"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="p-5 sm:p-6 md:p-8">
              <div className="mb-6 sm:mb-7">
                <p className="text-xs uppercase tracking-[2px] text-[#d9a441]">MAXSUS TAKLIF</p>
                <h2 className="mt-2 font-serif text-2xl md:text-3xl">Maxsus taomlar va aksiyalar</h2>
                <p className="mt-2 text-xs sm:text-sm text-gray-400">Doimiy mijozlarimiz uchun eng yaxshi takliflar!</p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="group cursor-pointer">
                  <Gift size={26} strokeWidth={1.3} className="text-[#d9a441] transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <h3 className="mt-2.5 sm:mt-3 text-sm font-semibold">Doimiy aksiyalar</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs leading-5 text-gray-400">Har hafta yangi takliflar va chegirmalar.</p>
                </div>
                <div className="group cursor-pointer">
                  <Percent size={26} strokeWidth={1.3} className="text-[#d9a441] transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <h3 className="mt-2.5 sm:mt-3 text-sm font-semibold">Sodiqlik dasturi</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs leading-5 text-gray-400">Bonuslar to'plang va chegirmalar oling.</p>
                </div>
                <div className="group cursor-pointer">
                  <Star size={26} strokeWidth={1.3} className="text-[#d9a441] transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <h3 className="mt-2.5 sm:mt-3 text-sm font-semibold">Maxsus tadbirlar</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs leading-5 text-gray-400">Bayramlar va tadbirlar uchun maxsus menyu.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/reservation")}
                className="mt-6 sm:mt-7 flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#d9a441] px-5 py-3 sm:py-2.5 text-sm font-medium text-black transition-all duration-300 outline-none focus:outline-none hover:bg-[#edbd58]"
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