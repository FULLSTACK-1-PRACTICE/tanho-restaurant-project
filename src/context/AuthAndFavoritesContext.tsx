import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface FavoriteItem {
  id: string | number;
  title?: string;
  name?: string;
  price?: string | number;
  image?: string;
  category?: string;
  description?: string;
  [key: string]: unknown;
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
};

let globalFavorites: FavoriteItem[] = [];
const globalListeners: ((favs: FavoriteItem[]) => void)[] = [];

export const useAuthAndFavorites = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");

    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("is_logged_in") === "true";
  });

  const [favorites, setFavorites] =
    useState<FavoriteItem[]>(globalFavorites);

  useEffect(() => {
    const handleUserUpdated = () => {
      const savedUser = localStorage.getItem("user");

      try {
        setUser(savedUser ? JSON.parse(savedUser) : null);
      } catch {
        setUser(null);
      }

      setIsLoggedIn(
        localStorage.getItem("is_logged_in") === "true"
      );
    };

    window.addEventListener("userUpdated", handleUserUpdated);

    return () => {
      window.removeEventListener(
        "userUpdated",
        handleUserUpdated
      );
    };
  }, []);

  if (!globalListeners.includes(setFavorites)) {
    globalListeners.push(setFavorites);
  }

  const updateFavorites = (newFavs: FavoriteItem[]) => {
    globalFavorites = newFavs;

    localStorage.setItem(
      "user_favorites",
      JSON.stringify(newFavs)
    );

    globalListeners.forEach((listener) => listener(newFavs));
  };

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem("is_logged_in", "true");

    localStorage.setItem("token", "tanho-auth-token");

    localStorage.setItem("role", userData.role);

    localStorage.setItem("user_role", userData.role);

    localStorage.setItem("user_name", userData.name);

    window.dispatchEvent(new Event("userUpdated"));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);

    localStorage.removeItem("user");
    localStorage.removeItem("is_logged_in");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_phone");
    localStorage.removeItem("user_avatar");
  };

  const toggleFavorite = (item: FavoriteItem) => {
    const exists = globalFavorites.some(
      (fav) => fav.id === item.id
    );

    if (exists) {
      const filtered = globalFavorites.filter(
        (fav) => fav.id !== item.id
      );

      updateFavorites(filtered);

      toast.error(
        "Sevimlilardan olib tashlandi",
        toastStyle
      );
    } else {
      const added = [...globalFavorites, item];

      updateFavorites(added);

      toast.success(
        "Sevimlilarga qo'shildi",
        toastStyle
      );
    }
  };

  return {
    user,
    isLoggedIn,
    setIsLoggedIn,
    favorites,
    login,
    logout,
    toggleFavorite,
  };
};

export default useAuthAndFavorites;