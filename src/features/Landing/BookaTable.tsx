import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Navigation,
  Phone,
  PhoneCall,
  Users,
} from "lucide-react";

function LocationSection() {
  const mapUrl = "https://maps.google.com/?q=Tanho+restaurant+Qarshi";

  return (
    <section className="w-full bg-[#050708] py-8 text-[#f1eee7]">
      <div className="mx-auto max-w-[1240px] px-5">
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.35fr_1fr]">
          <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#25282a] bg-[#0a0c0d] p-7 shadow-[0_15px_45px_rgba(0,0,0,0.35)]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080a0b] via-[#080a0bcc] to-[#080a0b55]" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <h2 className="font-serif text-3xl text-white">
                  Stol band qilish
                </h2>
                <p className="mt-2 text-sm text-[#a9a9a9]">
                  Oldindan band qiling va eng yaxshi joyni tanlang.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/reservation"
                    className="flex items-center gap-2 rounded-lg border border-[#292c2e] bg-[#111416] px-4 py-2.5 text-sm text-[#ddd] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dcae45] hover:bg-[#151719] hover:text-[#dcae45] hover:shadow-[0_8px_25px_rgba(220,174,69,0.12)]"
                  >
                    <CalendarDays size={17} className="text-[#dcae45]" />
                    <span>Sana tanlang</span>
                  </Link>

                  <Link
                    to="/reservation"
                    className="flex items-center gap-2 rounded-lg border border-[#292c2e] bg-[#111416] px-4 py-2.5 text-sm text-[#ddd] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dcae45] hover:bg-[#151719] hover:text-[#dcae45] hover:shadow-[0_8px_25px_rgba(220,174,69,0.12)]"
                  >
                    <Clock3 size={17} className="text-[#dcae45]" />
                    <span>Vaqt tanlang</span>
                  </Link>

                  <Link
                    to="/reservation"
                    className="flex items-center gap-2 rounded-lg border border-[#292c2e] bg-[#111416] px-4 py-2.5 text-sm text-[#ddd] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dcae45] hover:bg-[#151719] hover:text-[#dcae45] hover:shadow-[0_8px_25px_rgba(220,174,69,0.12)]"
                  >
                    <Users size={17} className="text-[#dcae45]" />
                    <span>Odamlar soni</span>
                  </Link>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  to="/reservation"
                  className="inline-flex items-center justify-center rounded-lg border border-[#dcae45] bg-[#dcae45] px-6 py-3 text-sm font-semibold text-[#0a0c0d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#eac059] hover:shadow-[0_8px_25px_rgba(220,174,69,0.25)]"
                >
                  Stol band qilish
                </Link>

                <p className="text-sm text-[#c7c7c7]">
                  Yoki qo‘ng‘iroq qiling:
                  <a
                    href="tel:+998987760093"
                    className="ml-2 font-medium text-white transition-colors duration-200 hover:text-[#DCAE45]"
                  >
                    +998 98 776 00 93
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-[#25282a] bg-[#0a0c0d] p-7 shadow-[0_15px_45px_rgba(0,0,0,0.35)]">
            <h2 className="font-serif text-3xl text-white">Aloqa</h2>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[1fr_1.1fr]">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={18} className="text-[#dcae45]" />
                  <a
                    href="tel:+998987760093"
                    className="transition-colors duration-200 hover:text-[#DCAE45]"
                  >
                    +998 98 776 00 93
                  </a>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <PhoneCall size={18} className="text-[#dcae45]" />
                  <a
                    href="tel:+998982220093"
                    className="transition-colors duration-200 hover:text-[#DCAE45]"
                  >
                    +998 98 222 00 93
                  </a>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-[#dcae45]"
                  />
                  <span className="transition-colors duration-200 hover:text-[#DCAE45]">
                    Qarshi shahri,
                    <br />
                    Alisher Navoiy ko‘chasi 15
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Clock3 size={18} className="text-[#dcae45]" />
                  <span className="transition-colors duration-200 hover:text-[#DCAE45]">
                    Har kuni 09:30 — 23:00
                  </span>
                </div>

                <div className="pt-1">
                  <a
                    href="https://www.instagram.com/tanho_restorani?igsi=MWUzbDV4OG5jb3M0bA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-lg border border-[#303235] bg-[#111416] px-3.5 py-2 text-xs text-[#ddd] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#DCAE45] hover:bg-[#151719] hover:text-[#DCAE45]"
                  >
                    <svg
                      className="h-4 w-4 fill-current text-[#dcae45]"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>Instagram'da kuzating</span>
                  </a>
                </div>
              </div>

              <div className="relative min-h-[190px] overflow-hidden rounded-lg border border-[#282b2d] bg-[#0d0f10]">
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
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#393b3c] bg-[#090b0ce6] px-3 py-2 text-xs text-[#ddd] backdrop-blur-md transition-all duration-300 hover:border-[#DCAE45] hover:bg-[#050708] hover:text-[#DCAE45]"
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