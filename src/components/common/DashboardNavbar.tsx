import React, { useState } from "react";
import { Search, Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";

// 1. NavbarProps interfeysiga optional user obyektini qo'shamiz
interface NavbarProps {
  onToggleSidebar?: () => void;
  headerTitle: string;
  breadcrumb?: string[];
  headerSearch?: string;
  setHeaderSearch?: (val: string) => void;
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
  user?: {
    name?: string;
    role?: string;
  };
}

export function Navbar({
  onToggleSidebar,
  headerTitle,
  breadcrumb = [],
  headerSearch = "",
  setHeaderSearch,
  onLogout,
  onNavigate,
  // 2. Default qiymat sifatida "Manager" / "Menejer" berib qo'yamiz
  user = {
    name: "Manager",
    role: "Menejer",
  },
}: NavbarProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Ismning birinchi harfini Avatar uchun olish
  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "M";

  return (
    <header className="h-16 bg-[#111113] border-b border-white/5 px-4 md:px-6 flex items-center justify-between gap-4 shrink-0">
      {/* Chap tomondagi sarlavha va breadcrumb */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

        <div>
          <h1 className="text-base font-semibold text-white">{headerTitle}</h1>
          {breadcrumb.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              {breadcrumb.map((item, index) => (
                <React.Fragment key={index}>
                  <span>{item}</span>
                  {index < breadcrumb.length - 1 && <span>/</span>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* O'ng tomondagi qidiruv, bildirishnoma va profil */}
      <div className="flex items-center gap-3 md:gap-4">
        {setHeaderSearch && (
          <div className="relative hidden sm:block w-48 md:w-64">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              placeholder="Qidirish..."
              className="w-full pl-9 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>
        )}

        {/* Bildirishnoma tugmasi */}
        <button className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
        </button>

        {/* User Profil menyusi */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-black font-bold text-sm shadow-md">
              {userInitial}
            </div>

            <div className="text-left hidden md:block">
              <p className="text-xs font-semibold text-white leading-tight">
                {user.name}
              </p>
              <p className="text-[10px] text-gray-400 leading-tight mt-0.5">
                {user.role}
              </p>
            </div>

            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {/* Profil Dropdown Menyusi */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#161619] border border-white/10 rounded-2xl shadow-xl py-1.5 z-50">
              {onNavigate && (
                <button
                  onClick={() => {
                    onNavigate("sozlamalar");
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                >
                  <Settings size={14} />
                  Sozlamalar
                </button>
              )}

              {onLogout && (
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <LogOut size={14} />
                  Chiqish
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}