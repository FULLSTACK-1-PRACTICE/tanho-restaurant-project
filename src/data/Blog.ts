import pishirish from "../assets/images/Menu/Cards/pishirrish_jarayoni.png";
import manchuri from "../assets/images/Menu/Cards/Manchuri.png";

import {
  Camera,
  CalendarDays,
  ChefHat,
  Coffee,
  Leaf,
  Sparkles,
  Utensils,
  type LucideIcon,
} from "lucide-react";

export type Article = {
  id: number;
  category: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  image: string;
  icon: LucideIcon;
  content: string[];
};

export const articles: Article[] = [
  {
    id: 1,
    category: "Taomlar",
    title: "Bizning taomlarimiz qanday tayyorlanadi?",
    description:
      "TANHO oshpazlari taomlarimizni qanday mehr va sifat bilan tayyorlashini bilib oling.",
    date: "18 May, 2026",
    duration: "5 daqiqa",
    image: pishirish,
    icon: ChefHat,
    content: [
      "TANHO restoranida har bir taom alohida e'tibor va mehr bilan tayyorlanadi. Biz faqat eng saralangan va yangi mahsulotlardan foydalanamiz. Bizning oshxonamiz — bu sifat va an'analar uyg'unlashgan maskan.",
      "Oshpazlarimiz har kuni tongda eng barra sabzavotlar va yuqori sifatli go'sht mahsulotlarini tanlab olishadi. Bu jarayon taomning asl ta'mini ochib berishda juda muhim rol o'ynaydi. Ayniqsa, bizning olovda pishiriladigan maxsus taomlarimiz o'ziga xos ta'mga ega.",
      "Yaxshi taom tayyorlash san'at, uni his qila bilish esa iste'doddir. Bizning maxsus retseptlarimiz yillar davomida sayqallanib kelgan va har bir mijozimizning ko'nglidan joy olishga qaratilgan.",
    ],
  },
  {
    id: 2,
    category: "Maslahatlar",
    title: "Manchuri — mazali va to‘yimli taom",
    description:
      "Mazali va to‘yimli Manchuri taomi, o‘ziga xos ta’m va xushbo‘y ziravorlar uyg‘unligi bilan tayyorlanadi.",
    date: "15 May, 2026",
    duration: "4 daqiqa",
    image: manchuri,
    icon: Utensils,
    content: [
      "Manchuri — mazali va to‘yimli taomни yoqtiradiganlar uchun ajoyib tanlov.",

      "Ushbu taom go‘shtning mayinligi va xushbo‘y ziravorlarning o‘ziga xos uyg‘unligi bilan ajralib turadi.To‘g‘ri tayyorlash jarayoni orqali go‘shtning tabiiy mazasi saqlanib, taomga yanada yoqimli ta’m beriladi.",

      "restoranida Manchuri maxsus usulda tayyorlanib, mehmonlarga issiq va mazali holatda taqdim etiladi.",
    ],
  },
  {
    id: 3,
    category: "Maslahatlar",
    title: "Qahvaning 5 xil turi",
    description:
      "Har bir qahva turi o‘ziga xos ta’m va hidi bilan ajralib turadi. Qaysi biri sizniki?",
    date: "12 May, 2026",
    duration: "3 daqiqa",
    image:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200",
    icon: Coffee,
    content: [
      "Ertalabki qahva nafaqat uyg'onishga yordam beradi, balki kuningizni kayfiyat bilan boshlashga ham sabab bo'ladi. Lekin qaysi qahva turini tanlashni bilasizmi?",
      "Espresso — kuchli va qisqa. U haqiqiy qahva shinavandalari uchun yaratilgan. Cappuccino esa sut va qahva muvozanatini yaxshi ko'radiganlar uchun ajoyib tanlov.",
      "TANHO baristalari Italiyaning eng sara qahva donalaridan foydalanishadi. Har bir finjon qahva san'at asaridek tayyorlanadi.",
    ],
  },
  {
    id: 4,
    category: "Maslahatlar",
    title: "Sog‘lom ovqatlanish",
    description:
      "Restoranda ham sog‘lom va muvozanatli ovqatlanish mumkin. Maslahatlarimiz bilan tanishing.",
    date: "10 May, 2026",
    duration: "4 daqiqa",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200",
    icon: Leaf,
    content: [
      "Sog'lom ovqatlanish faqat uyda emas, restoranda ham imkoni bor narsa. Bizning maxsus parhez menyumiz bunga yaqqol misoldir.",
      "Yangi uzilgan sabzavotlardan tayyorlangan salatlar va bug'da pishirilgan baliq taomlari eng ko'p xarid qilinadigan sog'lom taomlarimizdan hisoblanadi.",
    ],
  },
  {
    id: 5,
    category: "Tadbirlar",
    title: "Restoranda tadbir tashkil qilish",
    description:
      "Tug‘ilgan kun, oilaviy kechki ovqat yoki korporativ tadbirlar uchun TANHO — eng yaxshi tanlov.",
    date: "8 May, 2026",
    duration: "4 daqiqa",
    image:
      "https://images.unsplash.com/photo-1533777324565-a040eb52facd?auto=format&fit=crop&q=80&w=1200",
    icon: CalendarDays,
    content: [
      "Maxsus kunlaringizni biz bilan o'tkazing. Biz tadbirlaringizni yuqori darajada tashkillashtirishga yordam beramiz.",
      "Keng zallar, maxsus menyu va yuqori darajadagi xizmat ko'rsatish bayramingizni unutilmas qiladi.",
    ],
  },
  {
    id: 6,
    category: "Yangiliklar",
    title: "TANHO’dagi yangi taomlar",
    description:
      "Menyumizga qo‘shilgan yangi va mazali taomlar bilan tanishing.",
    date: "5 May, 2026",
    duration: "3 daqiqa",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1200",
    icon: Sparkles,
    content: [
      "Menyumizga bahoriy kayfiyat bag'ishlovchi yangi taomlar qo'shildi. Ularni birinchilardan bo'lib tatib ko'ring.",
      "Bosh oshpazimiz maxsus tayyorlagan yangi desertlarimiz sizga manzur bo'lishi aniq.",
    ],
  },
  {
    id: 7,
    category: "Hayotdan lavhalar",
    title: "Restoran hayotidan",
    description:
      "TANHO’dagi eng sara lahzalar, mehmonlarimiz va jamoamiz hayotidan lavhalar.",
    date: "3 May, 2026",
    duration: "2 daqiqa",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1200",
    icon: Camera,
    content: [
      "Biz uchun har bir kun yangi sarguzasht. Jamoamiz a'zolari va sevimli mehmonlarimiz bilan o'tgan eng yaxshi xotiralarni bo'lishamiz.",
      "Restoranimizning yashirin qahramonlari – oshxona xodimlari hayotidan qisqacha reportaj.",
    ],
  },
];
