import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChefHat,
  CircleUserRound,
  Clock3,
  Mail,
  Send,
} from "lucide-react";
import Container from "@/components/ui/container/Container";
import Button from "@/components/ui/Button/Button";
import { articles, type Article } from "@/data/Blog";

const categoryLabels = [
  "Barchasi",
  "Taomlar",
  "Maslahatlar",
  "Yangiliklar",
  "Tadbirlar",
  "Hayotdan lavhalar",
];

const ARTICLES_PER_PAGE = 6;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function ArticleCard({
  article,
  index,
  isWide,
}: {
  article: Article;
  index: number;
  isWide: boolean;
}) {
  const navigate = useNavigate();
  const Icon = article.icon;

  return (
    <article
      onClick={() => navigate(`/blog/${article.id}`)}
      className={`group relative flex min-h-[340px] cursor-pointer flex-col overflow-hidden rounded-[10px] border border-[#332713] bg-[#10100e] sm:min-h-[370px] ${
        isWide ? "xl:col-span-6" : "xl:col-span-3"
      }`}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <div className="relative h-[150px] overflow-hidden bg-[#17130d]">
        <img
          src={article.image}
          alt={article.title}
          style={{ backfaceVisibility: "hidden" }}
          className="block h-full w-full object-cover opacity-90 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
        />

        <div className="absolute -bottom-1 inset-x-0 h-full bg-gradient-to-t from-[#10100e] via-[#0b0b09]/15 to-transparent pointer-events-none" />

        <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#c89228]/70 bg-[#080807]/80 text-[#f6b531] backdrop-blur-sm">
          <Icon size={18} strokeWidth={1.45} />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.09em] text-[#edaa2d]">
          {article.category}
        </p>

        <h2 className="font-display text-[20px] leading-[1.12] text-[#f4efe7] transition-colors group-hover:text-[#f6b531]">
          {article.title}
        </h2>

        <p className="mt-2 line-clamp-3 text-[12px] leading-[1.5] text-[#aaa39a]">
          {article.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-[10px] text-[#8e887e]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <CalendarDays size={12} strokeWidth={1.4} />
              {article.date}
            </span>

            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Clock3 size={12} strokeWidth={1.4} />
              {article.duration}
            </span>
          </div>

          <Button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/blog/${article.id}`);
            }}
            className="inline-flex shrink-0 items-center gap-1 text-[10.5px] font-medium text-[#f6b531] transition hover:text-[#ffd778]"
          >
            Batafsil
            <ArrowRight
              size={13}
              strokeWidth={1.6}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Button>
        </div>
      </div>
    </article>
  );
}

function CategoryScroller({
  activeCategory,
  onChange,
}: {
  activeCategory: string;
  onChange: (category: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isCompact, setIsCompact] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [offset, setOffset] = useState(0);

  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startOffset: 0,
    moved: false,
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const containerEl = containerRef.current;
    const trackEl = trackRef.current;
    if (!containerEl || !trackEl) return;

    const measure = () => {
      setContainerWidth(containerEl.clientWidth);
      setTrackWidth(trackEl.scrollWidth);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(containerEl);
    resizeObserver.observe(trackEl);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const maxOffset = Math.max(0, trackWidth - containerWidth);
  const clampedOffset = Math.min(Math.max(offset, 0), maxOffset);

  const clamp = (value: number) => Math.min(Math.max(value, 0), maxOffset);

  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isCompact) return;
    dragState.current = {
      isDragging: true,
      startX: e.clientX,
      startOffset: clampedOffset,
      moved: false,
    };
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isCompact || !dragState.current.isDragging) return;
    const delta = dragState.current.startX - e.clientX;
    if (Math.abs(delta) > 3) dragState.current.moved = true;
    setOffset(clamp(dragState.current.startOffset + delta));
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragState.current.isDragging) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
    dragState.current.isDragging = false;
    setIsDragging(false);
  };

  const isScrollable = isCompact && maxOffset > 0;
  const thumbWidthPct = containerWidth
    ? Math.max(15, (containerWidth / Math.max(trackWidth, containerWidth)) * 100)
    : 100;
  const thumbLeftPct = maxOffset > 0 ? (clampedOffset / maxOffset) * (100 - thumbWidthPct) : 0;

  return (
    <div className="relative mt-6">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        className="cursor-grab overflow-hidden active:cursor-grabbing [touch-action:pan-y] sm:cursor-auto sm:overflow-visible"
      >
        <div
          ref={trackRef}
          className="flex w-max gap-2 sm:w-full sm:flex-wrap sm:justify-center"
          style={{
            transform: isCompact ? `translateX(-${clampedOffset}px)` : "none",
            transition: isDragging ? "none" : "transform 200ms ease-out",
          }}
        >
          {categoryLabels.map((category) => {
            const isActive = activeCategory === category;

            return (
              <Button
                key={category}
                type="button"
                onClick={() => {
                  if (dragState.current.moved) {
                    dragState.current.moved = false;
                    return;
                  }
                  onChange(category);
                }}
                className={`shrink-0 select-none rounded-full border px-4.5 py-2 text-[11.5px] font-medium transition duration-200 active:scale-[0.97] ${
                  isActive
                    ? "border-[#f6b531] bg-[#f6b531] text-[#17120b] shadow-[0_6px_20px_rgba(246,181,49,0.12)]"
                    : "border-[#423727] bg-[#0c0c0a]/70 text-[#c4bcb2] hover:border-[#aa761e] hover:text-[#f6b531]"
                }`}
              >
                {category}
              </Button>
            );
          })}
        </div>
      </div>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-9 bg-gradient-to-r from-[#080807] via-[#080807]/80 to-transparent transition-opacity duration-200 sm:hidden ${
          clampedOffset > 4 ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#080807] from-40% via-[#080807]/90 to-transparent transition-opacity duration-200 sm:hidden ${
          clampedOffset < maxOffset - 4 ? "opacity-100" : "opacity-0"
        }`}
      />

      {isScrollable && (
        <div className="relative mt-2 h-[3px] w-full sm:hidden">
          <div
            className="absolute inset-y-0 rounded-full bg-[#f6b531]"
            style={{
              width: `${thumbWidthPct}%`,
              left: `${thumbLeftPct}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const [activePage, setActivePage] = useState(1);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredArticles = useMemo(() => {
    if (activeCategory === "Barchasi") return articles;

    return articles.filter(
      (article: Article) => article.category === activeCategory,
    );
  }, [activeCategory]);

  const totalPages = Math.ceil(
    filteredArticles.length / ARTICLES_PER_PAGE,
  );

  const paginatedArticles = filteredArticles.slice(
    (activePage - 1) * ARTICLES_PER_PAGE,
    activePage * ARTICLES_PER_PAGE,
  );

  const pageItems = useMemo<(number | "ellipsis")[]>(() => {
    if (totalPages <= 6) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1,
      );
    }

    const items: (number | "ellipsis")[] = [1];
    const start = Math.max(2, activePage - 1);
    const end = Math.min(totalPages - 1, activePage + 1);

    if (start > 2) {
      items.push("ellipsis");
    }

    for (let page = start; page <= end; page += 1) {
      items.push(page);
    }

    if (end < totalPages - 1) {
      items.push("ellipsis");
    }

    items.push(totalPages);

    return items;
  }, [activePage, totalPages]);

  function handleCategory(category: string) {
    setActiveCategory(category);
    setActivePage(1);
  }

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanEmail = email.trim();

    if (!emailPattern.test(cleanEmail)) {
      setSubscribed(false);
      setEmailError("Iltimos, to‘g‘ri email manzil kiriting.");
      return;
    }

    setEmailError("");
    setSubscribed(true);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#080807] text-[#f4efe7] selection:bg-[#f6b531] selection:text-[#080807]">
      <section className="relative isolate border-b border-[#17130d] pb-7 pt-[78px] sm:pt-[88px]">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[205px] overflow-hidden opacity-50">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920"
            alt=""
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#080807]/40 via-[#080807]/80 to-[#080807]" />
          <div className="absolute inset-0 bg-[#080807]/55" />
        </div>

        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 text-[#f6b531]">
              <span className="h-px w-9 bg-[#bd8420]" />

              <ChefHat size={20} strokeWidth={1.3} />

              <span className="text-[12px] font-medium uppercase tracking-[0.16em]">
                Maqolalar
              </span>

              <span className="h-px w-9 bg-[#bd8420]" />
            </div>

            <h1
              className="mx-auto max-w-[720px] text-[2.25rem] font-medium leading-[1.05] tracking-[-0.025em] text-[#f7f2eb] sm:text-[2.25rem]"
              style={{ fontFamily: "Cambria, Georgia, serif" }}
            >
              Foydali maqolalar va maslahatlar
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-[12.5px] leading-5 text-[#a9a197] sm:text-[13px]">
              TANHO restoranining yangiliklari, sirli retseptlari va foydali
              maslahatlarini o‘qing.
            </p>
          </div>

          <CategoryScroller activeCategory={activeCategory} onChange={handleCategory} />
        </Container>
      </section>

      <Container className="pb-5 pt-7">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
          {paginatedArticles.map((article: Article, index: number) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={index}
              isWide={
                paginatedArticles.length <= 3 ||
                (paginatedArticles.length <= 6 && index >= 4)
              }
            />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="flex min-h-[240px] items-center justify-center rounded-[10px] border border-dashed border-[#332713] text-sm text-[#a9a197]">
            Bu kategoriya uchun maqolalar tez orada qo‘shiladi.
          </div>
        )}

        {totalPages > 1 && (
          <nav
            aria-label="Maqolalar sahifalari"
            className="flex items-center justify-center gap-2 pt-4"
          >
            {pageItems.map((item, index) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-1 text-xs text-[#81796e]"
                  aria-hidden="true"
                >
                  ...
                </span>
              ) : (
                <Button
                  key={item}
                  type="button"
                  aria-current={
                    activePage === item ? "page" : undefined
                  }
                  onClick={() => setActivePage(item as number)}
                  className={`flex h-8 min-w-8 items-center justify-center rounded-[5px] border text-[12px] transition active:scale-[0.96] ${
                    activePage === item
                      ? "border-[#f6b531] bg-[#f6b531] font-semibold text-[#17120b]"
                      : "border-[#272017] text-[#b0a79c] hover:border-[#8d611a] hover:text-[#f6b531]"
                  }`}
                >
                  {item}
                </Button>
              ),
            )}

            <Button
              type="button"
              aria-label="Keyingi sahifa"
              onClick={() =>
                setActivePage((page) =>
                  page === totalPages ? 1 : page + 1,
                )
              }
              className="flex h-8 min-w-8 items-center justify-center rounded-[5px] border border-[#272017] text-[#b0a79c] transition hover:border-[#8d611a] hover:text-[#f6b531] active:scale-[0.96]"
            >
              <ArrowRight size={15} strokeWidth={1.5} />
            </Button>
          </nav>
        )}
      </Container>

      <Container className="pb-7 pt-3">
        <div className="grid gap-6 rounded-[10px] border border-[#3a2b17] bg-[linear-gradient(100deg,#12120f_0%,#0d0d0b_54%,#12100b_100%)] px-6 py-6 sm:grid-cols-[1.1fr_1.6fr_0.9fr] sm:items-center sm:px-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#b77d1c] text-[#f6b531]">
              <Mail size={21} strokeWidth={1.25} />
            </div>

            <div>
              <h2
                className="text-[19px] leading-tight text-[#f4efe7]"
                style={{ fontFamily: "Cambria, Georgia, serif" }}
              >
                Yangi maqolalar va yangiliklardan xabardor bo‘ling
              </h2>

              <p className="mt-1.5 max-w-[250px] text-[11.5px] leading-[1.55] text-[#958d83]">
                Emailingizni qoldiring va bizning eng so‘nggi maqolalarimizni
                o‘tkazib yubormang.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubscribe}
            noValidate
            className="flex flex-col gap-2 sm:flex-row sm:items-start"
          >
            <label
              className="sr-only"
              htmlFor="newsletter-email"
            >
              Email manzilingiz
            </label>

            <div className="min-w-0 flex-1">
              <input
                id="newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError("");
                  setSubscribed(false);
                }}
                aria-invalid={Boolean(emailError)}
                aria-describedby={
                  emailError
                    ? "newsletter-email-error"
                    : undefined
                }
                placeholder="Email manzilingiz"
                className={`min-h-10 w-full rounded-[5px] border bg-[#0b0b09] px-4 text-[12px] text-[#f4efe7] outline-none transition placeholder:text-[#776f64] focus:ring-1 ${
                  emailError
                    ? "border-[#b7513e] focus:border-[#d36a54] focus:ring-[#b7513e]/40"
                    : "border-[#2c281f] focus:border-[#bd8420] focus:ring-[#bd8420]/40"
                }`}
              />

              {emailError && (
                <p
                  id="newsletter-email-error"
                  className="mt-2 text-[11px] text-[#d6816e]"
                >
                  {emailError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[5px] bg-[#f6b531] px-5 text-[12px] font-semibold text-[#181208] transition hover:bg-[#ffca50] active:scale-[0.98]"
            >
              {subscribed ? (
                <Check size={15} />
              ) : (
                <Send size={15} />
              )}

              {subscribed ? "Yuborildi" : "Obuna bo‘lish"}
            </Button>
          </form>

          <div className="sm:justify-self-end">
            <p
              className="text-[16px] text-[#ded7ce] sm:text-right"
              style={{ fontFamily: "Cambria, Georgia, serif" }}
            >
              Bizni ijtimoiy tarmoqlarda kuzating
            </p>

            <div className="mt-3 flex gap-2.5 sm:justify-end">
              {["ig", "f", "tg", "yt"].map((social) => (
                <Button
                  type="button"
                  key={social}
                  aria-label={`${social} sahifamiz`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#3c2e1a] text-[11px] font-semibold uppercase text-[#c18b28] transition hover:border-[#f6b531] hover:text-[#f6b531] active:scale-[0.95]"
                >
                  {social === "ig" ? "◎" : social}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[10px] uppercase tracking-[0.14em] text-[#5e574e]">
          <CircleUserRound size={12} strokeWidth={1.2} />
          Har bir taom ortida bir hikoya bor
        </p>
      </Container>
    </main>
  );
}