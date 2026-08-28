import menuHeadImg from "../assets/images/Menu/Additional-Images/MenuHead.webp";

export interface FoodItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface OfferItem {
  type: string;
  badge?: string;
  title: string;
  discount: string;
  description: string;
  button: string;
  image: string;
  link: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

export interface ReviewItem {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

export const foodsData: FoodItem[] = [
  {
    name: "Lag‘mon Tanho",
    description: "Qalampirli taom, go‘sht va sabzavot bilan.",
    price: "25 000 so‘m",
    image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Qozon kabob",
    description: "Qozonda sekin damlangan go‘sht va kartoshka.",
    price: "40 000 so‘m",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Manti",
    description: "Uy uslubida tayyorlangan manti, qatiq bilan.",
    price: "28 000 so‘m",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Shashlik",
    description: "Tandirda pishirilgan shirali qo‘zichoq shashlik.",
    price: "35 000 so‘m",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Norin",
    description: "Maxsus usulda tayyorlangan urfona norin.",
    price: "30 000 so‘m",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85",
  },
];

export const offers: OfferItem[] = [
  {
    type: "promo",
    title: "Birinchi buyurtmangizga",
    discount: "10% CHEGIRMA!",
    description: "Bosh menu va maxsus promo-kod orqali birinchi buyurtmada chegirmani qo'lga kiriting.",
    button: "Buyurtma berish",
    image: menuHeadImg,
    link: "/menu",
  },
  {
    type: "dish",
    badge: "KUN TAOMI",
    title: "Tanho Premium Set",
    discount: "185,000 UZS",
    description: "Chef tavsiyasi: Saralangan go'sht va maxsus sous bilan tayyorlangan.",
    button: "Tafsilotlar",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
    link: "/menu",
  },
  {
    type: "promo",
    title: "Tug‘ilgan kuningizda",
    discount: "20% CHEGIRMA!",
    description: "Tug'ilgan kun egalari va yaqinlari uchun maxsus bayramona chegirma.",
    button: "Stol band qilish",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    link: "/reservation",
  },
];

export const news: NewsItem[] = [
  {
    id: "1",
    date: "01.05.2026",
    title: "Yangi yozgi menyu taqdim etildi!",
    description: "Yoz fasli uchun maxsus yangilangan salqin ichimliklar va taomlar.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "2",
    date: "18.04.2026",
    title: "Jonli musiqa va kechki dastur",
    description: "Har juma va shanba kunlari nufuzli sozandalar ijrosida jonli ijro.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "3",
    date: "10.04.2026",
    title: "Korporativ bayramlar uchun maxsus menyu",
    description: "Jamoangiz bilan unutilmas kecha o'tkazish uchun shinam va nafis zallar.",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=300&auto=format&fit=crop",
  },
];

export const initialReviews: ReviewItem[] = [
  {
    id: 1,
    name: "Azizbek Rahimov",
    rating: 5,
    date: "20 avgust, 2026",
    comment: "Restoran muhiti va taomlar shunchaki ajoyib!",
  },
  {
    id: 2,
    name: "Malika Karimova",
    rating: 5,
    date: "18 avgust, 2026",
    comment: "Oila davrasida dam olish uchun eng ideal maskan.",
  },
  {
    id: 3,
    name: "Jasurbek Umarov",
    rating: 5,
    date: "17 avgust, 2026",
    comment: "Xizmat ko'rsatish darajasi yuqori va tezkor.",
  },
];