import { useState, useEffect } from "react";

export const useAuthAndFavorites = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("is_logged_in") === "true";
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("user_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("is_logged_in") === "true");
      const saved = localStorage.getItem("user_favorites");
      setFavorites(saved ? JSON.parse(saved) : []);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];
      localStorage.setItem("user_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return {
    isLoggedIn,
    favorites,
    toggleFavorite,
  };
};

export default useAuthAndFavorites;