import { createContext, useState, type ReactNode } from 'react'
import AuthModal from '../components/AuthModal'

export interface AuthModalContextType {
  openAuthModal: (tab?: 'kirish' | 'royxatdan') => void
  closeAuthModal: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined)

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [initialTab, setInitialTab] = useState<'kirish' | 'royxatdan'>('kirish')

  const openAuthModal = (tab: 'kirish' | 'royxatdan' = 'kirish') => {
    setInitialTab(tab)
    setIsOpen(true)
  }

  const closeAuthModal = () => setIsOpen(false)

  return (
    <AuthModalContext.Provider value={{ openAuthModal, closeAuthModal }}>
      {children}
      <AuthModal
        key={initialTab}
        isOpen={isOpen}
        onClose={closeAuthModal}
        initialTab={initialTab}
      />
    </AuthModalContext.Provider>
  )
}