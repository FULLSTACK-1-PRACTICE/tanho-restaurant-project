import { useState } from "react";
import { useNavigate } from "react-router-dom";

import oshimg from "../../../assets/images/Menu/Cards/Osh.png";
import lagmonimg from "../../../assets/images/Menu/Cards/Suyuk-Lagmon.png";
import jujaCheesnochni from "../../../assets/images/Menu/Cards/Juja-Chesnochni.png";
import juja from "../../../assets/images/Menu/Cards/Juja.png";
import kovurmaLagmon from "../../../assets/images/Menu/Cards/Kovurma-Lagmon.png";
import mevaliAssorti from "../../../assets/images/Menu/Cards/Mevali-Assorti.png";
import molJizi from "../../../assets/images/Menu/Cards/Mol-Jizi.png";
import quyJizi from "../../../assets/images/Menu/Cards/Quy-Jizi.png";
import Cezar from "../../../assets/images/Menu/Cards/Cezar.png";
import FranSuzkiy from "../../../assets/images/Menu/Cards/FranSuzkiy.png";
import KotletShurva from "../../../assets/images/Menu/Cards/Kotlet-Shurva.png";
import Grecheskiy from "../../../assets/images/Menu/Cards/Grecheskiy.png";
import Izmir from "../../../assets/images/Menu/Cards/Izmir.png";
import Lazzat from "../../../assets/images/Menu/Cards/Lazzat.png";
import Mastava from "../../../assets/images/Menu/Cards/Mastava.png";
import Pelmen from "../../../assets/images/Menu/Cards/Pelmen.png";
import Smak from "../../../assets/images/Menu/Cards/Smak.png";
import TeftelShorva from "../../../assets/images/Menu/Cards/Teftel-Shurva.png";
import Tushonka from "../../../assets/images/Menu/Cards/Tushonka.png";
import Xit from "../../../assets/images/Menu/Cards/Xit.png";
import Yaponskiy from "../../../assets/images/Menu/Cards/Yaponskiy.png";

