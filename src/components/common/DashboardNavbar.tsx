import React, { useRef, useState } from "react";
import { Search, Bell, User, Settings, LogOut, ChevronDown, Menu, ChevronRight } from "lucide-react";

interface NavbarProps {
  onToggleSidebar: () => void;
  headerTitle: string;
  breadcrumb: string[];
  headerSearch: string;
  setHeaderSearch: (val: string) => void;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export function Navbar({
  onToggleSidebar,
  headerTitle,
  breadcrumb,
  headerSearch,
  setHeaderSearch,
  onLogout,
  onNavigate,
}: NavbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [notifCount, setNotifCount] = useState(3);

  const notifRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);

  return (
    <header className="h-[72px] shrink-0 border-b border-white/5 bg-[#0a0a0b]/95 backdrop-blur flex items-center justify-between px-4 md:px-6 gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0 hidden sm:block">
          <h1 className="text-lg font-semibold text-white truncate">
            {headerTitle}
          </h1>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 truncate">
            {breadcrumb.map((item, index) => (
              <span key={index} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight size={11} />}
                <span className={index === breadcrumb.length - 1 ? "text-amber-400" : ""}>
                  {item}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={headerSearch}
            onChange={(e) => setHeaderSearch(e.target.value)}
            placeholder="Qidirish..."
            className="w-64 bg-[#141416] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/40 transition-colors"
          />
        </div>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setAdminOpen(false);
              if (!notifOpen) setNotifCount(0);
            }}
            className="relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Bell size={19} />
            {notifCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-[10px] font-bold text-black flex items-center justify-center">
                {notifCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#141416] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-white/10 text-sm font-semibold text-white">
                Bildirishnomalar
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
                {[
                  { t: "Yangi buyurtma qabul qilindi", s: "2 daqiqa oldin" },
                  { t: "“Tovuq BBQ” mavjud emas deb belgilandi", s: "1 soat oldin" },
                  { t: "Yangi bron so‘rovi keldi", s: "3 soat oldin" },
                ].map((item, index) => (
                  <div key={index} className="px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer">
                    <p className="text-sm text-gray-200">{item.t}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.s}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={adminRef}>
          <button
            onClick={() => {
              setAdminOpen((prev) => !prev);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-black font-bold text-sm shrink-0">
              A
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-white leading-tight">Admin</p>
              <p className="text-xs text-gray-500 leading-tight">Administrator</p>
            </div>
            <ChevronDown size={14} className="text-gray-500" />
          </button>

          {adminOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-[#141416] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 py-1">
              <button
                onClick={() => {
                  setAdminOpen(false);
                  onNavigate("profil");
                }}
                className="w-full flex items-center gap-2.5 text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
              >
                <User size={15} /> Profil
              </button>
              <button
                onClick={() => {
                  setAdminOpen(false);
                  onNavigate("sozlamalar");
                }}
                className="w-full flex items-center gap-2.5 text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
              >
                <Settings size={15} /> Sozlamalar
              </button>
              <div className="h-px bg-white/10 my-1" />
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2.5 text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <LogOut size={15} /> Chiqish
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}