import { ArrowRight, ChevronRight } from "lucide-react";

const offers = [
  {
    title: "Birinchi buyurtmangizga",
    discount: "10% CHEGIRMA!",
    button: "Buyurtma berish",
    code: "PROMO CODE: TANHO10",
    image: "/images/offer-food.jpg",
  },
  {
    title: "Tug‘ilgan kuningizda",
    discount: "20% CHEGIRMA!",
    button: "Batafsil",
    image: "/images/offer-cake.jpg",
  },
  {
    title: "Korporativ tadbirlar",
    discount: "uchun maxsus takliflar!",
    button: "Batafsil",
    image: "/images/offer-event.jpg",
  },
];

const news = [
  {
    date: "01.05.2024",
    title: "Yangi yozgi menyu taqdim etildi!",
    description:
      "Yoz fasli uchun maxsus yangilangan taomlar bilan tanishing.",
    image: "/images/news-1.jpg",
  },
  {
    date: "18.04.2024",
    title: "Ramazon hayiti munosabati bilan maxsus menyu",
    description:
      "Bayramingiz muborak bo‘lsin! Maxsus taomlar bilan sizni kutamiz.",
    image: "/images/news-2.jpg",
  },
  {
    date: "10.04.2024",
    title: "Birga jonli musiqa kechalari",
    description:
      "Har juma va shanba kunlari yoqimli musiqa va ajoyib atmosfera.",
    image: "/images/news-3.jpg",
  },
];

function SpecialSection() {
  return (
    <section className="w-full bg-[#050708] py-8">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-0">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.65fr_1fr]">
          
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-serif text-[25px] text-[#f1eee7]">
                Maxsus takliflar
              </h2>

              <button className="group flex cursor-pointer items-center gap-1 text-[11px] text-[#dcae43] transition hover:text-[#f2c866]">
                Barchasini ko‘rish
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {offers.map((offer, index) => (
                <div
                  key={index}
                  className="group relative min-h-[235px] cursor-pointer overflow-hidden rounded-lg border border-[#25292b] bg-[#0a0d0f] transition-all duration-300 hover:-translate-y-1 hover:border-[#8d6928] hover:shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
                >
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#050708] via-[#050708]/65 to-[#050708]/20" />

                  <div className="relative z-10 flex h-full min-h-[235px] flex-col justify-between p-3">
                    <div>
                      <p className="font-serif text-[14px] leading-5 text-[#f1eee7]">
                        {offer.title}
                      </p>

                      <p className="mt-0.5 font-serif text-[17px] leading-5 text-[#f1eee7]">
                        {offer.discount}
                      </p>
                    </div>

                    <div>
                      <button className="cursor-pointer rounded-md border border-[#dcae43] bg-[#dcae43] px-3 py-2 text-[10px] font-medium text-[#111] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#efc15e] hover:shadow-[0_5px_18px_rgba(220,174,67,0.25)]">
                        {offer.button}
                      </button>

                      {offer.code && (
                        <p className="mt-3 max-w-[100px] text-[8px] leading-3 text-[#b9b9b5]">
                          {offer.code}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-serif text-[25px] text-[#f1eee7]">
                Tadbirlar va yangiliklar
              </h2>

              <button className="group flex cursor-pointer items-center gap-1 whitespace-nowrap text-[11px] text-[#dcae43] transition hover:text-[#f2c866]">
                Barchasini ko‘rish
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="overflow-hidden rounded-lg border border-[#25292b] bg-[#090c0e]">
              {news.map((item, index) => (
                <div
                  key={index}
                  className="group flex min-h-[78px] cursor-pointer items-center gap-3 border-b border-[#202427] px-2.5 py-2 transition duration-300 last:border-b-0 hover:bg-[#101416]"
                >
                  <div className="h-[62px] w-[82px] shrink-0 overflow-hidden rounded-md">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[8px] text-[#8f918e]">
                      {item.date}
                    </p>

                    <h3 className="mt-1 truncate text-[11px] font-medium text-[#eeeae2] transition group-hover:text-[#e2b34c]">
                      {item.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-[8px] leading-3 text-[#898b88]">
                      {item.description}
                    </p>
                  </div>

                  <ChevronRight
                    size={17}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#b98628] transition duration-300 group-hover:translate-x-1 group-hover:text-[#e2b34c]"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default SpecialSection;