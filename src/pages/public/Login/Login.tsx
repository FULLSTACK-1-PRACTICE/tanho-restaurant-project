import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Eye, EyeOff, X } from 'lucide-react'

type Tab = 'kirish' | 'royxatdan'

const inputClass =
  'w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-all duration-300 focus:border-amber-400/70 focus:bg-white/[0.03] focus:shadow-[0_0_20px_rgba(251,191,36,0.08)]'

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <KirishModal
      isOpen={true}
      onClose={() => navigate('/')}
    />
  )
}

interface KirishModalProps {
  isOpen: boolean
  onClose: () => void
}

function KirishModal({
  isOpen,
  onClose,
}: KirishModalProps) {
  const [tab, setTab] = useState<Tab>('kirish')
  const [showPass, setShowPass] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [remember, setRemember] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const changeTab = (newTab: Tab) => {
    setTab(newTab)
    setShowPass(false)
    setShowPass2(false)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-md animate-[fadeIn_250ms_ease-out]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#171717] p-6 shadow-2xl animate-[modalIn_400ms_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-amber-400/5 blur-3xl" />

        <button
          type="button"
          aria-label="Yopish"
          onClick={onClose}
          className="group absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition-all duration-300 hover:rotate-90 hover:bg-white/10 hover:text-white active:scale-90"
        >
          <X
            size={20}
            className="transition-transform duration-300"
          />
        </button>

        <div className="relative z-10">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-semibold text-white">
              Kirish yoki ro'yxatdan o'tish
            </h2>

            <p className="mt-1 text-xs text-white/40">
              Hisobingizga kirish uchun ma'lumotlarni kiriting
            </p>
          </div>

          <div className="relative mb-6 flex border-b border-white/10">
            <TabButton
              active={tab === 'kirish'}
              onClick={() => changeTab('kirish')}
            >
              Kirish
            </TabButton>

            <TabButton
              active={tab === 'royxatdan'}
              onClick={() => changeTab('royxatdan')}
            >
              Ro'yxatdan o'tish
            </TabButton>
          </div>

          <div
            key={tab}
            className="animate-[contentIn_300ms_ease-out]"
          >
            {tab === 'kirish' ? (
              <LoginForm
                remember={remember}
                setRemember={setRemember}
                showPass={showPass}
                setShowPass={setShowPass}
                onRegister={() => changeTab('royxatdan')}
              />
            ) : (
              <RegisterForm
                showPass={showPass}
                showPass2={showPass2}
                setShowPass={setShowPass}
                setShowPass2={setShowPass2}
                onLogin={() => changeTab('kirish')}
              />
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes contentIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes tabIn {
          from {
            opacity: 0;
            transform: scaleX(0);
          }

          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        @keyframes checkIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes iconIn {
          from {
            opacity: 0;
            transform: scale(0.7);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

interface TabButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

function TabButton({
  active,
  onClick,
  children,
}: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex-1 pb-3 text-sm font-medium transition-all duration-300 ${
        active
          ? 'text-amber-400'
          : 'text-white/50 hover:text-white/80'
      }`}
    >
      <span className="inline-block transition-transform duration-300 active:scale-95">
        {children}
      </span>

      {active && (
        <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 origin-center rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.7)] animate-[tabIn_250ms_ease-out]" />
      )}
    </button>
  )
}

interface LoginFormProps {
  remember: boolean
  setRemember: React.Dispatch<React.SetStateAction<boolean>>
  showPass: boolean
  setShowPass: React.Dispatch<React.SetStateAction<boolean>>
  onRegister: () => void
}

function LoginForm({
  remember,
  setRemember,
  showPass,
  setShowPass,
  onRegister,
}: LoginFormProps) {
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <Input
        type="email"
        placeholder="Email manzilingiz"
      />

      <PasswordInput
        placeholder="Parolingiz"
        show={showPass}
        onToggle={() =>
          setShowPass((value) => !value)
        }
      />

      <div className="flex items-center justify-between pt-1 text-sm">
        <label className="flex cursor-pointer select-none items-center gap-2 text-white/70">
          <span className="relative flex h-4 w-4 items-center justify-center">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) =>
                setRemember(event.target.checked)
              }
              className="h-4 w-4 cursor-pointer appearance-none rounded border border-white/30 bg-transparent transition-all duration-200 checked:border-amber-400 checked:bg-amber-400"
            />

            {remember && (
              <Check
                size={12}
                strokeWidth={3}
                className="pointer-events-none absolute animate-[checkIn_200ms_ease-out] text-neutral-900"
              />
            )}
          </span>

          Meni eslab qoling
        </label>

        <button
          type="button"
          className="text-amber-400 transition-all duration-200 hover:text-amber-300 hover:underline"
        >
          Parolni unutdingiz?
        </button>
      </div>

      <SubmitButton>
        Kirish
      </SubmitButton>

      <Divider />

      <SocialButtons />

      <p className="pt-1 text-center text-sm text-white/50">
        Hisobingiz yo'qmi?{' '}

        <button
          type="button"
          onClick={onRegister}
          className="font-medium text-amber-400 transition-all duration-200 hover:text-amber-300 hover:underline"
        >
          Ro'yxatdan o'ting
        </button>
      </p>
    </form>
  )
}

interface RegisterFormProps {
  showPass: boolean
  showPass2: boolean
  setShowPass: React.Dispatch<React.SetStateAction<boolean>>
  setShowPass2: React.Dispatch<React.SetStateAction<boolean>>
  onLogin: () => void
}

function RegisterForm({
  showPass,
  showPass2,
  setShowPass,
  setShowPass2,
  onLogin,
}: RegisterFormProps) {
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="grid grid-cols-2 gap-3">
        <Input
          type="text"
          placeholder="Ismingiz"
        />

        <Input
          type="text"
          placeholder="Familiyangiz"
        />
      </div>

      <Input
        type="email"
        placeholder="Email manzilingiz"
      />

      <Input
        type="tel"
        placeholder="Telefon raqamingiz"
      />

      <div className="grid grid-cols-2 gap-3">
        <PasswordInput
          placeholder="Parol yarating"
          show={showPass}
          onToggle={() =>
            setShowPass((value) => !value)
          }
        />

        <PasswordInput
          placeholder="Parolni tasdiqlang"
          show={showPass2}
          onToggle={() =>
            setShowPass2((value) => !value)
          }
        />
      </div>

      <SubmitButton>
        Ro'yxatdan o'tish
      </SubmitButton>

      <Divider />

      <SocialButtons />

      <p className="pt-1 text-center text-sm text-white/50">
        Hisobingiz bormi?{' '}

        <button
          type="button"
          onClick={onLogin}
          className="font-medium text-amber-400 transition-all duration-200 hover:text-amber-300 hover:underline"
        >
          Kirish
        </button>
      </p>
    </form>
  )
}

interface InputProps {
  type: string
  placeholder: string
}

function Input({
  type,
  placeholder,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${inputClass} transition-all duration-300 hover:border-white/25`}
    />
  )
}

interface PasswordInputProps {
  placeholder: string
  show: boolean
  onToggle: () => void
}

function PasswordInput({
  placeholder,
  show,
  onToggle,
}: PasswordInputProps) {
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        className={`${inputClass} pr-11`}
      />

      <button
        type="button"
        onClick={onToggle}
        aria-label={
          show
            ? 'Parolni yashirish'
            : "Parolni ko'rsatish"
        }
        className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md p-1 text-white/40 transition-all duration-200 hover:scale-110 hover:bg-white/5 hover:text-white active:scale-90"
      >
        <span
          key={show ? 'eye-off' : 'eye'}
          className="animate-[iconIn_200ms_ease-out]"
        >
          {show ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </span>
      </button>
    </div>
  )
}

function SubmitButton({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <button
      type="submit"
      className="group relative mt-2 w-full overflow-hidden rounded-lg bg-amber-400 py-3 text-sm font-semibold text-neutral-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-[0_8px_25px_rgba(251,191,36,0.2)] active:translate-y-0 active:scale-[0.98]"
    >
      <span className="relative z-10">
        {children}
      </span>

      <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
    </button>
  )
}

function Divider() {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-white/10" />

      <span className="text-xs text-white/40">
        yoki
      </span>

      <div className="h-px flex-1 bg-white/10" />
    </div>
  )
}

function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        className="group flex items-center justify-center gap-2 rounded-lg border border-white/15 px-2 py-2.5 text-xs text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] sm:text-sm"
      >
        <GoogleIcon className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />

        <span>
          Google
        </span>
      </button>

      <button
        type="button"
        className="group flex items-center justify-center gap-2 rounded-lg border border-white/15 px-2 py-2.5 text-xs text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] sm:text-sm"
      >
        <FacebookIcon className="transition-transform duration-300 group-hover:scale-110" />

        <span>
          Facebook
        </span>
      </button>
    </div>
  )
}

function GoogleIcon({
  className = '',
}: {
  className?: string
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 48 48"
      className={className}
    >
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />

      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />

      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.6c-2 1.4-4.6 2.3-7.7 2.3-5.3 0-9.7-3.4-11.3-8H5.7v6.2C9.1 39.7 16 44 24 44z"
      />

      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.6 5.6C41.4 36 44 30.5 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  )
}

function FacebookIcon({
  className = '',
}: {
  className?: string
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="#1877F2"
      className={className}
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.988h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  )
}