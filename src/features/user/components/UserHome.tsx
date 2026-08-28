import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Utensils,
  Calendar,
  Heart,
  ArrowRight,
  Sparkles,
  ChefHat,
} from "lucide-react"
import Button from "@/components/ui/Button/Button"

interface FavoriteItem {
  id: string | number
  title?: string
  name?: string
  image?: string
  category?: string
  [key: string]: unknown
}

interface BookingItem {
  id?: string | number
  date?: string
  time?: string
  status?: string
  [key: string]: unknown
}

function getFavoriteCount() {
  try {
    const saved = localStorage.getItem("user_favorites")

    if (!saved) {
      return 0
    }

    const favorites: FavoriteItem[] = JSON.parse(saved)

    return Array.isArray(favorites) ? favorites.length : 0
  } catch {
    return 0
  }
}

function getBookingCount() {
  try {
    const saved =
      localStorage.getItem("user_bookings") ||
      localStorage.getItem("bookings") ||
      localStorage.getItem("reservations")

    if (!saved) {
      return 0
    }

    const bookings: BookingItem[] = JSON.parse(saved)

    if (!Array.isArray(bookings)) {
      return 0
    }

    return bookings.filter((booking) => {
      const status = String(booking.status || "").toLowerCase()

      return (
        status !== "cancelled" &&
        status !== "canceled" &&
        status !== "bekor qilingan"
      )
    }).length
  } catch {
    return 0
  }
}

export default function UserHome() {
  const navigate = useNavigate()

  const [favoriteCount, setFavoriteCount] = useState(getFavoriteCount)
  const [bookingCount, setBookingCount] = useState(getBookingCount)

  useEffect(() => {
    const updateFavorites = () => {
      setFavoriteCount(getFavoriteCount())
    }

    const updateBookings = () => {
      setBookingCount(getBookingCount())
    }

    const updateAll = () => {
      setFavoriteCount(getFavoriteCount())
      setBookingCount(getBookingCount())
    }

    window.addEventListener("favoritesUpdated", updateFavorites)
    window.addEventListener("bookingUpdated", updateBookings)
    window.addEventListener("userUpdated", updateAll)

    return () => {
      window.removeEventListener("favoritesUpdated", updateFavorites)
      window.removeEventListener("bookingUpdated", updateBookings)
      window.removeEventListener("userUpdated", updateAll)
    }
  }, [])

  const stats = [
    {
      title: "Mening bronlarim",
      value: `${bookingCount} ta faol`,
      icon: Calendar,
      color: "text-emerald-500",
      path: "/user/stollar",
    },
    {
      title: "Sevimlilarim",
      value: `${favoriteCount} ta taom`,
      icon: Heart,
      color: "text-rose-500",
      path: "/user/sevimlilar",
    },
  ]

  const featuredDishes = [
    {
      id: 1,
      name: "Jo'ja",
      category: "Milliy taomlar",
    },
    {
      id: 2,
      name: "Kotlet",
      category: "Issiq taomlar",
    },
    {
      id: 3,
      name: "Sho'rva",
      category: "Milliy taomlar",
    },
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-8 shadow-xl backdrop-blur-xl md:p-10">
        <div className="pointer-events-none absolute -right-12 -top-12 h-96 w-96 rounded-full bg-[#F6B530]/10 blur-3xl" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F6B530]/30 bg-[#F6B530]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#F6B530]">
            <Sparkles size={14} />
            TANHO RESTAURANT
          </div>

          <h1 className="text-3xl font-extrabold leading-snug tracking-tight text-white md:text-4xl">
            Xush kelibsiz! Restoranimizda yoqimli{" "}
            <span className="text-[#F6B530]">hordiq</span> tilaymiz.
          </h1>

          <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
            Siz uchun maxsus tayyorlanadigan sara taomlar va shinam atmosfera.
            Restoranimizga tashrif buyurib, beqiyos ta'mdan bahramand bo'ling.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              onClick={() => navigate("/user/stollar")}
              className="flex items-center gap-2.5 rounded-xl !bg-[#F6B530] px-7 py-3.5 text-sm font-bold !text-zinc-950 shadow-lg shadow-[#F6B530]/20 hover:!bg-[#e0a228]"
            >
              <Calendar size={18} />
              <span>Stol band qilish</span>
            </Button>

            <Button
              onClick={() => navigate("/menu")}
              className="flex items-center gap-2.5 rounded-xl border border-zinc-700 !bg-zinc-950/80 px-6 py-3.5 text-sm font-medium !text-white hover:!bg-zinc-800"
            >
              <Utensils size={18} className="text-[#F6B530]" />
              <span>Menyuni ko'rish</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {stats.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.title}
              onClick={() => navigate(item.path)}
              className="group flex cursor-pointer items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#F6B530]/40"
            >
              <div className="space-y-1">
                <span className="block text-sm font-medium text-zinc-400">
                  {item.title}
                </span>

                <span className="block text-2xl font-bold text-white">
                  {item.value}
                </span>

                <span className="flex items-center gap-1 pt-1 text-xs font-semibold text-[#F6B530] opacity-0 transition-opacity group-hover:opacity-100">
                  Batafsil ko'rish
                  <ArrowRight size={12} />
                </span>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition-colors group-hover:border-[#F6B530]/30">
                <Icon className={`h-6 w-6 ${item.color}`} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold text-white">
            <ChefHat className="h-5 w-5 text-[#F6B530]" />
            Restoranimiz taomlari
          </h2>

          <button
            type="button"
            onClick={() => navigate("/menu")}
            className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-[#F6B530] hover:underline"
          >
            Barchasini ko'rish
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {featuredDishes.map((dish) => (
            <div
              key={dish.id}
              className="flex items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-xl transition-all hover:border-[#F6B530]/30"
            >
              <div className="space-y-1">
                <span className="text-xs font-medium text-zinc-500">
                  {dish.category}
                </span>

                <h3 className="text-base font-semibold text-white">
                  {dish.name}
                </h3>
              </div>

              <Button
                onClick={() => navigate("/menu")}
                className="flex items-center gap-2 rounded-xl !bg-[#F6B530] px-5 py-2.5 text-xs font-bold !text-zinc-950 shadow-md shadow-[#F6B530]/15 hover:!bg-[#e0a228]"
              >
                <span>Batafsil</span>
                <ArrowRight size={14} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}