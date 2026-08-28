import React, { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { Search, Bell, ChevronDown, LogOut, UserCircle, Settings, Menu } from "lucide-react";

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface SearchResultItem {
  id: number | string;
  title: string;
  category?: string;
  link?: string;
}

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
  searchResults?: SearchResultItem[];
  onSearchResultClick?: (item: SearchResultItem) => void;
  activeTab?: string; // Hozir qaysi sahifadaligini bilish uchun (masalan "profil" yoki "sozlamalar")
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
  actions,
  searchResults = [],
  onSearchResultClick,
  activeTab,
}: DashboardNavbarProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const displayTitle = title ?? headerTitle ?? "Admin Dashboard";
  const currentSearchValue = searchValue ?? headerSearch;
  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "A";

  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(() => {
      if (isMounted) {
        setNotifications([]);
        setLoading(false);
      }
    }, 0);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = async () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, read: true }))
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationDropdownOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchDropdownOpen(false);
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
    setSearchDropdownOpen(true);
  };

  const handleProfileClick = () => {
    setProfileDropdownOpen(false); // Dropdown yopiladi
    if (onProfile) {
      onProfile();
    } else if (onProfileClick) {
      onProfileClick();
    } else if (onNavigate) {
      onNavigate("profil");
    }
  };

  const handleSettingsClick = () => {
    setProfileDropdownOpen(false); // Dropdown yopiladi
    if (onSettings) {
      onSettings();
    } else if (onSettingsClick) {
      onSettingsClick();
    } else if (onNavigate) {
      onNavigate("sozlamalar");
    }
  };

  // Profil yoki Sozlamalar sahifasida turgan bo'lsa, asosiy profil tugmasini active holatda ko'rsatish
  const isProfileActive = activeTab === "profil" || activeTab === "sozlamalar";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#0d1114] px-4 md:px-6">
      <div className="flex items-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="cursor-pointer rounded-lg p-2 text-gray-300 transition-colors hover:bg-[#191e22] hover:text-white"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

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
          <div ref={searchRef} className="relative hidden md:block w-48 lg:w-64">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={currentSearchValue}
              onChange={handleSearchChange}
              onFocus={() => setSearchDropdownOpen(true)}
              placeholder="Qidirish..."
              className="w-full rounded-lg border border-white/10 bg-[#121619] py-2 pl-9 pr-3 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-[#d9a441]/50"
            />

            {searchDropdownOpen && currentSearchValue.trim().length > 0 && (
              <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-xl border border-white/10 bg-[#121619] shadow-xl py-1">
                {searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSearchDropdownOpen(false);
                        if (onSearchResultClick) onSearchResultClick(item);
                      }}
                      className="flex w-full cursor-pointer flex-col items-start px-4 py-2.5 text-left text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <span className="font-medium text-gray-200">{item.title}</span>
                      {item.category && (
                        <span className="text-[10px] text-gray-500">{item.category}</span>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-center text-xs text-gray-500">
                    Ma'lumot topilmadi
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {actions}

        {/* Notification */}
        <div ref={notificationRef} className="relative">
          <button
            type="button"
            onClick={() => setNotificationDropdownOpen((prev) => !prev)}
            className="relative cursor-pointer rounded-lg p-2 text-gray-300 transition-colors hover:bg-[#191e22] hover:text-white"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationDropdownOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-80 rounded-xl border border-white/10 bg-[#121619] shadow-xl overflow-hidden">
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-semibold text-sm text-white">Xabarlar</h3>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="text-xs text-[#d9a441] hover:underline transition-colors"
                  >
                    Hammasini o'qilgan qilish
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                {loading ? (
                  <div className="p-4 text-center text-xs text-gray-400">
                    Yuklanmoqda...
                  </div>
                ) : notifications.length > 0 ? (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 transition-colors hover:bg-white/5 ${
                        !item.read ? "bg-white/[0.02]" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm text-gray-200">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{item.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-gray-500">
                    Yangi xabarlar yo'q
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profil Tugmasi va Menyusi */}
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => setProfileDropdownOpen((prev) => !prev)}
            className={`flex cursor-pointer items-center gap-2 rounded-xl p-1.5 transition-all outline-none ${
              profileDropdownOpen || isProfileActive
                ? "bg-[#191e22] ring-2 ring-white/30 border border-white/40"
                : "border border-transparent hover:bg-[#191e22]"
            }`}
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
                className={`flex w-full cursor-pointer items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-all ${
                  activeTab === "profil"
                    ? "bg-white/15 text-white font-medium"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <UserCircle size={16} />
                <span>Profil</span>
              </button>

              <button
                type="button"
                onClick={handleSettingsClick}
                className={`flex w-full cursor-pointer items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-all ${
                  activeTab === "sozlamalar"
                    ? "bg-white/15 text-white font-medium"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
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
                  className="flex w-full cursor-pointer items-center gap-2.5 px-4 py-2.5 text-left text-sm text-red-400 transition-all hover:bg-red-500/10"
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