import { useState } from 'react'
import type { FormEvent } from 'react'
import { toast } from 'sonner'
import type { ForgotPasswordFormProps } from '../types'

const inputClass =
  "w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-all duration-300 focus:border-amber-400/70 focus:bg-white/[0.03]"

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

// Standart email regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Ruxsat berilgan mashhur domenlar ro'yxati
const validDomains = [
  'gmail.com',
  'mail.ru',
  'yandex.ru',
  'yandex.com',
  'outlook.com',
  'hotmail.com',
  'yahoo.com',
  'icloud.com',
  'inbox.ru',
  'bk.ru',
  'list.ru'
]

export default function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('')
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const cleanEmail = email.trim().toLowerCase()

    if (!cleanEmail) {
      toast.error("Iltimos, email manzilingizni kiriting", toastStyle)
      return
    }

    if (!emailRegex.test(cleanEmail)) {
      toast.error("Yaroqli email formatini kiriting", toastStyle)
      return
    }

    const [username, domain] = cleanEmail.split('@')

    // Email nom qismi juda qisqa bo'lsa (masalan: a@gmail.com)
    if (username.length < 3) {
      toast.error("Email nomi kamida 3 ta belgidan iborat bo'lishi kerak", toastStyle)
      return
    }

    // Domen mashhur domenlar ro'yxatida bo'lmasa (masalan: g.com, test.com)
    if (!validDomains.includes(domain)) {
      toast.error("Iltimos, haqiqiy email provayderini kiriting (masalan: gmail.com, mail.ru)", toastStyle)
      return
    }

    toast.success("Parolni tiklash havolasi yuborildi!", toastStyle)
    setIsSent(true)
  }

  if (isSent) {
    return (
      <div className="py-4 text-center animate-[contentIn_300ms_ease-out]">
        <h3 className="text-base font-semibold text-amber-400">Xabar yuborildi</h3>
        <p className="mt-2 text-xs leading-5 text-white/70">
          <span className="font-semibold text-white">{email}</span> manziliga parolni tiklash bo'yicha yo'riqnoma yuborildi. Emailingizni tekshiring.
        </p>
        <button
          type="button"
          onClick={onBackToLogin}
          className="mt-6 w-full cursor-pointer rounded-lg border border-white/15 bg-white/5 py-2.5 text-xs font-medium text-white transition-all hover:bg-white/10"
        >
          Kirish oynasiga qaytish
        </button>
      </div>
    )
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      noValidate 
      className="space-y-4 animate-[contentIn_300ms_ease-out]" 
      autoComplete="off"
    >
      <p className="text-xs text-white/60">
        Hisobingizga bog'langan email manzilni kiriting. Biz sizga parolni tiklash havolasini yuboramiz.
      </p>

      <input
        type="text"
        placeholder="Email manzilingiz"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />

      <button
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-amber-400 py-3 text-sm font-semibold text-neutral-900 transition-all hover:bg-amber-300"
      >
        Kodni yuborish
      </button>

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-xs text-white/50 transition-colors hover:text-white cursor-pointer"
        >
          Ortga qaytish
        </button>
      </div>
    </form>
  )
}