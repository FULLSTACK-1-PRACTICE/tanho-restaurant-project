import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LogIn, X, Phone, MapPin, Send, ArrowUpRight, Clock } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/Layout/Header/Logo-2.png";
import Container from "../../ui/container/Container";
import { useAuthModal } from "../../../features/auth/hooks/useAuthModal";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openAuthModal } = useAuthModal();

  const navLinks = [
    { name: "Bosh sahifa", path: "/" },
    { name: "Menyu", path: "/menu" },
    { name: "Biz haqimizda", path: "/about" },
    { name: "Maqolalar", path: "/events" },
    { name: "Yangiliklar", path: "/news" },
    { name: "Aloqa", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/5 bg-[#070809]/85 shadow-[0_4px_30px_rgba(0,0,0,0.25)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Container>
          <div className="flex h-[76px] items-center justify-between">
            <Link to="/" className="flex items-center justify-center shrink-0 cursor-pointer h-[50px] w-[140px] relative overflow-hidden">
              <img src={logo} alt="Tanho Restaurant" className="h-[100px] max-w-none w-auto object-contain block -mt-1" />
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink key={link.path} to={link.path} className="group relative cursor-pointer py-2 text-[13px] font-medium">
                  {({ isActive }) => (
                    <>
                      <span className={`transition-all duration-300 ${isActive ? "text-[#dcae4d]" : "text-white group-hover:text-[#dcae4d]"}`}>
                        {link.name}
                      </span>
                      <span className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#dcae4d] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => openAuthModal("kirish")}
              className="group flex cursor-pointer items-center gap-2 rounded-md border border-[#6d531f] px-5 py-2.5 text-[12px] font-medium text-[#dcae4d] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dcae4d] hover:bg-[#dcae4d] hover:text-black hover:shadow-[0_6px_20px_rgba(220,174,77,0.18)]"
            >
              <LogIn size={15} strokeWidth={1.8} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              <span>KIRISH</span>
            </button>
          </div>
        </Container>
      </header>

      
      {createPortal(
        <>
          <div
            onClick={() => setMenuOpen(false)}
            className={`fixed inset-0 z-[998] bg-black/80 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
          />
          <aside
            className={`fixed right-0 top-0 z-[999] flex h-full w-[88%] max-w-[380px] flex-col border-l border-white/10 bg-[#070809]/95 backdrop-blur-2xl transition-transform duration-700 lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            
          </aside>
        </>,
        document.body
      )}
    </>
  );
}

export default Header;