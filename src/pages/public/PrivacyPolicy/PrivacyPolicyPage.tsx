import React from "react";
import { ShieldCheck, UserCheck, Target, Lock, Cookie, FileEdit } from "lucide-react";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080a0b] text-[#f1eee7]">
      {/* Banner / Header Section */}
      <div className="relative border-b border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#181a1b] via-[#080a0b] to-[#080a0b] px-4 py-16 text-center sm:px-6 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-3xl font-normal tracking-wide text-[#f1eee7] sm:text-4xl lg:text-5xl">
            Maxfiylik siyosati
          </h1>
          <div className="mx-auto my-4 flex items-center justify-center gap-2">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#dcae4d]" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#dcae4d] bg-[#dcae4d]" />
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#dcae4d]" />
          </div>
          <p className="mt-4 text-xs font-light leading-relaxed text-[#a0a29e] sm:text-sm md:text-base">
            Sizning ma'lumotlaringiz biz uchun muhim. <br className="hidden sm:inline" />
            Ular maxfiyligi va xavfsizligini ta'minlash bizning ustuvor vazifamizdir.
          </p>
        </div>
      </div>

      {/* Grid Content Section */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          
          {/* 1. Umumiy qoidalar */}
          <div className="group rounded-xl border border-white/[0.08] bg-[#0d0f10] p-6 transition-all duration-300 hover:border-[#dcae4d]/40 hover:bg-[#111314]">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#765b28]/40 bg-[#161819] text-[#dcae4d]">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#f1eee7] group-hover:text-[#dcae4d]">
                  1. Umumiy qoidalar
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#858783] sm:text-sm">
                  Tanho restorani veb-sayti foydalanuvchilarning shaxsiy ma'lumotlarini 
                  himoya qilishni o'zining ustuvor vazifasi deb biladi. Ushbu siyosat sizning 
                  ma'lumotlaringiz qanday to'planishi, ishlatilishi va himoya qilinishini 
                  tushuntiradi.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Ma'lumotlar qanday to'planadi */}
          <div className="group rounded-xl border border-white/[0.08] bg-[#0d0f10] p-6 transition-all duration-300 hover:border-[#dcae4d]/40 hover:bg-[#111314]">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#765b28]/40 bg-[#161819] text-[#dcae4d]">
                <UserCheck size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#f1eee7] group-hover:text-[#dcae4d]">
                  2. Ma'lumotlar qanday to'planadi
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#858783] sm:text-sm">
                  Biz faqat siz ixtiyoriy ravishda taqdim etgan ma'lumotlarni yig'amiz. Bunga quyidagilar kiradi:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-[#858783] sm:text-sm">
                  <li>Ism, telefon raqami, elektron pochta (buyurtma yoki rezervatsiya uchun)</li>
                  <li>Taklif va mulohazalar</li>
                  <li>Saytdan foydalanish statistikasi (cookies orqali)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Ma'lumotlardan foydalanish maqsadi */}
          <div className="group rounded-xl border border-white/[0.08] bg-[#0d0f10] p-6 transition-all duration-300 hover:border-[#dcae4d]/40 hover:bg-[#111314]">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#765b28]/40 bg-[#161819] text-[#dcae4d]">
                <Target size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#f1eee7] group-hover:text-[#dcae4d]">
                  3. Ma'lumotlardan foydalanish maqsadi
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#858783] sm:text-sm">
                  Yig'ilgan ma'lumotlar quyidagi maqsadlarda ishlatiladi:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-[#858783] sm:text-sm">
                  <li>Buyurtma va rezervatsiyalarni amalga oshirish</li>
                  <li>Foydalanuvchi so'rovlariga javob berish</li>
                  <li>Xizmat sifatini yaxshilash</li>
                  <li>Yangiliklar va maxsus takliflar haqida ma'lumot berish (faqat roziligingiz bilan)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 4. Ma'lumotlar xavfsizligi */}
          <div className="group rounded-xl border border-white/[0.08] bg-[#0d0f10] p-6 transition-all duration-300 hover:border-[#dcae4d]/40 hover:bg-[#111314]">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#765b28]/40 bg-[#161819] text-[#dcae4d]">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#f1eee7] group-hover:text-[#dcae4d]">
                  4. Ma'lumotlar xavfsizligi
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#858783] sm:text-sm">
                  Sizning ma'lumotlaringiz zamonaviy xavfsizlik texnologiyalari yordamida 
                  himoyalanadi va uchinchi shaxslarga sizning roziligingizsiz berilmaydi. 
                  Biz ma'lumotlaringiz maxfiyligini ta'minlash uchun barcha choralarni ko'ramiz.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Cookies */}
          <div className="group rounded-xl border border-white/[0.08] bg-[#0d0f10] p-6 transition-all duration-300 hover:border-[#dcae4d]/40 hover:bg-[#111314]">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#765b28]/40 bg-[#161819] text-[#dcae4d]">
                <Cookie size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#f1eee7] group-hover:text-[#dcae4d]">
                  5. Cookies
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#858783] sm:text-sm">
                  Saytimiz sizga qulaylik yaratish maqsadida cookies fayllardan foydalanadi. 
                  Ular orqali sayt ishlash sifatini tahlil qilamiz va xizmatlarni yaxshilaymiz.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Siyosat o'zgarishlari */}
          <div className="group rounded-xl border border-white/[0.08] bg-[#0d0f10] p-6 transition-all duration-300 hover:border-[#dcae4d]/40 hover:bg-[#111314]">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#765b28]/40 bg-[#161819] text-[#dcae4d]">
                <FileEdit size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#f1eee7] group-hover:text-[#dcae4d]">
                  6. Siyosat o'zgarishlari
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#858783] sm:text-sm">
                  Ushbu maxfiylik siyosatiga vaqti-vaqti bilan o'zgartirishlar kiritilishi mumkin. 
                  O'zgartirishlar saytda e'lon qilinadi va kuchga kiradi.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;