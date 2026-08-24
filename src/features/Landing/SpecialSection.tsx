import React from "react";
import { ArrowRight, ChevronRight, Flame, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { offers, news } from "../../data/landingData";
import menuHeadImg from "../../assets/images/Menu/Additional-Images/MenuHead.png";

function SpecialSection() {
  const navigate = useNavigate();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop";
  };

  return (
    <section className="w-full bg-[#050708] py-10 overflow-hidden">
      <div className="mx-auto max-w-[1250px] px-4 lg:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.7fr_1fr] items-stretch">
          
          <div className="flex flex-col justify-between">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <Sparkles size={16} className="text-[#dcae43] shrink-0" />
                <h2 className="font-serif text-[17px] sm:text-[22px] md:text-[25px] text-[#f1eee7] truncate">
                  Maxsus takliflar & Hit taomlar
                </h2>
              </div>
              <button
                onClick={() => navigate("/menu")}
                className="group flex cursor-pointer items-center gap-1 text-[11px] sm:text-[12px] font-medium text-[#dcae43] transition hover:text-[#f2c866] shrink-0"
              >
                Barchasini ko‘rish
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            <div className="hidden lg:grid grid-cols-3 gap-4 h-full">
              {offers.map((offer, index) => (
                <div
                  key={index}
                  onClick={() => navigate(offer.link)}
                  className="group relative w-full flex flex-col justify-between overflow-hidden rounded-xl border border-[#25292b] bg-[#0a0d0f] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#8d6928] hover:shadow-[0_12px_35px_rgba(0,0,0,0.55)] h-full min-h-[380px]"
                >
                  <img
                    src={index === 0 ? menuHeadImg : offer.image}
                    alt={offer.title}
                    onError={handleImageError}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050708] via-[#050708]/80 to-[#050708]/40" />

                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      {offer.type === "dish" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#dcae43] px-2 py-0.5 text-[9px] font-bold text-[#050708]">
                          <Flame size={10} />
                          {offer.badge}
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase tracking-wider text-[#dcae43]">AKSIYA</span>
                      )}
                      <p className="mt-2 font-serif text-[15px] font-medium leading-snug text-[#f1eee7]">{offer.title}</p>
                      <p className="mt-1 font-serif text-[18px] font-bold text-[#dcae43]">{offer.discount}</p>
                      <p className="mt-1.5 text-[10px] leading-tight text-[#b9b9b5] line-clamp-2">
                        {index === 0 ? "Bosh menu orqali tanishib chiqing." : offer.description}
                      </p>
                    </div>

                    <div className="mt-4">
                      <button className="w-full cursor-pointer rounded-lg border border-[#dcae43] bg-[#dcae43] py-2 text-[11px] font-semibold text-[#08090a] transition-all duration-300 hover:bg-[#efc15e]">
                        {offer.button}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="block lg:hidden w-full pb-8">
              <Swiper
                modules={[Pagination]}
                spaceBetween={12}
                slidesPerView={1.15} 
                pagination={{ clickable: true }}
                className="special-offers-swiper"
              >
                {offers.map((offer, index) => (
                  <SwiperSlide key={index}>
                    <div
                      onClick={() => navigate(offer.link)}
                      className="group relative w-full flex flex-col justify-between overflow-hidden rounded-xl border border-[#25292b] bg-[#0a0d0f] p-4 h-[360px] shadow-lg"
                    >
                      <img
                        src={index === 0 ? menuHeadImg : offer.image}
                        alt={offer.title}
                        onError={handleImageError}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050708] via-[#050708]/80 to-[#050708]/40" />

                      <div className="relative z-10 flex h-full flex-col justify-between">
                        <div>
                          {offer.type === "dish" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#dcae43] px-2 py-0.5 text-[9px] font-bold text-[#050708]">
                              <Flame size={10} />
                              {offer.badge}
                            </span>
                          ) : (
                            <span className="text-[10px] uppercase tracking-wider text-[#dcae43]">AKSIYA</span>
                          )}
                          <p className="mt-2 font-serif text-[16px] font-medium leading-snug text-[#f1eee7]">{offer.title}</p>
                          <p className="mt-1 font-serif text-[19px] font-bold text-[#dcae43]">{offer.discount}</p>
                          <p className="mt-1.5 text-[11px] leading-tight text-[#b9b9b5] line-clamp-2">
                            {index === 0 ? "Bosh menu orqali tanishib chiqing." : offer.description}
                          </p>
                        </div>

                        <div className="mt-4">
                          <button className="w-full cursor-pointer rounded-lg border border-[#dcae43] bg-[#dcae43] py-2.5 text-[12px] font-semibold text-[#08090a]">
                            {offer.button}
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-[17px] sm:text-[20px] md:text-[24px] text-[#f1eee7]">Tadbirlar va yangiliklar</h2>
              <button
                onClick={() => navigate("/news")}
                className="group flex cursor-pointer items-center gap-1 whitespace-nowrap text-[11px] sm:text-[12px] font-medium text-[#dcae43] transition hover:text-[#f2c866]"
              >
                Barchasini ko‘rish
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#25292b] bg-[#090c0e] flex flex-col justify-between h-full">
              {news.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/news/${item.id}`)}
                  className="group flex flex-1 cursor-pointer items-center gap-3.5 border-b border-[#202427] p-3 transition duration-300 last:border-b-0 hover:bg-[#121619]"
                >
                  <div className="h-[72px] w-[85px] shrink-0 overflow-hidden rounded-lg bg-[#1a1d1f]">
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={handleImageError}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-medium text-[#8f918e]">{item.date}</p>
                    <h3 className="mt-0.5 truncate text-[12px] font-medium text-[#eeeae2] transition group-hover:text-[#e2b34c]">
                      {item.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-[#898b88]">{item.description}</p>
                  </div>
                  <ChevronRight size={18} strokeWidth={1.5} className="shrink-0 text-[#8f918e] transition duration-300 group-hover:translate-x-1 group-hover:text-[#e2b34c]" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .special-offers-swiper {
          padding-bottom: 30px !important;
        }
        .special-offers-swiper .swiper-pagination-bullet {
          background-color: #555 !important;
          opacity: 0.6;
          width: 6px;
          height: 6px;
          transition: all 0.3s ease;
        }
        .special-offers-swiper .swiper-pagination-bullet-active {
          background-color: #dcae43 !important;
          opacity: 1;
          width: 18px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}

export default SpecialSection;