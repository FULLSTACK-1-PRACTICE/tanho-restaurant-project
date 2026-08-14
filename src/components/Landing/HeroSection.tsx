import {
  ArrowRight,
  CalendarDays,
  ChefHat,
  Clock,
  MapPin,
  Utensils,
} from "lucide-react";

import heroImg from "../../assets/images/kereman-uchirmengMani-brat.jpeg";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#070809] text-[#f1eee7]">
      <div className="absolute inset-x-0 top-[72px] h-[640px] overflow-hidden">
        <img
          src={heroImg}
          alt="Tanho Restaurant"
          className="h-full w-full scale-105 object-cover object-center transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070809] via-[#070809]/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[140px] bg-gradient-to-b from-[#070809] via-[#070809]/50 to-transparent backdrop-blur-[1px]" />
        <div className="absolute inset-x-0 bottom-0 h-[220px] bg-gradient-to-t from-[#070809] via-[#070809]/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1250px] px-6">
        <div className="flex min-h-[680px] items-center pt-[92px] pb-[70px]">
          <div className="max-w-[580px]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dcae4d]/20 bg-[#dcae4d]/10 px-3.5 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#dcae4d]" />
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#e3b859]">
                Zamonaviy Muhit & Premium Gastronomiya
              </p>
            </div>

            <h1 className="font-serif text-[46px] font-normal leading-[1.08] tracking-tight text-[#f7f5f0] sm:text-[58px] lg:text-[66px]">
              Ta’mda tanho,
              <br />
              <span className="font-serif font-light italic text-[#dcae4d]">
                xotirada
              </span>{" "}
              abadiy
            </h1>

            <p className="mt-6 max-w-[460px] text-[15px] font-light leading-relaxed text-[#a8a8a2]">
              TANHO — mualliflik taomlari, nafis va shinam atmosfera hamda unutilmas onlar uchun maxsus yaratilgan restoran.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="group relative flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-md bg-[#dcae4d] px-7 py-3.5 text-[12px] font-semibold tracking-wider text-[#08090a] shadow-[0_10px_30px_rgba(220,174,77,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ebd074] hover:shadow-[0_15px_35px_rgba(220,174,77,0.35)] active:translate-y-0"
              >
                <span>MENYUNI KO‘RISH</span>
                <ArrowRight
                  size={15}
                  strokeWidth={2.2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                className="group flex cursor-pointer items-center gap-2.5 rounded-md border border-white/15 bg-white/[0.03] px-7 py-3.5 text-[12px] font-medium tracking-wider text-[#f1eee7] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dcae4d]/60 hover:bg-white/[0.08] hover:text-[#dcae4d] active:translate-y-0"
              >
                <CalendarDays
                  size={15}
                  strokeWidth={1.8}
                  className="text-[#dcae4d] transition-transform duration-300 group-hover:scale-110"
                />
                <span>STOL BAND QILISH</span>
              </button>
            </div>

            <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6">
              <div className="flex -space-x-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#070809] bg-[#dcae4d]/20 text-[10px] font-bold text-[#dcae4d]">
                  ★
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#070809] bg-[#dcae4d]/20 text-[10px] font-bold text-[#dcae4d]">
                  ★
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#070809] bg-[#dcae4d]/20 text-[10px] font-bold text-[#dcae4d]">
                  ★
                </div>
              </div>
              <div className="text-[12px] text-[#90928e]">
                <span className="font-semibold text-[#f1eee7]">4.9 / 5.0</span> — 1,200+ mamnun mehmonlarimiz bahosi
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 pb-12">
          <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-white/10 bg-[#0c0e10]/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4">
            <div className="group cursor-pointer border-b border-white/5 p-6 transition-colors duration-300 hover:bg-white/[0.03] sm:border-r lg:border-b-0">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#dcae4d]/30 bg-[#dcae4d]/5 text-[#dcae4d] transition-all duration-300 group-hover:border-[#dcae4d] group-hover:bg-[#dcae4d] group-hover:text-[#08090a]">
                  <ChefHat size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[13px] font-medium text-[#f1eee7] transition-colors group-hover:text-[#dcae4d]">
                    Mualliflik menyusi
                  </h4>
                  <p className="mt-1 text-[11px] font-light text-[#888a85]">
                    Har bir ta’mda takrorlanmas san’at
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer border-b border-white/5 p-6 transition-colors duration-300 hover:bg-white/[0.03] sm:border-r lg:border-b-0">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#dcae4d]/30 bg-[#dcae4d]/5 text-[#dcae4d] transition-all duration-300 group-hover:border-[#dcae4d] group-hover:bg-[#dcae4d] group-hover:text-[#08090a]">
                  <Utensils size={21} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[13px] font-medium text-[#f1eee7] transition-colors group-hover:text-[#dcae4d]">
                    Sertifikatlangan sifat
                  </h4>
                  <p className="mt-1 text-[11px] font-light text-[#888a85]">
                    Faqat saralangan va yangi ingredientlar
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer border-b border-white/5 p-6 transition-colors duration-300 hover:bg-white/[0.03] sm:border-r lg:border-b-0">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#dcae4d]/30 bg-[#dcae4d]/5 text-[#dcae4d] transition-all duration-300 group-hover:border-[#dcae4d] group-hover:bg-[#dcae4d] group-hover:text-[#08090a]">
                  <Clock size={21} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[13px] font-medium text-[#f1eee7] transition-colors group-hover:text-[#dcae4d]">
                    Ish vaqti
                  </h4>
                  <p className="mt-1 text-[11px] font-light text-[#888a85]">
                    Har kuni: 11:00 — 23:00
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer p-6 transition-colors duration-300 hover:bg-white/[0.03]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#dcae4d]/30 bg-[#dcae4d]/5 text-[#dcae4d] transition-all duration-300 group-hover:border-[#dcae4d] group-hover:bg-[#dcae4d] group-hover:text-[#08090a]">
                  <MapPin size={21} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[13px] font-medium text-[#f1eee7] transition-colors group-hover:text-[#dcae4d]">
                    Qulay joylashuv
                  </h4>
                  <p className="mt-1 text-[11px] font-light text-[#888a85]">
                    Shahar markazida, bepul avtoturargoh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;