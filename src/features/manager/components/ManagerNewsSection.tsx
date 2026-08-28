import { useState } from "react";
import { Plus, Trash2, Edit, Search, Newspaper } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  image: string;
}

const initialNews: NewsItem[] = [
  {
    id: "1",
    title: "Yangi Yozgi Menyu E'lon Qilindi",
    summary: "TANHO restoranida yangi va salqin taomlar to'plami taqdim etilmoqda.",
    date: "20 May, 2026",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
  },
];

export default function ManagerNewsSection() {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    image: "",
  });

  const handleOpenModal = (item?: NewsItem) => {
    if (item) {
      setEditingNews(item);
      setFormData({
        title: item.title,
        summary: item.summary,
        image: item.image,
      });
    } else {
      setEditingNews(null);
      setFormData({ title: "", summary: "", image: "" });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Yangilikni o'chirishni tasdiqlaysizmi?")) {
      setNews(news.filter((n) => n.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNews) {
      setNews(
        news.map((item) =>
          item.id === editingNews.id ? { ...item, ...formData } : item
        )
      );
    } else {
      const newItem: NewsItem = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        image:
          formData.image ||
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80",
      };
      setNews([newItem, ...news]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Newspaper style={{ color: "#F6B530" }} /> Yangiliklar Boshqaruvi
          </h1>
          <p className="text-sm text-gray-400">Restoran yangiliklarini boshqarish</p>
        </div>
        <button
          type="button"
          onClick={() => handleOpenModal()}
          style={{ backgroundColor: "#F6B530" }}
          className="flex items-center gap-2 hover:bg-[#e0a228] text-black px-5 py-2.5 rounded-full font-semibold transition cursor-pointer active:scale-95"
        >
          <Plus size={18} /> Yangilik Qo'shish
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Yangiliklarni qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#111113] border border-white/10 hover:border-white/20 focus:border-[#F6B530] rounded-full pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none transition"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news
          .filter((n) => n.title.toLowerCase().includes(search.toLowerCase()))
          .map((item) => (
            <div
              key={item.id}
              className="bg-[#111113] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <img src={item.image} alt={item.title} className="w-full h-44 object-cover" />
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-gray-400">{item.summary}</p>
                </div>
              </div>
              <div className="p-4 pt-0 border-t border-white/5 flex items-center justify-between mt-4">
                <span className="text-xs text-gray-500">{item.date}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenModal(item)}
                    className="p-2 text-gray-400 hover:text-[#F6B530] hover:bg-white/5 rounded-lg transition cursor-pointer"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161618] border border-white/10 rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl">
            <h2 className="text-xl font-bold text-white">
              {editingNews ? "Yangilikni Tahrirlash" : "Yangi Maqola Qo'shish"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 ml-1">Sarlavha</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#111113] border border-white/10 focus:border-[#F6B530] rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none mt-1 transition"
                  placeholder="Sarlavhani kiriting..."
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 ml-1">Rasm URL (Opsional)</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-[#111113] border border-white/10 focus:border-[#F6B530] rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none mt-1 transition"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 ml-1">Matn</label>
                <textarea
                  required
                  rows={4}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full bg-[#111113] border border-white/10 focus:border-[#F6B530] rounded-2xl p-3 text-sm text-white focus:outline-none resize-none mt-1 transition"
                  placeholder="Yangilik matnini kiriting..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition cursor-pointer active:scale-95"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: "#F6B530" }}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-black hover:bg-[#e0a228] transition cursor-pointer active:scale-95 shadow-md shadow-[#F6B530]/20"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}