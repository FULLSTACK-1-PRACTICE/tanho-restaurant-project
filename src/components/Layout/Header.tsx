import { LogIn } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/Logo-2.png";

function Header() {
  const navLinks = [
    {
      name: "Bosh sahifa",
      path: "/",
    },
    {
      name: "Menyu",
      path: "/menu",
    },
    {
      name: "Biz haqimizda",
      path: "/about",
    },
    {
      name: "Tadbirlar",
      path: "/events",
    },
    {
      name: "Yangiliklar",
      path: "/news",
    },
    {
      name: "Aloqa",
      path: "/contact",
    },
  ];

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <div className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between px-5">

        {/* LOGO */}
        <Link
          to="/"
          className="shrink-0 cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
        >
          <img
            src={logo}
            alt="Tanho Restaurant"
            className="h-[90px] w-auto object-contain"
          />
        </Link>

        {/* NAVBAR */}
        <nav className="flex items-center gap-8">
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
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* LOGIN */}
        <Link
          to="/login"
          className="group flex cursor-pointer items-center gap-2 rounded-md border border-[#6d531f] px-5 py-2.5 text-[12px] font-medium text-[#dcae4d] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dcae4d] hover:bg-[#dcae4d] hover:text-black hover:shadow-[0_6px_20px_rgba(220,174,77,0.18)]"
        >
          <LogIn
            size={15}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />

          <span>KIRISH</span>
        </Link>

      </div>
    </header>
  );
}

export default Header;