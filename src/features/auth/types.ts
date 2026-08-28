import type { Dispatch, FormEvent, ReactNode, SetStateAction } from 'react'

export type Tab = 'kirish' | 'royxatdan' | 'tiklash'

export interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: Tab
}

export interface TabButtonProps {
  active: boolean
  onClick: () => void
  children: ReactNode
}

export interface LoginFormProps {
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  password: string
  setPassword: Dispatch<SetStateAction<string>>
  remember: boolean
  setRemember: Dispatch<SetStateAction<boolean>>
  showPass: boolean
  setShowPass: Dispatch<SetStateAction<boolean>>
  onRegister: () => void
  onForgotPassword: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export interface RegisterFormProps {
  name: string
  setName: Dispatch<SetStateAction<string>>
  surname: string
  setSurname: Dispatch<SetStateAction<string>>
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  phone: string
  setPhone: Dispatch<SetStateAction<string>>
  password: string
  setPassword: Dispatch<SetStateAction<string>>
  password2: string
  setPassword2: Dispatch<SetStateAction<string>>
  showPass: boolean
  showPass2: boolean
  setShowPass: Dispatch<SetStateAction<boolean>>
  setShowPass2: Dispatch<SetStateAction<boolean>>
  onLogin: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export interface ForgotPasswordFormProps {
  onBackToLogin: () => void
}

export interface InputProps {
  type: string
  placeholder: string
  value: string
  onChange: Dispatch<SetStateAction<string>> | ((value: string) => void)
  autoComplete?: string
}

export interface PasswordInputProps {
  placeholder: string
  show: boolean
  value: string
  onChange: Dispatch<SetStateAction<string>> | ((value: string) => void)
  onToggle: () => void
  autoComplete?: string
}