import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
} from "lucide-react";
import Container from "@/components/ui/container/Container";
import Button from "@/components/ui/Button/Button";
import { articles } from "@/data/Blog";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = articles.find((item) => item.id === Number(id));

  if (!article) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#080807] px-4 text-center text-[#f4efe7]">
        <h1
          className="text-2xl"
          style={{ fontFamily: "Cambria, Georgia, serif" }}
        >
          Maqola topilmadi
        </h1>

        <p className="text-sm text-[#a9a197]">
          Siz izlayotgan maqola mavjud emas yoki o‘chirilgan.
        </p>

        <Button
          type="button"
          onClick={() => navigate("/blog")}
          className="mt-2 inline-flex items-center gap-2 rounded-[5px] border border-[#f6b531] px-5 py-2 text-[12px] font-semibold text-[#f6b531] transition hover:bg-[#f6b531] hover:text-[#181208]"
        >
          <ArrowLeft size={15} />
          Maqolalarga qaytish
        </Button>
      </main>
    );
  }

  const Icon = article.icon;

  return (
    <main className="min-h-screen bg-[#080807] pb-16 pt-[78px] text-[#f4efe7] sm:pt-[88px]">
      <div className="relative h-[280px] w-full overflow-hidden sm:h-[360px]">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080807] via-[#080807]/60 to-transparent" />
      </div>

      <Container className="relative -mt-20 sm:-mt-28">
        <div className="mx-auto max-w-3xl rounded-[10px] border border-[#332713] bg-[#10100e] p-6 sm:p-9">
          <Button
            type="button"
            onClick={() => navigate("/blog")}
            className="mb-5 inline-flex items-center gap-1.5 text-[11.5px] font-medium text-[#f6b531] transition hover:text-[#ffd778]"
          >
            <ArrowLeft size={14} />
            Barcha maqolalar
          </Button>

          <div className="mb-3 flex items-center gap-3 text-[#f6b531]">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c89228]/70 bg-[#080807]/80">
              <Icon size={18} strokeWidth={1.45} />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#edaa2d]">
              {article.category}
            </p>
          </div>

          <h1
            className="text-[1.9rem] leading-[1.15] text-[#f4efe7] sm:text-[2.25rem]"
            style={{ fontFamily: "Cambria, Georgia, serif" }}
          >
            {article.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-[11.5px] text-[#8e887e]">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={13} strokeWidth={1.4} />
              {article.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={13} strokeWidth={1.4} />
              {article.duration}
            </span>
          </div>

          <div className="mt-7 space-y-4 border-t border-[#26201612] pt-6">
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-[13.5px] leading-[1.75] text-[#c4bcb2]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}