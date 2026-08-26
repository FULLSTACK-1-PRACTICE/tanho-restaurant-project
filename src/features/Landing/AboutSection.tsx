import { Award, ChefHat, Star, Users } from "lucide-react";
import aboutImg from "../../assets/images/Landing/About/Tanho-Img.png";
function AboutSection() {
  return (
    <section className="w-full bg-[#050708] py-8">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-4 lg:grid-cols-[1fr_1.25fr] lg:px-0">
        <div className="group relative h-[260px] overflow-hidden rounded-lg border border-[#24282b]">
          <img
            src={aboutImg}
            alt="Tanho Restaurant"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#050708]/70 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-5">
            <h2 className="font-serif text-[28px] leading-tight text-[#f1eee7] md:text-[32px]">
              Biz haqimizda
            </h2>

            <p className="mt-2 max-w-[620px] text-[13px] leading-5 text-[#aaa9a5]">
              Tanho restorani 2018-yilda Qarshi shahrida ochilgan. Bizning
              maqsadimiz — mehmonlarimizga unutilmas ta’m va maroqli muhit
              taqdim etish.
            </p>
          </div>

          <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-[#25292b] bg-[#0a0d0f] md:grid-cols-4">
            <div className="group flex flex-col items-center justify-center border-b border-[#25292b] px-3 py-4 transition duration-300 hover:bg-[#111416] md:border-b-0 md:border-r">
              <Award
                size={22}
                strokeWidth={1.5}
                className="text-[#dcae43] transition duration-300 group-hover:-translate-y-1"
              />

              <span className="mt-1 font-serif text-[21px] text-[#e4b84e]">
                6+
              </span>

              <span className="text-center text-[10px] text-[#999]">
                Yillik tajriba
              </span>
            </div>

            <div className="group flex flex-col items-center justify-center border-b border-[#25292b] px-3 py-4 transition duration-300 hover:bg-[#111416] md:border-b-0 md:border-r">
              <Users
                size={22}
                strokeWidth={1.5}
                className="text-[#dcae43] transition duration-300 group-hover:-translate-y-1"
              />

              <span className="mt-1 font-serif text-[21px] text-[#e4b84e]">
                10K+
              </span>

              <span className="text-center text-[10px] text-[#999]">
                Mamnun mijozlar
              </span>
            </div>

            <div className="group flex flex-col items-center justify-center border-r border-[#25292b] px-3 py-4 transition duration-300 hover:bg-[#111416]">
              <ChefHat
                size={22}
                strokeWidth={1.5}
                className="text-[#dcae43] transition duration-300 group-hover:-translate-y-1"
              />

              <span className="mt-1 font-serif text-[21px] text-[#e4b84e]">
                30+
              </span>

              <span className="text-center text-[10px] text-[#999]">
                Taom turlari
              </span>
            </div>

            <div className="group flex flex-col items-center justify-center px-3 py-4 transition duration-300 hover:bg-[#111416]">
              <Star
                size={22}
                strokeWidth={1.5}
                className="text-[#dcae43] transition duration-300 group-hover:-translate-y-1"
              />

              <span className="mt-1 font-serif text-[21px] text-[#e4b84e]">
                4.7 
              </span>

              <span className="text-center text-[10px] text-[#999]">
                Yandex reytingi
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
