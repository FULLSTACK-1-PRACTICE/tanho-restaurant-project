import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  ChefHat,
  Clock,
  MapPin,
  Utensils,
} from "lucide-react";

import heroImg from "@/assets/images/Landing/Hero/Hero-Section-2.webp";
import heroTabletImg from "@/assets/images/Landing/Hero/Hero-Section-736px.webp";
import heroResponsiveImg from "@/assets/images/Landing/Hero/Hero-Section-Responsive-mobile.webp";
import Container from "../../components/ui/container/Container";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#070809] text-[#f1eee7]">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <picture className="block h-full w-full">
          <source
            media="(max-width: 639px)"
            srcSet={heroResponsiveImg}
          />

          <source
            media="(max-width: 1023px)"
            srcSet={heroTabletImg}
          />

          <img
            src={heroImg}
            alt="Tanho Restaurant"
            width={1538}
            height={1022}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover brightness-105 object-center -translate-y-[65px] lg:translate-y-0 transition-all duration-300"
          />
        </picture>

        <div className="absolute inset-0 bg-gradient-to-r from-[#070809]/80 via-[#070809]/55 to-[#070809]/15 md:from-[#070809]/75 md:via-[#070809]/45 md:to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[130px] bg-gradient-to-b from-[#070809]/70 via-[#070809]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-[#070809] via-[#070809]/60 to-transparent" />
      </div>

      <Container className="relative z-10 mx-auto max-w-[1250px] px-4 sm:px-6">
        <div className="flex min-h-[580px] items-center pt-[110px] pb-[40px] sm:min-h-[650px] sm:pt-[120px] sm:pb-[60px] md:min-h-[700px] md:pt-[140px] md:pb-[80px]">
          <div className="w-full max-w-[580px] md:max-w-[520px] lg:max-w-[580px]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dcae4d]/35 bg-[#151310]/85 px-3.5 py-1.5 backdrop-blur-md sm:mb-6">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#dcae4d]" />

              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#e3b859] sm:text-[11px] sm:tracking-[0.22em]">
                Zamonaviy Muhit & Unutilmas Ta’m
              </p>
            </div>

            <h1 className="font-serif text-[38px] font-normal leading-[1.1] tracking-tight text-[#f7f5f0] drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)] sm:text-[50px] md:text-[54px] lg:text-[66px]">
              Ta’mda tanho,
              <br />
              <span className="font-serif font-light italic text-[#dcae4d]">
                xotirada
              </span>{" "}
              abadiy
            </h1>

            <p className="mt-4 max-w-[460px] text-[13px] font-light leading-relaxed text-[#e6e4df] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:mt-5 sm:text-[15px] md:text-[14px] lg:text-[15px]">
              TANHO — mualliflik taomlari, nafis va shinam atmosfera hamda
              unutilmas onlar uchun maxsus yaratilgan restoran.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mt-7">
              <button
                type="button"
                className="group flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-md bg-[#dcae4d] px-6 py-3.5 text-[12px] font-semibold tracking-wider text-[#08090a] shadow-[0_10px_30px_rgba(220,174,77,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ebd074] hover:shadow-[0_15px_35px_rgba(220,174,77,0.4)] sm:w-auto md:px-7 md:py-3.5"
                onClick={() => navigate("/menu")}
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
                className="group flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-md border border-white/25 bg-black/50 px-6 py-3.5 text-[12px] font-medium tracking-wider text-[#f1eee7] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dcae4d]/60 hover:bg-white/[0.08] hover:text-[#dcae4d] sm:w-auto md:px-7 md:py-3.5"
                onClick={() => navigate("/reservation")}
              >
                <CalendarDays
                  size={15}
                  strokeWidth={1.8}
                  className="text-[#dcae4d]"
                />

                <span>STOL BAND QILISH</span>
              </button>
            </div>

            <div className="mt-8 flex items-center gap-4 border-t border-white/15 pt-5 sm:mt-10 sm:pt-6">
              <div className="flex -space-x-1.5">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#070809] bg-[#dcae4d]/25 text-[10px] font-bold text-[#dcae4d]"
                  >
                    ★
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-[#d6d6d0] sm:text-[12px] drop-shadow-sm">
                <span className="font-semibold text-[#f1eee7]">
                  4.6 / 4.7
                </span>{" "}
                — 1,000+ mamnun mehmonlarimiz bahosi
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 pb-8 sm:pb-12">
          <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-white/10 bg-[#0c0e10]/85 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-white/5 p-4 sm:p-5 md:p-6 transition-colors duration-300 sm:border-r sm:border-b">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg border border-[#dcae4d]/30 bg-[#dcae4d]/5 text-[#dcae4d]">
                  <ChefHat size={20} strokeWidth={1.5} className="sm:w-[22px] sm:h-[22px]" />
                </div>

                <div>
                  <h4 className="text-[12px] sm:text-[13px] font-medium text-[#f1eee7]">
                    Mualliflik menyusi
                  </h4>

                  <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] font-light text-[#888a85]">
                    Har bir ta’mda takrorlanmas san’at
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-white/5 p-4 sm:p-5 md:p-6 transition-colors duration-300 lg:border-r sm:border-b">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg border border-[#dcae4d]/30 bg-[#dcae4d]/5 text-[#dcae4d]">
                  <Utensils size={19} strokeWidth={1.5} className="sm:w-[21px] sm:h-[21px]" />
                </div>

                <div>
                  <h4 className="text-[12px] sm:text-[13px] font-medium text-[#f1eee7]">
                    Sertifikatlangan sifat
                  </h4>

                  <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] font-light text-[#888a85]">
                    Faqat saralangan va yangi ingredientlar
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-white/5 p-4 sm:p-5 md:p-6 transition-colors duration-300 sm:border-r sm:border-b-0">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg border border-[#dcae4d]/30 bg-[#dcae4d]/5 text-[#dcae4d]">
                  <Clock size={19} strokeWidth={1.5} className="sm:w-[21px] sm:h-[21px]" />
                </div>

                <div>
                  <h4 className="text-[12px] sm:text-[13px] font-medium text-[#f1eee7]">
                    Ish vaqti
                  </h4>

                  <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] font-light text-[#888a85]">
                    Har kuni: 11:00 — 23:00
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 md:p-6 transition-colors duration-300">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg border border-[#dcae4d]/30 bg-[#dcae4d]/5 text-[#dcae4d]">
                  <MapPin size={19} strokeWidth={1.5} className="sm:w-[21px] sm:h-[21px]" />
                </div>

                <div>
                  <h4 className="text-[12px] sm:text-[13px] font-medium text-[#f1eee7]">
                    Qulay joylashuv
                  </h4>

                  <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] font-light text-[#888a85]">
                    Shahar markazida, bepul avtoturargoh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;