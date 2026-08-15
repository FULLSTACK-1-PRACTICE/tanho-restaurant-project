import {
  Bell,
  CalendarDays,
  Heart,
  Home,
  LogOut,
  MapPin,
  Menu,
  MessageSquare,
  Settings,
  ShoppingBag,
  User,
  WalletCards,
  X,
} from "lucide-react";

import { useState } from "react";
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
  {
    title: "Manzilim",
    path: "/user/manzil",
    icon: MapPin,
  },
  {
    title: "To'lov usullarim",
    path: "/user/tolovlar",
    icon: WalletCards,
  },
  {
    title: "Takliflarim",
    path: "/user/takliflar",
    icon: MessageSquare,
  },
  {
    title: "Sozlamalar",
    path: "/user/sozlamalar",
    icon: Settings,
  },
];

export default function UserLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#050708] text-white">
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-[250px]
          flex-col
          border-r border-[#242629]
          bg-[#080a0b]
          transition-transform duration-300
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
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
            onClick={() => setMobileOpen(false)}
            className="ml-auto text-[#777] lg:hidden"
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
                    group flex h-[46px] items-center gap-3 rounded-md
                    px-4 text-[13px]
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#1c1b18] text-[#e0ad50]"
                        : "text-[#929292] hover:bg-[#111314] hover:text-[#dcae4d]"
                    }
                    `
                  }
                >
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className="shrink-0"
                  />

                  <span>{item.title}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* LOGOUT */}
        <div className="border-t border-[#242629] p-4">
          <button
            onClick={handleLogout}
            className="group flex h-[46px] w-full items-center gap-3 rounded-md px-4 text-[13px] text-[#929292] transition-all hover:bg-[#171211] hover:text-[#e06b50]"
          >
            <LogOut
              size={18}
              strokeWidth={1.5}
              className="transition-transform group-hover:-translate-x-1"
            />

            <span>Chiqish</span>
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="min-h-screen lg:pl-[250px]">
        {/* TOP NAVBAR */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-[#242629] bg-[#080a0b]/95 px-5 backdrop-blur-md lg:px-8">
          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-md border border-[#292929] p-2 text-[#aaa] transition hover:border-[#8e6b2c] hover:text-[#dcae4d] lg:hidden"
          >
            <Menu size={21} />
          </button>

          <div />

          {/* RIGHT SIDE */}
          <div className="ml-auto flex items-center gap-5">
            {/* NOTIFICATION */}
            <button className="relative text-[#aaa] transition hover:text-[#dcae4d]">
              <Bell size={21} strokeWidth={1.5} />

              <span className="absolute -right-1 -top-1 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#d95043] px-1 text-[8px] text-white">
                3
              </span>
            </button>

            {/* USER */}
            <button className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#806329] bg-[#1b1b1b]">
                <User
                  size={20}
                  className="text-[#dcae4d]"
                  strokeWidth={1.4}
                />
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-[13px] font-medium text-white">
                  Asadbek Saidov
                </p>

                <p className="mt-0.5 text-[10px] text-[#777]">
                  asadbek@gmail.com
                </p>
              </div>

              <span className="hidden text-[#777] sm:block">
                ⌄
              </span>
            </button>
          </div>
        </header>

        {/* PAGE */}
        <main className="min-h-[calc(100vh-76px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}