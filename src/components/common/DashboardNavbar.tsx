import React, { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  UserCircle,
  Settings,
  Menu,
  X,
  CheckCheck,
} from "lucide-react";

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
  activeTab?: string;
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
  const [notificationSidebarOpen, setNotificationSidebarOpen] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const displayTitle = title ?? headerTitle ?? "Admin Dashboard";
  const currentSearchValue = searchValue ?? headerSearch;

  const userInitial = user.name
    ? user.name.charAt(0).toUpperCase()
    : "A";

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              read: true,
            }
          : item
      )
    );
  };

  const closeNotifications = () => {
    setNotificationDropdownOpen(false);
    setNotificationSidebarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        profileRef.current &&
        !profileRef.current.contains(target)
      ) {
        setProfileDropdownOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setNotificationDropdownOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(target)
      ) {
        setSearchDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  useEffect(() => {
    if (notificationSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [notificationSidebarOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNotificationSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    if (onSearchChange) {
      onSearchChange(value);
    } else if (setHeaderSearch) {
      setHeaderSearch(value);
    }

    setSearchDropdownOpen(true);
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

  const toggleDesktopNotifications = () => {
    setNotificationDropdownOpen((prev) => !prev);
  };

  const openMobileNotifications = () => {
    setNotificationSidebarOpen(true);
  };

  const isProfileActive =
    activeTab === "profil" ||
    activeTab === "sozlamalar";

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#0d1114] px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="cursor-pointer rounded-lg p-2 text-gray-300 transition-colors hover:bg-[#191e22] hover:text-white"
            aria-label="Toggle Sidebar"
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-white md:text-lg">
              {displayTitle}
            </h1>

            {breadcrumb.length > 0 && (
              <div className="hidden items-center gap-1.5 text-xs text-gray-400 sm:flex">
                {breadcrumb.map((item, index) => (
                  <React.Fragment key={index}>
                    <span>{item}</span>

                    {index < breadcrumb.length - 1 && (
                      <span>/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {(onSearchChange || setHeaderSearch) && (
            <div
              ref={searchRef}
              className="relative hidden w-48 md:block lg:w-64"
            >
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                value={currentSearchValue}
                onChange={handleSearchChange}
                onFocus={() =>
                  setSearchDropdownOpen(true)
                }
                placeholder="Qidirish..."
                className="w-full rounded-lg border border-white/10 bg-[#121619] py-2 pl-9 pr-3 text-sm text-white outline-none placeholder:text-gray-500 transition-colors focus:border-[#d9a441]/50"
              />

              {searchDropdownOpen &&
                currentSearchValue.trim().length > 0 && (
                  <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-xl border border-white/10 bg-[#121619] py-1 shadow-xl">
                    {searchResults.length > 0 ? (
                      searchResults.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setSearchDropdownOpen(false);

                            if (onSearchResultClick) {
                              onSearchResultClick(item);
                            }
                          }}
                          className="flex w-full cursor-pointer flex-col items-start px-4 py-2.5 text-left text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          <span className="font-medium text-gray-200">
                            {item.title}
                          </span>

                          {item.category && (
                            <span className="text-[10px] text-gray-500">
                              {item.category}
                            </span>
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

          <div
            ref={notificationRef}
            className="relative"
          >
            <button
              type="button"
              onClick={toggleDesktopNotifications}
              className="relative hidden cursor-pointer rounded-lg p-2 text-gray-300 transition-colors hover:bg-[#191e22] hover:text-white md:block"
              aria-label="Notifications"
            >
              <Bell size={20} />

              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={openMobileNotifications}
              className="relative cursor-pointer rounded-lg p-2 text-gray-300 transition-colors hover:bg-[#191e22] hover:text-white md:hidden"
              aria-label="Notifications"
            >
              <Bell size={20} />

              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 hidden w-80 overflow-hidden rounded-xl border border-white/10 bg-[#121619] shadow-2xl md:block">
                <div className="flex items-center justify-between border-b border-white/10 p-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Xabarlar
                    </h3>

                    {unreadCount > 0 && (
                      <p className="mt-0.5 text-[10px] text-gray-500">
                        {unreadCount} ta o'qilmagan xabar
                      </p>
                    )}
                  </div>

                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="flex cursor-pointer items-center gap-1 text-xs text-[#d9a441] transition-colors hover:text-[#e7b85c]"
                    >
                      <CheckCheck size={14} />
                      <span>O'qildi</span>
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                  {notifications.length > 0 ? (
                    notifications.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          markNotificationAsRead(item.id)
                        }
                        className={`block w-full cursor-pointer p-3.5 text-left transition-colors hover:bg-white/5 ${
                          !item.read
                            ? "bg-white/[0.025]"
                            : ""
                        }`}
                      >
                        <div className="mb-1 flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            {!item.read && (
                              <span className="h-2 w-2 shrink-0 rounded-full bg-[#d9a441]" />
                            )}

                            <span className="text-sm font-medium text-gray-200">
                              {item.title}
                            </span>
                          </div>

                          <span className="shrink-0 text-[10px] text-gray-500">
                            {item.time}
                          </span>
                        </div>

                        <p className="text-xs leading-relaxed text-gray-400">
                          {item.message}
                        </p>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-10 text-center">
                      <Bell
                        size={30}
                        className="mx-auto mb-3 text-gray-600"
                      />

                      <p className="text-xs text-gray-500">
                        Yangi xabarlar yo'q
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div
            ref={profileRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() =>
                setProfileDropdownOpen((prev) => !prev)
              }
              className={`flex cursor-pointer items-center gap-2 rounded-xl p-1.5 outline-none transition-all ${
                profileDropdownOpen || isProfileActive
                  ? "border border-white/40 bg-[#191e22] ring-2 ring-white/30"
                  : "border border-transparent hover:bg-[#191e22]"
              }`}
            >
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#d9a441] text-sm font-semibold text-black shadow-sm">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  userInitial
                )}
              </div>

              <div className="hidden text-left text-sm sm:block">
                <div className="leading-tight font-medium text-white">
                  {user.name}
                </div>

                <div className="leading-tight text-xs text-gray-400">
                  {user.role}
                </div>
              </div>

              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${
                  profileDropdownOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-48 overflow-hidden rounded-xl border border-white/10 bg-[#121619] py-1 shadow-xl">
                <button
                  type="button"
                  onClick={handleProfileClick}
                  className={`flex w-full cursor-pointer items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-all ${
                    activeTab === "profil"
                      ? "bg-white/15 font-medium text-white"
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
                      ? "bg-white/15 font-medium text-white"
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

      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 md:hidden ${
          notificationSidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close notifications"
          onClick={closeNotifications}
          className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-[2px]"
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col border-l border-white/10 bg-[#0d1114] shadow-2xl transition-transform duration-300 ease-in-out ${
            notificationSidebarOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4">
            <div>
              <h2 className="text-base font-semibold text-white">
                Xabarlar
              </h2>

              <p className="mt-0.5 text-[11px] text-gray-500">
                {notifications.length > 0
                  ? `${notifications.length} ta xabar`
                  : "Notificationlar"}
              </p>
            </div>

            <button
              type="button"
              onClick={closeNotifications}
              className="group cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close notifications"
            >
              <X size={20} className="transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          {unreadCount > 0 && (
            <div className="flex shrink-0 items-center justify-between border-b border-white/5 px-4 py-3">
              <span className="text-xs text-gray-400">
                {unreadCount} ta o'qilmagan
              </span>

              <button
                type="button"
                onClick={markAllAsRead}
                className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-[#d9a441] transition-colors hover:text-[#e7b85c]"
              >
                <CheckCheck size={15} />
                <span>Hammasini o'qildi</span>
              </button>
            </div>
          )}

          <div className="min-h-0 flex-1 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-white/5">
                {notifications.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      markNotificationAsRead(item.id)
                    }
                    className={`block w-full cursor-pointer px-4 py-4 text-left transition-colors active:bg-white/10 ${
                      !item.read
                        ? "bg-white/[0.025]"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                          !item.read
                            ? "bg-[#d9a441]/15 text-[#d9a441]"
                            : "bg-white/5 text-gray-500"
                        }`}
                      >
                        <Bell size={17} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            {!item.read && (
                              <span className="h-2 w-2 shrink-0 rounded-full bg-[#d9a441]" />
                            )}

                            <span className="text-sm font-medium text-gray-200">
                              {item.title}
                            </span>
                          </div>

                          <span className="shrink-0 text-[10px] text-gray-500">
                            {item.time}
                          </span>
                        </div>

                        <p className="text-xs leading-relaxed text-gray-400">
                          {item.message}
                        </p>

                        {!item.read && (
                          <span className="mt-2 inline-block text-[10px] text-[#d9a441]">
                            O'qilmagan
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                  <Bell
                    size={28}
                    className="text-gray-600"
                  />
                </div>

                <h3 className="text-sm font-medium text-gray-300">
                  Yangi xabarlar yo'q
                </h3>

                <p className="mt-1 max-w-[240px] text-xs leading-relaxed text-gray-500">
                  Yangi buyurtma yoki boshqa xabar kelganda
                  shu yerda ko'rsatiladi.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}

export { DashboardNavbar as Navbar };

export default DashboardNavbar;