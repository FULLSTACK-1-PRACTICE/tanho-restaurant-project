import { ArrowRight, ShoppingCart } from "lucide-react";

const foods = [
  {
    name: "Lag‘mon Tanho",
    description: "Qalampirli taom, go‘sht va sabzavot bilan.",
    price: "25 000 so‘m",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Qozon kabob",
    description: "Qozonda sekin damlangan go‘sht va kartoshka.",
    price: "40 000 so‘m",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Manti",
    description: "Uy uslubida tayyorlangan manti, qatiq bilan.",
    price: "28 000 so‘m",
    image:
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Shashlik",
    description: "Tandirda pishirilgan shirali qo‘zichoq shashlik.",
    price: "35 000 so‘m",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Norin",
    description: "Maxsus usulda tayyorlangan urfona norin.",
    price: "30 000 so‘m",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85",
  },
];

function MashhurFood() {
  return (
    <section className="bg-[#050708] px-5 py-8 text-[#f1eee7]">
      <div className="mx-auto max-w-[1200px]">

        {/* TITLE */}

        <div className="mb-4 flex items-center justify-between">

          <h2 className="font-serif text-[25px] leading-none text-[#f1eee7]">
            Mashhur taomlar
          </h2>

          <button
            type="button"
            className="group flex cursor-pointer items-center gap-1.5 text-[11px] font-medium text-[#dcae4d] transition-all duration-300 hover:text-[#f0c45e]"
          >
            Barcha menyu

            <ArrowRight
              size={15}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

        </div>

        {/* FOOD CARDS */}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">

          {foods.map((food) => (
            <div
              key={food.name}
              className="group cursor-pointer overflow-hidden rounded-lg border border-white/[0.09] bg-[#0b0d0e] transition-all duration-300 hover:-translate-y-1 hover:border-[#dcae4d]/40 hover:bg-[#101213] hover:shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
            >

              {/* IMAGE */}

              <div className="relative h-[145px] overflow-hidden">

                <img
                  src={food.image}
                  alt={food.name}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* IMAGE OVERLAY */}

                <div className="absolute inset-0 bg-gradient-to-t from-[#050708]/55 via-transparent to-transparent opacity-70" />

              </div>

              {/* CONTENT */}

              <div className="p-3">

                <h3 className="text-[13px] font-medium text-[#f1eee7] transition-colors duration-300 group-hover:text-[#dcae4d]">
                  {food.name}
                </h3>

                <p className="mt-1.5 min-h-[34px] text-[9px] leading-[15px] text-[#858783]">
                  {food.description}
                </p>

                {/* PRICE + CART */}

                <div className="mt-3 flex items-center justify-between">

                  <span className="text-[11px] font-medium text-[#dcae4d]">
                    {food.price}
                  </span>

                  <button
                    type="button"
                    aria-label={`${food.name} savatga qo‘shish`}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[#765b28] bg-transparent text-[#dcae4d] transition-all duration-300 hover:border-[#dcae4d] hover:bg-[#dcae4d] hover:text-[#090a0a] hover:shadow-[0_5px_18px_rgba(220,174,77,0.2)]"
                  >
                    <ShoppingCart
                      size={15}
                      strokeWidth={1.7}
                    />
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* FULL MENU BUTTON */}

        <div className="mt-3 flex justify-center">

          <button
            type="button"
            className="group flex cursor-pointer items-center gap-2 rounded-md border border-[#765b28] px-8 py-2.5 text-[11px] font-medium text-[#dcae4d] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dcae4d] hover:bg-[#dcae4d] hover:text-[#090a0a] hover:shadow-[0_8px_25px_rgba(220,174,77,0.18)]"
          >
            To‘liq menyu

            <ArrowRight
              size={15}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

        </div>

      </div>
    </section>
  );
}

export default MashhurFood;