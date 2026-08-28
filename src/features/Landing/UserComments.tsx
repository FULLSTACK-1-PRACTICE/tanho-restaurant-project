import { useState } from "react";
import { Star, Send, AlertCircle } from "lucide-react";
import Container from "../../components/ui/container/Container";
import { initialReviews } from "../../data/landingData";

function ReviewsSection() {
  const [reviews, setReviews] = useState(initialReviews);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameRegex = /^[a-zA-ZА-Яа-яЎўҚқҒғҲҳ\s'-]{2,30}$/;
    const trimmedName = name.trim();
    const trimmedComment = comment.trim();

    if (!trimmedName || !trimmedComment) {
      setError("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    if (!nameRegex.test(trimmedName)) {
      setError("Ism faqat harflardan iborat bo'lishi kerak (kamida 2 ta harf).");
      return;
    }

    if (trimmedComment.length < 5) {
      setError("Fikr matni juda qisqa (kamida 5 ta belgi bo'lishi kerak).");
      return;
    }

    setError("");

    const newReview = {
      id: Date.now(),
      name: trimmedName,
      rating,
      date: "Bugun",
      comment: trimmedComment,
    };

    setReviews([newReview, ...reviews]);
    setName("");
    setComment("");
    setRating(5);
  };

  return (
    <section 
      id="user-comments" 
      className="py-12 bg-[#070809] relative overflow-hidden border-t border-white/5"
    >
      <Container>
        <div className="flex items-center justify-between mb-7">
          <h2 className="font-serif text-[25px] text-[#f1eee7]">
            Mehmonlarimiz Sharhlari
          </h2>
          <span className="text-neutral-400 text-[13px] hidden sm:block">
            O'z taassurotingizni qoldiring
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-[#0b0c0e] border border-white/5 rounded-xl px-5 py-4 flex flex-col justify-between transition-all duration-300 hover:border-[#dcae4d]/30"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#dcae4d]/10 border border-[#dcae4d]/30 flex items-center justify-center text-[#dcae4d] font-semibold text-xs shrink-0">
                    {rev.name.charAt(0)}
                  </div>
                  <h4 className="text-white font-medium text-[14px] truncate">{rev.name}</h4>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={12}
                      className={star <= rev.rating ? "text-[#dcae4d] fill-[#dcae4d]" : "text-neutral-700"}
                    />
                  ))}
                </div>
              </div>
              <p className="text-neutral-300 text-[13px] line-clamp-2 mb-3">{rev.comment}</p>
              <span className="text-neutral-500 text-[11px] text-right">{rev.date}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#0b0c0e] border border-white/10 rounded-xl p-5 md:p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Sharh Qoldirish
            </h3>
            {error && (
              <div className="flex items-center gap-1.5 text-rose-400 text-[12px] bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-lg animate-pulse">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3.5 items-center">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ismingiz"
              className="w-full sm:w-[240px] h-[52px] bg-[#070809] border border-white/10 rounded-xl px-4 text-white text-[14px] focus:outline-none focus:border-[#dcae4d] transition-colors"
            />

            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Fikringizni yozing..."
              className="w-full sm:flex-1 h-[52px] bg-[#070809] border border-white/10 rounded-xl px-4 text-white text-[14px] focus:outline-none focus:border-[#dcae4d] transition-colors"
            />

            <div className="flex items-center gap-1.5 bg-[#070809] border border-white/10 rounded-xl px-4 h-[52px] shrink-0">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  <Star
                    size={18}
                    className={
                      star <= (hoverRating || rating)
                        ? "text-[#dcae4d] fill-[#dcae4d]"
                        : "text-neutral-700"
                    }
                  />
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto h-[52px] group flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#dcae4d]/40 bg-[#dcae4d]/10 px-6 text-[12px] font-semibold tracking-wider text-[#dcae4d] transition-all duration-300 hover:bg-[#dcae4d] hover:text-black shrink-0 shadow-lg"
            >
              <Send size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              <span>YUBORISH</span>
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}

export default ReviewsSection;