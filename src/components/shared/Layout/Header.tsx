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
    if (document.getElementById("tanho-font-cormorant")) return;
    const link = document.createElement("link");
    link.id = "tanho-font-cormorant";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          scrolled || menuOpen
            ? "border-b border-white/5 bg-[#070809]/85 shadow-[0_4px_30px_rgba(0,0,0,0.25)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Container>
          <div className="flex h-[64px] items-center justify-between md:h-[76px]">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="relative flex h-[42px] w-[110px] shrink-0 cursor-pointer items-center justify-center overflow-hidden md:h-[50px] md:w-[140px]"
            >
              <img
                src={logo}
                alt="Tanho Restaurant"
                className="-mt-1 block h-[80px] w-auto max-w-none object-contain md:h-[100px]"
              />
            </Link>

            <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="group relative cursor-pointer py-2 text-[13px] font-medium"
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`transition-all duration-300 ${
                          isActive
                            ? "text-[#dcae4d]"
                            : "text-white group-hover:text-[#dcae4d]"
                        }`}
                      >
                        {link.name}
                      </span>

                      <span
                        className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#dcae4d] transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => openAuthModal("kirish")}
                className="hidden lg:flex group cursor-pointer items-center gap-2 rounded-md border border-[#6d531f] px-5 py-2.5 text-[12px] font-medium text-[#dcae4d] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dcae4d] hover:bg-[#dcae4d] hover:text-black hover:shadow-[0_6px_20px_rgba(220,174,77,0.18)]"
              >
                <LogIn
                  size={15}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                />
                <span>KIRISH</span>
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? "Menyuni yopish" : "Menyuni ochish"}
                aria-expanded={menuOpen}
                className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-white/10 text-white transition-colors duration-300 hover:border-[#dcae4d] hover:text-[#dcae4d] lg:hidden"
              >
                <span className="relative flex h-4 w-[18px] flex-col items-center justify-between">
                  <span
                    className={`block h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${
                      menuOpen ? "translate-y-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`block h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${
                      menuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`block h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${
                      menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {createPortal(
        <>
          <div
            onClick={() => setMenuOpen(false)}
            className={`fixed inset-0 z-[998] bg-black/80 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${
              menuOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          />

          <aside
            className={`fixed right-0 top-0 z-[999] flex h-full h-[100dvh] w-[88%] max-w-[380px] flex-col overflow-hidden border-l border-white/10 bg-[#070809]/95 backdrop-blur-2xl shadow-[-20px_0_50px_rgba(0,0,0,0.8)] transition-transform duration-700 lg:hidden ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[2px] bg-gradient-to-b from-transparent via-[#dcae4d]/50 to-transparent" />

            <div className="flex h-full flex-col justify-between overflow-hidden">
              <div className="shrink-0 px-6 pt-6">
                <div className="flex items-center justify-between">
                  <img
                    src={logo}
                    alt="Tanho Restaurant"
                    className="h-[38px] w-auto object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Menyuni yopish"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 text-neutral-300 transition-colors duration-300 hover:border-[#dcae4d] hover:bg-[#dcae4d]/10 hover:text-[#dcae4d]"
                  >
                    <X size={16} strokeWidth={1.8} />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 pb-1 pt-4">
                  <span className="h-px flex-1 bg-white/10" />
                  <svg
                    width="22"
                    height="12"
                    viewBox="0 0 26 14"
                    fill="none"
                    className="text-[#dcae4d]"
                  >
                    <path
                      d="M0 7C6 7 6 1 13 1C20 1 20 7 26 7C20 7 20 13 13 13C6 13 6 7 0 7Z"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <p
                  className="pb-2 text-center text-[11px] uppercase tracking-[0.25em] text-[#dcae4d]/80"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Milliy taomlar restorani
                </p>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {navLinks.map((link, index) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="group block"
                  >
                    {({ isActive }) => (
                      <div
                        className={`flex items-baseline gap-3 border-b border-white/5 py-3.5 transition-all duration-500 ${
                          menuOpen
                            ? "translate-x-0 opacity-100"
                            : "translate-x-4 opacity-0"
                        }`}
                        style={{
                          transitionDelay: menuOpen
                            ? `${index * 60 + 150}ms`
                            : "0ms",
                          transitionTimingFunction:
                            "cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      >
                        <span
                          className="shrink-0 text-[12px] italic text-[#dcae4d]/60"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span
                          className={`shrink-0 text-[21px] font-medium leading-none transition-colors duration-300 ${
                            isActive
                              ? "text-[#dcae4d]"
                              : "text-neutral-200 group-hover:text-[#dcae4d]"
                          }`}
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {link.name}
                        </span>

                        <span className="mx-1 h-px flex-1 self-center border-b border-dotted border-white/10" />

                        <ArrowUpRight
                          size={15}
                          strokeWidth={1.8}
                          className={`shrink-0 text-[#dcae4d] transition-all duration-300 ${
                            isActive
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }`}
                        />
                      </div>
                    )}
                  </NavLink>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openAuthModal("kirish");
                  }}
                  className={`group my-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-[#6d531f] px-5 py-3 text-[12px] font-medium text-[#dcae4d] transition-all duration-300 hover:bg-[#dcae4d] hover:text-black lg:hidden ${
                    menuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: menuOpen
                      ? `${navLinks.length * 60 + 180}ms`
                      : "0ms",
                  }}
                >
                  <LogIn size={15} strokeWidth={1.8} />
                  <span>KIRISH</span>
                </button>
              </nav>

              <div
                className={`shrink-0 border-t border-white/10 bg-[#070809] px-6 py-4 transition-all duration-500 ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
                style={{
                  transitionDelay: menuOpen
                    ? `${navLinks.length * 60 + 220}ms`
                    : "0ms",
                }}
              >
                <div className="flex flex-col gap-2.5">
                  <a
                    href="tel:+998900000000"
                    className="flex items-center gap-2.5 text-[13px] text-neutral-300 transition-colors duration-300 hover:text-[#dcae4d]"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#dcae4d]">
                      <Phone size={13} strokeWidth={1.8} />
                    </div>
                    <span>+998 90 000 00 00</span>
                  </a>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex flex-col gap-1 text-[11px] text-neutral-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-[#dcae4d]" />
                        <span>Samarqand, O'zbekiston</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-500">
                        <Clock size={12} className="text-[#dcae4d]/70" />
                        <span>10:00 – 23:00</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href="#"
                        aria-label="Instagram"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#dcae4d] transition-all duration-300 hover:border-[#dcae4d] hover:bg-[#dcae4d]/20"
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.8}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        aria-label="Telegram"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#dcae4d] transition-all duration-300 hover:border-[#dcae4d] hover:bg-[#dcae4d]/20"
                      >
                        <Send size={13} strokeWidth={1.8} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </>,
        document.body
      )}
    </>
  );
}

export default Header;