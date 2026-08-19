import {
  Bell,
  CalendarDays,
  ChevronDown,
  Heart,
  Home,
  LogOut,
  Menu,
  Settings,
  ShoppingBag,
  User,
  X,
  Lightbulb,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const menuItems = [
  {
    title: "Bosh sahifa",
    path: "/user",
    icon: Home,
  },
  {
    title: "Mening profilim",
    path: "/user/profil",
    icon: User,
  },
  {
    title: "Mening buyurtmalarim",
    path: "/user/buyurtmalar",
    icon: ShoppingBag,
  },
  {
    title: "Sevimlilarim",
    path: "/user/sevimlilar",
    icon: Heart,
  },
  {
    title: "Stol band qilishlarim",
    path: "/user/stollar",
    icon: CalendarDays,
  },
];

export default function UserLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();

  const userMenuRef = useRef<HTMLDivElement>(null);

  // =========================
  // TASHQARISINI BOSGANDA YOPISH
  // =========================

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");

    setUserMenuOpen(false);

    navigate("/login");
  };

  // =========================
  // USER MENU NAVIGATION
  // =========================

  const handleUserNavigate = (path: string) => {
    setUserMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#050708] text-white">

      {/* =========================
          MOBILE OVERLAY
      ========================= */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-[250px]
          flex-col
          border-r border-[#242629]
          bg-[#080a0b]
          transition-transform duration-300
          lg:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* LOGO */}

        <div className="flex h-[100px] items-center px-8">

          <div>
            <div className="font-serif text-[28px] tracking-[2px] text-[#dcae4d]">
              TANHO
            </div>

            <div className="mt-[-4px] text-[9px] font-medium tracking-[4px] text-[#dcae4d]">
              — RESTAURANT —
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="
              ml-auto
              cursor-pointer
              text-[#777]
              transition-all
              duration-300
              hover:rotate-90
              hover:text-[#dcae4d]
              lg:hidden
            "
          >
            <X size={22} />
          </button>

        </div>

        {/* MENU */}

        <nav className="flex-1 overflow-y-auto px-4 py-5">

          <div className="space-y-1">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/user"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `
                    group
                    flex
                    h-[46px]
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-md
                    px-4
                    text-[13px]
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "bg-[#1c1b18] text-[#e0ad50] shadow-[inset_3px_0_0_#dcae4d]"
                        : "text-[#929292] hover:translate-x-1 hover:bg-[#111314] hover:text-[#dcae4d]"
                    }
                    `
                  }
                >

                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className="
                      shrink-0
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />

                  <span>{item.title}</span>

                </NavLink>
              );
            })}

          </div>

        </nav>

        {/* SIDEBAR LOGOUT */}

        <div className="border-t border-[#242629] p-4">

          <button
            type="button"
            onClick={handleLogout}
            className="
              group
              flex
              h-[46px]
              w-full
              cursor-pointer
              items-center
              gap-3
              rounded-md
              px-4
              text-[13px]
              text-[#929292]
              transition-all
              duration-300
              hover:translate-x-1
              hover:bg-[#171211]
              hover:text-[#e06b50]
            "
          >

            <LogOut
              size={18}
              strokeWidth={1.5}
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />

            <span>Chiqish</span>

          </button>

        </div>

      </aside>

      {/* =========================
          MAIN AREA
      ========================= */}

      <div className="min-h-screen lg:pl-[250px]">

        {/* =========================
            TOP NAVBAR
        ========================= */}

        <header
          className="
            sticky
            top-0
            z-30
            flex
            h-[76px]
            items-center
            justify-between
            border-b
            border-[#242629]
            bg-[#080a0b]/95
            px-5
            backdrop-blur-md
            lg:px-8
          "
        >

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="
              cursor-pointer
              rounded-md
              border
              border-[#292929]
              p-2
              text-[#aaa]
              transition-all
              duration-300
              hover:border-[#8e6b2c]
              hover:bg-[#15130f]
              hover:text-[#dcae4d]
              hover:scale-105
              active:scale-95
              lg:hidden
            "
          >
            <Menu size={21} />
          </button>

          <div />

          {/* =========================
              RIGHT SIDE
          ========================= */}

          <div className="ml-auto flex items-center gap-5">

            {/* NOTIFICATION */}

            <button
              type="button"
              className="
                relative
                cursor-pointer
                text-[#aaa]
                transition-all
                duration-300
                hover:scale-110
                hover:text-[#dcae4d]
              "
            >

              <Bell
                size={21}
                strokeWidth={1.5}
                className="transition-transform duration-300 hover:rotate-12"
              />

              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-[15px]
                  min-w-[15px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#d95043]
                  px-1
                  text-[8px]
                  text-white
                "
              >
                3
              </span>

            </button>

            {/* =========================
                USER BUTTON + DROPDOWN
            ========================= */}

            <div
              ref={userMenuRef}
              className="relative"
            >

              {/* USER TOP BUTTON */}

              <button
                type="button"
                onClick={() =>
                  setUserMenuOpen((value) => !value)
                }
                className={`
                  group
                  flex
                  cursor-pointer
                  items-center
                  gap-3
                  rounded-xl
                  px-2
                  py-2
                  transition-all
                  duration-300
                  ${
                    userMenuOpen
                      ? "bg-[#151513]"
                      : "hover:bg-[#111314]"
                  }
                `}
              >

                {/* AVATAR */}

                <div
                  className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border
                    bg-[#1b1b1b]
                    transition-all
                    duration-300
                    ${
                      userMenuOpen
                        ? "border-[#dcae4d] shadow-[0_0_20px_rgba(220,174,77,0.15)]"
                        : "border-[#806329] group-hover:border-[#dcae4d]"
                    }
                  `}
                >

                  <User
                    size={20}
                    className="
                      text-[#dcae4d]
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                    strokeWidth={1.4}
                  />

                </div>

                {/* USER INFO */}

                <div className="hidden text-left sm:block">

                  <p
                    className="
                      text-[13px]
                      font-medium
                      text-white
                      transition-colors
                      duration-300
                      group-hover:text-[#dcae4d]
                    "
                  >
                    Asadbek Saidov
                  </p>

                  <p className="mt-0.5 text-[10px] text-[#777]">
                    asadbek@gmail.com
                  </p>

                </div>

                {/* CHEVRON */}

                <ChevronDown
                  size={16}
                  strokeWidth={1.5}
                  className={`
                    hidden
                    text-[#777]
                    transition-all
                    duration-300
                    sm:block
                    ${
                      userMenuOpen
                        ? "rotate-180 text-[#dcae4d]"
                        : "group-hover:text-[#dcae4d]"
                    }
                  `}
                />

              </button>

              {/* =========================
                  USER DROPDOWN
              ========================= */}

              <div
                className={`
                  absolute
                  right-0
                  top-[calc(100%+12px)]
                  w-[245px]
                  origin-top-right
                  rounded-xl
                  border
                  border-[#292929]
                  bg-[#0b0d0e]
                  p-2
                  shadow-[0_20px_50px_rgba(0,0,0,0.45)]
                  transition-all
                  duration-300
                  ${
                    userMenuOpen
                      ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                      : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                  }
                `}
              >

                {/* DROPDOWN HEADER */}

                <div
                  className="
                    mb-2
                    border-b
                    border-[#242629]
                    px-3
                    pb-3
                    pt-2
                  "
                >

                  <p className="text-[12px] font-medium text-white">
                    Asadbek Saidov
                  </p>

                  <p className="mt-1 text-[10px] text-[#666]">
                    asadbek@gmail.com
                  </p>

                </div>

                {/* PROFILE */}

                <button
                  type="button"
                  onClick={() =>
                    handleUserNavigate("/user/profil")
                  }
                  className="
                    group
                    flex
                    w-full
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-[12px]
                    text-[#999]
                    transition-all
                    duration-300
                    hover:translate-x-1
                    hover:bg-[#171713]
                    hover:text-[#dcae4d]
                  "
                >

                  <User
                    size={17}
                    strokeWidth={1.5}
                    className="
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />

                  <span>Mening profilim</span>

                </button>

                {/* SOZLAMALAR */}

                <button
                  type="button"
                  onClick={() =>
                    handleUserNavigate("/user/sozlamalar")
                  }
                  className="
                    group
                    flex
                    w-full
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-[12px]
                    text-[#999]
                    transition-all
                    duration-300
                    hover:translate-x-1
                    hover:bg-[#171713]
                    hover:text-[#dcae4d]
                  "
                >

                  <Settings
                    size={17}
                    strokeWidth={1.5}
                    className="
                      transition-transform
                      duration-500
                      group-hover:rotate-90
                    "
                  />

                  <span>Sozlamalar</span>

                </button>

                {/* TAKLIFLARIM */}

                <button
                  type="button"
                  onClick={() =>
                    handleUserNavigate("/user/takliflar")
                  }
                  className="
                    group
                    flex
                    w-full
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-[12px]
                    text-[#999]
                    transition-all
                    duration-300
                    hover:translate-x-1
                    hover:bg-[#171713]
                    hover:text-[#dcae4d]
                  "
                >

                  <Lightbulb
                    size={17}
                    strokeWidth={1.5}
                    className="
                      transition-transform
                      duration-300
                      group-hover:scale-110
                      group-hover:rotate-6
                    "
                  />

                  <span>Takliflarim</span>

                </button>

                {/* DIVIDER */}

                <div className="my-2 h-px bg-[#242629]" />

                {/* LOGOUT */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    group
                    flex
                    w-full
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-[12px]
                    text-[#999]
                    transition-all
                    duration-300
                    hover:translate-x-1
                    hover:bg-[#211513]
                    hover:text-[#e06b50]
                  "
                >

                  <LogOut
                    size={17}
                    strokeWidth={1.5}
                    className="
                      transition-transform
                      duration-300
                      group-hover:-translate-x-1
                    "
                  />

                  <span>Chiqish</span>

                </button>

              </div>

            </div>

          </div>

        </header>

        {/* =========================
            PAGE
        ========================= */}

        <main className="min-h-[calc(100vh-76px)]">
          <Outlet />
        </main>

      </div>

    </div>
  );
}