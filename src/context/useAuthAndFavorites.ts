import { useEffect, useState } from "react"
import { toast } from "sonner"

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
    width: "360px",
    minHeight: "64px",
    background: "#1f1f23",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#fff",
  },
  duration: 3000,
}

const getStoredFavorites = (): FavoriteItem[] => {
  try {
    const saved = localStorage.getItem("user_favorites")

    if (!saved) {
      return []
    }

    const parsed = JSON.parse(saved)

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

let globalFavorites: FavoriteItem[] = getStoredFavorites()

const globalListeners: Array<
  (favorites: FavoriteItem[]) => void
> = []

export const useAuthAndFavorites = () => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("user")

      if (!saved) {
        return null
      }

      return JSON.parse(saved)
    } catch {
      return null
    }
  })

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("is_logged_in") === "true"
  })

  const [favorites, setFavorites] =
    useState<FavoriteItem[]>(() => {
      return globalFavorites
    })

  useEffect(() => {
    globalListeners.push(setFavorites)

    return () => {
      const index = globalListeners.indexOf(setFavorites)

      if (index !== -1) {
        globalListeners.splice(index, 1)
      }
    }
  }, [])

  useEffect(() => {
    const handleUserUpdated = () => {
      try {
        const savedUser = localStorage.getItem("user")

        setUser(
          savedUser
            ? JSON.parse(savedUser)
            : null,
        )

        setIsLoggedIn(
          localStorage.getItem("is_logged_in") ===
            "true",
        )
      } catch {
        setUser(null)
        setIsLoggedIn(false)
      }

      const savedFavorites = getStoredFavorites()

      globalFavorites = savedFavorites
      setFavorites(savedFavorites)
    }

    window.addEventListener(
      "userUpdated",
      handleUserUpdated,
    )

    window.addEventListener(
      "storage",
      handleUserUpdated,
    )

    return () => {
      window.removeEventListener(
        "userUpdated",
        handleUserUpdated,
      )

      window.removeEventListener(
        "storage",
        handleUserUpdated,
      )
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    setIsLoggedIn(true)

    localStorage.setItem(
      "user",
      JSON.stringify(userData),
    )

    localStorage.setItem(
      "is_logged_in",
      "true",
    )

    localStorage.setItem(
      "user_role",
      userData.role,
    )

    localStorage.setItem(
      "role",
      userData.role,
    )

    if (!localStorage.getItem("user_name")) {
      localStorage.setItem(
        "user_name",
        userData.name,
      )
    }

    window.dispatchEvent(
      new Event("userUpdated"),
    )
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)

    localStorage.removeItem("user")
    localStorage.removeItem("is_logged_in")
    localStorage.removeItem("user_role")
    localStorage.removeItem("role")
    localStorage.removeItem("token")
    localStorage.removeItem("user_name")
    localStorage.removeItem("user_email")
    localStorage.removeItem("user_phone")
    localStorage.removeItem("user_avatar")

    globalFavorites = []
    localStorage.removeItem("user_favorites")

    globalListeners.forEach((listener) => {
      listener([])
    })

    window.dispatchEvent(
      new Event("userUpdated"),
    )
  }

  const updateFavorites = (
    newFavorites: FavoriteItem[],
  ) => {
    globalFavorites = newFavorites

    localStorage.setItem(
      "user_favorites",
      JSON.stringify(newFavorites),
    )

    globalListeners.forEach((listener) => {
      listener(newFavorites)
    })
  }

  const toggleFavorite = (
    item: FavoriteItem,
  ) => {
    const exists = globalFavorites.some(
      (favorite) =>
        String(favorite.id) ===
        String(item.id),
    )

    if (exists) {
      const updatedFavorites =
        globalFavorites.filter(
          (favorite) =>
            String(favorite.id) !==
            String(item.id),
        )

      updateFavorites(updatedFavorites)

      toast.error(
        "Sevimlilardan olib tashlandi",
        toastStyle,
      )
    } else {
      const updatedFavorites = [
        ...globalFavorites,
        item,
      ]

      updateFavorites(updatedFavorites)

      toast.success(
        "Sevimlilarga qo'shildi",
        toastStyle,
      )
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