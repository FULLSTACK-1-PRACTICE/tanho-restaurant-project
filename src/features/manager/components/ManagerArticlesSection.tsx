import { useState } from "react";
import { Plus, Trash2, Edit, Search, BookOpen } from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
}

const initialArticles: Article[] = [
  {
    id: "1",
    title: "Bizning taomlarimiz qanday tayyorlanadi?",
    category: "Taomlar",
    content: "TANHO oshpazlari taomlarimizni qanday mehr va sifat bilan tayyorlashini bilib oling.",
    date: "18 May, 2026",
    readTime: "5 daqiqa",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80",
  },
];

export default function ManagerArticlesSection() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Taomlar",
    content: "",
    readTime: "5 daqiqa",
    image: "",
  });

  const handleOpenModal = (article?: Article) => {
    if (article) {
      setEditingArticle(article);
      setFormData({
        title: article.title,
        category: article.category,
        content: article.content,
        readTime: article.readTime,
        image: article.image,
      });
    } else {
      setEditingArticle(null);
      setFormData({
        title: "",
        category: "Taomlar",
        content: "",
        readTime: "5 daqiqa",
        image: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Haqiqatdan ham ushbu maqolani o'chirmoqchimisiz?")) {
      setArticles(articles.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticle) {
      setArticles(
        articles.map((item) =>
          item.id === editingArticle.id ? { ...item, ...formData } : item
        )
      );
    } else {
      const newArticle: Article = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        image:
          formData.image ||
          "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&q=80",
      };
      setArticles([newArticle, ...articles]);
    }
    setIsModalOpen(false);
  };

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen style={{ color: "#F6B530" }} /> Maqolalar Boshqaruvi
          </h1>
          <p className="text-sm text-gray-400">
            Foydali maqolalarni qo'shing, tahrirlang yoki o'chiring
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          style={{ backgroundColor: "#F6B530" }}
          className="flex items-center gap-2 hover:opacity-90 text-black px-4 py-2.5 rounded-xl font-semibold transition"
        >
          <Plus size={18} /> Yangi Maqola Qo'shish
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Maqolalarni qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#111113] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-[#111113] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="h-44 relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <span 
                  style={{ backgroundColor: "#F6B530" }}
                  className="absolute top-3 left-3 text-black text-xs font-bold px-2.5 py-1 rounded-lg"
                >
                  {item.category}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-white line-clamp-2">{item.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-3">{item.content}</p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-white/5 flex items-center justify-between mt-4">
              <span className="text-xs text-gray-500">{item.date}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(item)}
                  className="p-2 text-gray-400 hover:text-[#F6B530] hover:bg-white/5 rounded-lg transition"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">
              {editingArticle ? "Maqolani Tahrirlash" : "Yangi Maqola Qo'shish"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400">Sarlavha</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400">Kategoriya</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-sm text-white"
                >
                  <option value="Taomlar">Taomlar</option>
                  <option value="Maslahatlar">Maslahatlar</option>
                  <option value="Tadbirlar">Tadbirlar</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400">Rasm URL (Opsional)</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400">Matn</label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-sm text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: "#F6B530" }}
                  className="px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 text-black"
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