import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Check, Eye, EyeOff, X } from "lucide-react"
import { toast } from "sonner"
import { useAuthAndFavorites } from "../../../context/useAuthAndFavorites"

import type {
  Tab,
  AuthModalProps,
  TabButtonProps,
  LoginFormProps,
  RegisterFormProps,
  InputProps,
  PasswordInputProps,
} from "../types"

const inputClass =
  "w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-all duration-300 focus:border-amber-400/70 focus:bg-white/[0.03] focus:shadow-[0_0_20px_rgba(251,191,36,0.08)]"

const toastStyle = {
  style: {
    width: "360px",
    minHeight: "64px",
    background: "#1f1f23",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#fff",
  },
  duration: 3000,
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^\+?[0-9]{9,13}$/

export default function AuthModal({
  isOpen,
  onClose,
  initialTab = "kirish",
}: AuthModalProps) {
  const navigate = useNavigate()
  const { login } = useAuthAndFavorites()

  const [tab, setTab] = useState<Tab>(initialTab)

  const [showPass, setShowPass] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [remember, setRemember] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [registerName, setRegisterName] = useState("")
  const [registerSurname, setRegisterSurname] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPhone, setRegisterPhone] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerPassword2, setRegisterPassword2] = useState("")

  const resetForm = () => {
    setEmail("")
    setPassword("")

    setRegisterName("")
    setRegisterSurname("")
    setRegisterEmail("")
    setRegisterPhone("")
    setRegisterPassword("")
    setRegisterPassword2("")

    setShowPass(false)
    setShowPass2(false)
    setRemember(false)
  }

  useEffect(() => {
    const styleId = "auth-modal-scrollbar-gutter-fix"

    if (!document.getElementById(styleId)) {
      const style = document.createElement("style")

      style.id = styleId

      style.textContent = `
        html {
          scrollbar-gutter: stable;
          background: #0a0a0a;
        }

        body {
          margin: 0;
        }
      `

      document.head.appendChild(style)
    }

    return () => {
      const style = document.getElementById(styleId)

      if (style) {
        style.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = "hidden"

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow

      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const changeTab = (newTab: Tab) => {
    setTab(newTab)
    setShowPass(false)
    setShowPass2(false)
  }

  const saveAuthData = (
    role: string,
    userId: string,
    userName: string,
    userEmail: string,
  ) => {
    const token = `${role}-token-${userId}-${Date.now()}`

    const userData = {
      id: userId,
      name: userName,
      email: userEmail,
      role,
    }

    localStorage.setItem("token", token)
    localStorage.setItem("role", role)

    localStorage.setItem("is_logged_in", "true")
    localStorage.setItem("user_role", role)

    localStorage.setItem("user", JSON.stringify(userData))

    localStorage.setItem("user_name", userName)
    localStorage.setItem("user_email", userEmail)

    window.dispatchEvent(new Event("userUpdated"))
  }

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()

    if (!cleanEmail && !cleanPassword) {
      toast.error(
        "Iltimos, email va parolni kiriting",
        toastStyle,
      )
      return
    }

    if (!cleanEmail) {
      toast.error(
        "Iltimos, emailni kiriting",
        toastStyle,
      )
      return
    }

    if (!cleanPassword) {
      toast.error(
        "Iltimos, parolni kiriting",
        toastStyle,
      )
      return
    }

    if (!emailRegex.test(cleanEmail)) {
      toast.error(
        "Iltimos, yaroqli email manzilini kiriting",
        toastStyle,
      )
      return
    }

    const executeLogin = (
      role: string,
      redirectPath: string,
      roleName: string,
      userId: string,
      userName: string,
    ) => {
      const userData = {
        id: userId,
        name: userName,
        email: cleanEmail,
        role,
      }

      login(userData)

      saveAuthData(
        role,
        userId,
        userName,
        cleanEmail,
      )

      toast.success(
        "Tizimga muvaffaqiyatli kirdingiz!",
        {
          ...toastStyle,
          description: `Xush kelibsiz, ${roleName}!`,
        },
      )

      setTimeout(() => {
        resetForm()
        onClose()
        navigate(redirectPath, {
          replace: true,
        })
      }, 500)
    }

    if (
      cleanEmail === "admin@gmail.com" &&
      cleanPassword === "12345"
    ) {
      executeLogin(
        "admin",
        "/admin",
        "Admin",
        "admin-id",
        "Admin User",
      )
      return
    }

    if (
      cleanEmail === "user@gmail.com" &&
      cleanPassword === "12345"
    ) {
      executeLogin(
        "user",
        "/user",
        "Foydalanuvchi",
        "user-1",
        "Izzatbek",
      )
      return
    }

    if (
      cleanEmail === "cashier@gmail.com" &&
      cleanPassword === "12345"
    ) {
      executeLogin(
        "cashier",
        "/cashier",
        "Kassir",
        "cashier-id",
        "Kassir",
      )
      return
    }

    if (
      cleanEmail === "manager@gmail.com" &&
      cleanPassword === "12345"
    ) {
      executeLogin(
        "manager",
        "/manager",
        "Menejer",
        "manager-id",
        "Manager",
      )
      return
    }

    toast.error(
      "Email yoki parol noto'g'ri",
      toastStyle,
    )
  }

  const handleRegister = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const cleanName = registerName.trim()
    const cleanSurname = registerSurname.trim()
    const cleanEmail = registerEmail.trim().toLowerCase()
    const cleanPhone = registerPhone.trim()

    if (
      !cleanName ||
      !cleanSurname ||
      !cleanEmail ||
      !cleanPhone ||
      !registerPassword ||
      !registerPassword2
    ) {
      toast.error(
        "Iltimos, barcha maydonlarni to'ldiring",
        toastStyle,
      )
      return
    }

    if (!emailRegex.test(cleanEmail)) {
      toast.error(
        "Yaroqli email formatini kiriting",
        toastStyle,
      )
      return
    }

    const normalizedPhone = cleanPhone.replace(
      /[\s()-]/g,
      "",
    )

    if (!phoneRegex.test(normalizedPhone)) {
      toast.error(
        "Yaroqli telefon raqamini kiriting",
        toastStyle,
      )
      return
    }

    if (registerPassword.length < 5) {
      toast.error(
        "Parol kamida 5 ta belgidan iborat bo'lishi kerak",
        toastStyle,
      )
      return
    }

    if (
      registerPassword !== registerPassword2
    ) {
      toast.error(
        "Parollar bir xil emas",
        toastStyle,
      )
      return
    }

    const userId = `user_${Date.now()}`
    const fullName = `${cleanName} ${cleanSurname}`

    const newUser = {
      id: userId,
      name: fullName,
      email: cleanEmail,
      role: "user",
    }

    login(newUser)

    saveAuthData(
      "user",
      userId,
      fullName,
      cleanEmail,
    )

    localStorage.setItem(
      "user_phone",
      cleanPhone,
    )

    toast.success(
      "Ro'yxatdan o'tish muvaffaqiyatli!",
      {
        ...toastStyle,
        description:
          "Hisobingizga muvaffaqiyatli kirdingiz.",
      },
    )

    setTimeout(() => {
      resetForm()
      onClose()

      navigate("/user", {
        replace: true,
      })
    }, 500)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-md animate-[fadeIn_250ms_ease-out]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#171717] p-6 shadow-2xl animate-[modalIn_400ms_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-amber-400/5 blur-3xl" />

        <button
          type="button"
          aria-label="Yopish"
          onClick={onClose}
          className="group absolute right-4 top-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white/50 transition-all duration-300 hover:rotate-90 hover:bg-white/10 hover:text-white active:scale-90"
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
              Hisobingizga kirish uchun ma'lumotlarni
              kiriting
            </p>
          </div>

          <div className="relative mb-6 flex border-b border-white/10">
            <TabButton
              active={tab === "kirish"}
              onClick={() =>
                changeTab("kirish")
              }
            >
              Kirish
            </TabButton>

            <TabButton
              active={tab === "royxatdan"}
              onClick={() =>
                changeTab("royxatdan")
              }
            >
              Ro'yxatdan o'tish
            </TabButton>
          </div>

          <div
            key={tab}
            className="animate-[contentIn_300ms_ease-out]"
          >
            {tab === "kirish" ? (
              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                remember={remember}
                setRemember={setRemember}
                showPass={showPass}
                setShowPass={setShowPass}
                onRegister={() =>
                  changeTab("royxatdan")
                }
                onSubmit={handleLogin}
              />
            ) : (
              <RegisterForm
                name={registerName}
                setName={setRegisterName}
                surname={registerSurname}
                setSurname={setRegisterSurname}
                email={registerEmail}
                setEmail={setRegisterEmail}
                phone={registerPhone}
                setPhone={setRegisterPhone}
                password={registerPassword}
                setPassword={setRegisterPassword}
                password2={registerPassword2}
                setPassword2={
                  setRegisterPassword2
                }
                showPass={showPass}
                showPass2={showPass2}
                setShowPass={setShowPass}
                setShowPass2={setShowPass2}
                onLogin={() =>
                  changeTab("kirish")
                }
                onSubmit={handleRegister}
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

function TabButton({
  active,
  onClick,
  children,
}: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex-1 cursor-pointer pb-3 text-sm font-medium transition-all duration-300 ${
        active
          ? "text-amber-400"
          : "text-white/50 hover:text-white/80"
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

function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  remember,
  setRemember,
  showPass,
  setShowPass,
  onRegister,
  onSubmit,
}: LoginFormProps) {
  return (
    <form
      className="space-y-4"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <Input
        type="text"
        placeholder="Email manzilingiz"
        value={email}
        onChange={setEmail}
        autoComplete="new-password"
      />

      <PasswordInput
        placeholder="Parolingiz"
        show={showPass}
        value={password}
        onChange={setPassword}
        onToggle={() =>
          setShowPass(
            (value) => !value,
          )
        }
        autoComplete="new-password"
      />

      <div className="flex items-center justify-between pt-1 text-sm">
        <label className="flex cursor-pointer select-none items-center gap-2 text-white/70">
          <span className="relative flex h-4 w-4 items-center justify-center">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) =>
                setRemember(
                  event.target.checked,
                )
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
          className="cursor-pointer text-amber-400 transition-all duration-200 hover:text-amber-300 hover:underline"
        >
          Parolni unutdingiz?
        </button>
      </div>

      <SubmitButton>
        Kirish
      </SubmitButton>

      <Divider />

      <SocialButton />

      <p className="pt-1 text-center text-sm text-white/50">
        Hisobingiz yo'qmi?{" "}
        <button
          type="button"
          onClick={onRegister}
          className="cursor-pointer font-medium text-amber-400 transition-all duration-200 hover:text-amber-300 hover:underline"
        >
          Ro'yxatdan o'ting
        </button>
      </p>
    </form>
  )
}

function RegisterForm({
  name,
  setName,
  surname,
  setSurname,
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  password2,
  setPassword2,
  showPass,
  showPass2,
  setShowPass,
  setShowPass2,
  onLogin,
  onSubmit,
}: RegisterFormProps) {
  return (
    <form
      className="space-y-4"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <div className="grid grid-cols-2 gap-3">
        <Input
          type="text"
          placeholder="Ismingiz"
          value={name}
          onChange={setName}
        />

        <Input
          type="text"
          placeholder="Familiyangiz"
          value={surname}
          onChange={setSurname}
        />
      </div>

      <Input
        type="text"
        placeholder="Email manzilingiz"
        value={email}
        onChange={setEmail}
        autoComplete="new-password"
      />

      <Input
        type="tel"
        placeholder="Telefon raqamingiz (+998...)"
        value={phone}
        onChange={setPhone}
      />

      <div className="grid grid-cols-2 gap-3">
        <PasswordInput
          placeholder="Parol yarating"
          show={showPass}
          value={password}
          onChange={setPassword}
          onToggle={() =>
            setShowPass(
              (value) => !value,
            )
          }
          autoComplete="new-password"
        />

        <PasswordInput
          placeholder="Parolni tasdiqlang"
          show={showPass2}
          value={password2}
          onChange={setPassword2}
          onToggle={() =>
            setShowPass2(
              (value) => !value,
            )
          }
          autoComplete="new-password"
        />
      </div>

      <SubmitButton>
        Ro'yxatdan o'tish
      </SubmitButton>

      <Divider />

      <SocialButton />

      <p className="pt-1 text-center text-sm text-white/50">
        Hisobingiz bormi?{" "}
        <button
          type="button"
          onClick={onLogin}
          className="cursor-pointer font-medium text-amber-400 transition-all duration-200 hover:text-amber-300 hover:underline"
        >
          Kirish
        </button>
      </p>
    </form>
  )
}

function Input({
  type,
  placeholder,
  value,
  onChange,
  autoComplete = "off",
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      autoComplete={autoComplete}
      onChange={(event) =>
        onChange(event.target.value)
      }
      className={`${inputClass} cursor-text transition-all duration-300 hover:border-white/25`}
    />
  )
}

function PasswordInput({
  placeholder,
  show,
  value,
  onChange,
  onToggle,
  autoComplete = "off",
}: PasswordInputProps) {
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={`${inputClass} pr-11`}
      />

      <button
        type="button"
        onClick={onToggle}
        aria-label={
          show
            ? "Parolni yashirish"
            : "Parolni ko'rsatish"
        }
        className="absolute right-3 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-md p-1 text-white/40 transition-all duration-200 hover:scale-110 hover:bg-white/5 hover:text-white active:scale-90"
      >
        <span
          key={
            show
              ? "eye-off"
              : "eye"
          }
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
      className="group relative mt-2 w-full cursor-pointer overflow-hidden rounded-lg bg-amber-400 py-3 text-sm font-semibold text-neutral-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-[0_8px_25px_rgba(251,191,36,0.2)] active:translate-y-0 active:scale-[0.98]"
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

function SocialButton() {
  return (
    <button
      type="button"
      className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-xs text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] sm:text-sm"
    >
      <GoogleIcon className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />

      <span>
        Google
      </span>
    </button>
  )
}

function GoogleIcon({
  className = "",
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
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-7.7 2.3-5.3 0-9.7-3.4-11.3-8H5.7v6.2C9.1 39.7 16 44 24 44s20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  )
}