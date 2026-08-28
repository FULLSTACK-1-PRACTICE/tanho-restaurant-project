import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Ban } from 'lucide-react';

export interface TableOption {
  id: string | number;
  name: string;
  location: string;
  seats: number;
  isOccupied?: boolean;
}

export interface CustomTableSelectProps {
  tables: TableOption[];
  selectedId: string | number | null;
  onSelect: (table: TableOption) => void;
  label?: string;
}

export const CustomTableSelect: React.FC<CustomTableSelectProps> = ({
  tables,
  selectedId,
  onSelect,
  label = "Buyurtma uchun stol",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedTable = tables.find((t) => t.id === selectedId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex flex-col gap-1.5" ref={dropdownRef}>
      {label && <label className="text-xs text-zinc-400 font-medium">{label}</label>}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          style={{ borderColor: isOpen ? '#F6B530' : undefined }}
          className="w-full flex items-center justify-between bg-[#1c1c1c] border border-[#2a2a2a] hover:border-[#F6B530]/50 px-3.5 py-2.5 rounded-lg text-left text-sm text-zinc-200 transition cursor-pointer outline-none"
        >
          {selectedTable ? (
            <span className="flex items-center gap-2">
              <span className="font-medium text-zinc-200">{selectedTable.name}</span>
              <span className="text-zinc-400 text-xs">({selectedTable.location} - {selectedTable.seats} kishilik)</span>
              {selectedTable.isOccupied && (
                <span className="text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded font-normal">
                  Band
                </span>
              )}
            </span>
          ) : (
            <span className="text-zinc-500">Stolni tanlang...</span>
          )}

          <ChevronDown
            size={16}
            className={`text-zinc-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-60 overflow-y-auto rounded-lg border border-[#2a2a2a] bg-[#141414] shadow-2xl py-1 divide-y divide-[#222]">
            {tables.map((table) => {
              const isSelected = table.id === selectedId;
              const isOccupied = table.isOccupied;

              return (
                <button
                  key={table.id}
                  type="button"
                  disabled={isOccupied}
                  onClick={() => {
                    if (!isOccupied) {
                      onSelect(table);
                      setIsOpen(false);
                    }
                  }}
                  style={isSelected ? { backgroundColor: 'rgba(246, 181, 48, 0.1)', color: '#F6B530' } : {}}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-sm transition ${
                    isOccupied
                      ? "opacity-40 bg-white/[0.02] cursor-not-allowed text-zinc-500"
                      : isSelected
                      ? "font-medium cursor-pointer"
                      : "text-zinc-300 hover:bg-[#1c1c1c] hover:text-zinc-100 cursor-pointer"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isOccupied && <Ban size={14} className="text-red-400 shrink-0" />}
                    <span>{table.name}</span>
                    <span className="text-xs text-zinc-500 font-normal">
                      ({table.location} - {table.seats} kishilik)
                    </span>
                  </div>

                  {isOccupied ? (
                    <span className="text-[10px] font-semibold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                      Band
                    </span>
                  ) : isSelected ? (
                    <Check size={16} style={{ color: '#F6B530' }} />
                  ) : null}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTableSelect;