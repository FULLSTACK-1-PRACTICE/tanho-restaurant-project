import {
  CalendarDays,
  Clock3,
  MapPin,
  Navigation,
  Phone,
  Send,
  Users,
} from "lucide-react";

function LocationSection() {
  const mapUrl = "https://maps.google.com/?q=Tanho+restaurant+Qarshi";

  return (
    <section className="w-full bg-[#050708] py-8 text-[#f1eee7]">
      <div className="mx-auto max-w-[1240px] px-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.35fr_1fr]">
          
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
                bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop')]
                bg-cover bg-center
                opacity-25
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
                  type="button"
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
                  type="button"
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
                  type="button"
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

              <p className="mt-5 text-sm text-[#c7c7c7]">
                Yoki qo‘ng‘iroq qiling:
                <a
                  href="tel:+998911234567"
                  className="ml-2 font-medium text-white transition hover:text-[#dcae45]"
                >
                  +998 91 123 45 67
                </a>
              </p>
            </div>
          </div>

          <div
            className="
              rounded-xl border border-[#25282a]
              bg-[#0a0c0d] p-7
              shadow-[0_15px_45px_rgba(0,0,0,0.35)]
            "
          >
            <h2 className="font-serif text-3xl text-white">Aloqa</h2>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[1fr_1.1fr]">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={18} className="text-[#dcae45]" />
                  <a href="tel:+998911234567" className="hover:underline">
                    +998 91 123 45 67
                  </a>
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

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    aria-label="Instagram"
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
                    type="button"
                    aria-label="Telegram"
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
                    type="button"
                    aria-label="Facebook"
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

              <div
                className="
                  relative min-h-[190px] overflow-hidden rounded-lg
                  border border-[#282b2d] bg-[#0d0f10]
                "
              >
                <iframe
                  title="Tanho Restaurant Qarshi Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.8824169728!2d65.7925!3d38.8350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDUwJzA2LjAiTiA2NcKwNDcnMzMuMCJF!5e0!3m2!1suz!2s!4v1700000000000!5m2!1suz!2s"
                  className="absolute inset-0 h-full w-full border-0 opacity-60 grayscale contrast-125 invert-[0.9] transition-opacity duration-300 hover:opacity-90"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex w-full cursor-pointer items-center justify-center
                      gap-2 rounded-lg border border-[#393b3c]
                      bg-[#090b0ce6] px-3 py-2
                      text-xs text-[#ddd]
                      backdrop-blur-md
                      transition-all duration-300
                      hover:border-[#dcae45] hover:bg-[#050708]
                      hover:text-[#dcae45]
                    "
                  >
                    <Navigation size={14} />
                    Lokatsiyani ko‘rish
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default LocationSection;