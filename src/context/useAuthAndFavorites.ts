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
  title?: string
  name?: string
  price?: string | number
  image?: string
  category?: string
  description?: string
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

let globalFavorites: FavoriteItem[] = []
const globalListeners: ((favs: FavoriteItem[]) => void)[] = []

export const useAuthAndFavorites = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('is_logged_in') === 'true'
  })

  const [favorites, setFavorites] = useState<FavoriteItem[]>(globalFavorites)

  if (!globalListeners.includes(setFavorites)) {
    globalListeners.push(setFavorites)
  }

  const updateFavorites = (newFavs: FavoriteItem[]) => {
    globalFavorites = newFavs
    globalListeners.forEach((listener) => listener(newFavs))
  }

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
    const exists = globalFavorites.some((fav) => fav.id === item.id)
    if (exists) {
      const filtered = globalFavorites.filter((fav) => fav.id !== item.id)
      updateFavorites(filtered)
      toast.error('Sevimlilardan olib tashlandi', toastStyle)
    } else {
      const added = [...globalFavorites, item]
      updateFavorites(added)
      toast.success("Sevimlilarga qo'shildi", toastStyle)
    }
  }

  return {
    user,
    isLoggedIn,
    setIsLoggedIn,
    favorites,
    login,
    logout,
    toggleFavorite,
  }
}

export default useAuthAndFavorites