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
      {label && <label className="text-xs text-gray-400 font-medium">{label}</label>}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between bg-[#191e22] border border-white/10 hover:border-[#d9a441]/50 px-4 py-2.5 rounded-xl text-left text-sm text-white transition cursor-pointer outline-none focus:border-[#d9a441]"
        >
          {selectedTable ? (
            <span className="flex items-center gap-2">
              <span className="font-medium text-white">{selectedTable.name}</span>
              <span className="text-gray-400 text-xs">({selectedTable.location} - {selectedTable.seats} kishilik)</span>
              {selectedTable.isOccupied && (
                <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded-md font-normal">
                  Band
                </span>
              )}
            </span>
          ) : (
            <span className="text-gray-500">Stolni tanlang...</span>
          )}

          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-60 overflow-y-auto rounded-xl border border-white/10 bg-[#121619] shadow-2xl py-1 divide-y divide-white/5">
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
                  className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm transition ${
                    isOccupied
                      ? "opacity-40 bg-white/[0.02] cursor-not-allowed text-gray-500"
                      : isSelected
                      ? "bg-[#d9a441]/10 text-[#d9a441] font-medium cursor-pointer"
                      : "text-gray-300 hover:bg-white/5 hover:text-white cursor-pointer"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isOccupied && <Ban size={14} className="text-red-400 shrink-0" />}
                    <span>{table.name}</span>
                    <span className="text-xs text-gray-400 font-normal">
                      ({table.location} - {table.seats} kishilik)
                    </span>
                  </div>

                  {isOccupied ? (
                    <span className="text-xs font-semibold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                      Band
                    </span>
                  ) : isSelected ? (
                    <Check size={16} className="text-[#d9a441]" />
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