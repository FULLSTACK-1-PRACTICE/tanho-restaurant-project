import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CalendarDays,
  Send,
  Headphones,
  Gift,
  MessageCircle,
  ChevronDown,
} from 'lucide-react';
import Button from '../../../components/ui/Button';

function ContactPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-[#050505]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1255px] px-5 py-16 md:px-8">
        <div className="text-center">
          <h1 className="font-serif text-[46px] font-medium tracking-wide text-white md:text-[58px]">
            ALOQA
          </h1>

          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="h-px w-[105px] bg-gradient-to-r from-transparent to-[#dcae4d]" />

            <div className="relative h-5 w-8">
              <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#dcae4d]" />
              <span className="absolute left-[5px] top-1/2 h-px w-5 -translate-y-1/2 rotate-[25deg] bg-[#dcae4d]" />
              <span className="absolute right-[5px] top-1/2 h-px w-5 -translate-y-1/2 -rotate-[25deg] bg-[#dcae4d]" />
            </div>

            <span className="h-px w-[105px] bg-gradient-to-l from-transparent to-[#dcae4d]" />
          </div>

          <p className="mx-auto mt-5 max-w-[700px] text-[15px] leading-7 text-neutral-300 md:text-[16px]">
            Savollaringiz bormi yoki rezervatsiya qilishni xohlaysiz?
            <br />
            Biz bilan istalgan vaqtda bog‘laning, sizga yordam berishdan mamnun
            bo‘lamiz.
          </p>
        </div>

        <div className="mt-8 grid overflow-hidden rounded-xl border border-[#2d2d2d] bg-[#0d0d0d]/95 lg:grid-cols-[0.9fr_1.25fr_1fr]">
          <div className="border-b border-[#292929] p-8 lg:border-b-0 lg:border-r">
            <h2 className="text-center font-serif text-[17px] font-semibold text-[#dcae4d]">
              BIZ BILAN BOG‘LANING
            </h2>

            <div className="mt-8 space-y-6">
              <div className="flex gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#725522]">
                  <MapPin
                    size={25}
                    strokeWidth={1.5}
                    className="text-[#dcae4d]"
                  />
                </div>

                <div>
                  <p className="text-[13px] text-[#dcae4d]">Manzil</p>

                  <p className="mt-1 text-[13px] leading-5 text-neutral-300">
                    Qarshi shahri
                    <br />
                    TANHO Restaurant
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#725522]">
                  <Phone
                    size={25}
                    strokeWidth={1.5}
                    className="text-[#dcae4d]"
                  />
                </div>

                <div>
                  <p className="text-[13px] text-[#dcae4d]">Telefon</p>

                  <p className="mt-1 text-[13px] leading-5 text-neutral-300">
                    +998 90 123 45 67
                    <br />
                    +998 91 987 65 43
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#725522]">
                  <Mail
                    size={25}
                    strokeWidth={1.5}
                    className="text-[#dcae4d]"
                  />
                </div>

                <div>
                  <p className="text-[13px] text-[#dcae4d]">Email</p>

                  <p className="mt-1 text-[13px] text-neutral-300">
                    info@tanho.uz
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#725522]">
                  <Clock
                    size={25}
                    strokeWidth={1.5}
                    className="text-[#dcae4d]"
                  />
                </div>

                <div>
                  <p className="text-[13px] text-[#dcae4d]">Ish vaqti</p>

                  <p className="mt-1 text-[13px] leading-5 text-neutral-300">
                    Har kuni
                    <br />
                    10:00 – 24:00
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 w-full">
              <Button
                className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#DCAE42] px-6 text-[13px] font-medium text-black transition-all duration-200 hover:bg-[#c99b3d] active:scale-[0.98]"
              >
                <CalendarDays size={17} />
                <span>STOL BAND QILISH</span>
              </Button>
            </div>
          </div>

          <div className="border-b border-[#292929] p-8 lg:border-b-0 lg:border-r">
            <h2 className="text-center font-serif text-[17px] font-semibold text-[#dcae4d]">
              BIZGA XABAR YUBORING
            </h2>

            <form className="mt-7 space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Ismingiz"
                  className="h-12 rounded-md border border-[#303030] bg-[#090909] px-4 text-[13px] text-white outline-none transition placeholder:text-neutral-500 focus:border-[#806027]"
                />

                <input
                  type="tel"
                  placeholder="Telefon raqamingiz"
                  className="h-12 rounded-md border border-[#303030] bg-[#090909] px-4 text-[13px] text-white outline-none transition placeholder:text-neutral-500 focus:border-[#806027]"
                />
              </div>

              <input
                type="email"
                placeholder="Email manzilingiz"
                className="h-12 w-full rounded-md border border-[#303030] bg-[#090909] px-4 text-[13px] text-white outline-none transition placeholder:text-neutral-500 focus:border-[#806027]"
              />

              <div className="relative">
                <select
                  defaultValue=""
                  className="h-12 w-full appearance-none rounded-md border border-[#303030] bg-[#090909] px-4 text-[13px] text-neutral-400 outline-none focus:border-[#806027]"
                >
                  <option value="" disabled>
                    Mavzu
                  </option>

                  <option value="reservation">Rezervatsiya</option>
                  <option value="question">Savol</option>
                  <option value="event">Tadbir</option>
                  <option value="other">Boshqa</option>
                </select>

                <ChevronDown
                  size={17}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
                />
              </div>

              <textarea
                placeholder="Xabaringiz"
                className="h-[125px] w-full resize-none rounded-md border border-[#303030] bg-[#090909] px-4 py-4 text-[13px] text-white outline-none transition placeholder:text-neutral-500 focus:border-[#806027]"
              />

              <Button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#DCAE42] px-6 text-[13px] font-medium text-black transition-all duration-200 hover:bg-[#c99b3d] active:scale-[0.98]"
              >
                <Send size={17} />
                <span>XABARNI YUBORISH</span>
              </Button>
            </form>
          </div>

          <div className="p-8">
            <h2 className="text-center font-serif text-[17px] font-semibold text-[#dcae4d]">
              BIZ QAYERDAMIZ?
            </h2>

            <div className="mt-7 h-[385px] overflow-hidden rounded-lg border border-[#252525]">
              <iframe
                src="https://yandex.com/map-widget/v1/?ll=65.801807%2C38.835924&z=16&pt=65.801807%2C38.835924%2Cpm2rdm"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Tanho Restaurant"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 grid overflow-hidden rounded-xl border border-[#171717] bg-[#0a0a0a] sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-5 border-b border-[#292929] px-7 py-6 lg:border-b-0 lg:border-r">
            <Headphones
              size={45}
              strokeWidth={1.3}
              className="shrink-0 text-[#dcae4d]"
            />

            <div>
              <h3 className="text-[13px] font-semibold text-[#dcae4d]">
                TEZ YORDAM
              </h3>

              <p className="mt-2 text-[12px] leading-5 text-neutral-400">
                Savollaringizga tez
                <br />
                javob beramiz
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 border-b border-[#292929] px-7 py-6 lg:border-b-0 lg:border-r">
            <CalendarDays
              size={45}
              strokeWidth={1.3}
              className="shrink-0 text-[#dcae4d]"
            />

            <div>
              <h3 className="text-[13px] font-semibold text-[#dcae4d]">
                ONLAYN REZERVATSIYA
              </h3>

              <p className="mt-2 text-[12px] leading-5 text-neutral-400">
                Stol band qilishni onlayn
                <br />
                amalga oshiring
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 border-b border-[#292929] px-7 py-6 lg:border-b-0 lg:border-r">
            <Gift
              size={45}
              strokeWidth={1.3}
              className="shrink-0 text-[#dcae4d]"
            />

            <div>
              <h3 className="text-[13px] font-semibold text-[#dcae4d]">
                MAXSUS TAKLIFLAR
              </h3>

              <p className="mt-2 text-[12px] leading-5 text-neutral-400">
                Yangi takliflar va chegirmalar
                <br />
                haqida xabardor bo‘ling
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 px-7 py-6">
            <MessageCircle
              size={45}
              strokeWidth={1.3}
              className="shrink-0 text-[#dcae4d]"
            />

            <div>
              <h3 className="text-[13px] font-semibold text-[#dcae4d]">
                SIZNING FIKRINGIZ MUHIM
              </h3>

              <p className="mt-2 text-[12px] leading-5 text-neutral-400">
                Taklif va mulohazalaringizni
                <br />
                bizga yuboring
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;