import React from "react";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#050708] text-center px-4 py-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-[#DCAE4C]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center animate-[fadeIn_0.8s_ease-out]">
        <div className="relative w-[320px] h-[320px] md:w-[380px] md:h-[380px] flex items-center justify-center mb-1">
          <div className="absolute inset-0 bg-[#DCAE4C]/20 rounded-full blur-[70px]" />
          <DotLottieReact
            src="/Not-Found.lottie"
            loop
            autoplay
            className="relative z-10 w-full h-full"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#DCAE4C] mb-2 tracking-tight drop-shadow-[0_0_20px_rgba(220,174,76,0.35)]">
          404
        </h1>

        <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
          Sahifa topilmadi
        </h2>

        <p className="text-gray-400 mb-6 max-w-md text-sm md:text-base leading-relaxed">
          Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga
          ko'chirilgan bo'lishi mumkin.
        </p>

        <Link
          to="/"
          className="group relative inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#DCAE4C] to-[#F0C868] text-[#050708] font-bold text-base rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_-5px_rgba(220,174,76,0.5)] hover:shadow-[0_15px_40px_-5px_rgba(220,174,76,0.7)]"
        >
          <span className="relative z-10">Bosh sahifaga qaytish</span>
          <svg
            className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
