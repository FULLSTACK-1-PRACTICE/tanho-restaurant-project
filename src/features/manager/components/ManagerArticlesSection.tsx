import { useState, useRef, useEffect } from "react";
import { Plus, Trash2, Edit, Search, BookOpen, ChevronDown, Check, Upload, Image as ImageIcon } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import { toast } from "sonner";

interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
}

const CATEGORIES = ["Taomlar", "Maslahatlar", "Tadbirlar"];

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
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  
  const selectRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Taomlar",
    content: "",
    readTime: "5 daqiqa",
    image: "",
  });

  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenModal = (article?: Article) => {
    setErrors({});
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
    setIsSelectOpen(false);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
        toast.success("Rasm muvaffaqiyatli yuklandi!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    setArticles((currentArticles) =>
      currentArticles.filter((item) => item.id !== id)
    );
    toast.success("Maqola o‘chirildi!");
  };

  const validateForm = () => {
    const newErrors: { title?: string; content?: string } = {};
    const emptyOrSpacesRegex = /^\s*$/;

    if (emptyOrSpacesRegex.test(formData.title)) {
      newErrors.title = "Sarlavha kiritilishi shart!";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Sarlavha kamida 3 ta belgidan iborat bo'lishi kerak!";
    }

    if (emptyOrSpacesRegex.test(formData.content)) {
      newErrors.content = "Matn kiritilishi shart!";
    } else if (formData.content.trim().length < 10) {
      newErrors.content = "Matn kamida 10 ta belgidan iborat bo'lishi kerak!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingArticle) {
      setArticles((currentArticles) =>
        currentArticles.map((item) =>
          item.id === editingArticle.id ? { ...item, ...formData } : item
        )
      );
      toast.success("Maqola tahrirlandi!");
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
      setArticles((currentArticles) => [newArticle, ...currentArticles]);
      toast.success("Maqola qo‘shildi!");
    }
    setIsModalOpen(false);
  };

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const canSave = Boolean(
    formData.title.trim() &&
      formData.content.trim() &&
      (!editingArticle ||
        formData.title !== editingArticle.title ||
        formData.category !== editingArticle.category ||
        formData.content !== editingArticle.content ||
        formData.readTime !== editingArticle.readTime ||
        formData.image !== editingArticle.image)
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
        <Button
          type="button"
          onClick={() => handleOpenModal()}
          style={{ backgroundColor: "#F6B530" }}
          className="flex items-center gap-2 hover:bg-[#e0a228] text-black px-5 py-2.5 rounded-full font-semibold transition cursor-pointer active:scale-95 border-none"
        >
          <Plus size={18} /> Yangi Maqola Qo'shish
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Maqolalarni qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#111113] border border-white/10 hover:border-white/20 focus:border-[#F6B530] rounded-full pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none transition"
        />
      </div>

      {filtered.length > 0 ? (
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
                  className="absolute top-3 left-3 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md"
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
                <Button
                  type="button"
                  onClick={() => handleOpenModal(item)}
                  className="p-2 text-gray-400 hover:text-[#F6B530] hover:bg-white/5 rounded-lg transition cursor-pointer bg-transparent border-none"
                >
                  <Edit size={16} />
                </Button>
                <Button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition cursor-pointer bg-transparent border-none"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#111113] px-6 py-14 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F6B530]/10">
            <Search size={22} className="text-[#F6B530]" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-white">Ma’lumot topilmadi</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
            “{search}” bo‘yicha hech qanday maqola topilmadi. Boshqa so‘z bilan qidirib ko‘ring.
          </p>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-[#161618] border border-white/10 rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <h2 className="text-xl font-bold text-white">
              {editingArticle ? "Maqolani Tahrirlash" : "Yangi Maqola Qo'shish"}
            </h2>
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 ml-1">Sarlavha</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    if (errors.title) setErrors({ ...errors, title: undefined });
                  }}
                  className={`w-full bg-[#111113] border ${
                    errors.title ? "border-red-500" : "border-white/10 focus:border-[#F6B530]"
                  } rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none mt-1 transition`}
                  placeholder="Sarlavhani kiriting..."
                />
                {errors.title && (
                  <span className="text-xs text-red-500 ml-1 mt-1 block">{errors.title}</span>
                )}
              </div>

              {/* Custom Select */}
              <div className="relative" ref={selectRef}>
                <label className="text-xs text-gray-400 ml-1">Kategoriya</label>
                <Button
                  type="button"
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className={`w-full bg-[#111113] border ${
                    isSelectOpen ? "border-[#F6B530]" : "border-white/10"
                  } rounded-2xl px-4 py-2.5 text-sm text-white flex items-center justify-between mt-1 transition cursor-pointer text-left`}
                >
                  <span>{formData.category}</span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-200 ${
                      isSelectOpen ? "rotate-180 text-[#F6B530]" : ""
                    }`}
                  />
                </Button>

                {isSelectOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-[#1c1c1f] border border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden py-1.5 backdrop-blur-md">
                    {CATEGORIES.map((cat) => (
                      <Button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, category: cat });
                          setIsSelectOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-sm flex items-center justify-between transition cursor-pointer ${
                          formData.category === cat
                            ? "bg-[#F6B530]/10 text-[#F6B530] font-medium"
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{cat}</span>
                        {formData.category === cat && <Check size={16} className="text-[#F6B530]" />}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {/* File Upload UI */}
              <div>
                <label className="text-xs text-gray-400 ml-1">Rasm yuklash</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-[#111113] border border-dashed border-white/20 hover:border-[#F6B530] rounded-2xl p-4 mt-1 flex flex-col items-center justify-center cursor-pointer transition group"
                >
                  {formData.image ? (
                    <div className="relative w-full h-32 rounded-xl overflow-hidden group">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <span className="text-xs text-white flex items-center gap-1 font-medium">
                          <Upload size={14} /> Rasmni o'zgartirish
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-[#F6B530] transition py-2">
                      <ImageIcon size={28} />
                      <span className="text-xs font-medium">Faylni tanlash uchun bosing</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 ml-1">Matn</label>
                <textarea
                  rows={4}
                  value={formData.content}
                  onChange={(e) => {
                    setFormData({ ...formData, content: e.target.value });
                    if (errors.content) setErrors({ ...errors, content: undefined });
                  }}
                  className={`w-full bg-[#111113] border ${
                    errors.content ? "border-red-500" : "border-white/10 focus:border-[#F6B530]"
                  } rounded-2xl p-3 text-sm text-white focus:outline-none resize-none mt-1 transition`}
                  placeholder="Maqola matnini kiriting..."
                />
                {errors.content && (
                  <span className="text-xs text-red-500 ml-1 mt-1 block">{errors.content}</span>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-300 bg-[#222225] hover:bg-[#2c2c30] hover:text-white transition cursor-pointer active:scale-95 border-none"
                >
                  Bekor qilish
                </Button>
                <Button
                  type="submit"
                  disabled={!canSave}
                  style={{ backgroundColor: "#F6B530" }}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-black hover:bg-[#e0a228] transition cursor-pointer active:scale-95 shadow-md shadow-[#F6B530]/20 border-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#F6B530]"
                >
                  Saqlash
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}