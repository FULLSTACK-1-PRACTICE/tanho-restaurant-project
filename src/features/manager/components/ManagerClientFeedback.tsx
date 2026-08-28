import { useState } from "react";
import { MessageSquare, Star, Trash2, Search, Eye, CheckCircle } from "lucide-react";

interface FeedbackItem {
  id: string;
  clientName: string;
  phone: string;
  category: string;
  rating: number;
  comment: string;
  date: string;
  status: "Yangi" | "Ko'rib chiqildi";
}

const initialFeedbacks: FeedbackItem[] = [
  {
    id: "1",
    clientName: "Alisher Karimov",
    phone: "+998 90 123 45 67",
    category: "Taom sifati",
    rating: 5,
    comment: "Taomlar juda mazali va issiq keldi. Xizmat ko'rsatish darajasi a'lo!",
    date: "27 May, 2026",
    status: "Yangi",
  },
  {
    id: "2",
    clientName: "Malika Rahimova",
    phone: "+998 91 987 65 43",
    category: "Xizmat ko'rsatish",
    rating: 4,
    comment: "Ofitsiantlar tez harakat qilishdi, faqat musiqa biroz balandroq ekan.",
    date: "26 May, 2026",
    status: "Ko'rib chiqildi",
  },
];

export default function ManagerClientFeedback() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(initialFeedbacks);
  const [search, setSearch] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);

  const handleDelete = (id: string) => {
    if (confirm("Ushbu fikrni o'chirishni xohlaysizmi?")) {
      setFeedbacks(feedbacks.filter((item) => item.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setFeedbacks(
      feedbacks.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Yangi" ? "Ko'rib chiqildi" : "Yangi",
            }
          : item
      )
    );
  };

  const filtered = feedbacks.filter(
    (item) =>
      item.clientName.toLowerCase().includes(search.toLowerCase()) ||
      item.comment.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare style={{ color: "#F6B530" }} /> Mijozlar Fikr va Shikoyatlari
          </h1>
          <p className="text-sm text-gray-400">Menejer / Mijozlar murojaatlari</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Mijoz ismi, fikri yoki kategoriya bo'yicha qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#111113] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-[#111113] border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  style={{
                    backgroundColor: "rgba(246, 181, 48, 0.1)",
                    color: "#F6B530",
                  }}
                  className="text-xs font-bold px-2.5 py-1 rounded-lg"
                >
                  {item.category}
                </span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                    item.status === "Yangi"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-base">{item.clientName}</h3>
                <p className="text-xs text-gray-400">{item.phone}</p>
              </div>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={`${
                      star <= item.rating ? "fill-[#F6B530] text-[#F6B530]" : "text-gray-600"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-2">({item.rating}/5)</span>
              </div>

              <p className="text-xs text-gray-300 line-clamp-3 bg-black/30 p-3 rounded-xl border border-white/5">
                "{item.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-gray-500">{item.date}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedFeedback(item)}
                  className="p-2 text-gray-400 hover:text-[#F6B530] hover:bg-white/5 rounded-lg transition"
                  title="Ko'rish"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => handleToggleStatus(item.id)}
                  className="p-2 text-gray-400 hover:text-green-400 hover:bg-white/5 rounded-lg transition"
                  title="Statusni o'zgartirish"
                >
                  <CheckCircle size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition"
                  title="O'chirish"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedFeedback && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">Murojaat Tafsiloti</h2>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                <strong className="text-white">Mijoz:</strong> {selectedFeedback.clientName} ({selectedFeedback.phone})
              </p>
              <p>
                <strong className="text-white">Mavzu:</strong> {selectedFeedback.category}
              </p>
              <p>
                <strong className="text-white">Baho:</strong> {selectedFeedback.rating} / 5
              </p>
              <p>
                <strong className="text-white">Sana:</strong> {selectedFeedback.date}
              </p>
              <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Izoh:</p>
                <p className="text-white">{selectedFeedback.comment}</p>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedFeedback(null)}
                style={{ backgroundColor: "#F6B530" }}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-black hover:opacity-90 transition"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}