import {
  Cake,
  ChevronRight,
  Coffee,
  Grid2X2,
  Heart,
  Loader2,
  ShoppingCart,
  UtensilsCrossed,
  Wine,
  Sparkles,
  Users,
  PartyPopper,
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
      image: oshimg,
    },
    {
      id: "menu-3",
      name: "Choyxona Oshi",
      category: "Osh",
      price: 35000,
      status: "Mavjud",
      description: "To'q qip-qizil guruch va qo'y go'shtli maxsus palov.",
      image: oshimg,
    },
    {
      id: "menu-4",
      name: "Farg'ona Oshi",
      category: "Osh",
      price: 37000,
      status: "Mavjud",
      description: "Devzira guruchidan tayyorlangan achchiqroq an'anaviy osh.",
      image: oshimg,
    },
    {
      id: "menu-5",
      name: "Mol Jizi",
      category: "Grill",
      price: 65000,
      status: "Mavjud",
      description: "Yumshoq mol go'shti va maxsus garnir.",
      image: molJizi,
    },
    {
      id: "menu-6",
      name: "Jo'ja",
      category: "Grill",
      price: 48000,
      status: "Mavjud",
      description: "Olovda pishirilgan butun tovuq grill va sabzavotlar.",
      image: juja,
    },
    {
      id: "menu-7",
      name: "Qo'y Jizi",
      category: "Grill",
      price: 75000,
      status: "Mavjud",
      description: "Qo'y qoburg'alari ziravorlar bilan grillda pishirilgan.",
      image: quyJizi,
    },
    {
      id: "menu-8",
      name: "Jo'ja Chesnochniy",
      category: "Grill",
      price: 55000,
      status: "Mavjud",
      description: "Sarimsoq va maxsus sous bilan tayyorlangan mazali jo'ja.",
      image: jujaCheesnochni,
    },
    {
      id: "menu-9",
      name: "Sezar salati",
      category: "Salatlar",
      price: 40000,
      status: "Mavjud",
      description: "Tovuq go'shti, krutonlar va parmesan pishlog'i bilan.",
      image: Cezar,
    },
    {
      id: "menu-10",
      name: "Grecheskiy salat",
      category: "Salatlar",
      price: 35000,
      status: "Mavjud",
      description: "Yangi bodring, pomidor, oliviya va feta pishlog'i.",
      image: Grecheskiy,
    },
    {
      id: "menu-11",
      name: "Fransuzskiy salat",
      category: "Salatlar",
      price: 38000,
      status: "Mavjud",
      description: "Maxsus masalliqlar va mayonez bilan tayyorlangan to'yimli salat.",
      image: FranSuzkiy,
    },
    {
      id: "menu-12",
      name: "Yaponskiy salat",
      category: "Salatlar",
      price: 42000,
      status: "Mavjud",
      description: "Sharqona uslubda tayyorlangan maxsus salat.",
      image: Yaponskiy,
    },
    {
      id: "menu-13",
      name: "Tushonka",
      category: "Milliy taomlar",
      price: 70000,
      status: "Mavjud",
      description: "Maxsus usulda dimlab pishirilgan yumshoq lahm go'sht.",
      image: Tushonka,
    },
    {
      id: "menu-14",
      name: "Lag'mon (Qovurma)",
      category: "Milliy taomlar",
      price: 38000,
      status: "Mavjud",
      description: "Qo'lda cho'zilgan xamir va qovurilgan go'sht-sabzavotlar.",
      image: kovurmaLagmon,
    },
    {
      id: "menu-15",
      name: "Suyuk Lag'mon",
      category: "Milliy taomlar",
      price: 32000,
      status: "Mavjud",
      description: "Mazali sho'rvali va cho'zilgan uy lag'moni.",
      image: lagmonimg,
    },
    {
      id: "menu-16",
      name: "Pelmen",
      category: "Milliy taomlar",
      price: 35000,
      status: "Mavjud",
      description: "Qo'lda tugilgan mazali chuchvara va qaymoq.",
      image: Pelmen,
    },
    {
      id: "menu-17",
      name: "Mastava",
      category: "Milliy taomlar",
      price: 25000,
      status: "Mavjud",
      description: "Guruchli va qiyma go'shtli quyuq milliy sho'rva.",
      image: Mastava,
    },
    {
      id: "menu-18",
      name: "Kotlet Sho'rva",
      category: "Milliy taomlar",
      price: 30000,
      status: "Mavjud",
      description: "Maxsus kotletlar solingan to'yimli sho'rva.",
      image: KotletShurva,
    },
    {
      id: "menu-19",
      name: "Teftel Sho'rva",
      category: "Milliy taomlar",
      price: 30000,
      status: "Mavjud",
      description: "Go'shtli teftellar bilan tayyorlangan mazali sho'rva.",
      image: TeftelShorva,
    },
    {
      id: "menu-20",
      name: "Izmir salati",
      category: "Salatlar",
      price: 36000,
      status: "Mavjud",
      description: "Turkcha uslubda tayyorlangan o'ziga xos salat.",
      image: Izmir,
    },
    {
      id: "menu-21",
      name: "Lazzat salati",
      category: "Salatlar",
      price: 35000,
      status: "Mavjud",
      description: "O'zgacha ta'mga ega to'yimli va mazali salat.",
      image: Lazzat,
    },
    {
      id: "menu-22",
      name: "Smak salati",
      category: "Salatlar",
      price: 32000,
      status: "Mavjud",
      description: "Qarsildoq va sersuv masalliqlardan iborat salat.",
      image: Smak,
    },
    {
      id: "menu-23",
      name: "Mevali Assorti",
      category: "Desertlar",
      price: 30000,
      status: "Mavjud",
      description: "Mavsumiy yangi mevalar to'plami va qaymoq.",
      image: mevaliAssorti,
    },
    {
      id: "menu-24",
      name: "Xit salati",
      category: "Salatlar",
      price: 38000,
      status: "Mavjud",
      description: "Restoranimizning eng xaridorgir salatlaridan biri.",
      image: Xit,
    },
    {
      id: "menu-25",
      name: "Napoleon pirogi",
      category: "Desertlar",
      price: 28000,
      status: "Mavjud",
      description: "Mayin krem va varaqi xamirdan tayyorlangan klassik desert.",
    },
    {
      id: "menu-26",
      name: "Medovik",
      category: "Desertlar",
      price: 27000,
      status: "Mavjud",
      description: "Tabiiy asal va xushbo'y krem bilan tayyorlangan tort.",
    },
    {
      id: "menu-27",
      name: "Muzqaymoq Assorti",
      category: "Desertlar",
      price: 22000,
      status: "Mavjud",
      description: "Shokolad, vanil va qulupnayli muzqaymoq shariklari.",
    },
    {
      id: "menu-28",
      name: "Brauni Muzqaymoq bilan",
      category: "Desertlar",
      price: 34000,
      status: "Mavjud",
      description: "To'q shokoladli brauni va vanilli muzqaymoq.",
    },
    {
      id: "menu-29",
      name: "Pancake (Asal bilan)",
      category: "Desertlar",
      price: 26000,
      status: "Mavjud",
      description: "Yumshoq pankeyklar, asal va rezavor mevalar.",
    },
    {
      id: "menu-30",
      name: "Vafli va Mevalar",
      category: "Desertlar",
      price: 31000,
      status: "Mavjud",
      description: "Vena vaflisi, Nutella va yangi banan/qulupnay.",
    },
    {
      id: "drink-1",
      name: "Ko'k Choy (Chayxona)",
      category: "Ichimliklar",
      price: 8000,
      status: "Mavjud",
      description: "Xushbo'y va tetiklashtiruvchi an'anaviy ko'k choy.",
    },
    {
      id: "drink-2",
      name: "Qora Choy (Limonli)",
      category: "Ichimliklar",
      price: 10000,
      status: "Mavjud",
      description: "Issiq qora choy, yangi limon bo'laklari bilan.",
    },
    {
      id: "drink-3",
      name: "Mavsumiy Mevali Choy",
      category: "Ichimliklar",
      price: 22000,
      status: "Mavjud",
      description: "Yalpiz, malina va sitrus mevalari qo'shilgan choy.",
    },
    {
      id: "drink-4",
      name: "Klassik Limonad",
      category: "Ichimliklar",
      price: 25000,
      status: "Mavjud",
      description: "Yangi siqilgan limon sharbati va muzli uy limonadi.",
    },
    {
      id: "drink-5",
      name: "Mojito (Bezalkogolny)",
      category: "Ichimliklar",
      price: 28000,
      status: "Mavjud",
      description: "Yalpiz, laym, soda va muzdan tayyorlangan salqin ichimlik.",
    },
    {
      id: "drink-6",
      name: "Yagodny Limonad",
      category: "Ichimliklar",
      price: 30000,
      status: "Mavjud",
      description: "Malina, qulupnay va klubnika ezmasidan limonad.",
    },
    {
      id: "drink-7",
      name: "Espresso",
      category: "Ichimliklar",
      price: 15000,
      status: "Mavjud",
      description: "Quyuq va achchiq klassik italyancha kofe.",
    },
    {
      id: "drink-8",
      name: "Cappuccino",
      category: "Ichimliklar",
      price: 22000,
      status: "Mavjud",
      description: "Mayin sut ko'pigi va espresso aralashmasi.",
    },
    {
      id: "drink-9",
      name: "Latte Macchiato",
      category: "Ichimliklar",
      price: 24000,
      status: "Mavjud",
      description: "Ko'p miqdordagi sut va yengil espresso qatlami.",
    },
    {
      id: "drink-10",
      name: "Milkshake (Shokoladli)",
      category: "Ichimliklar",
      price: 26000,
      status: "Mavjud",
      description: "Sut va shokoladli muzqaymoqdan tayyorlangan kokteyl.",
    },
    {
      id: "drink-11",
      name: "Tazhe Siqilgan Apelsin Sharbati",
      category: "Ichimliklar",
      price: 32000,
      status: "Mavjud",
      description: "100% tabiiy yangi siqilgan apelsin sharbati (Fresh).",
    },
    {
      id: "drink-12",
      name: "Coca-Cola / Fanta / Sprite",
      category: "Ichimliklar",
      price: 12000,
      status: "Mavjud",
      description: "0.5l idishdagi salqin gazlangan drink.",
    },
    {
      id: "drink-13",
      name: "Mavsumiy Kompot",
      category: "Ichimliklar",
      price: 15000,
      status: "Mavjud",
      description: "Uy sharoitida gilos va olmadorlardan tayyorlangan kompot.",
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

      {/* Kategoriya tugmalari */}
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

      {/* Marosimlar va VIP Zallar Banner Seksiyasi */}
      <section className="mx-auto max-w-[1240px] px-4 sm:px-6 pb-12">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121619]">
          <div className="grid md:grid-cols-[280px_1fr]">
            <div className="relative h-[200px] sm:h-[220px] overflow-hidden bg-[#121619] md:h-auto">
              <img
                src={mevaliAssorti}
                alt="TANHO Marosimlar va Zallar"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="p-5 sm:p-6 md:p-8">
              <div className="mb-6 sm:mb-7">
                <p className="text-xs uppercase tracking-[2px] text-[#d9a441]">TADBIRLAR VA MAROSIMLAR</p>
                <h2 className="mt-2 font-serif text-2xl md:text-3xl">Maxsus kunlaringizni biz bilan o'tkazing</h2>
                <p className="mt-2 text-xs sm:text-sm text-gray-400">
                  Oilaviy bayramlar, tug'ilgan kunlar va ishchi uchrashuvlar uchun shohona sharoitlar.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="group cursor-pointer">
                  <Sparkles size={26} strokeWidth={1.3} className="text-[#d9a441] transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <h3 className="mt-2.5 sm:mt-3 text-sm font-semibold">VIP Xonalar</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs leading-5 text-gray-400">
                    Aholidan holi, tinch va shinam muhitda suhbatlashish uchun maxsus xonalar.
                  </p>
                </div>
                <div className="group cursor-pointer">
                  <PartyPopper size={26} strokeWidth={1.3} className="text-[#d9a441] transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <h3 className="mt-2.5 sm:mt-3 text-sm font-semibold">Bayramona Stollar</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs leading-5 text-gray-400">
                    Tug'ilgan kun va tantanalar uchun dasturxonni maxsus bezatish xizmati.
                  </p>
                </div>
                <div className="group cursor-pointer">
                  <Users size={26} strokeWidth={1.3} className="text-[#d9a441] transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <h3 className="mt-2.5 sm:mt-3 text-sm font-semibold">Katta Jamoalar</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs leading-5 text-gray-400">
                    Ko'p kishilik korporativ kechalar uchun zallarni oldindan bron qilish.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/reservation")}
                className="mt-6 sm:mt-7 flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#d9a441] px-5 py-3 sm:py-2.5 text-sm font-medium text-black transition-all duration-300 outline-none focus:outline-none hover:bg-[#edbd58]"
              >
                Stol band qilish
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