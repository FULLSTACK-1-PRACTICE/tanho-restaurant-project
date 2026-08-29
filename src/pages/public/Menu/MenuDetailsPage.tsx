import { useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../../../data/menuData";
import { ArrowLeft } from "lucide-react";
import Container from "../../../components/ui/container/Container";
import Button from "../../../components/ui/Button";

const MenuDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.pathname.split("/").filter(Boolean).pop();

  const food = menuItems.find(
    (item) => item.id === id
  );

  if (!food) {
    return (
      <section className="px-4 py-24 sm:px-6">
        <Container className="max-w-[1100px] rounded-2xl border border-white/10 bg-[#121619] p-8 text-center">
          <h1 className="font-serif text-2xl text-white">
            Taom topilmadi
          </h1>
          <Button
            type="button"
            onClick={() => navigate("/menu")}
            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#8c651d]/40 px-4 py-2.5 text-sm text-[#e5ad45] transition-all duration-300 hover:bg-[#d9a441] hover:text-black"
          >
            <ArrowLeft size={16} />
            Menyuga qaytish
          </Button>
        </Container>
      </section>
    );
  }

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <Container className="max-w-[1100px]">
        <Button
          type="button"
          onClick={() => navigate("/menu")}
          className="group mb-6 inline-flex cursor-pointer items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-[#e5ad45] bg-transparent border-none p-0"
        >
          <ArrowLeft
            size={17}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Menyuga qaytish
        </Button>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121619]">
          <div className="grid md:grid-cols-2">
            <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-white p-5 sm:min-h-[430px] sm:p-8 md:min-h-[520px]">
              <img
                loading="lazy"
                src={food.image}
                alt={food.name}
                className="h-full max-h-[500px] w-full object-contain transition-transform duration-700 ease-out hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 md:p-12">
              <p className="text-xs uppercase tracking-[3px] text-[#d9a441]">
                {food.category}
              </p>

              <h1 className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
                {food.name}
              </h1>

              <div className="mt-5 h-px w-20 bg-[#d9a441] transition-all duration-500 hover:w-32" />

              <div className="mt-7">
                <h2 className="font-serif text-xl text-white sm:text-2xl">
                  Tayyorlanishi
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  {food.description}
                </p>

                 <h2 className="font-serif mt-3 text-xl text-white sm:text-2xl">
                  Turlari
                </h2>
             
                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  {food.turlar}
                </p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm leading-6 text-gray-500">
                  Taom restoranimiz oshpazlari tomonidan maxsus usulda
                  tayyorlanadi va o'ziga xos ta'm bilan dasturxonga tortiladi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MenuDetailsPage;