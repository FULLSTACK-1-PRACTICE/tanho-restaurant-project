import { LogIn } from "lucide-react";
import logo from "../../assets/images/Logo-2.png";

function Header() {
  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <div className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between px-5">

        <button className="shrink-0 cursor-pointer">
          <img
            src={logo}
            alt="Tanho Restaurant"
            className="h-[90px] w-auto object-contain"
          />
        </button>

        <nav className="flex items-center gap-8">

          <button className="group relative flex h-[76px] cursor-pointer items-center text-[13px] font-medium text-[#dcae4d]">
            <span className="transition duration-300 group-hover:text-[#f3c766]">
              Bosh sahifa
            </span>

            <span className="absolute bottom-[14px] left-1/2 h-[2px] w-[42px] -translate-x-1/2 rounded-full bg-[#dcae4d] transition-all duration-300 group-hover:w-full" />
          </button>

          <button className="group relative cursor-pointer py-2 text-[13px] font-medium text-white">
            <span className="transition duration-300 group-hover:text-[#dcae4d]">
              Menyu
            </span>

            <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[#dcae4d] transition-all duration-300 group-hover:w-full" />
          </button>

          <button className="group relative cursor-pointer py-2 text-[13px] font-medium text-white">
            <span className="transition duration-300 group-hover:text-[#dcae4d]">
              Biz haqimizda
            </span>

            <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[#dcae4d] transition-all duration-300 group-hover:w-full" />
          </button>

          <button className="group relative cursor-pointer py-2 text-[13px] font-medium text-white">
            <span className="transition duration-300 group-hover:text-[#dcae4d]">
              Tadbirlar
            </span>

            <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[#dcae4d] transition-all duration-300 group-hover:w-full" />
          </button>

          <button className="group relative cursor-pointer py-2 text-[13px] font-medium text-white">
            <span className="transition duration-300 group-hover:text-[#dcae4d]">
              Yangiliklar
            </span>

            <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[#dcae4d] transition-all duration-300 group-hover:w-full" />
          </button>

          <button className="group relative cursor-pointer py-2 text-[13px] font-medium text-white">
            <span className="transition duration-300 group-hover:text-[#dcae4d]">
              Aloqa
            </span>

            <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[#dcae4d] transition-all duration-300 group-hover:w-full" />
          </button>

        </nav>

        <button className="group flex cursor-pointer items-center gap-2 rounded-md border border-[#6d531f] px-5 py-2.5 text-[12px] font-medium text-[#dcae4d] transition-all duration-300 hover:border-[#dcae4d] hover:bg-[#dcae4d] hover:text-black">
          <LogIn
            size={15}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />

          <span>KIRISH</span>
        </button>

      </div>
    </header>
  );
}

export default Header;