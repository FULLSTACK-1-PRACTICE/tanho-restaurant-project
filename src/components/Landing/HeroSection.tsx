import {
  ArrowRight,
  CalendarDays,
  ChefHat,
  Leaf,
  Star,
  Utensils,
} from "lucide-react";

import heroImg from "../../assets/images/kereman-uchirmengMani-brat.jpeg";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#050708] text-[#f1eee7]">

      {/* HERO IMAGE */}

      <div className="absolute left-0 right-0 top-[72px] h-[610px] overflow-hidden">

        <img
          src={heroImg}
          alt="Tanho Restaurant"
          className="h-full w-full object-cover object-center"
        />

        {/* LEFT DARK GRADIENT */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#050708]/95 via-[#050708]/70 to-[#050708]/10" />

        {/* TOP BLUR */}

        <div className="absolute left-0 right-0 top-0 h-[130px] bg-gradient-to-b from-[#050708]/90 via-[#050708]/45 to-transparent backdrop-blur-[2px]" />

        {/* LEFT SOFT DARK AREA */}

        <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-[#050708]/35 via-[#050708]/20 to-transparent" />

        {/* BOTTOM FADE */}

        <div className="absolute bottom-0 left-0 right-0 h-[170px] bg-gradient-to-t from-[#050708] via-[#050708]/60 to-transparent" />

      </div>

      {/* CONTENT */}

      <div className="relative z-10 mx-auto max-w-[1200px] px-5">

        <div className="flex min-h-[650px] items-center pt-[72px] pb-[90px]">

          <div className="max-w-[560px]">

            <p className="mb-5 text-[11px] font-medium uppercase tracking-[3px] text-[#dcae4d]">
              ZAMONAVIY MUHIT, NOZIK TA’M VA SIFAT
            </p>

            <h1 className="font-serif text-[48px] font-medium leading-[1.08] tracking-[-1px] text-[#f5f2eb] md:text-[64px]">
              Ta’mda tanho,
              <br />

              <span className="text-[#dcae4d]">
                xotirada
              </span>{" "}
              abadiy
            </h1>

            <p className="mt-6 max-w-[430px] text-[14px] leading-6 text-[#b5b5b0]">
              TANHO restorani — mazali taomlar,
              yoqimli muhit va siz uchun eng yaxshi
              xizmat.
            </p>

            {/* BUTTONS */}

            <div className="mt-8 flex flex-wrap gap-3">

              <button
                type="button"
                className="group flex cursor-pointer items-center gap-2 rounded-md bg-[#dcae4d] px-6 py-3 text-[12px] font-semibold text-[#090a0a] shadow-[0_8px_25px_rgba(220,174,77,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#edc15d] hover:shadow-[0_14px_35px_rgba(220,174,77,0.28)] active:translate-y-0"
              >
                MENYU

                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                className="group flex cursor-pointer items-center gap-2 rounded-md border border-[#735a27] bg-black/30 px-6 py-3 text-[12px] font-medium text-[#e1b85b] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#dcae4d] hover:bg-[#dcae4d] hover:text-[#090a0a] hover:shadow-[0_14px_35px_rgba(220,174,77,0.20)] active:translate-y-0"
              >
                <CalendarDays
                  size={16}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                STOL BAND QILISH
              </button>

            </div>

          </div>

        </div>

        {/* BOTTOM PANEL */}

        <div className="relative z-20 -mt-[25px] pb-10">

          <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0d0e]/95 shadow-[0_15px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">

            {/* CARD 1 */}

            <div className="group cursor-pointer border-b border-white/[0.07] px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#151311] hover:shadow-[0_8px_25px_rgba(220,174,77,0.08)] sm:border-r lg:border-b-0">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#8c6a29] text-[#dcae4d] transition-all duration-300 group-hover:scale-110 group-hover:border-[#dcae4d] group-hover:bg-[#dcae4d]/10 group-hover:shadow-[0_0_20px_rgba(220,174,77,0.15)]">
                  <ChefHat
                    size={22}
                    strokeWidth={1.6}
                  />
                </div>

                <div>
                  <p className="text-[12px] font-medium text-[#eeeeea] transition-colors duration-300 group-hover:text-[#dcae4d]">
                    Mazali taomlar
                  </p>

                  <p className="mt-1 text-[10px] text-[#777975]">
                    Eng sifatli mahsulotlar
                  </p>
                </div>

              </div>

            </div>

            {/* CARD 2 */}

            <div className="group cursor-pointer border-b border-white/[0.07] px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#151311] hover:shadow-[0_8px_25px_rgba(220,174,77,0.08)] sm:border-r lg:border-b-0">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#8c6a29] text-[#dcae4d] transition-all duration-300 group-hover:scale-110 group-hover:border-[#dcae4d] group-hover:bg-[#dcae4d]/10 group-hover:shadow-[0_0_20px_rgba(220,174,77,0.15)]">
                  <Utensils
                    size={21}
                    strokeWidth={1.6}
                  />
                </div>

                <div>
                  <p className="text-[12px] font-medium text-[#eeeeea] transition-colors duration-300 group-hover:text-[#dcae4d]">
                    Tajribali oshpazlar
                  </p>

                  <p className="mt-1 text-[10px] text-[#777975]">
                    Professional va mahorat
                  </p>
                </div>

              </div>

            </div>

            {/* CARD 3 */}

            <div className="group cursor-pointer border-b border-white/[0.07] px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#151311] hover:shadow-[0_8px_25px_rgba(220,174,77,0.08)] sm:border-r lg:border-b-0">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#8c6a29] text-[#dcae4d] transition-all duration-300 group-hover:scale-110 group-hover:border-[#dcae4d] group-hover:bg-[#dcae4d]/10 group-hover:shadow-[0_0_20px_rgba(220,174,77,0.15)]">
                  <Leaf
                    size={21}
                    strokeWidth={1.6}
                  />
                </div>

                <div>
                  <p className="text-[12px] font-medium text-[#eeeeea] transition-colors duration-300 group-hover:text-[#dcae4d]">
                    Yoqimli muhit
                  </p>

                  <p className="mt-1 text-[10px] text-[#777975]">
                    Issiq va qulay atmosfera
                  </p>
                </div>

              </div>

            </div>

            {/* CARD 4 */}

            <div className="group cursor-pointer px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#151311] hover:shadow-[0_8px_25px_rgba(220,174,77,0.08)]">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#8c6a29] text-[#dcae4d] transition-all duration-300 group-hover:scale-110 group-hover:border-[#dcae4d] group-hover:bg-[#dcae4d]/10 group-hover:shadow-[0_0_20px_rgba(220,174,77,0.15)]">
                  <Star
                    size={21}
                    strokeWidth={1.6}
                  />
                </div>

                <div>
                  <p className="text-[12px] font-medium text-[#eeeeea] transition-colors duration-300 group-hover:text-[#dcae4d]">
                    Tez va sifatli xizmat
                  </p>

                  <p className="mt-1 text-[10px] text-[#777975]">
                    Siz uchun har doim
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