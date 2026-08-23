import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  ChefHat,
  Clock,
  MapPin,
  Utensils,
} from "lucide-react";

import heroImg from "@/assets/images/Landing/Hero/Hero-Section-2.png";
import Container from "../../components/ui/container/Container";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#070809] text-[#f1eee7]">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroImg}
          alt="Tanho Restaurant"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#070809]/95 via-[#070809]/70 to-[#070809]/10" />
        <div className="absolute inset-x-0 top-0 h-[180px] bg-gradient-to-b from-[#070809]/90 via-[#070809]/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[320px] bg-gradient-to-t from-[#070809] via-[#070809]/75 to-transparent" />
      </div>

      <Container className="relative z-10 mx-auto max-w-[1250px] px-6">
        <div className="flex min-h-[720px] items-center pt-[100px] pb-[80px] sm:pt-[120px] sm:pb-[100px]">
          <div className="max-w-[580px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dcae4d]/30 bg-[#151310]/70 px-3.5 py-1.5 backdrop-blur-md sm:mb-6">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#dcae4d]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#e3b859] sm:text-[11px] sm:tracking-[0.22em]">
                Zamonaviy Muhit & Unutilmas Ta’m
              </p>
            </div>

            <h1 className="font-serif text-[42px] font-normal leading-[1.08] tracking-tight text-[#f7f5f0] sm:text-[58px] lg:text-[66px]">
              Ta’mda tanho,
              <br />
              <span className="font-serif font-light italic text-[#dcae4d]">
                xotirada
              </span>{" "}
              abadiy
            </h1>

            <p className="mt-5 max-w-[460px] text-[14px] font-light leading-relaxed text-[#c1c1bc] sm:mt-6 sm:text-[15px]">
              TANHO — mualliflik taomlari, nafis va shinam atmosfera hamda
              unutilmas onlar uchun maxsus yaratilgan restoran.
            </p>

            <div className="mt-8 flex flex-col gap-3.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <button
                type="button"
                className="group flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-md bg-[#dcae4d] px-7 py-4 text-[12px] font-semibold tracking-wider text-[#08090a] shadow-[0_10px_30px_rgba(220,174,77,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ebd074] hover:shadow-[0_15px_35px_rgba(220,174,77,0.35)] sm:w-auto sm:py-3.5"
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
                className="group flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-md border border-white/20 bg-black/20 px-7 py-4 text-[12px] font-medium tracking-wider text-[#f1eee7] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dcae4d]/60 hover:bg-white/[0.08] hover:text-[#dcae4d] sm:w-auto sm:py-3.5"
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

            <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6">
              <div className="flex -space-x-1.5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex h-7 w-7 items-center justify-center rounded-full border border-[#070809] bg-[#dcae4d]/20 text-[10px] font-bold text-[#dcae4d]">
                    ★
                  </div>
                ))}
              </div>

              <div className="text-[12px] text-[#a8a8a2]">
                <span className="font-semibold text-[#f1eee7]">
                  4.6 / 4.7
                </span>{" "}
                — 1,000+ mamnun mehmonlarimiz bahosi
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 pb-12">
          <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-white/10 bg-[#0c0e10]/85 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-white/5 p-6 transition-colors duration-300 sm:border-r lg:border-b-0">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#dcae4d]/30 bg-[#dcae4d]/5 text-[#dcae4d]">
                  <ChefHat size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[13px] font-medium text-[#f1eee7]">
                    Mualliflik menyusi
                  </h4>
                  <p className="mt-1 text-[11px] font-light text-[#888a85]">
                    Har bir ta’mda takrorlanmas san’at
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-white/5 p-6 transition-colors duration-300 sm:border-r lg:border-b-0">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#dcae4d]/30 bg-[#dcae4d]/5 text-[#dcae4d]">
                  <Utensils size={21} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[13px] font-medium text-[#f1eee7]">
                    Sertifikatlangan sifat
                  </h4>
                  <p className="mt-1 text-[11px] font-light text-[#888a85]">
                    Faqat saralangan va yangi ingredientlar
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-white/5 p-6 transition-colors duration-300 sm:border-r lg:border-b-0">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#dcae4d]/30 bg-[#dcae4d]/5 text-[#dcae4d]">
                  <Clock size={21} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[13px] font-medium text-[#f1eee7]">
                    Ish vaqti
                  </h4>
                  <p className="mt-1 text-[11px] font-light text-[#888a85]">
                    Har kuni: 11:00 — 23:00
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 transition-colors duration-300">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#dcae4d]/30 bg-[#dcae4d]/5 text-[#dcae4d]">
                  <MapPin size={21} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[13px] font-medium text-[#f1eee7]">
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
      </Container>
    </section>
  );
}

export default HeroSection;