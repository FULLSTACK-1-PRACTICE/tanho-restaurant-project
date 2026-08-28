import { lazy, Suspense, createContext, useState, type ReactNode } from 'react'
const AuthModal = lazy(() => import('../components/AuthModal'))
import type { Tab } from '../types'

export interface AuthModalContextType {
  openAuthModal: (tab?: Tab) => void
  closeAuthModal: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined)

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [initialTab, setInitialTab] = useState<Tab>('kirish')

  const openAuthModal = (tab: Tab = 'kirish') => {
    setInitialTab(tab)
    setIsOpen(true)
  }

  const closeAuthModal = () => setIsOpen(false)

  return (
    <AuthModalContext.Provider value={{ openAuthModal, closeAuthModal }}>
      {children}
      {isOpen && (
        <Suspense fallback={null}>
          <AuthModal
            key={initialTab}
            isOpen={isOpen}
            onClose={closeAuthModal}
            initialTab={initialTab}
          />
        </Suspense>
      )}
    </AuthModalContext.Provider>
  )
}