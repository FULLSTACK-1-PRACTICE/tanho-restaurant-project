import {
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  Clock3,
  ImagePlus,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  Phone,
  Send,
  Sparkles,
  Utensils,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";

import heroImg from "../../../assets/images/Landing/Hero/Hero-Section.png";
import foodImg from "../../../assets/images/Landing/Hero/Hero-Section.png";

const suggestions = [
  {
    image: foodImg,
    category: "TAOMLAR BO'YICHA TAKLIF",
    title: "Yangi taom: Lag'mon Tanho Special",
    text: "Lag'monga maxsus sous va qo'shimcha sabzavotlar qo'shish taklif qilindi. Endi menyuda mavjud!",
    author: "Diyorbek A.",
    date: "12.05.2024",
    status: "Amalga oshirilgan",
    completed: true,
  },
  {
    image: heroImg,
    category: "XIZMAT BO'YICHA",
    title: "Onlayn stol band qilish tizimi",
    text: "Web-sayt orqali stol band qilish funksiyasi qo'shilishi haqida taklif tushdi.",
    author: "Sevinch M.",
    date: "08.05.2024",
    status: "Ko'rib chiqilmoqda",
    completed: false,
  },
  {
    image: heroImg,
    category: "MUHIT VA ATMOSFERA",
    title: "Jonli musiqa kechalarini ko'paytirish",
    text: "Haftaning har juma va shanba kunlari jonli musiqa bo'lishi bo'yicha taklif qabul qilindi.",
    author: "Akbar R.",
    date: "02.05.2024",
    status: "Amalga oshirilgan",
    completed: true,
  },
  {
    image: foodImg,
    category: "TAOMLAR BO'YICHA TAKLIF",
    title: "Yangi desert: Cheesecake",
    text: "Menyuga Cheesecake desertini qo'shish taklifi. Endi menyuda mavjud!",
    author: "Madina S.",
    date: "28.04.2024",
    status: "Amalga oshirilgan",
    completed: true,
  },
  {
    image: heroImg,
    category: "BOSHQA TAKLIF",
    title: "Avtoturargohni kengaytirish",
    text: "Parkovka joylarini ko'paytirish bo'yicha taklif qabul qilindi.",
    author: "Jahongir T.",
    date: "18.04.2024",
    status: "Ko'rib chiqildi",
    completed: false,
  },
];

const offerTypes = [
  {
    icon: Utensils,
    title: "Taomlar bo'yicha",
    text: "taklif",
  },
  {
    icon: Bell,
    title: "Xizmat bo'yicha",
    text: "taklif",
  },
  {
    icon: Sparkles,
    title: "Muhit va atmosfera",
    text: "",
  },
  {
    icon: MoreHorizontal,
    title: "Boshqa taklif",
    text: "",
  },
];

const stats = [
  {
    icon: Users,
    value: "500+",
    text: "Qabul qilingan takliflar",
  },
  {
    icon: MessageCircle,
    value: "200+",
    text: "Amalga oshirilgan g'oyalar",
  },
  {
    icon: Check,
    value: "100%",
    text: "E'tiborda bo'lamiz",
  },
];

function EventsPage() {
  return (
    <main className="min-h-screen bg-[#050708] text-white">
      {/* HERO */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Tanho Restaurant"
            className="h-full w-full object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#050708] via-[#050708]/95 to-[#050708]/30" />

          <div className="absolute inset-0 bg-gradient-to-b from-[#050708]/40 via-transparent to-[#050708]" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-5 pb-10 pt-[120px]">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.15fr]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-[550px]"
            >
              <p className="mb-3 text-[12px] uppercase tracking-[3px] text-[#dcae4d]">
                TANHO RESTAURANT
              </p>

              <h1 className="font-serif text-5xl leading-tight text-white md:text-6xl">
                Takliflar
              </h1>

              <h2 className="mt-3 text-lg font-semibold text-[#e4b654]">
                Sizning fikringiz biz uchun muhim!
              </h2>

              <p className="mt-4 max-w-[480px] text-sm leading-7 text-[#a7a7a7]">
                TANHO restoranini yanada yaxshilashda bizga yordam bering.
                O'z taklif, fikr va g'oyalaringizni biz bilan baham ko'ring.
              </p>

              <div className="my-7 flex items-center gap-2">
                <span className="h-px w-12 bg-[#8b6a2a]" />
                <span className="text-[#dcae4d]">✦</span>
                <span className="h-px w-12 bg-[#8b6a2a]" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {stats.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                      }}
                      className="group cursor-pointer rounded-xl border border-[#292929] bg-black/30 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#b88b35] hover:bg-[#b88b35]/5"
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className="mb-2 text-[#dcae4d] transition-transform duration-300 group-hover:scale-110"
                      />

                      <div className="text-xl font-semibold text-[#dcae4d]">
                        {item.value}
                      </div>

                      <p className="mt-1 text-[10px] leading-4 text-[#9d9d9d]">
                        {item.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FORM + SUGGESTIONS */}

      <section className="mx-auto max-w-[1200px] px-5 pb-10">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.08fr]">
          {/* FORM */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-[#252525] bg-[#0b0d0e] p-5 md:p-6"
          >
            <div className="mb-6">
              <h2 className="font-serif text-2xl text-white">
                Taklif yuborish
              </h2>

              <p className="mt-2 text-xs text-[#858585]">
                O'z fikringizni biz bilan baham ko'ring.
              </p>
            </div>

            <form className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs text-[#c9c9c9]">
                    To'liq ismingiz
                  </label>

                  <input
                    type="text"
                    placeholder="Ismingizni kiriting"
                    className="h-11 w-full rounded-md border border-[#292929] bg-[#080a0b] px-3 text-sm text-white outline-none transition-all placeholder:text-[#555] focus:border-[#b98b39] focus:ring-1 focus:ring-[#b98b39]/30"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-[#c9c9c9]">
                    Telefon raqamingiz
                  </label>

                  <div className="relative">
                    <Phone
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8d6b2c]"
                    />

                    <input
                      type="text"
                      placeholder="+998 XX XXX XX XX"
                      className="h-11 w-full rounded-md border border-[#292929] bg-[#080a0b] pl-9 pr-3 text-sm text-white outline-none transition-all placeholder:text-[#555] focus:border-[#b98b39] focus:ring-1 focus:ring-[#b98b39]/30"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs text-[#c9c9c9]">
                  Elektron pochta (ixtiyoriy)
                </label>

                <input
                  type="email"
                  placeholder="example@mail.com"
                  className="h-11 w-full rounded-md border border-[#292929] bg-[#080a0b] px-3 text-sm text-white outline-none transition-all placeholder:text-[#555] focus:border-[#b98b39] focus:ring-1 focus:ring-[#b98b39]/30"
                />
              </div>

              <div>
                <label className="mb-3 block text-xs text-[#c9c9c9]">
                  Taklif turi
                </label>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {offerTypes.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <button
                        type="button"
                        key={item.title}
                        className={`group flex min-h-[82px] cursor-pointer flex-col items-center justify-center rounded-md border p-2 text-center transition-all duration-300 hover:-translate-y-1 ${
                          index === 0
                            ? "border-[#b88b39] bg-[#b88b39]/10 text-[#dcae4d]"
                            : "border-[#292929] bg-[#080a0b] text-[#a4a4a4] hover:border-[#8e6b2c] hover:text-[#dcae4d]"
                        }`}
                      >
                        <Icon
                          size={22}
                          strokeWidth={1.4}
                          className="mb-2 transition-transform duration-300 group-hover:scale-110"
                        />

                        <span className="text-[10px]">
                          {item.title}
                        </span>

                        {item.text && (
                          <span className="text-[10px]">{item.text}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs text-[#c9c9c9]">
                  Sizning taklifingiz
                </label>

                <textarea
                  placeholder="O'z taklifingizni batafsil yozib qoldiring..."
                  className="h-28 w-full resize-none rounded-md border border-[#292929] bg-[#080a0b] p-3 text-sm text-white outline-none transition-all placeholder:text-[#555] focus:border-[#b98b39] focus:ring-1 focus:ring-[#b98b39]/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-[#c9c9c9]">
                  Rasm yoki fayl (ixtiyoriy)
                </label>

                <button
                  type="button"
                  className="group flex min-h-[90px] w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-[#363636] bg-[#080a0b] transition-all duration-300 hover:border-[#b88b39] hover:bg-[#b88b39]/5"
                >
                  <ImagePlus
                    size={25}
                    strokeWidth={1.4}
                    className="mb-2 text-[#dcae4d] transition-transform duration-300 group-hover:scale-110"
                  />

                  <span className="text-xs text-[#b0b0b0]">
                    Faylni bu yerga torting yoki{" "}
                    <span className="text-[#dcae4d]">tanlang</span>
                  </span>

                  <span className="mt-1 text-[10px] text-[#666]">
                    JPG, PNG, PDF (maks. 5MB)
                  </span>
                </button>
              </div>

              <label className="flex cursor-pointer items-center gap-2 text-xs text-[#a3a3a3]">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer accent-[#dcae4d]"
                />

                <span>
                  Men shaxsiy ma'lumotlarimni qayta ishlashga roziman
                </span>
              </label>

              <button
                type="submit"
                className="group flex cursor-pointer items-center justify-center gap-3 rounded-md bg-[#e1ae50] px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-1 hover:bg-[#f0bf62] hover:shadow-[0_10px_30px_rgba(225,174,80,0.18)]"
              >
                Taklifni yuborish

                <Send
                  size={16}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>
          </motion.div>

          {/* SUGGESTIONS */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-xl border border-[#252525] bg-[#0b0d0e] p-5 md:p-6"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="font-serif text-2xl text-white">
                Odamlar taklif qilgan g'oyalar
              </h2>

              <button className="group flex cursor-pointer shrink-0 items-center gap-1 text-xs text-[#dcae4d]">
                Barchasini ko'rish

                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>

            <div>
              {suggestions.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                  }}
                  className="group flex cursor-pointer gap-4 border-b border-[#242424] py-4 transition-all duration-300 last:border-b-0 hover:bg-[#111314]"
                >
                  <div className="h-[92px] w-[120px] shrink-0 overflow-hidden rounded-md">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-start justify-between gap-3">
                      <span className="rounded-sm bg-[#b88b39]/10 px-2 py-1 text-[8px] text-[#dcae4d]">
                        {item.category}
                      </span>

                      <span
                        className={`shrink-0 rounded-sm px-2 py-1 text-[8px] ${
                          item.completed
                            ? "bg-green-500/10 text-green-400"
                            : "bg-[#b88b39]/10 text-[#dcae4d]"
                        }`}
                      >
                        {item.completed ? "✓ " : "⌛ "}
                        {item.status}
                      </span>
                    </div>

                    <h3 className="truncate font-serif text-base text-white transition-colors duration-300 group-hover:text-[#dcae4d]">
                      {item.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-[10px] leading-5 text-[#898989]">
                      {item.text}
                    </p>

                    <div className="mt-2 flex items-center gap-3 text-[9px] text-[#686868]">
                      <span>{item.author}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <ChevronRight
                    size={18}
                    className="mt-10 shrink-0 text-[#6d5524] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#dcae4d]"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative min-h-[145px] overflow-hidden rounded-xl border border-[#292929]"
        >
          <img
            src={heroImg}
            alt="Tanho Restaurant"
            className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#080a0b] via-[#080a0b]/90 to-transparent" />

          <div className="relative flex h-full min-h-[145px] items-center gap-5 p-6 md:p-8">
            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#c19340] text-[#dcae4d] sm:flex">
              <MessageCircle size={32} strokeWidth={1.3} />
            </div>

            <div>
              <h2 className="font-serif text-2xl text-white md:text-3xl">
                Sizning fikringiz — bizning kelajagimiz!
              </h2>

              <p className="mt-2 max-w-[550px] text-xs leading-6 text-[#999]">
                Har bir fikr, har bir g'oya TANHO restoranini yanada yaxshi
                qilishga xizmat qiladi. Biz bilan birga bo'ling!
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* MOBILE CONTACT STRIP */}

      <section className="mx-auto max-w-[1200px] px-5 pb-10">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="group cursor-pointer rounded-lg border border-[#252525] bg-[#0b0d0e] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#8e6b2c]">
            <Paperclip
              size={19}
              className="mb-3 text-[#dcae4d] transition-transform duration-300 group-hover:rotate-12"
            />

            <h3 className="text-sm text-white">Taklif yuboring</h3>

            <p className="mt-1 text-[10px] text-[#777]">
              O'z fikringizni biz bilan baham ko'ring
            </p>
          </div>

          <div className="group cursor-pointer rounded-lg border border-[#252525] bg-[#0b0d0e] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#8e6b2c]">
            <Clock3
              size={19}
              className="mb-3 text-[#dcae4d] transition-transform duration-300 group-hover:scale-110"
            />

            <h3 className="text-sm text-white">Tezkor javob</h3>

            <p className="mt-1 text-[10px] text-[#777]">
              Takliflaringizni muntazam ko'rib chiqamiz
            </p>
          </div>

          <div className="group cursor-pointer rounded-lg border border-[#252525] bg-[#0b0d0e] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#8e6b2c]">
            <MessageCircle
              size={19}
              className="mb-3 text-[#dcae4d] transition-transform duration-300 group-hover:scale-110"
            />

            <h3 className="text-sm text-white">Biz bilan bog'laning</h3>

            <p className="mt-1 text-[10px] text-[#777]">
              Savollaringiz bo'lsa, murojaat qiling
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default EventsPage;