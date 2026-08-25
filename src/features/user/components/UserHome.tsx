import { useNavigate } from "react-router-dom"
import { Utensils, Calendar, Heart, ArrowRight, Sparkles, ChefHat } from "lucide-react"
import Button from "@/components/ui/Button/Button"

export default function UserHome() {
  const navigate = useNavigate()

  const stats = [
    { title: "Mening bronlarim", value: "1 ta faol", icon: Calendar, color: "text-emerald-500", path: "/user/stollar" },
    { title: "Sevimlilarim", value: "5 ta taom", icon: Heart, color: "text-rose-500", path: "/user/sevimlilar" },
  ]

  const featuredDishes = [
    { id: 1, name: "Tanho Saralangan Asorti", price: "185,000 so'm", category: "Milliy taomlar" },
    { id: 2, name: "Oshpazimizdan Maxsus Set", price: "140,000 so'm", category: "Kabab" },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-8 md:p-10 backdrop-blur-xl shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#F6B530]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6B530]/10 border border-[#F6B530]/30 text-[#F6B530] text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} /> TANHO RESTAURANT
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug">
            Xush kelibsiz! Restoranimizda yoqimli <span className="text-[#F6B530]">hordiq</span> tilaymiz.
          </h1>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Siz uchun maxsus tayyorlanadigan sara taomlar va shinam atmosfera. Restoranimizga tashrif buyurib, beqiyos tatdan bahramand bo'ling.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              onClick={() => navigate("/user/stollar")}
              className="!bg-[#F6B530] hover:!bg-[#e0a228] !text-zinc-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-[#F6B530]/20 text-sm flex items-center gap-2.5"
            >
              <Calendar size={18} />
              <span>Stol band qilish</span>
            </Button>
            <Button
              onClick={() => navigate("/user/menu")}
              className="!bg-zinc-950/80 hover:!bg-zinc-800 border border-zinc-700 !text-white font-medium px-6 py-3.5 rounded-xl text-sm flex items-center gap-2.5"
            >
              <Utensils size={18} className="text-[#F6B530]" />
              <span>Menyuni ko'rish</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className="bg-zinc-900/40 border border-zinc-800/80 hover:border-[#F6B530]/40 p-6 rounded-2xl transition-all duration-300 cursor-pointer group backdrop-blur-xl flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-zinc-400 text-sm font-medium block">{item.title}</span>
                <span className="text-2xl font-bold text-white block">{item.value}</span>
                <span className="text-xs text-[#F6B530] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-semibold pt-1">
                  Batafsil ko'rish <ArrowRight size={12} />
                </span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 group-hover:border-[#F6B530]/30 transition-colors">
                <Icon className={`w-6 h-6 ${item.color}`} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-[#F6B530]" /> Restoranimiz taomlari
          </h2>
          <button
            onClick={() => navigate("/user/menu")}
            className="text-xs font-semibold text-[#F6B530] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Barchasini ko'rish <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 flex items-center justify-between backdrop-blur-xl hover:border-[#F6B530]/30 transition-all"
            >
              <div className="space-y-1">
                <span className="text-xs text-zinc-500 font-medium">{dish.category}</span>
                <h3 className="text-base font-semibold text-white">{dish.name}</h3>
                <p className="text-sm font-bold text-[#F6B530]">{dish.price}</p>
              </div>
              <Button
                onClick={() => navigate("/user/menu")}
                className="!bg-[#F6B530] hover:bg-[#e0a228] !text-zinc-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md shadow-[#F6B530]/15"
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