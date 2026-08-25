import { useState } from "react"
import { Send, MessageSquare, Star, CheckCircle2, ThumbsUp, Utensils, HeartHandshake } from "lucide-react"

export default function UserSuggestions() {
  const [category, setCategory] = useState("Taom sifati")
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const categories = [
    { label: "Taom sifati", icon: Utensils },
    { label: "Xizmat ko'rsatish", icon: HeartHandshake },
    { label: "Umumiy taassurot", icon: ThumbsUp },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setMessage("")
    }, 4000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#F6B530]" />
            Taklif va shikoyatlar
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Restoranimiz xizmat sifatini oshirish uchun fikrlaringiz biz uchun juda muhim.
          </p>
        </div>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden">
        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[#F6B530]/10 flex items-center justify-center border border-[#F6B530]/30 text-[#F6B530]">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-semibold text-white">Fikringiz uchun rahmat!</h3>
            <p className="text-zinc-400 text-sm max-w-md">
              Murojaatingiz muvaffaqiyatli qabul qilindi. Biz xizmatlarimizni yanada yaxshilash ustida ishlaymiz.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-3">
                Murojaat mavzusini tanlang
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {categories.map((item) => {
                  const Icon = item.icon
                  const active = category === item.label
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setCategory(item.label)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer ${
                        active
                          ? "bg-[#F6B530]/10 border-[#F6B530] text-[#F6B530] shadow-lg shadow-[#F6B530]/5"
                          : "bg-zinc-950/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                      }`}
                    >
                      <Icon size={18} className={active ? "text-[#F6B530]" : "text-zinc-500"} />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-3">
                Restoranimizga necha baho berasiz?
              </label>
              <div className="flex items-center gap-3 bg-zinc-950/70 border border-zinc-800/80 p-3.5 rounded-xl w-fit">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = star <= (hoverRating || rating)
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-none transition-transform duration-200 hover:scale-125 active:scale-90 cursor-pointer"
                      >
                        <Star
                          size={24}
                          className={`transition-all duration-200 ${
                            isFilled
                              ? "fill-[#F6B530] text-[#F6B530] drop-shadow-[0_0_10px_rgba(246,181,48,0.5)]"
                              : "text-zinc-700 fill-zinc-900/40 hover:text-zinc-500"
                          }`}
                        />
                      </button>
                    )
                  })}
                </div>
                <div className="h-6 w-[1px] bg-zinc-800 mx-1" />
                <span className="text-xs font-bold text-[#F6B530] px-2.5 py-1 rounded-lg bg-[#F6B530]/10 border border-[#F6B530]/20">
                  {hoverRating || rating} / 5
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2">
                Fikr va taklifingiz
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Fikr va mulohazalaringizni batafsil yozib qoldiring..."
                className="w-full bg-zinc-950/60 border border-zinc-800 focus:border-[#F6B530] focus:ring-1 focus:ring-[#F6B530] rounded-xl p-4 text-white text-sm placeholder-zinc-600 outline-none transition-all resize-none"
                required
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#F6B530] hover:bg-[#e0a228] text-zinc-950 font-bold px-7 py-3 rounded-xl shadow-lg shadow-[#F6B530]/20 hover:shadow-[#F6B530]/30 transition-all cursor-pointer active:scale-95"
              >
                <Send size={16} className="fill-zinc-950" />
                <span>Yuborish</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}