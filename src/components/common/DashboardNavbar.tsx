import React, { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { Search, Bell, ChevronDown, LogOut, UserCircle, Settings, Menu } from "lucide-react";

export interface DashboardUser {
  name?: string;
  role?: string;
  avatar?: string;
}

export interface DashboardNavbarProps {
  title?: string;
  headerTitle?: string;
  breadcrumb?: string[];
  searchValue?: string;
  headerSearch?: string;
  onSearchChange?: (value: string) => void;
  setHeaderSearch?: (value: string) => void;
  onToggleSidebar?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onProfile?: () => void;
  onSettings?: () => void;
  onNavigate?: (page: string) => void;
  user?: DashboardUser;
  notificationCount?: number;
  actions?: ReactNode;
}

export function DashboardNavbar({
  title,
  headerTitle,
  breadcrumb = [],
  searchValue,
  headerSearch = "",
  onSearchChange,
  setHeaderSearch,
  onToggleSidebar,
  onLogout,
  onProfileClick,
  onSettingsClick,
  onProfile,
  onSettings,
  onNavigate,
  user = {
    name: "Admin",
    role: "Administrator",
  },
  notificationCount = 0,
  actions,
}: DashboardNavbarProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayTitle = title ?? headerTitle ?? "Admin Dashboard";
  const currentSearchValue = searchValue ?? headerSearch;
  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "A";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onSearchChange) {
      onSearchChange(value);
    } else if (setHeaderSearch) {
      setHeaderSearch(value);
    }
  };

  const handleProfileClick = () => {
    setProfileDropdownOpen(false);
    if (onProfile) {
      onProfile();
    } else if (onProfileClick) {
      onProfileClick();
    } else if (onNavigate) {
      onNavigate("profil");
    }
  };

  const handleSettingsClick = () => {
    setProfileDropdownOpen(false);
    if (onSettings) {
      onSettings();
    } else if (onSettingsClick) {
      onSettingsClick();
    } else if (onNavigate) {
      onNavigate("sozlamalar");
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#0d1114] px-4 md:px-6">
      <div className="flex items-center gap-3 md:gap-4">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="cursor-pointer rounded-lg p-2 text-gray-300 transition-colors hover:bg-[#191e22] hover:text-white"
            aria-label="Toggle Sidebar"
          >
            <Menu size={20} />
          </button>
        )}

        <div>
          <h1 className="text-base font-semibold text-white md:text-lg">
            {displayTitle}
          </h1>

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

      <div className="flex items-center gap-3 md:gap-4">
        {(onSearchChange || setHeaderSearch) && (
          <div className="relative hidden md:block w-48 lg:w-64">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={currentSearchValue}
              onChange={handleSearchChange}
              placeholder="Qidirish..."
              className="w-full rounded-lg border border-white/10 bg-[#121619] py-2 pl-9 pr-3 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-[#d9a441]/50"
            />
          </div>
        )}

        {actions}

        <button
          type="button"
          className="relative cursor-pointer rounded-lg p-2 text-gray-300 transition-colors hover:bg-[#191e22] hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            {notificationCount}
          </span>
        </button>

        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setProfileDropdownOpen((prev) => !prev)}
            className="flex cursor-pointer items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-[#191e22]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9a441] text-sm font-semibold text-black shadow-sm">
              {userInitial}
            </div>

            <div className="hidden text-left text-sm sm:block">
              <div className="font-medium text-white leading-tight">
                {user.name}
              </div>
              <div className="text-xs text-gray-400 leading-tight">
                {user.role}
              </div>
            </div>

            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform duration-200 ${
                profileDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-48 overflow-hidden rounded-xl border border-white/10 bg-[#121619] shadow-xl py-1">
              <button
                type="button"
                onClick={handleProfileClick}
                className="flex w-full cursor-pointer items-center gap-2.5 px-4 py-2.5 text-left text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                <UserCircle size={16} />
                <span>Profil</span>
              </button>

              <button
                type="button"
                onClick={handleSettingsClick}
                className="flex w-full cursor-pointer items-center gap-2.5 px-4 py-2.5 text-left text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Settings size={16} />
                <span>Sozlamalar</span>
              </button>

              {onLogout && (
                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onLogout();
                  }}
                  className="flex w-full cursor-pointer items-center gap-2.5 px-4 py-2.5 text-left text-sm text-red-400 transition-colors hover:bg-red-500/10"
                >
                  <LogOut size={16} />
                  <span>Chiqish</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export { DashboardNavbar as Navbar };
export default DashboardNavbar;