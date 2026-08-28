import oshimg from "../assets/images/Menu/Cards/Osh.png";
import lagmonimg from "../assets/images/Menu/Cards/Suyuk-Lagmon.png";
import jujaCheesnochni from "../assets/images/Menu/Cards/Juja-Chesnochni.png";
import juja from "../assets/images/Menu/Cards/Juja.png";
import kovurmaLagmon from "../assets/images/Menu/Cards/Kovurma-Lagmon.png";
import molJizi from "../assets/images/Menu/Cards/Mol-Jizi.png";
import quyJizi from "../assets/images/Menu/Cards/Quy-Jizi.png";
import Cezar from "../assets/images/Menu/Cards/Cezar.png";
import FranSuzkiy from "../assets/images/Menu/Cards/FranSuzkiy.png";
import KotletShurva from "../assets/images/Menu/Cards/Kotlet-Shurva.png";
import Grecheskiy from "../assets/images/Menu/Cards/Grecheskiy.png";
import Izmir from "../assets/images/Menu/Cards/Izmir.png";
import Lazzat from "../assets/images/Menu/Cards/Lazzat.png";
import Mastava from "../assets/images/Menu/Cards/Mastava.png";
import Pelmen from "../assets/images/Menu/Cards/Pelmen.png";
import Smak from "../assets/images/Menu/Cards/Smak.png";
import TeftelShurva from "../assets/images/Menu/Cards/Teftel-Shurva.png";
import Tushonka from "../assets/images/Menu/Cards/Tushonka.png";
import Xit from "../assets/images/Menu/Cards/Xit.png";
import Yaponskiy from "../assets/images/Menu/Cards/Yaponskiy.png";
import Baxor from "../assets/images/Menu/Cards/Baxor.png";
import KuritsaAnanas from "../assets/images/Menu/Cards/Kuritsa-Ananas.png";
import MujiskoyKapriz from "../assets/images/Menu/Cards/Mujiskoy-Kapriz.png";
import Nejniy from "../assets/images/Menu/Cards/Nejniy.png";
import OvoshnoyAsarti from "../assets/images/Menu/Cards/Ovoshnoy-Asarti.png";
import PodVodochku from "../assets/images/Menu/Cards/Pod-Vodochku.png";
import Qul from "../assets/images/Menu/Cards/Qul.png";
import SvejiSalat from "../assets/images/Menu/Cards/Sveji-Salat.png";
import Tanho from "../assets/images/Menu/Cards/Tanho.png";
import TovuqQanot from "../assets/images/Menu/Cards/Tovuq-Qanot.png";
import YangiTanho from "../assets/images/Menu/Cards/Yangi-Tanho.png";
import Yaponskiy2 from "../assets/images/Menu/Cards/Yaponskiy-2.png";
import oliviyeImg from "../assets/images/Menu/Cards/Oliviye.png";
import manchuriImg from "../assets/images/Menu/Cards/Manchuri.png";
import mevaliAssortiImg from "../assets/images/Menu/Cards/Mevali-Assorti.png";

import moxito from "../assets/images/Menu/Cards/Soft-Drinks/Moxito.png";
import cocaCola from "../assets/images/Menu/Cards/Soft-Drinks/Coca-Cola.png";
import domashnayaKampot from "../assets/images/Menu/Cards/Soft-Drinks/Domashnaya-Kampot.png";
import bliss from "../assets/images/Menu/Cards/Soft-Drinks/Bliss.png";
import borjomi from "../assets/images/Menu/Cards/Soft-Drinks/Borjomi.png";
import chernagolovka from "../assets/images/Menu/Cards/Soft-Drinks/Chernagolovka.png";
import chortoq from "../assets/images/Menu/Cards/Soft-Drinks/Chortoq.png";
import fanta from "../assets/images/Menu/Cards/Soft-Drinks/Fanta.png";
import gardiSok from "../assets/images/Menu/Cards/Soft-Drinks/Gardi-Sok.png";
import piva from "../assets/images/Menu/Cards/Soft-Drinks/Piva.png";
import sochnayaDolina from "../assets/images/Menu/Cards/Soft-Drinks/Sochnaya-Dolina.png";
import spriteLemonadniy from "../assets/images/Menu/Cards/Soft-Drinks/Sprite-Lemonadniy.png";
import vikoSok from "../assets/images/Menu/Cards/Soft-Drinks/Viko-Sok.png";

export interface MenuItem {
  id?: string;
  name: string;
  category: string;
  price: number;
  status: "Mavjud" | "Mavjud emas";
  image?: string;
  description?: string;
}

