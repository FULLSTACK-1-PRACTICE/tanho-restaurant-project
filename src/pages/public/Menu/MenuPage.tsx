import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import oshimg from "../../../assets/images/Menu/Cards/Osh.png";
import lagmonimg from "../../../assets/images/Menu/Cards/Suyuk-Lagmon.png";
import jujaCheesnochni from "../../../assets/images/Menu/Cards/Juja-Chesnochni.png";
import juja from "../../../assets/images/Menu/Cards/Juja.png";
import kovurmaLagmon from "../../../assets/images/Menu/Cards/Kovurma-Lagmon.png";
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
import TeftelShurva from "../../../assets/images/Menu/Cards/Teftel-Shurva.png";
import Tushonka from "../../../assets/images/Menu/Cards/Tushonka.png";
import Xit from "../../../assets/images/Menu/Cards/Xit.png";
import Yaponskiy from "../../../assets/images/Menu/Cards/Yaponskiy.png";
import Baxor from "../../../assets/images/Menu/Cards/Baxor.png";
import KuritsaAnanas from "../../../assets/images/Menu/Cards/Kuritsa-Ananas.png";
import MujiskoyKapriz from "../../../assets/images/Menu/Cards/Mujiskoy-Kapriz.png";
import Nejniy from "../../../assets/images/Menu/Cards/Nejniy.png";
import OvoshnoyAsarti from "../../../assets/images/Menu/Cards/Ovoshnoy-Asarti.png";
import PodVodochku from "../../../assets/images/Menu/Cards/Pod-Vodochku.png";
import Qul from "../../../assets/images/Menu/Cards/Qul.png";
import SvejiSalat from "../../../assets/images/Menu/Cards/Sveji-Salat.png";
import Tanho from "../../../assets/images/Menu/Cards/Tanho.png";
import TovuqQanot from "../../../assets/images/Menu/Cards/Tovuq-Qanot.png";
import YangiTanho from "../../../assets/images/Menu/Cards/Yangi-Tanho.png";
import Yaponskiy2 from "../../../assets/images/Menu/Cards/Yaponskiy-2.png";
import oliviyeImg from "../../../assets/images/Menu/Cards/Oliviye.png";
import manchuriImg from "../../../assets/images/Menu/Cards/Manchuri.png";
import mevaliAssortiImg from "../../../assets/images/Menu/Cards/Mevali-Assorti.png";

import moxito from "../../../assets/images/Menu/Cards/Soft-Drinks/Moxito.png";
import cocaCola from "../../../assets/images/Menu/Cards/Soft-Drinks/Coca-Cola.png";
import domashnayaKampot from "../../../assets/images/Menu/Cards/Soft-Drinks/Domashnaya-Kampot.png";
import bliss from "../../../assets/images/Menu/Cards/Soft-Drinks/Bliss.png";
import borjomi from "../../../assets/images/Menu/Cards/Soft-Drinks/Borjomi.png";
import chernagolovka from "../../../assets/images/Menu/Cards/Soft-Drinks/Chernagolovka.png";
import chortoq from "../../../assets/images/Menu/Cards/Soft-Drinks/Chortoq.png";
import fanta from "../../../assets/images/Menu/Cards/Soft-Drinks/Fanta.png";
import gardiSok from "../../../assets/images/Menu/Cards/Soft-Drinks/Gardi-Sok.png";
import piva from "../../../assets/images/Menu/Cards/Soft-Drinks/Piva.png";
import sochnayaDolina from "../../../assets/images/Menu/Cards/Soft-Drinks/Sochnaya-Dolina.png";
import spriteLemonadniy from "../../../assets/images/Menu/Cards/Soft-Drinks/Sprite-Lemonadniy.png";
import vikoSok from "../../../assets/images/Menu/Cards/Soft-Drinks/Viko-Sok.png";
import Initial from "../../../assets/images/Menu/Additional-Images/Initial.png";

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

