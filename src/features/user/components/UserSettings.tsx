import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe, Moon, Bell, DollarSign, Type, Check } from "lucide-react";
import Container from "../../../components/ui/container/Container";

// Custom Dropdown Component
interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  options: Option[];
  defaultValue: string;
  onChange?: (value: string) => void;
  icon?: React.ReactNode;
}

function CustomSelect({ label, options, defaultValue, onChange, icon }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selected);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full space-y-2" ref={dropdownRef}>
      <label className="text-[13px] text-neutral-400 font-medium tracking-wide flex items-center gap-2">
        {icon}
        {label}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full h-[52px] bg-[#070809] border text-left px-4 rounded-xl flex items-center justify-between text-white text-[14px] transition-all duration-300 ${
            isOpen
              ? "border-[#F6B530] shadow-[0_0_15px_rgba(246,181,48,0.2)]"
              : "border-white/10 hover:border-[#F6B530]/40"
          }`}
        >
          <span>{selectedOption?.label}</span>
          <ChevronDown
            size={18}
            className={`text-[#F6B530] transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-[#0d0d0f] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setSelected(opt.value);
                  setIsOpen(false);
                  onChange?.(opt.value);
                }}
                className={`w-full text-left px-4 py-3 text-[14px] transition-colors flex items-center justify-between ${
                  selected === opt.value
                    ? "bg-[#F6B530]/10 text-[#F6B530] font-medium"
                    : "text-neutral-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Custom Styled Checkbox Component
interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function CustomCheckbox({ id, label, checked, onChange }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer select-none group">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded-md border transition-all duration-300 flex items-center justify-center ${
            checked
              ? "bg-[#F6B530] border-[#F6B530] shadow-[0_0_10px_rgba(246,181,48,0.3)]"
              : "bg-[#070809] border-white/20 group-hover:border-[#F6B530]/50"
          }`}
        >
          {checked && <Check size={14} className="text-black stroke-[3]" />}
        </div>
      </div>
      <span className="text-[14px] text-neutral-300 group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  );
}

// Main Settings Page Component
export default function SettingsSection() {
  const [emailNotify, setEmailNotify] = useState(true);
  const [promoNotify, setPromoNotify] = useState(false);

  return (
    <section className="py-12 bg-[#070809] text-white">
      <Container>
        <div className="max-w-2xl mx-auto bg-[#0b0c0e] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-8">
          <div className="border-b border-white/10 pb-4">
            <h2
              className="text-2xl font-serif font-bold text-[#F6B530]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Sozlamalar
            </h2>
            <p className="text-neutral-400 text-[13px] mt-1">
              Tizim interfeysi va shaxsiy afzalliklaringizni boshqaring
            </p>
          </div>

          <div className="space-y-6">
            {/* Til Sozlamasi */}
            <CustomSelect
              label="Tilni tanlang"
              icon={<Globe size={16} className="text-[#F6B530]" />}
              defaultValue="uz"
              options={[
                { value: "uz", label: "O'zbekcha" },
                { value: "ru", label: "Русский" },
                { value: "en", label: "English" },
              ]}
            />

            {/* Mavzu Sozlamasi */}
            <CustomSelect
              label="Mavzu (Theme)"
              icon={<Moon size={16} className="text-[#F6B530]" />}
              defaultValue="dark"
              options={[
                { value: "dark", label: "Tungi rejim (Dark)" },
                { value: "light", label: "Kungi rejim (Light)" },
                { value: "system", label: "Tizim rejimida" },
              ]}
            />

            {/* Valyuta Sozlamasi */}
            <CustomSelect
              label="Valyuta ko'rinishi"
              icon={<DollarSign size={16} className="text-[#F6B530]" />}
              defaultValue="uzs"
              options={[
                { value: "uzs", label: "So'm (UZS)" },
                { value: "usd", label: "AQSH Dollari (USD)" },
                { value: "eur", label: "Yevro (EUR)" },
              ]}
            />

            {/* Shrift Hajmi Sozlamasi */}
            <CustomSelect
              label="Matn o'lchami"
              icon={<Type size={16} className="text-[#F6B530]" />}
              defaultValue="medium"
              options={[
                { value: "small", label: "Kichik" },
                { value: "medium", label: "O'rtacha" },
                { value: "large", label: "Katta" },
              ]}
            />

            {/* Checkbox Bildirishnomalar */}
            <div className="pt-2 space-y-4">
              <label className="text-[13px] text-neutral-400 font-medium tracking-wide flex items-center gap-2">
                <Bell size={16} className="text-[#F6B530]" />
                Bildirishnomalar
              </label>

              <div className="space-y-3 pl-1">
                <CustomCheckbox
                  id="email-notify"
                  label="Email orqali bron qilish xabarlarini olish"
                  checked={emailNotify}
                  onChange={setEmailNotify}
                />
                <CustomCheckbox
                  id="promo-notify"
                  label="Maxsus chegirmalar va yangiliklardan xabardor bo'lish"
                  checked={promoNotify}
                  onChange={setPromoNotify}
                />
              </div>
            </div>
          </div>

          {/* Saqlash Tugmasi */}
          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button
              type="button"
              className="px-6 h-[48px] rounded-xl border border-white/10 text-neutral-300 text-[14px] font-medium hover:bg-white/5 transition-colors"
            >
              Bekor qilish
            </button>
            <button
              type="button"
              className="px-8 h-[48px] rounded-xl bg-[#F6B530] text-black font-semibold text-[14px] shadow-[0_4px_20px_rgba(246,181,48,0.25)] hover:bg-[#e0a32b] hover:shadow-[0_6px_25px_rgba(246,181,48,0.35)] active:scale-95 transition-all duration-200"
            >
              Saqlash
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}