export const menuItems: MenuItem[] = [
  {
    id: "menu-1",
    name: "To'y Oshi",
    category: "Osh",
    price: 38000,
    status: "Mavjud",
    description: "An'anaviy to'y palovi.",
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
    name: "Sezar salat",
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
    description: "Maxsus masalliqlar va mayonez bilan tayyorlangan to'yimli salat.",
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
    name: "Suyuq Lag'mon",
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
    name: "Izmir salat",
    category: "Salatlar",
    price: 36000,
    status: "Mavjud",
    description: "Turkcha uslubda tayyorlangan o'ziga xos salat.",
    image: Izmir,
  },
  {
    id: "menu-19",
    name: "Lazzat salat",
    category: "Salatlar",
    price: 35000,
    status: "Mavjud",
    description: "O'zgacha ta'mga ega to'yimli va mazali salat.",
    image: Lazzat,
  },
  {
    id: "menu-20",
    name: "Smak salat",
    category: "Salatlar",
    price: 32000,
    status: "Mavjud",
    description: "Qarsildoq va sersuv masalliqlardan iborat salat.",
    image: Smak,
  },
  {
    id: "menu-21",
    name: "Xit salat",
    category: "Salatlar",
    price: 38000,
    status: "Mavjud",
    description: "Restoranimizning eng xaridorgir salatlaridan biri.",
    image: Xit,
  },
  {
    id: "menu-22",
    name: "Baxor salat",
    category: "Salatlar",
    price: 33000,
    status: "Mavjud",
    description: "Yangi bahorgi ko'katlar va sabzavotlardan salat.",
    image: Baxor,
  },
  {
    id: "menu-23",
    name: "Kuritsa Ananas salat",
    category: "Salatlar",
    price: 45000,
    status: "Mavjud",
    description: "Tovuq go'shti va ananas bo'laklaridan tayyorlangan eksklyuziv salat.",
    image: KuritsaAnanas,
  },
  {
    id: "menu-24",
    name: "Mujiskoy Kapriz salat",
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
    name: "Ovoshnoy Assorti salat",
    category: "Salatlar",
    price: 30000,
    status: "Mavjud",
    description: "Sarxil sabzavotlar assorti to'plami.",
    image: OvoshnoyAsarti,
  },
  {
    id: "menu-27",
    name: "Pod Vodochku salat",
    category: "Salatlar",
    price: 35000,
    status: "Mavjud",
    description: "Maxsus mazali zakuskalar to'plami.",
    image: PodVodochku,
  },
  {
    id: "menu-28",
    name: "Tovuq Qo'li",
    category: "Grill",
    price: 34000,
    status: "Mavjud",
    description: "Maxsus usulda pishirilgan tovuq quli va garnir.",
    image: Qul,
  },
  {
    id: "menu-29",
    name: "Sveji salat",
    category: "Salatlar",
    price: 28000,
    status: "Mavjud",
    description: "Yangi pomidor, bodring va ko'katlar.",
    image: SvejiSalat,
  },
  {
    id: "menu-30",
    name: "Tanho salat",
    category: "Salatlar",
    price: 60000,
    status: "Mavjud",
    description: "Tovuq go'shti, pishloq, yangi bodring va maxsus sous bilan tayyorlanadigan salat.",
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
    name: "Yangi Tanho salat",
    category: "Salatlar",
    price: 58000,
    status: "Mavjud",
    description: "Saralangan mol go'shti, yangi ko'katlar, cherri pomidor va balzamik sous.",
    image: YangiTanho,
  },
  {
    id: "menu-33",
    name: "Yaponskiy 2 salat",
    category: "Salatlar",
    price: 44000,
    status: "Mavjud",
    description: "Yaponskiy salatining yangi, o'zgacha versiyasi.",
    image: Yaponskiy2,
  },
  {
    id: "menu-34",
    name: "Oliviye salat",
    category: "Salatlar",
    price: 32000,
    status: "Mavjud",
    description: "An'anaviy va mazali Oliviye salati.",
    image: oliviyeImg,
  },
  {
    id: "menu-35",
    name: "Manchuri",
    category: "Grill",
    price: 45000,
    status: "Mavjud",
    description: "Xushbo'y ziravorlar, shirin-nordon sous va saralangan go'sht bo'laklaridan tayyorlangan taom.",
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
    name: "Domashniy Kompot",
    category: "Ichimliklar",
    price: 15000,
    status: "Mavjud",
    description: "Uy sharoitida tayyorlangan mevali kompot.",
    image: domashnayaKampot,
  },
  {
    id: "drink-4",
    name: "Bliss Sharbati",
    category: "Ichimliklar",
    price: 18000,
    status: "Mavjud",
    description: "Tabiiy mevali Bliss sharbati.",
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
    name: "Gardi Sharbati",
    category: "Ichimliklar",
    price: 18000,
    status: "Mavjud",
    description: "Mevali sharbat.",
    image: gardiSok,
  },
  {
    id: "drink-10",
    name: "Pivo",
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
    description: "Sersuv mevalardan tayyorlangan sharbat.",
    image: sochnayaDolina,
  },
  {
    id: "drink-12",
    name: "Sprite Limonad",
    category: "Ichimliklar",
    price: 26000,
    status: "Mavjud",
    description: "Limonli maxsus sprite limonadi.",
    image: spriteLemonadniy,
  },
  {
    id: "drink-13",
    name: "Viko Sharbati",
    category: "Ichimliklar",
    price: 19000,
    status: "Mavjud",
    description: "Viko mevali sharbati.",
    image: vikoSok,
  },
];