import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CustomSelect({ options, value, onChange, className = "" }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  // Tashqariga bosilganda dropdownni yopish
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 bg-[#141416] border border-white/10 rounded-xl text-sm text-white hover:border-white/20 transition-all cursor-pointer focus:outline-none focus:border-amber-500/50"
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Ochiluvchi Custom Menyu */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 z-50 bg-[#161619] border border-white/10 rounded-xl shadow-2xl py-1 overflow-hidden backdrop-blur-xl">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                  isSelected 
                    ? "bg-amber-500/15 text-amber-400 font-medium" 
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check size={14} className="text-amber-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}