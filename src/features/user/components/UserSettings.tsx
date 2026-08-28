import { useState } from "react"
import { Bell, LockKeyhole, X } from "lucide-react"
import Container from "../../../components/ui/container/Container"

interface CheckboxProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function CustomCheckbox({
  id,
  label,
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="group flex cursor-pointer select-none items-center gap-3"
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />

        <div
          className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-300 ${
            checked
              ? "border-[#F6B530] bg-[#F6B530] shadow-[0_0_10px_rgba(246,181,48,0.3)]"
              : "border-white/20 bg-[#070809] group-hover:border-[#F6B530]/50"
          }`}
        >
          {checked && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-black"
            >
              <path d="M5 12l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>

      <span className="text-[14px] text-neutral-300 transition-colors group-hover:text-white">
        {label}
      </span>
    </label>
  )
}

export default function UserSettings() {
  const [emailNotify, setEmailNotify] = useState(true)
  const [promoNotify, setPromoNotify] = useState(false)

  const [passwordModalOpen, setPasswordModalOpen] = useState(false)

  const resetSettings = () => {
    setEmailNotify(true)
    setPromoNotify(false)
  }

  const handleSave = () => {
    localStorage.setItem(
      "user_settings",
      JSON.stringify({
        emailNotify,
        promoNotify,
      })
    )
  }

  return (
    <section className="min-h-full bg-[#070809] py-8 text-white">
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">
              Sozlamalar
            </h1>

            <p className="mt-1 text-[13px] text-neutral-400">
              Hisobingiz va shaxsiy afzalliklaringizni boshqaring
            </p>
          </div>

          <div className="space-y-6 rounded-2xl border border-white/10 bg-[#0b0c0e] p-6 shadow-2xl md:p-8">
            {/* Bildirishnomalar */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Bell
                  size={17}
                  className="text-[#F6B530]"
                />

                <h2 className="text-[15px] font-semibold text-white">
                  Bildirishnomalar
                </h2>
              </div>

              <div className="space-y-4 rounded-xl border border-white/5 bg-[#070809] p-4">
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

            {/* Xavfsizlik */}
            <div className="border-t border-white/10 pt-6">
              <div className="mb-4 flex items-center gap-2">
                <LockKeyhole
                  size={17}
                  className="text-[#F6B530]"
                />

                <h2 className="text-[15px] font-semibold text-white">
                  Xavfsizlik
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setPasswordModalOpen(true)}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-[#070809] px-4 py-4 text-left transition-all duration-300 hover:border-[#F6B530]/40 hover:bg-white/[0.02]"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    Parolni o'zgartirish
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    Hisobingiz parolini yangilash
                  </p>
                </div>

                <span className="text-xs font-medium text-[#F6B530]">
                  O'zgartirish
                </span>
              </button>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={resetSettings}
                className="h-[48px] cursor-pointer rounded-xl border border-white/10 px-6 text-sm font-medium text-neutral-300 transition-all duration-300 hover:bg-white/5 hover:text-white"
              >
                Bekor qilish
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="h-[48px] cursor-pointer rounded-xl bg-[#F6B530] px-8 text-sm font-semibold text-black shadow-[0_4px_20px_rgba(246,181,48,0.25)] transition-all duration-300 hover:bg-[#e0a32b] hover:shadow-[0_6px_25px_rgba(246,181,48,0.35)] active:scale-95"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* Password Modal */}
      {passwordModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setPasswordModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#121416] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setPasswordModalOpen(false)}
              className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white/50 transition-all duration-300 hover:bg-white/5 hover:text-white"
            >
              <X size={19} />
            </button>

            <div className="pr-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F6B530]/10">
                <LockKeyhole
                  size={21}
                  className="text-[#F6B530]"
                />
              </div>

              <h2 className="text-xl font-semibold text-white">
                Parolni o'zgartirish
              </h2>

              <p className="mt-2 text-sm leading-6 text-neutral-400">
                Parolni o'zgartirish funksiyasi hozircha
                mavjud emas. Ushbu funksiya backend API
                orqali amalga oshiriladi.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-[#F6B530]/10 bg-[#F6B530]/5 p-4">
              <p className="text-xs leading-5 text-neutral-400">
                Xavfsizlik sababli parol frontend yoki
                localStorage orqali saqlanmaydi. Backend
                integratsiyasi tugagach, bu bo'lim orqali
                parolingizni xavfsiz yangilashingiz mumkin.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setPasswordModalOpen(false)}
                className="cursor-pointer rounded-xl bg-[#F6B530] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#e0a32b] active:scale-95"
              >
                Tushunarli
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}