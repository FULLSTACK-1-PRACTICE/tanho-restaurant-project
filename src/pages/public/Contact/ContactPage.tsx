import {
  Camera,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
} from "lucide-react";

import { motion } from "framer-motion";

function ContactPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#050505] text-white"
    >
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#252525]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/70" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />

          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-[url('/src/assets/images/heroimg.png')] bg-cover bg-center opacity-30"
          />
        </div>

        <div className="relative mx-auto flex min-h-[440px] max-w-[1200px] items-center px-5 py-28">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-[560px]"
          >
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-3 text-sm font-medium uppercase tracking-[3px] text-[#dcae4d]"
            >
              TANHO RESTAURANT
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-serif text-5xl leading-tight text-white md:text-6xl"
            >
              Biz bilan bog'laning
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 max-w-[500px] text-sm leading-7 text-gray-400"
            >
              Savollaringiz, takliflaringiz yoki stol band qilish uchun
              biz bilan bog'laning. Sizni TANHO restoranida kutamiz.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <motion.a
                href="#contact-form"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group flex cursor-pointer items-center gap-2 rounded-md bg-[#dcae4d] px-6 py-3 text-sm font-medium text-black shadow-[0_10px_30px_rgba(220,174,77,0.08)] transition-all duration-300 hover:bg-[#f0c568] hover:shadow-[0_15px_35px_rgba(220,174,77,0.18)]"
              >
                Bog'lanish

                <Send
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.a>

              <motion.a
                href="tel:+998911234567"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex cursor-pointer items-center gap-2 rounded-md border border-[#5b471f] px-6 py-3 text-sm text-[#dcae4d] transition-all duration-300 hover:border-[#dcae4d] hover:bg-[#dcae4d]/10"
              >
                <Phone size={16} />

                Qo'ng'iroq qilish
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="mx-auto max-w-[1200px] px-5 py-14">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* FORM */}
          <motion.div
            id="contact-form"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            className="rounded-xl border border-[#292929] bg-[#0b0b0b] p-6 transition-all duration-300 hover:border-[#4a3b20] md:p-8"
          >
            <div className="mb-8">
              <h2 className="font-serif text-3xl">
                Xabar yuborish
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Savolingiz yoki taklifingizni qoldiring.
                Tez orada siz bilan bog'lanamiz.
              </p>
            </div>

            <form className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs text-gray-400">
                    Ismingiz
                  </label>

                  <input
                    type="text"
                    placeholder="Ismingizni kiriting"
                    className="w-full rounded-md border border-[#292929] bg-[#101010] px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-[#dcae4d] focus:bg-[#121212] focus:shadow-[0_0_0_3px_rgba(220,174,77,0.06)]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-gray-400">
                    Telefon raqamingiz
                  </label>

                  <input
                    type="tel"
                    placeholder="+998 XX XXX XX XX"
                    className="w-full rounded-md border border-[#292929] bg-[#101010] px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-[#dcae4d] focus:bg-[#121212] focus:shadow-[0_0_0_3px_rgba(220,174,77,0.06)]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs text-gray-400">
                  Elektron pochta
                </label>

                <input
                  type="email"
                  placeholder="example@mail.com"
                  className="w-full rounded-md border border-[#292929] bg-[#101010] px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-[#dcae4d] focus:bg-[#121212] focus:shadow-[0_0_0_3px_rgba(220,174,77,0.06)]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-gray-400">
                  Mavzu
                </label>

                <div className="relative">
                  <select className="w-full cursor-pointer appearance-none rounded-md border border-[#292929] bg-[#101010] px-4 py-3 text-sm text-gray-300 outline-none transition-all duration-300 focus:border-[#dcae4d]">
                    <option>Umumiy savol</option>
                    <option>Stol band qilish</option>
                    <option>Tadbirlar</option>
                    <option>Taklif va fikrlar</option>
                    <option>Boshqa</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#dcae4d]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs text-gray-400">
                  Xabaringiz
                </label>

                <textarea
                  rows={6}
                  placeholder="Xabaringizni yozing..."
                  className="w-full resize-none rounded-md border border-[#292929] bg-[#101010] px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-[#dcae4d] focus:bg-[#121212] focus:shadow-[0_0_0_3px_rgba(220,174,77,0.06)]"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                className="group flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#dcae4d] px-7 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-[#f0c568] hover:shadow-[0_12px_30px_rgba(220,174,77,0.18)]"
              >
                Xabar yuborish

                <Send
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.button>
            </form>
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-[#292929] bg-[#0b0b0b] p-6 transition-all duration-300 hover:border-[#4a3b20] md:p-8">
              <h2 className="font-serif text-3xl">
                Aloqa
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Biz bilan bog'lanish uchun quyidagi ma'lumotlardan
                foydalanishingiz mumkin.
              </p>

              <div className="mt-8 space-y-4">
                {/* PHONE */}
                <motion.a
                  href="tel:+998911234567"
                  whileHover={{ x: 5 }}
                  className="group flex cursor-pointer items-start gap-4 rounded-lg border border-transparent p-3 transition-all duration-300 hover:border-[#3b3019] hover:bg-[#dcae4d]/5"
                >
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#5a451d] text-[#dcae4d] transition-all duration-300 group-hover:bg-[#dcae4d] group-hover:text-black"
                  >
                    <Phone size={18} />
                  </motion.div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Telefon
                    </p>

                    <p className="mt-1 text-sm text-white">
                      +998 91 123 45 67
                    </p>
                  </div>
                </motion.a>

                {/* EMAIL */}
                <motion.a
                  href="mailto:info@tanho.uz"
                  whileHover={{ x: 5 }}
                  className="group flex cursor-pointer items-start gap-4 rounded-lg border border-transparent p-3 transition-all duration-300 hover:border-[#3b3019] hover:bg-[#dcae4d]/5"
                >
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.08 }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#5a451d] text-[#dcae4d] transition-all duration-300 group-hover:bg-[#dcae4d] group-hover:text-black"
                  >
                    <Mail size={18} />
                  </motion.div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Elektron pochta
                    </p>

                    <p className="mt-1 text-sm text-white">
                      info@tanho.uz
                    </p>
                  </div>
                </motion.a>

                {/* ADDRESS */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="group flex cursor-pointer items-start gap-4 rounded-lg border border-transparent p-3 transition-all duration-300 hover:border-[#3b3019] hover:bg-[#dcae4d]/5"
                >
                  <motion.div
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#5a451d] text-[#dcae4d] transition-all duration-300 group-hover:bg-[#dcae4d] group-hover:text-black"
                  >
                    <MapPin size={18} />
                  </motion.div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Manzil
                    </p>

                    <p className="mt-1 text-sm leading-6 text-white">
                      Qarshi shahri,
                      <br />
                      Alisher Navoiy ko'chasi 15
                    </p>
                  </div>
                </motion.div>

                {/* TIME */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="group flex cursor-pointer items-start gap-4 rounded-lg border border-transparent p-3 transition-all duration-300 hover:border-[#3b3019] hover:bg-[#dcae4d]/5"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.08 }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#5a451d] text-[#dcae4d] transition-all duration-300 group-hover:bg-[#dcae4d] group-hover:text-black"
                  >
                    <Clock3 size={18} />
                  </motion.div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Ish vaqti
                    </p>

                    <p className="mt-1 text-sm text-white">
                      Dushanba — Yakshanba
                    </p>

                    <p className="mt-1 text-sm text-[#dcae4d]">
                      10:00 — 23:00
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* SOCIAL */}
              <div className="mt-7 border-t border-[#252525] pt-6">
                <p className="mb-3 text-xs text-gray-500">
                  Bizni ijtimoiy tarmoqlarda kuzating
                </p>

                <div className="flex gap-3">
                  <motion.a
                    href="#"
                    whileHover={{ y: -5, rotate: -5, scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#3b3019] text-[#dcae4d] transition-all duration-300 hover:bg-[#dcae4d] hover:text-black"
                  >
                    <Camera size={17} />
                  </motion.a>

                  <motion.a
                    href="#"
                    whileHover={{ y: -5, rotate: 5, scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#3b3019] text-[#dcae4d] transition-all duration-300 hover:bg-[#dcae4d] hover:text-black"
                  >
                    <Send size={17} />
                  </motion.a>
                </div>
              </div>
            </div>

            {/* MAP */}
            <motion.div
              whileHover={{ y: -4 }}
              className="overflow-hidden rounded-xl border border-[#292929] bg-[#0b0b0b] transition-all duration-300 hover:border-[#4a3b20]"
            >
              <div className="relative h-[300px] bg-[#111]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#292929_1px,transparent_1px)] bg-[size:25px_25px] opacity-40" />

                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.08, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#dcae4d] bg-[#dcae4d]/10 text-[#dcae4d] shadow-[0_0_35px_rgba(220,174,77,0.15)]"
                    >
                      <MapPin size={25} />
                    </motion.div>

                    <h3 className="mt-4 font-serif text-xl">
                      TANHO Restaurant
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Qarshi shahri
                    </p>

                    <motion.button
                      whileHover={{ y: -3, scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 flex cursor-pointer items-center gap-2 rounded-md border border-[#5b471f] px-4 py-2 text-xs text-[#dcae4d] transition-all duration-300 hover:bg-[#dcae4d] hover:text-black"
                    >
                      <Navigation size={14} />
                      Yo'nalish olish
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1200px] px-5 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-xl border border-[#292929] bg-[#0b0b0b] p-8 transition-all duration-300 hover:border-[#4a3b20] md:p-12"
        >
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#dcae4d]/10 to-transparent" />

          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-start gap-5">
              <motion.div
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#5b471f] text-[#dcae4d]"
              >
                <MessageCircle size={25} />
              </motion.div>

              <div>
                <h2 className="font-serif text-2xl md:text-3xl">
                  Sizni TANHO restoranida kutamiz!
                </h2>

                <p className="mt-2 max-w-[550px] text-sm leading-6 text-gray-500">
                  Mazali taomlar, yoqimli muhit va unutilmas
                  taassurotlar siz uchun tayyor.
                </p>
              </div>
            </div>

            <motion.a
              href="tel:+998911234567"
              whileHover={{ y: -5, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="group flex cursor-pointer items-center gap-2 rounded-md bg-[#dcae4d] px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-[#f0c568] hover:shadow-[0_12px_30px_rgba(220,174,77,0.2)]"
            >
              Bog'lanish

              <Phone
                size={16}
                className="transition-transform duration-300 group-hover:rotate-6"
              />
            </motion.a>
          </div>
        </motion.div>
      </section>
    </motion.main>
  );
}

export default ContactPage;