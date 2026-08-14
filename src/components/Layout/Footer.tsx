import {
  CalendarDays,
  Clock3,
  MapPin,
  Navigation,
  Phone,
  Send,
  Star,
  Users,
} from "lucide-react";

const reviews = [
  {
    name: "Dilnoza Karimova",
    initials: "DK",
    text: "Taomlar juda mazali, muhit esa a’lo darajada. Albatta, yana qaytaman.",
  },
  {
    name: "Sardorbek M.",
    initials: "SM",
    text: "Xizmat a’lo darajada, oshpazlarga alohida rahmat! Taomlar juda mazali.",
  },
  {
    name: "Aziza Saydullaeva",
    initials: "AS",
    text: "Eng sevimli restoranlarimdan biri. Hamma uchun tavsiya qilaman!",
  },
];

function Footer() {
  return (
    <footer className="bg-[#050708] text-[#f1eee7]">
      <div className="mx-auto max-w-[1400px] px-5 py-10">

        {/* STOL BAND QILISH + ALOQA */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.35fr_1fr]">

          {/* STOL BAND QILISH */}
          <div
            className="
              relative overflow-hidden rounded-xl border border-[#25282a]
              bg-[#0a0c0d] p-7
              shadow-[0_15px_45px_rgba(0,0,0,0.35)]
            "
          >
            <div
              className="
                absolute inset-0
                bg-[url('/images/restaurant.jpg')]
                bg-cover bg-center
                opacity-30
              "
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#080a0b] via-[#080a0bcc] to-[#080a0b55]" />

            <div className="relative z-10">
              <h2 className="font-serif text-3xl text-white">
                Stol band qilish
              </h2>

              <p className="mt-2 text-sm text-[#a9a9a9]">
                Oldindan band qiling va eng yaxshi joyni tanlang.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  className="
                    flex cursor-pointer items-center gap-2 rounded-lg
                    border border-[#292c2e] bg-[#111416]
                    px-4 py-3 text-sm text-[#ddd]
                    transition-all duration-300
                    hover:-translate-y-1 hover:border-[#dcae45]
                    hover:bg-[#151719]
                    hover:shadow-[0_8px_25px_rgba(220,174,69,0.12)]
                  "
                >
                  <CalendarDays size={17} className="text-[#dcae45]" />
                  Sana tanlang
                </button>

                <button
                  className="
                    flex cursor-pointer items-center gap-2 rounded-lg
                    border border-[#292c2e] bg-[#111416]
                    px-4 py-3 text-sm text-[#ddd]
                    transition-all duration-300
                    hover:-translate-y-1 hover:border-[#dcae45]
                    hover:bg-[#151719]
                    hover:shadow-[0_8px_25px_rgba(220,174,69,0.12)]
                  "
                >
                  <Clock3 size={17} className="text-[#dcae45]" />
                  Vaqt tanlang
                </button>

                <button
                  className="
                    flex cursor-pointer items-center gap-2 rounded-lg
                    border border-[#292c2e] bg-[#111416]
                    px-4 py-3 text-sm text-[#ddd]
                    transition-all duration-300
                    hover:-translate-y-1 hover:border-[#dcae45]
                    hover:bg-[#151719]
                    hover:shadow-[0_8px_25px_rgba(220,174,69,0.12)]
                  "
                >
                  <Users size={17} className="text-[#dcae45]" />
                  Odamlar soni
                </button>
              </div>

              <button
                className="
                  mt-5 cursor-pointer rounded-lg
                  bg-[#e4b44f] px-7 py-3
                  font-medium text-[#111]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-[#f0c261]
                  hover:shadow-[0_10px_30px_rgba(228,180,79,0.25)]
                "
              >
                Stol band qilish
              </button>

              <p className="mt-5 text-sm text-[#c7c7c7]">
                Yoki qo‘ng‘iroq qiling:
                <span className="ml-2 font-medium text-white">
                  +998 91 123 45 67
                </span>
              </p>
            </div>
          </div>

          {/* ALOQA */}
          <div
            className="
              rounded-xl border border-[#25282a]
              bg-[#0a0c0d] p-7
              shadow-[0_15px_45px_rgba(0,0,0,0.35)]
            "
          >
            <h2 className="font-serif text-3xl text-white">
              Aloqa
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[1fr_1.1fr]">

              <div className="space-y-4">

                <div className="flex items-center gap-3 text-sm">
                  <Phone size={18} className="text-[#dcae45]" />
                  <span>+998 91 123 45 67</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Send size={18} className="text-[#dcae45]" />
                  <span>info@tanho.uz</span>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-[#dcae45]"
                  />
                  <span>
                    Qarshi shahri,
                    <br />
                    Alisher Navoiy ko‘chasi 15
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Clock3 size={18} className="text-[#dcae45]" />
                  <span>Har kuni 10:00 — 23:00</span>
                </div>

                {/* SOCIAL */}
                <div className="flex gap-3 pt-1">
                  <button
                    className="
                      flex h-9 w-9 cursor-pointer items-center justify-center
                      rounded-full border border-[#303235]
                      text-sm font-semibold text-[#ddd]
                      transition-all duration-300
                      hover:-translate-y-1 hover:border-[#dcae45]
                      hover:bg-[#dcae4515] hover:text-[#dcae45]
                    "
                  >
                    ig
                  </button>

                  <button
                    className="
                      flex h-9 w-9 cursor-pointer items-center justify-center
                      rounded-full border border-[#303235]
                      text-sm font-semibold text-[#ddd]
                      transition-all duration-300
                      hover:-translate-y-1 hover:border-[#dcae45]
                      hover:bg-[#dcae4515] hover:text-[#dcae45]
                    "
                  >
                    <Send size={15} />
                  </button>

                  <button
                    className="
                      flex h-9 w-9 cursor-pointer items-center justify-center
                      rounded-full border border-[#303235]
                      text-sm font-semibold text-[#ddd]
                      transition-all duration-300
                      hover:-translate-y-1 hover:border-[#dcae45]
                      hover:bg-[#dcae4515] hover:text-[#dcae45]
                    "
                  >
                    f
                  </button>
                </div>
              </div>

              {/* LOCATION */}
              <div
                className="
                  relative min-h-[190px] overflow-hidden rounded-lg
                  border border-[#282b2d]
                  bg-[#0d0f10]
                "
              >
                <div
                  className="
                    absolute inset-0
                    bg-[radial-gradient(circle_at_50%_50%,rgba(220,174,69,0.08),transparent_55%)]
                  "
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="
                      relative flex h-12 w-12 items-center justify-center
                      rounded-full bg-[#e0af43]
                      shadow-[0_0_35px_rgba(224,175,67,0.35)]
                    "
                  >
                    <MapPin
                      size={27}
                      className="text-[#171717]"
                      fill="currentColor"
                    />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <button
                    className="
                      flex w-full cursor-pointer items-center justify-center
                      gap-2 rounded-lg border border-[#393b3c]
                      bg-[#090b0ccc] px-3 py-2
                      text-xs text-[#ddd]
                      backdrop-blur-sm
                      transition-all duration-300
                      hover:border-[#dcae45]
                      hover:text-[#dcae45]
                    "
                  >
                    <Navigation size={14} />
                    Lokatsiyani ko‘rish
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* MIJOZLAR */}
        <section className="mt-7">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-3xl text-white">
              Mijozlarimiz nima dedi?
            </h2>

            <button
              className="
                cursor-pointer text-sm text-[#dcae45]
                transition-colors duration-300
                hover:text-[#f2c96c]
              "
            >
              Barchasini ko‘rish →
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="
                  rounded-xl border border-[#242729]
                  bg-[#090b0c] p-5
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#4b3b1d]
                  hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)]
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-11 w-11 items-center justify-center
                      rounded-full bg-[#17191a]
                      text-sm font-medium text-[#dcae45]
                    "
                  >
                    {review.initials}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-white">
                      {review.name}
                    </h3>

                    <div className="mt-1 flex gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={12}
                          className="text-[#e3b34f]"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-[#a9a9a9]">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER LINKS */}
      <div className="border-t border-[#202325]">
        <div
          className="
            mx-auto grid max-w-[1400px]
            grid-cols-1 gap-8 px-5 py-9
            sm:grid-cols-2 lg:grid-cols-5
          "
        >
          {/* LOGO */}
          <div>
            <h2 className="font-serif text-3xl tracking-wide text-[#dcae45]">
              TANHO
            </h2>

            <p className="mt-1 text-[8px] tracking-[5px] text-[#dcae45]">
              RESTAURANT
            </p>

            <p className="mt-4 max-w-[250px] text-sm leading-6 text-[#888]">
              Tanho restorani — mazali taomlar,
              yoqimli muhit va siz uchun yaratilgan
              ajoyib xizmat.
            </p>
          </div>

          {/* MENU */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-[#dcae45]">
              Menyu
            </h3>

            <div className="space-y-2 text-sm text-[#777]">
              <p className="cursor-pointer transition hover:text-[#dcae45]">
                Bosh sahifa
              </p>
              <p className="cursor-pointer transition hover:text-[#dcae45]">
                Menyu
              </p>
              <p className="cursor-pointer transition hover:text-[#dcae45]">
                Biz haqimizda
              </p>
              <p className="cursor-pointer transition hover:text-[#dcae45]">
                Tadbirlar
              </p>
              <p className="cursor-pointer transition hover:text-[#dcae45]">
                Yangiliklar
              </p>
            </div>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-[#dcae45]">
              Menyu kategoriyalar
            </h3>

            <div className="space-y-2 text-sm text-[#777]">
              <p className="cursor-pointer transition hover:text-[#dcae45]">
                Salatlar
              </p>
              <p className="cursor-pointer transition hover:text-[#dcae45]">
                Issiq taomlar
              </p>
              <p className="cursor-pointer transition hover:text-[#dcae45]">
                Milliy taomlar
              </p>
              <p className="cursor-pointer transition hover:text-[#dcae45]">
                Shashliklar
              </p>
              <p className="cursor-pointer transition hover:text-[#dcae45]">
                Ichimliklar
              </p>
              <p className="cursor-pointer transition hover:text-[#dcae45]">
                Desertlar
              </p>
            </div>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-[#dcae45]">
              Foydali havolalar
            </h3>

            <div className="space-y-2 text-sm text-[#777]">
              <p className="cursor-pointer transition hover:text-[#dcae45]">
                Stol band qilish
              </p>
              <p className="cursor-pointer transition hover:text-[#dcae45]">
                Maxsus takliflar
              </p>
              <p className="cursor-pointer transition hover:text-[#dcae45]">
                Korporativ xizmat
              </p>
              <p className="cursor-pointer transition hover:text-[#dcae45]">
                Yetkazib berish
              </p>
              <p className="cursor-pointer transition hover:text-[#dcae45]">
                Qoidalar
              </p>
            </div>
          </div>

          {/* WORK TIME */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-[#dcae45]">
              Ish vaqti
            </h3>

            <p className="text-sm text-[#777]">
              Dushanba – Yakshanba
            </p>

            <div
              className="
                mt-4 inline-flex cursor-default
                rounded-lg border border-[#5a4721]
                px-5 py-3 text-lg
                text-[#e4b44f]
              "
            >
              10:00 — 23:00
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-[#202325]">
          <div
            className="
              mx-auto flex max-w-[1400px]
              flex-col gap-3 px-5 py-5
              text-xs text-[#666]
              sm:flex-row sm:items-center sm:justify-between
            "
          >
            <span>
              © 2024 Tanho Restaurant. Barcha huquqlar himoyalangan.
            </span>

            <span>
              Designed with ♡ for our guests
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;