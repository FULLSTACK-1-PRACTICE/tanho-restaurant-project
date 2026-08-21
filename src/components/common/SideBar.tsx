import { useState } from "react";
import { ChevronDown } from "lucide-react";
import logoImg from "../../assets/images/Layout/Header/Logo-2.png";
import type { LucideIcon } from "lucide-react";

export interface SidebarSubItem {
  key: string;
  label: string;
  icon?: LucideIcon;
}

export interface SidebarItem {
  key: string;
  label: string;
  icon: LucideIcon;
  badge?: number | string;
  children?: SidebarSubItem[];
}

interface SidebarProps {
  sidebarOpen: boolean;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (val: boolean) => void;
  activePage: string;
  onSelectPage: (key: string) => void;
  sections: SidebarItem[];
  menuOpen?: boolean;
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Sidebar({
  sidebarOpen,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  activePage,
  onSelectPage,
  sections,
}: SidebarProps) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    menyu: true,
  });

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static z-50 h-full ${
          sidebarOpen ? "w-[280px]" : "w-[82px]"
        } shrink-0 bg-[#09090b]/95 backdrop-blur-xl border-r border-white/10 flex flex-col transition-all duration-300 ease-in-out shadow-[4px_0_24px_rgba(0,0,0,0.5)] ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* LOGO HEADER */}
        <div className="relative h-[80px] flex items-center justify-center border-b border-white/[0.08] px-4 overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-transparent pointer-events-none" />

          <div className="flex items-center justify-center w-full px-2">
            <img
              src={logoImg}
              alt="Tanho Restaurant Logo"
              className={`${
                sidebarOpen ? "h-[70px] w-auto max-w-[220px]" : "h-8 w-auto"
              } object-contain filter drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)] transition-all duration-300 scale-110`}
            />
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-white/10">
          {sections.map((item: SidebarItem) => {
            const Icon = item.icon;
            const hasChildren = Boolean(item.children && item.children.length > 0);
            const isChildActive = hasChildren
              ? item.children?.some((child) => child.key === activePage)
              : false;
            const isActive = activePage === item.key || isChildActive;
            const isOpen = Boolean(openMenus[item.key]);

            return (
              <div key={item.key} className="space-y-1">
                <button
                  onClick={() => {
                    if (hasChildren) {
                      toggleMenu(item.key);
                    } else {
                      onSelectPage(item.key);
                    }
                  }}
                  className={`w-full cursor-pointer flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent text-amber-400 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.05] border border-transparent"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-gradient-to-b from-amber-300 to-amber-500 shadow-[0_0_10px_#f59e0b]" />
                  )}

                  <Icon
                    size={20}
                    strokeWidth={1.75}
                    className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? "text-amber-400" : "text-gray-400"
                    }`}
                  />

                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left truncate tracking-wide text-xs font-semibold">
                        {item.label}
                      </span>

                      {item.badge !== undefined && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {item.badge}
                        </span>
                      )}

                      {hasChildren && (
                        <ChevronDown
                          size={16}
                          className={`text-gray-500 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-amber-400" : ""
                          }`}
                        />
                      )}
                    </>
                  )}
                </button>

                {/* Submenu List */}
                {hasChildren && sidebarOpen && isOpen && (
                  <div className="ml-5 pl-3 border-l border-white/10 space-y-1 py-1">
                    {item.children?.map((child) => {
                      const ChildIcon = child.icon;
                      const isSubActive = activePage === child.key;

                      return (
                        <button
                          key={child.key}
                          onClick={() => onSelectPage(child.key)}
                          className={`w-full cursor-pointer flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            isSubActive
                              ? "text-amber-400 bg-amber-500/15 font-semibold"
                              : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {ChildIcon && (
                              <ChildIcon size={14} className="shrink-0 text-gray-400" />
                            )}
                            <span className="truncate">{child.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}