import { useState } from 'react'
import { toast } from 'sonner'

export interface User {
  id: string
  name: string
  email: string
  role: string
}

export interface FavoriteItem {
  id: string | number
  [key: string]: unknown
}

const toastStyle = {
  style: {
    width: '360px',
    minHeight: '64px',
    background: '#1f1f23',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
  },
  duration: 3000,
}

export const useAuthAndFavorites = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  const login = (userData: User) => {
    setUser(userData)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('is_logged_in', 'true')
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('user')
    localStorage.removeItem('is_logged_in')
  }

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === item.id)
      if (exists) {
        toast.error('Sevimlilardan olib tashlandi', toastStyle)
        return prev.filter((fav) => fav.id !== item.id)
      } else {
        toast.success("Sevimlilarga qo'shildi", toastStyle)
        return [...prev, item]
      }
    })
  }

  return {
    user,
    isLoggedIn,
    setIsLoggedIn,
    favorites,
    setFavorites,
    login,
    logout,
    toggleFavorite,
  }
}

export default useAuthAndFavorites