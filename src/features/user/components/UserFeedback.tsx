import { useState } from "react"
import { Send } from "lucide-react"

export default function UserFeedback() {
  const [selectedTopic, setSelectedTopic] = useState("Taom sifati")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    setComment("")
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10">
        <h2 className="text-lg font-bold text-white">Taklif va shikoyatlar</h2>
        <p className="text-sm text-gray-400 mt-1">Restoranimiz xizmat sifatini oshirish uchun fikrlaringiz biz uchun juda muhim.</p>
      </div>

      <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">MUROJAAT MAVZUSINI TANLANG</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {["Taom sifati", "Xizmat ko'rsatish", "Umumiy taassurot"].map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setSelectedTopic(topic)}
                className={`p-4 rounded-xl border text-left text-sm font-medium transition-all cursor-pointer ${
                  selectedTopic === topic
                    ? "bg-amber-500/10 border-amber-500 text-amber-400"
                    : "bg-zinc-950 border-white/10 text-gray-300 hover:border-white/30"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">RESTORANIMIZGA NECHA BAHO BERASIZ?</label>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-950 border border-white/10 w-fit">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-xl cursor-pointer transition-transform hover:scale-110 ${
                    star <= rating ? "text-amber-400" : "text-gray-600"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10 text-xs font-bold text-amber-400">
              {rating}/5
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">FIKR VA TAKLIFINGIZ</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Fikr va mulohazalaringizni batafsil yozib qoldiring..."
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-zinc-950 p-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-amber-500 transition-colors resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {submitted ? (
            <span className="text-sm font-medium text-green-400 animate-pulse">Taklifingiz muvaffaqiyatli yuborildi! Rahmat!</span>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-black font-semibold text-sm transition-all hover:bg-amber-300 cursor-pointer shadow-lg shadow-amber-400/20 ml-auto"
          >
            <Send size={16} />
            <span>Yuborish</span>
          </button>
        </div>
      </div>
    </div>
  )
}