import { ArrowRight, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import jojaImg from "../../assets/images/Menu/Cards/Juja.webp";
import jojaChesnochniImg from "../../assets/images/Menu/Cards/Juja-Chesnochni.webp";
import teftelShorvaImg from "../../assets/images/Menu/Cards/Teftel-Shurva.webp";
import manchuriImg from "../../assets/images/Menu/Cards/Manchuri.webp";
import oshimg from "../../assets/images/Menu/Cards/Osh.webp";

const foodsData = [
  {
    id: "menu-4",
    name: "Jo'ja",
    description: "Maxsus marinadda pishirilgan yumshoq va mazali jo'ja.",
    image: jojaImg,
  },
  {
    id: "menu-6",
    name: "Jo'ja chesnochni",
    description: "Sarimsoqli maxsus sousda tayyorlangan lazzatli jo'ja.",
    image: jojaChesnochniImg,
  },
  {
    id: "menu-17",
    name: "Teftel sho'rva",
    description: "Mazali va to'yimli go'shtli teftellar solingan sho'rva.",
    image: teftelShorvaImg,
  },
  {
    id: "menu-35",
    name: "Manchuri",
    description: "Mazali va sersuv osiyona uslubda tayyorlangan taom.",
    image: manchuriImg,
  },
  {
    id: "menu-1",
    name: "To'y Oshi",
    description: "An'anaviy Toshkent to'y palovi, qazi va tuxum bilan.",
    image: oshimg,
  },
];

function MashhurFood() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#050708] px-5 py-10 text-[#f1eee7]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-[30px] leading-none text-[#f1eee7]">
            Mashhur taomlar
          </h2>
          <button
            type="button"
            onClick={() => navigate("/menu")}
            className="group flex cursor-pointer items-center gap-1.5 text-xs font-medium text-[#dcae4d] transition-all duration-300 hover:text-[#f0c45e]"
          >
            To'liq menyu
            <ArrowRight
              size={16}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {foodsData.map((food) => (
            <div
              key={food.id}
              onClick={() => navigate(`/menu/${food.id}`)}
              className="group flex flex-col justify-between overflow-hidden rounded-xl border border-white/[0.09] bg-[#0b0d0e] transition-all duration-300 hover:-translate-y-1 hover:border-[#dcae4d]/40 hover:bg-[#101213] hover:shadow-[0_12px_35px_rgba(0,0,0,0.45)] cursor-pointer"
            >
              <div>
                <div
                  className="relative flex h-[210px] items-center justify-center overflow-hidden p-3"
                  style={{ backgroundColor: "#FEFEFE" }}
                >
                  <img
                    loading="lazy"
                    src={food.image}
                    alt={food.name}
                    className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050708]/55 via-transparent to-transparent opacity-70" />
                </div>

                <div className="bg-[#0b0d0e] p-4">
                  <h3 className="text-sm font-semibold text-[#f1eee7] transition-colors duration-300 group-hover:text-[#dcae4d]">
                    {food.name}
                  </h3>
                  <p className="mt-2 min-h-[40px] text-xs leading-[18px] text-[#858783] line-clamp-2">
                    {food.description}
                  </p>
                </div>
              </div>

              <div className="bg-[#0b0d0e] p-4 pt-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/menu/${food.id}`);
                  }}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#765b28] bg-transparent py-2 text-xs font-medium text-[#dcae4d] transition-all duration-300 hover:border-[#dcae4d] hover:bg-[#dcae4d] hover:text-[#090a0a] hover:shadow-[0_5px_18px_rgba(220,174,77,0.2)]"
                >
                  Tafsilotlar
                  <Eye size={15} strokeWidth={1.7} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MashhurFood;