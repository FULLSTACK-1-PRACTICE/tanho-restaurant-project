import React from "react";
import { Crown, ChevronDown, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import logoImg from "../../assets/images/Layout/Header/Logo-2.png";

export interface SidebarSubItem {
  key: string;
  label: string;
  icon: LucideIcon;
}

export interface SidebarItem {
  key: string;
  label: string;
  icon: LucideIcon;
  children?: SidebarSubItem[];
}

interface SidebarProps {
  sidebarOpen: boolean;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (val: boolean) => void;
  activePage: string;
  onSelectPage: (key: string) => void;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sections: SidebarItem[];
}

export function Sidebar({
  sidebarOpen,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  activePage,
  onSelectPage,
  menuOpen,
  setMenuOpen,
  sections,
}: SidebarProps) {
  return (
    <>
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static z-40 h-full ${
          sidebarOpen ? "w-[260px]" : "w-[76px]"
        } shrink-0 bg-[#0d0d0f] border-r border-white/5 flex flex-col transition-all duration-300 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="cursor-pointer h-[72px] flex items-center justify-center border-b border-white/5 px-2">
          {sidebarOpen ? (
            <img
              src={logoImg}
              alt="Tanho Restaurant Logo"
              className="h-[70px] w-auto max-w-[220px] object-contain scale-110"
            />
          ) : (
            <Crown size={22} className="text-amber-400" strokeWidth={1.75} />
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            const hasChildren = Boolean(section.children && section.children.length > 0);
            const isParentActive = hasChildren
              ? section.children?.some((child) => child.key === activePage)
              : activePage === section.key;

            return (
              <div key={section.key}>
                <button
                  onClick={() => {
                    if (hasChildren && section.children) {
                      setMenuOpen((prev) => !prev);
                      if (!menuOpen) {
                        onSelectPage(section.children[0].key);
                      }
                    } else {
                      onSelectPage(section.key);
                    }
                  }}
                  className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group relative ${
                    isParentActive
                      ? "bg-amber-500/10 text-amber-400"
                      : "text-gray-400 hover:text-gray-100 hover:bg-white/5"
                  }`}
                >
                  {isParentActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r bg-amber-500" />
                  )}

                  <Icon size={18} strokeWidth={1.75} className="shrink-0" />

                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left font-medium">
                        {section.label}
                      </span>

                      {hasChildren &&
                        (menuOpen ? (
                          <ChevronDown size={15} className="text-gray-500" />
                        ) : (
                          <ChevronRight size={15} className="text-gray-500" />
                        ))}
                    </>
                  )}
                </button>

                {hasChildren && sidebarOpen && menuOpen && (
                  <div className="ml-[22px] mt-1 pl-4 border-l border-white/10 space-y-0.5">
                    {section.children?.map((child) => {
                      const ChildIcon = child.icon;
                      const active = activePage === child.key;

                      return (
                        <button
                          key={child.key}
                          onClick={() => onSelectPage(child.key)}
                          className={`w-full cursor-pointer flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                            active
                              ? "text-amber-400 bg-amber-500/10 font-medium"
                              : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
                          }`}
                        >
                          <ChildIcon size={14} strokeWidth={1.75} />
                          <span>{child.label}</span>
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