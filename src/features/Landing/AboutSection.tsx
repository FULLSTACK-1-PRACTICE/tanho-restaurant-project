import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Utensils,
  Star,
  Leaf,
  ChefHat,
  Heart,
  Calendar,
  Sparkles,
  Award,
  Flame,
  ShieldCheck,
  DoorOpen,
  MapPin,
} from "lucide-react";

import Button from "../../components/ui/Button";
import Container from "../../components/ui/container/Container";

import aboutImg from "../../assets/images/Landing/About/Tanho-Img.webp";
import thebesttaste from "../../assets/images/Menu/Additional-Images/three-salad.webp";
import Cabina from "../../assets/images/About/Cabina.webp";
import TheBestServe from "../../assets/images/About/TheBestServe.webp";
import HappyFamilyImg from "../../assets/images/Blog/Happyfamily.webp";

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0d10] text-gray-200 font-sans pb-20">
      <div
        className="relative w-full bg-cover bg-center py-20 md:py-28 border-b border-amber-900/20"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(11, 13, 16, 0.95) 25%, rgba(11, 13, 16, 0.75) 60%, rgba(11, 13, 16, 0.85) 100%), url(${Cabina})`,
        }}
      >
        <Container>
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-wide">
              Biz haqimizda
            </h1>

            <div className="flex items-center gap-2 mb-6 text-amber-500">
              <span className="w-8 h-[1px] bg-amber-500/50" />
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="w-8 h-[1px] bg-amber-500/50" />
            </div>

            <div className="space-y-4 text-gray-300 text-sm md:text-base font-light leading-relaxed">
              <p>
                TANHO restorani 2018-yilda Qarshi shahrida ochilgan. Bizning
                maqsadimiz – mehmonlarimizga unutilmas ta'm va maroqli muhit
                taqdim etish.
              </p>

              <p>
                An'anaviy o'zbek taomlari va milliy qadriyatlarni zamonaviy
                xizmat bilan uyg'unlashtirib, sizga eng yaxshi tajribani
                taqdim etamiz.
              </p>
            </div>

            <Button
              className="mt-8 bg-[#F6B531] text-[#181208] hover:bg-[#ffca50] transition cursor-pointer active:scale-[0.98] w-[240px] h-[48px] border border-amber-300/60 rounded-xl font-medium flex items-center justify-center gap-2"
              onClick={() => navigate("/menu")}
            >
              <Utensils className="w-4 h-4 shrink-0" />
              <span>Menyu bilan tanishish</span>
            </Button>
          </div>
        </Container>
      </div>

      <Container className="-mt-10 relative z-20">
        <div className="relative rounded-2xl bg-[#12151e]/80 backdrop-blur-xl border border-amber-500/20 py-5 px-6 md:py-6 md:px-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
            <div className="flex items-center justify-center gap-4 py-2 px-3 transition-transform duration-300 hover:scale-105 border-r border-gray-800/80 last:border-none md:border-r md:last:border-none">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/5 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner shadow-amber-500/10">
                <Award className="w-5 h-5 text-amber-400" />
              </div>

              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 tracking-tight leading-tight">
                  6+
                </span>

                <span className="text-xs text-gray-400 font-medium tracking-wide">
                  Yillik tajriba
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 py-2 px-3 transition-transform duration-300 hover:scale-105 border-r-0 md:border-r border-gray-800/80">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/5 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner shadow-amber-500/10">
                <Users className="w-5 h-5 text-amber-400" />
              </div>

              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 tracking-tight leading-tight">
                  10K+
                </span>

                <span className="text-xs text-gray-400 font-medium tracking-wide">
                  Mamnun mijozlar
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 py-2 px-3 transition-transform duration-300 hover:scale-105 border-r border-gray-800/80 md:border-r">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/5 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner shadow-amber-500/10">
                <Utensils className="w-5 h-5 text-amber-400" />
              </div>

              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 tracking-tight leading-tight">
                  15+
                </span>

                <span className="text-xs text-gray-400 font-medium tracking-wide">
                  Taom turlari
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 py-2 px-3 transition-transform duration-300 hover:scale-105">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/5 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner shadow-amber-500/10">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400/20" />
              </div>

              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 tracking-tight leading-tight">
                  4.9
                </span>

                <span className="text-xs text-gray-400 font-medium tracking-wide">
                  Yandex reytingi
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-white mb-2">
                Bizning hikoyamiz
              </h2>

              <div className="flex items-center gap-2 text-amber-500">
                <span className="w-8 h-[1px] bg-amber-500/50" />
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="w-8 h-[1px] bg-amber-500/50" />
              </div>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-gray-300 font-light leading-relaxed">
              <p>
                TANHO nomi "tanholikda topilgan huzur" ma'nosini anglatadi.
                Restoranimizda har bir mehmon o'zini alohida va qadrli his
                qilish uchun barcha sharoitlar yaratilgan.
              </p>

              <p>
                Biz sifatli mahsulotlar, tajribali oshpazlar va samimiy xizmat
                orqali sizga eng yaxshi taom va muhitni taqdim etamiz.
              </p>

              <p>
                Mahsulotlarimizning katta qismi mahalliy fermer xo'jaliklaridan
                yetkazib beriladi va har kuni yangiligi tekshiriladi.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800/60">
              <div className="text-center flex flex-col items-center cursor-default">
                <div className="w-10 h-10 rounded-full border border-amber-500/30 bg-amber-500/5 flex items-center justify-center mb-2">
                  <Leaf className="w-5 h-5 text-amber-500" />
                </div>

                <h4 className="text-xs font-medium text-amber-400 mb-1">
                  Sifatli mahsulotlar
                </h4>

                <p className="text-[10px] text-gray-400 leading-tight">
                  Faqat eng sifatli va tabiiy mahsulotlar
                </p>
              </div>

              <div className="text-center flex flex-col items-center cursor-default">
                <div className="w-10 h-10 rounded-full border border-amber-500/30 bg-amber-500/5 flex items-center justify-center mb-2">
                  <ChefHat className="w-5 h-5 text-amber-500" />
                </div>

                <h4 className="text-xs font-medium text-amber-400 mb-1">
                  Tajribali oshpazlar
                </h4>

                <p className="text-[10px] text-gray-400 leading-tight">
                  O'z sohasining ustalari ishlaydi
                </p>
              </div>

              <div className="text-center flex flex-col items-center cursor-default">
                <div className="w-10 h-10 rounded-full border border-amber-500/30 bg-amber-500/5 flex items-center justify-center mb-2">
                  <Heart className="w-5 h-5 text-amber-500" />
                </div>

                <h4 className="text-xs font-medium text-amber-400 mb-1">
                  Samimiy xizmat
                </h4>

                <p className="text-[10px] text-gray-400 leading-tight">
                  Har bir mehmon biz uchun mehmon emas, do'st
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-gray-800/80 shadow-2xl">
            <img
              loading="lazy"
              src={aboutImg}
              alt="TANHO Restaurant Interior"
              className="w-full h-full object-cover object-[70%]"
            />
          </div>
        </div>
      </Container>

      <Container className="mt-24">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2">
            Maqsadimiz
          </h2>

          <div className="flex items-center gap-2 text-amber-500">
            <span className="w-8 h-[1px] bg-amber-500/50" />
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="w-8 h-[1px] bg-amber-500/50" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#12151b] border border-gray-800/80 rounded-xl overflow-hidden shadow-lg">
            <div className="h-40 overflow-hidden">
              <img
                loading="lazy"
                src={thebesttaste}
                alt="Eng yaxshi ta'm"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-sm font-semibold text-white mb-2">
                Eng yaxshi ta'm
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed">
                An'anaviy va zamonaviy retseptlarni uyg'unlashtirib, sizga eng
                yaxshi taomlarni taqdim etish.
              </p>
            </div>
          </div>

          <div className="bg-[#12151b] border border-gray-800/80 rounded-xl overflow-hidden shadow-lg">
            <div className="h-40 overflow-hidden">
              <img
                loading="lazy"
                src={Cabina}
                alt="Samimiy muhit"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-sm font-semibold text-white mb-2">
                Samimiy muhit
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed">
                Zamonaviy va qulay muhitda yaqinlaringiz bilan maroqli vaqt
                o'tkazishingiz uchun.
              </p>
            </div>
          </div>

          <div className="bg-[#12151b] border border-gray-800/80 rounded-xl overflow-hidden shadow-lg">
            <div className="h-40 overflow-hidden">
              <img
                loading="lazy"
                src={TheBestServe}
                alt="Sifatli xizmat"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-sm font-semibold text-white mb-2">
                Sifatli xizmat
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed">
                Har bir detalda sifat va e'tibor – bizning xizmat tamoyilimiz.
              </p>
            </div>
          </div>

          <div className="bg-[#12151b] border border-gray-800/80 rounded-xl overflow-hidden shadow-lg">
            <div className="h-40 overflow-hidden">
              <img
                loading="lazy"
                src={HappyFamilyImg}
                alt="Baxtli mijozlar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-sm font-semibold text-white mb-2">
                Baxtli mijozlar
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed">
                Mamnun mijozlar sonini oshirish va ularning ishonchini qozonish
                – bizning asosiy maqsadimiz.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Container className="mt-24">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2">
            Nima uchun aynan TANHO?
          </h2>

          <div className="flex items-center gap-2 text-amber-500">
            <span className="w-8 h-[1px] bg-amber-500/50" />
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="w-8 h-[1px] bg-amber-500/50" />
          </div>

          <p className="text-xs md:text-sm text-gray-400 mt-2 font-light">
            Qarshi shahridagi eng sevimli maskanga aylanishimiz siri nimada?
            Mana, asosiy sabablar:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#12151b] border border-gray-800/80 rounded-xl p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400">
              <Flame className="w-6 h-6" />
            </div>

            <h3 className="text-base font-semibold text-white mb-2">
              Milliy va Olovli Ta'mlar
            </h3>

            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Sharqona an'analar asosida tayyorlanadigan kaboblar, milliy
              taomlar va maxsus retseptdagi tansiq ne'matlar.
            </p>
          </div>

          <div className="bg-[#12151b] border border-gray-800/80 rounded-xl p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className="text-base font-semibold text-white mb-2">
              Mutlaq Tozalik va Sifat
            </h3>

            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Mahsulotlarimiz doimo yangi va saralangan holda yetkazib beriladi.
              Oshxonamizda gigiyena qoidalariga qat'iy amal qilinadi.
            </p>
          </div>

          <div className="bg-[#12151b] border border-gray-800/80 rounded-xl p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400">
              <DoorOpen className="w-6 h-6" />
            </div>

            <h3 className="text-base font-semibold text-white mb-2">
              Alohida Kabinalar
            </h3>

            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Maxfiylik va qulaylikni qadrlaydigan mehmonlar uchun mo‘ljallangan
              alohida kabinalar. Oila, do‘stlar davrasi yoki maxsus uchrashuvlar
              uchun qulay va sokin joy.
            </p>
          </div>

          <div className="bg-[#12151b] border border-gray-800/80 rounded-xl p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400">
              <MapPin className="w-6 h-6" />
            </div>

            <h3 className="text-base font-semibold text-white mb-2">
              Qulay Joylashuv
            </h3>

            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Qarshi shahrining qo‘lay hududida joylashgan bo‘lib, o‘z
              avtoturargohiga ega va tashrif buyuruvchilar uchun barcha
              qulayliklar muhayyo.
            </p>
          </div>
        </div>
      </Container>

      <Container className="mt-20">
        <div
          className="relative rounded-2xl overflow-hidden border border-gray-800 p-8 md:p-12 bg-cover bg-center flex flex-col items-start justify-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(11, 13, 16, 0.95), rgba(11, 13, 16, 0.6)), url(${Cabina})`,
          }}
        >
          <div className="max-w-xl z-10">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
              Biz sizni kutamiz!
            </h2>

            <p className="text-sm text-gray-300 font-light mb-6">
              Tanho restoranida o'zingiz va yaqinlaringiz uchun unutilmas dam
              oling.
            </p>

            <Button
              className="bg-[#F6B531] text-[#181208] hover:bg-[#ffca50] transition cursor-pointer active:scale-[0.98] w-[200px] h-[48px] border border-amber-300/60 rounded-xl font-medium flex items-center justify-center gap-2"
              onClick={() => navigate("/reservation")}
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Stol band qilish</span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;