function CategoryTabs({
  activeCategory,
  onChange,
}: {
  activeCategory: string;
  onChange: (category: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isCompact, setIsCompact] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragState = useRef({
    isDragging: false,
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

  const maxOffset = isCompact ? Math.max(0, trackWidth - containerWidth) : 0;
  const clampedOffset = Math.min(Math.max(offset, 0), maxOffset);
  const clamp = (value: number) => Math.min(Math.max(value, 0), maxOffset);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isCompact) return;
    dragState.current = {
      isDragging: true,
      startX: e.clientX,
      startOffset: clampedOffset,
      moved: false,
    };
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isCompact || !dragState.current.isDragging) return;
    const delta = dragState.current.startX - e.clientX;
    if (Math.abs(delta) > 3) dragState.current.moved = true;
    setOffset(clamp(dragState.current.startOffset + delta));
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragState.current.isDragging) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {
        console.warn(err);
      }
    }
    dragState.current.isDragging = false;
    setIsDragging(false);
  };

  const isScrollable = isCompact && maxOffset > 0;
  const thumbWidthPct = containerWidth
    ? Math.max(
        15,
        (containerWidth / Math.max(trackWidth, containerWidth)) * 100,
      )
    : 100;
  const thumbLeftPct =
    maxOffset > 0 ? (clampedOffset / maxOffset) * (100 - thumbWidthPct) : 0;

  return (
    <div className="relative rounded-xl border border-white/10 bg-[#121619] p-2 backdrop-blur-md">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        className="cursor-grab overflow-hidden active:cursor-grabbing [touch-action:pan-y] sm:cursor-auto sm:overflow-visible"
      >
        <div
          ref={trackRef}
          className="flex w-max gap-2 sm:grid sm:w-full sm:grid-cols-4 lg:grid-cols-7"
          style={{
            transform: isCompact ? `translateX(-${clampedOffset}px)` : "none",
            transition: isDragging ? "none" : "transform 200ms ease-out",
          }}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.name;
            return (
              <button
                key={category.name}
                type="button"
                onClick={() => {
                  if (dragState.current.moved) {
                    dragState.current.moved = false;
                    return;
                  }
                  onChange(category.name);
                }}
                className={`group flex shrink-0 sm:shrink cursor-pointer select-none items-center justify-center gap-1.5 sm:gap-2 rounded-lg px-3 sm:px-2.5 py-3 sm:py-3.5 text-[11px] sm:text-xs transition-all duration-300 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
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

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-9 rounded-l-xl bg-gradient-to-r from-[#121619] via-[#121619]/80 to-transparent transition-opacity duration-200 sm:hidden ${
          clampedOffset > 4 ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-14 rounded-r-xl bg-gradient-to-l from-[#121619] from-40% via-[#121619]/90 to-transparent transition-opacity duration-200 sm:hidden ${
          clampedOffset < maxOffset - 4 ? "opacity-100" : "opacity-0"
        }`}
      />

      {isScrollable && (
        <div className="relative mx-2 mt-2 h-[3px] sm:hidden">
          <div
            className="absolute inset-y-0 rounded-full bg-[#d9a441]"
            style={{
              width: `${thumbWidthPct}%`,
              left: `${thumbLeftPct}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}

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
      id: "menu-3",
      name: "Mol Jizi",
      category: "Grill",
      price: 65000,
      status: "Mavjud",
      description: "Yumshoq mol go'shti va maxsus garnir.",
      image: molJizi,
    },
    {
      id: "menu-4",
      name: "Jo'ja",
      category: "Grill",
      price: 48000,
      status: "Mavjud",
      description: "Olovda pishirilgan butun tovuq grill va sabzavotlar.",
      image: juja,
    },
    {
      id: "menu-5",
      name: "Qo'y Jizi",
      category: "Grill",
      price: 75000,
      status: "Mavjud",
      description: "Qo'y qoburg'alari ziravorlar bilan grillda pishirilgan.",
      image: quyJizi,
    },
    {
      id: "menu-6",
      name: "Jo'ja Chesnochniy",
      category: "Grill",
      price: 55000,
      status: "Mavjud",
      description: "Sarimsoq va maxsus sous bilan tayyorlangan mazali jo'ja.",
      image: jujaCheesnochni,
    },
    {
      id: "menu-7",
      name: "Sezar salati",
      category: "Salatlar",
      price: 40000,
      status: "Mavjud",
      description: "Tovuq go'shti, krutonlar va parmesan pishlog'i bilan.",
      image: Cezar,
    },
    {
      id: "menu-8",
      name: "Grecheskiy salat",
      category: "Salatlar",
      price: 35000,
      status: "Mavjud",
      description: "Yangi bodring, pomidor, oliviya va feta pishlog'i.",
      image: Grecheskiy,
    },
    {
      id: "menu-9",
      name: "Fransuzskiy salat",
      category: "Salatlar",
      price: 38000,
      status: "Mavjud",
      description:
        "Maxsus masalliqlar va mayonez bilan tayyorlangan to'yimli salat.",
      image: FranSuzkiy,
    },
    {
      id: "menu-10",
      name: "Yaponskiy salat",
      category: "Salatlar",
      price: 42000,
      status: "Mavjud",
      description: "Sharqona uslubda tayyorlangan maxsus salat.",
      image: Yaponskiy,
    },
    {
      id: "menu-11",
      name: "Tushonka",
      category: "Milliy taomlar",
      price: 70000,
      status: "Mavjud",
      description: "Maxsus usulda dimlab pishirilgan yumshoq lahm go'sht.",
      image: Tushonka,
    },
    {
      id: "menu-12",
      name: "Lag'mon (Qovurma)",
      category: "Milliy taomlar",
      price: 38000,
      status: "Mavjud",
      description: "Qo'lda cho'zilgan xamir va qovurilgan go'sht-sabzavotlar.",
      image: kovurmaLagmon,
    },
    {
      id: "menu-13",
      name: "Suyuk Lag'mon",
      category: "Milliy taomlar",
      price: 32000,
      status: "Mavjud",
      description: "Mazali sho'rvali va cho'zilgan uy lag'moni.",
      image: lagmonimg,
    },
    {
      id: "menu-14",
      name: "Pelmen",
      category: "Milliy taomlar",
      price: 35000,
      status: "Mavjud",
      description: "Qo'lda tugilgan mazali chuchvara va qaymoq.",
      image: Pelmen,
    },
    {
      id: "menu-15",
      name: "Mastava",
      category: "Milliy taomlar",
      price: 25000,
      status: "Mavjud",
      description: "Guruchli va qiyma go'shtli quyuq milliy sho'rva.",
      image: Mastava,
    },
    {
      id: "menu-16",
      name: "Kotlet Sho'rva",
      category: "Milliy taomlar",
      price: 30000,
      status: "Mavjud",
      description: "Maxsus kotletlar solingan to'yimli sho'rva.",
      image: KotletShurva,
    },
    {
      id: "menu-17",
      name: "Teftel Sho'rva",
      category: "Milliy taomlar",
      price: 30000,
      status: "Mavjud",
      description: "Go'shtli teftellar bilan tayyorlangan mazali sho'rva.",
      image: TeftelShurva,
    },
    {
      id: "menu-18",
      name: "Izmir salati",
      category: "Salatlar",
      price: 36000,
      status: "Mavjud",
      description: "Turkcha uslubda tayyorlangan o'ziga xos salat.",
      image: Izmir,
    },
    {
      id: "menu-19",
      name: "Lazzat salati",
      category: "Salatlar",
      price: 35000,
      status: "Mavjud",
      description: "O'zgacha ta'mga ega to'yimli va mazali salat.",
      image: Lazzat,
    },
    {
      id: "menu-20",
      name: "Smak salati",
      category: "Salatlar",
      price: 32000,
      status: "Mavjud",
      description: "Qarsildoq va sersuv masalliqlardan iborat salat.",
      image: Smak,
    },
    {
      id: "menu-21",
      name: "Xit salati",
      category: "Salatlar",
      price: 38000,
      status: "Mavjud",
      description: "Restoranimizning eng xaridorgir salatlaridan biri.",
      image: Xit,
    },
    {
      id: "menu-22",
      name: "Baxor salati",
      category: "Salatlar",
      price: 33000,
      status: "Mavjud",
      description: "Yangi bahorgi ko'katlar va sabzavotlardan salat.",
      image: Baxor,
    },
    {
      id: "menu-23",
      name: "Kuritsa Ananas",
      category: "Salatlar",
      price: 45000,
      status: "Mavjud",
      description:
        "Tovuq go'shti va ananas bo'laklaridan tayyorlangan eksklyuziv salat.",
      image: KuritsaAnanas,
    },
    {
      id: "menu-24",
      name: "Mujiskoy Kapriz",
      category: "Salatlar",
      price: 46000,
      status: "Mavjud",
      description: "To'yimli va mazali erkaklarcha maxsus salat.",
      image: MujiskoyKapriz,
    },
    {
      id: "menu-25",
      name: "Nejniy salat",
      category: "Salatlar",
      price: 39000,
      status: "Mavjud",
      description: "Og'zida eruvchi mayin va lazzatli salat.",
      image: Nejniy,
    },
    {
      id: "menu-26",
      name: "Ovoshnoy Asarti",
      category: "Salatlar",
      price: 30000,
      status: "Mavjud",
      description: "Sarxil sabzavotlar assorti to'plami.",
      image: OvoshnoyAsarti,
    },
    {
      id: "menu-27",
      name: "Pod Vodochku",
      category: "Salatlar",
      price: 35000,
      status: "Mavjud",
      description: "Maxsus mazali zakuskalar to'plami.",
      image: PodVodochku,
    },
    {
      id: "menu-28",
      name: "Tovuq Quli",
      category: "Grill",
      price: 34000,
      status: "Mavjud",
      description: "Maxsus usulda pishirilgan tovuq quli va garnir.",
      image: Qul,
    },
    {
      id: "menu-29",
      name: "Sveji Salat",
      category: "Salatlar",
      price: 28000,
      status: "Mavjud",
      description: "Yangi pomidor, bodring va ko'katlar.",
      image: SvejiSalat,
    },
    {
      id: "menu-30",
      name: "Tanho maxsus",
      category: "Salatlar",
      price: 60000,
      status: "Mavjud",
      description: "Restoranimizdan maxsus firmaniy salat.",
      image: Tanho,
    },
    {
      id: "menu-31",
      name: "Tovuq Qanotlari",
      category: "Grill",
      price: 42000,
      status: "Mavjud",
      description: "Qarsildoq qovurilgan tovuq qanotchalari.",
      image: TovuqQanot,
    },
    {
      id: "menu-32",
      name: "Yangi Tanho",
      category: "Salatlar",
      price: 58000,
      status: "Mavjud",
      description: "Yangi retsept bo'yicha tayyorlangan maxsus taom.",
      image: YangiTanho,
    },
    {
      id: "menu-33",
      name: "Yaponskiy 2",
      category: "Salatlar",
      price: 44000,
      status: "Mavjud",
      description: "Yaponskiy salatining yangi, o'zgacha versiyasi.",
      image: Yaponskiy2,
    },
    {
      id: "menu-34",
      name: "Oliviye",
      category: "Salatlar",
      price: 32000,
      status: "Mavjud",
      description: "An'anaviy va mazali Oliviye salati.",
      image: oliviyeImg,
    },
    {
      id: "menu-35",
      name: "Manchuri",
      category: "Milliy taomlar",
      price: 45000,
      status: "Mavjud",
      description: "Mazali va to'yimli Manchuri taomi.",
      image: manchuriImg,
    },
    {
      id: "dessert-1",
      name: "Mevali Assorti",
      category: "Desertlar",
      price: 45000,
      status: "Mavjud",
      description: "Sarxil va mazali mavsumiy mevalar to'plami.",
      image: mevaliAssortiImg,
    },
    {
      id: "drink-1",
      name: "Klassik Moxito",
      category: "Ichimliklar",
      price: 28000,
      status: "Mavjud",
      description: "Yalpiz, laym va muzli salqin ichimlik.",
      image: moxito,
    },
    {
      id: "drink-2",
      name: "Coca-Cola",
      category: "Ichimliklar",
      price: 12000,
      status: "Mavjud",
      description: "Gazlangan salqin ichimlik (0.5l).",
      image: cocaCola,
    },
    {
      id: "drink-3",
      name: "Domashniy Kampot",
      category: "Ichimliklar",
      price: 15000,
      status: "Mavjud",
      description: "Uy sharoitida tayyorlangan mevali kompot.",
      image: domashnayaKampot,
    },
    {
      id: "drink-4",
      name: "Bliss Sok",
      category: "Ichimliklar",
      price: 18000,
      status: "Mavjud",
      description: "Tabiy mevali Bliss sharbati.",
      image: bliss,
    },
    {
      id: "drink-5",
      name: "Borjomi",
      category: "Ichimliklar",
      price: 16000,
      status: "Mavjud",
      description: "Tabiiy shifobaxsh mineralli suv.",
      image: borjomi,
    },
    {
      id: "drink-6",
      name: "Chernagolovka",
      category: "Ichimliklar",
      price: 14000,
      status: "Mavjud",
      description: "Gazlangan shirin ichimlik.",
      image: chernagolovka,
    },
    {
      id: "drink-7",
      name: "Chortoq",
      category: "Ichimliklar",
      price: 12000,
      status: "Mavjud",
      description: "Mahalliy mineralli suv.",
      image: chortoq,
    },
    {
      id: "drink-8",
      name: "Fanta",
      category: "Ichimliklar",
      price: 12000,
      status: "Mavjud",
      description: "Apelsinli gazlangan ichimlik (0.5l).",
      image: fanta,
    },
    {
      id: "drink-9",
      name: "Gardi Sok",
      category: "Ichimliklar",
      price: 18000,
      status: "Mavjud",
      description: "Mevali sharbat.",
      image: gardiSok,
    },
    {
      id: "drink-10",
      name: "Piva",
      category: "Ichimliklar",
      price: 25000,
      status: "Mavjud",
      description: "Salqin pivo ichimligi.",
      image: piva,
    },
    {
      id: "drink-11",
      name: "Sochnaya Dolina",
      category: "Ichimliklar",
      price: 18000,
      status: "Mavjud",
      description: "Sersuv mevalardan tayyorlangan sok.",
      image: sochnayaDolina,
    },
    {
      id: "drink-12",
      name: "Sprite Lemonadniy",
      category: "Ichimliklar",
      price: 26000,
      status: "Mavjud",
      description: "Limonli maxsus sprite limonadi.",
      image: spriteLemonadniy,
    },
    {
      id: "drink-13",
      name: "Viko Sok",
      category: "Ichimliklar",
      price: 19000,
      status: "Mavjud",
      description: "Viko mevali sharbati.",
      image: vikoSok,
    },
  ]);

  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const loading = false;

  const visibleItems = items
    .filter((it) => it.status === "Mavjud")
    .filter(
      (it) => activeCategory === "Barchasi" || it.category === activeCategory,
    );

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
          onChange={setActiveCategory}
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
            {visibleItems.map((food) => (
              <div
                key={food.id}
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
                      className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 flex h-7 w-7 sm:h-8 sm:w-8 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/50 text-[#e0ad49] backdrop-blur-sm transition-all duration-300 outline-none focus:outline-none hover:scale-105 hover:bg-[#d9a441] hover:text-black z-10"
                    >
                      <Heart size={14} />
                    </button>
                  </div>

                  <div className="relative z-10 bg-[#121619] p-3 sm:p-4">
                    <h3 className="text-xs sm:text-base font-semibold transition-colors duration-300 group-hover:text-[#e5ad45] truncate">
                      {food.name}
                    </h3>
                    <p className="mt-1.5 sm:mt-2 min-h-[32px] sm:min-h-[42px] text-[11px] sm:text-xs leading-4 sm:leading-5 text-gray-400 line-clamp-2">
                      {food.description || food.category}
                    </p>

                    <div className="mt-3 sm:mt-4 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium text-[#e5ad45]">
                        {food.price.toLocaleString()} so'm
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4 pt-0 bg-[#121619]">
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#8c651d]/40 px-2.5 sm:px-3 py-2 sm:py-2.5 text-[11px] sm:text-xs text-[#e5ad45] transition-all duration-300 outline-none focus:outline-none hover:bg-[#d9a441] hover:text-black"
                  >
                    <span className="truncate">Buyurtma berish</span>
                    <ShoppingCart
                      size={14}
                      className="transition-transform duration-300 group-hover:scale-110 shrink-0 ml-1"
                    />
                  </button>
                </div>
              </div>
            ))}
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
    </div>
  );
};

function SaladIcon({ size = 20 }: { size?: number }) {
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
}

export default MenuPage;
