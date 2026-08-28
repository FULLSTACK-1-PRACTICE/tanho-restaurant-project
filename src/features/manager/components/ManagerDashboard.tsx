import React from "react";
import type { ReactNode, ComponentType, ComponentProps } from "react";
import logoImg from "../../assets/images/Layout/Header/Logo-2.webp";

export interface SidebarItem {
  label: string;
  path?: string;
  key?: string;
  icon: ReactNode | ComponentType<ComponentProps<"svg"> & { size?: number; className?: string; strokeWidth?: number }>;
  badge?: number | string;
  section?: string;
}

export interface SidebarProps {
  items: SidebarItem[];
  isOpen?: boolean;
  sidebarOpen?: boolean;
  activePath?: string;
  activePage?: string;
  onItemClick?: (path: string) => void;
  onSelectPage?: (key: string) => void;
  mobileSidebarOpen?: boolean;
  setMobileSidebarOpen?: (val: boolean) => void;
  brandName?: string;
  brandSubtitle?: string;
}

export function SideBar({
  items = [],
  isOpen,
  sidebarOpen,
  activePath,
  activePage,
  onItemClick,
  onSelectPage,
  mobileSidebarOpen = false,
  setMobileSidebarOpen,
}: SidebarProps) {
  const isSidebarOpen = isOpen ?? sidebarOpen ?? true;
  const currentActive = activePath ?? activePage ?? "";

  const handleSelect = (targetPath: string) => {
    if (onItemClick) {
      onItemClick(targetPath);
    } else if (onSelectPage) {
      onSelectPage(targetPath);
    }
    if (setMobileSidebarOpen) {
      setMobileSidebarOpen(false);
    }
  };

  const renderIcon = (icon: SidebarItem["icon"]) => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return icon;
    }
    if (
      typeof icon === "function" ||
      (typeof icon === "object" && icon !== null && "$$typeof" in icon)
    ) {
      const IconComp = icon as ComponentType<{
        size?: number;
        className?: string;
        strokeWidth?: number;
      }>;
      return <IconComp size={19} strokeWidth={1.75} />;
    }
    return <>{icon}</>;
  };

  return (
    <>
      <style>{scrollbarHideStyles}</style>

      {mobileSidebarOpen && setMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:relative z-50 h-full top-0 left-0 ${
          isSidebarOpen ? "w-[280px]" : "w-0 lg:w-[82px]"
        } shrink-0 bg-[#09090b]/95 backdrop-blur-xl border-r border-white/10 flex flex-col transition-all duration-300 ease-in-out shadow-[4px_0_24px_rgba(0,0,0,0.5)] ${
          mobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        } overflow-hidden`}
      >
        <div className="relative h-[80px] flex items-center justify-center border-b border-white/[0.08] px-4 overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-transparent pointer-events-none" />

          <div className="flex items-center justify-center w-full px-2">
            <img
              loading="lazy"
              src={logoImg}
              alt="Tanho Restaurant Logo"
              className={`${
                isSidebarOpen ? "h-[70px] w-auto max-w-[220px]" : "h-8 w-auto"
              } object-contain filter drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)] transition-all duration-300 scale-110`}
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1.5 admin-sidebar-scroll">
          {items.map((item, index) => {
            const itemKey = item.path || item.key || `item-${index}`;
            const isActive =
              currentActive === item.path || currentActive === item.key;

            const prevItem = index > 0 ? items[index - 1] : null;
            const showSectionHeader =
              item.section && item.section !== prevItem?.section;

            return (
              <div key={itemKey} className="space-y-1">
                {showSectionHeader && isSidebarOpen && (
                  <div
                    className={`px-3 text-[10px] uppercase tracking-widest text-gray-500 font-medium ${
                      index > 0 ? "mt-4 mb-2" : "mb-2"
                    }`}
                  >
                    {item.section}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleSelect(item.path || item.key || "")}
                  className={`w-full cursor-pointer flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent text-amber-400 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.05] border border-transparent"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-gradient-to-b from-amber-300 to-amber-500 shadow-[0_0_10px_#f59e0b]" />
                  )}

                  <div
                    className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? "text-amber-400" : "text-gray-400"
                    }`}
                  >
                    {renderIcon(item.icon)}
                  </div>

                  {isSidebarOpen && (
                    <>
                      <span className="flex-1 text-left truncate tracking-wide text-xs font-semibold">
                        {item.label}
                      </span>

                      {item.badge !== undefined && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

const scrollbarHideStyles = `
  .admin-sidebar-scroll {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .admin-sidebar-scroll::-webkit-scrollbar {
    display: none;
  }
`;

export { SideBar as Sidebar };
export default SideBar;