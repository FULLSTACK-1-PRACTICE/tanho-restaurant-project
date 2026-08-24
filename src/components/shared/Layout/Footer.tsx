import React, { useState } from 'react'
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  Heart,
  ChevronDown,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import footerImage from '../../../assets/images/Layout/Footer/image.png'
import Container from '../../../components/ui/container/Container'

const gold = '#F5B942'
const line = '#2a2210'

function Diamond({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none">
      <rect
        x="6"
        y="6"
        width="8"
        height="8"
        transform="rotate(45 10 10)"
        stroke={gold}
        strokeWidth="1.2"
      />
      <circle cx="10" cy="10" r="1.6" fill={gold} />
    </svg>
  )
}

function HeadingDivider() {
  return (
    <div className="mt-3 mb-7 flex items-center gap-2">
      <span
        className="h-px w-9"
        style={{
          background: `linear-gradient(to left, ${gold}, transparent)`,
        }}
      />
      <Diamond className="h-3.5 w-3.5 shrink-0 animate-[diamondPulse_2s_ease-in-out_infinite]" />
      <span
        className="h-px w-9"
        style={{
          background: `linear-gradient(to right, ${gold}, transparent)`,
        }}
      />
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h3
        className="font-serif text-[16px] font-semibold leading-snug tracking-wide"
        style={{ color: gold }}
      >
        {children}
      </h3>
      <HeadingDivider />
    </div>
  )
}

function LinkItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li className="group flex items-center gap-3">
      <span
        className="h-[6px] w-[6px] shrink-0 rounded-full transition-all duration-300 group-hover:scale-150"
        style={{ backgroundColor: gold }}
      />
      <Link
        to={to}
        className="relative text-[15px] text-neutral-200 transition-all duration-300 hover:translate-x-1 hover:text-[#F5B942]"
      >
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#F5B942] transition-all duration-300 group-hover:w-full" />
      </Link>
    </li>
  )
}

function InstagramGlyph({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke={gold}
      strokeWidth="1.8"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.1" cy="6.9" r="1.15" fill={gold} stroke="none" />
    </svg>
  )
}

function TelegramGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={gold} stroke="none">
      <path d="M21.4 3.4 2.8 10.8c-1.1.45-1.1 1.08-.2 1.36l4.77 1.49 11.05-6.97c.52-.32 1-.14.6.21L9.9 15.1l-.35 4.86c.5 0 .72-.23.99-.5l2.38-2.31 4.94 3.65c.91.5 1.56.24 1.79-.84l3.24-15.29c.33-1.32-.5-1.92-1.49-1.27Z" />
    </svg>
  )
}

function FacebookGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={gold} stroke="none">
      <path d="M14.8 8.6h1.9V5.3h-2.2c-2.4 0-3.9 1.5-3.9 4v1.8H8.4v3.3h2.2V21h3.4v-6.6h2.3l.4-3.3h-2.7V9.5c0-.6.2-.9.8-.9Z" />
    </svg>
  )
}

function BadgeGlyph({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke={gold}
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="9" cy="7" r="2.6" />
      <path d="M7 9.3 4.5 19l4.5-2 4.5 2-1.7-6.3" />
      <path d="M13 9 19.5 3" />
      <path d="M15.3 12.8 21 7" />
    </svg>
  )
}

export default function TanhoFooter() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const menuLinks = [
    { label: 'Bosh sahifa', path: '/' },
    { label: 'Menyu', path: '/menu' },
    { label: 'Biz haqimizda', path: '/about' },
    { label: 'Maqolalar', path: '/events' },
    { label: 'Yangiliklar', path: '/news' },
    { label: 'Aloqa', path: '/contact' },
  ]

  const categoryLinks = [
    { label: 'Salatlar', path: '/menu?category=salatlar' },
    { label: 'Issiq taomlar', path: '/menu?category=issiq-taomlar' },
    { label: 'Milliy taomlar', path: '/menu?category=milliy-taomlar' },
    { label: 'Shashliklar', path: '/menu?category=shashliklar' },
    { label: 'Ichimliklar', path: '/menu?category=ichimliklar' },
    { label: 'Desertlar', path: '/menu?category=desertlar' },
  ]

  const usefulLinks = [
    { label: 'Stol band qilish', path: '/reservation' },
    { label: 'Maxsus takliflar', path: '/news' },
    { label: 'Korporativ xizmat', path: '/about' },
    { label: 'Yetkazib berish', path: '/contact' },
    { label: 'Qoidalar', path: '/about' },
    { label: 'Maxfiylik siyosati', path: '/about' },
  ]

  const socialIcons = [InstagramGlyph, TelegramGlyph, FacebookGlyph, BadgeGlyph]

  const colDivider = 'lg:border-r lg:border-white/[0.06] lg:pr-8'

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0b]">
      <img
        src={footerImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 top-20 hidden h-[320px] w-auto object-contain opacity-90 transition-transform duration-[2000ms] hover:scale-105 md:block"
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#F5B942]/[0.03] blur-[100px]" />
      
      <Container className="pt-16">
        <div className="hidden lg:grid grid-cols-[1.25fr_1fr_1fr_1fr_1.15fr] gap-x-8">
          <div className={`${colDivider} animate-[footerUp_700ms_ease-out_both]`}>
            <h2
              className="font-serif text-[36px] leading-none tracking-[0.03em]"
              style={{ color: gold }}
            >
              TANHO
            </h2>
            <p className="mt-2 text-[11px] tracking-[0.4em] text-neutral-400">
              — RESTAURANT —
            </p>
            <p className="mt-6 max-w-[240px] text-[15px] leading-[1.85] text-neutral-300">
              Tanho restorani — mazali taomlar, yoqimli muhit va siz uchun eng yaxshi xizmat.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialIcons.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-[#F5B942]/10 hover:shadow-[0_8px_25px_rgba(245,185,66,0.12)]"
                  style={{ borderColor: line }}
                >
                  <Icon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
          <div className={`${colDivider} animate-[footerUp_700ms_100ms_ease-out_both]`}>
            <SectionHeading>MENYU</SectionHeading>
            <ul className="space-y-4">
              {menuLinks.map(item => (
                <LinkItem key={item.label} to={item.path}>{item.label}</LinkItem>
              ))}
            </ul>
          </div>
          <div className={`${colDivider} animate-[footerUp_700ms_200ms_ease-out_both]`}>
            <SectionHeading>
              MENYU
              <br />
              KATEGORIYALARI
            </SectionHeading>
            <ul className="space-y-4">
              {categoryLinks.map(item => (
                <LinkItem key={item.label} to={item.path}>{item.label}</LinkItem>
              ))}
            </ul>
          </div>
          <div className={`${colDivider} animate-[footerUp_700ms_300ms_ease-out_both]`}>
            <SectionHeading>
              FOYDALI
              <br />
              HAVOLALAR
            </SectionHeading>
            <ul className="space-y-4">
              {usefulLinks.map(item => (
                <LinkItem key={item.label} to={item.path}>{item.label}</LinkItem>
              ))}
            </ul>
          </div>
          <div className="animate-[footerUp_700ms_400ms_ease-out_both]">
            <SectionHeading>ISH VAQTI</SectionHeading>
            <div
              className="group flex items-center gap-3.5 rounded-xl border px-4 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#F5B942]/30 hover:shadow-[0_10px_30px_rgba(245,185,66,0.06)]"
              style={{ borderColor: line, backgroundColor: '#111113' }}
            >
              <Clock
                className="h-6 w-6 shrink-0 transition-transform duration-500 group-hover:rotate-12"
                style={{ color: gold }}
                strokeWidth={1.6}
              />
              <div>
                <p className="font-serif text-[17px] font-semibold" style={{ color: gold }}>
                  10:00 – 23:00
                </p>
                <p className="text-[13.5px] text-neutral-400">Har kuni</p>
              </div>
            </div>
            <ul className="mt-6 space-y-4">
              <li className="group flex items-center gap-3">
                <Clock
                  className="h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: gold }}
                  strokeWidth={1.7}
                />
                <span className="text-[15px] text-neutral-200 transition-colors duration-300 group-hover:text-[#F5B942]">
                  Dushanba – Yakshanba
                </span>
              </li>
              <li className="group flex items-center gap-3">
                <Phone
                  className="h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: gold }}
                  strokeWidth={1.7}
                />
                <span className="text-[15px] text-neutral-200 transition-colors duration-300 group-hover:text-[#F5B942]">
                  +998 91 123 45 67
                </span>
              </li>
              <li className="group flex items-center gap-3">
                <Mail
                  className="h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: gold }}
                  strokeWidth={1.7}
                />
                <span className="text-[15px] text-neutral-200 transition-colors duration-300 group-hover:text-[#F5B942]">
                  info@tanho.uz
                </span>
              </li>
              <li className="group flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: gold }}
                  strokeWidth={1.7}
                />
                <span className="text-[15px] leading-[1.5] text-neutral-200 transition-colors duration-300 group-hover:text-[#F5B942]">
                  Qarshi shahri, Alisher Navoiy ko'chasi 15
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="block lg:hidden space-y-6">
          <div className="rounded-2xl border p-6 text-center flex flex-col items-center" style={{ borderColor: line, backgroundColor: '#0d0d0f' }}>
            <h2 className="font-serif text-[32px] leading-none tracking-[0.03em]" style={{ color: gold }}>
              TANHO
            </h2>
            <p className="mt-2 text-[10px] tracking-[0.4em] text-neutral-400">
              — RESTAURANT —
            </p>
            <p className="mt-4 text-[14px] leading-[1.7] text-neutral-300 max-w-[280px]">
              Tanho restorani — mazali taomlar, yoqimli muhit va siz uchun eng yaxshi xizmat.
            </p>
            <p className="mt-5 text-[13px] text-neutral-400">
              Bizni ijtimoiy tarmoqlarda kuzating
            </p>
            <div className="mt-3 flex items-center justify-center gap-3">
              {socialIcons.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border"
                  style={{ borderColor: line, backgroundColor: '#111113' }}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: line, backgroundColor: '#0d0d0f' }}>
            <button
              onClick={() => toggleSection('menu')}
              className="w-full flex items-center justify-between p-4 text-left font-serif text-[15px] font-semibold"
              style={{ color: gold }}
            >
              <span className="tracking-wide">MENYU</span>
              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openSection === 'menu' ? 'rotate-180' : ''}`} />
            </button>
            {openSection === 'menu' && (
              <ul className="px-4 pb-4 space-y-3 border-t pt-3" style={{ borderColor: line }}>
                {menuLinks.map(item => (
                  <li key={item.label} className="text-[14px] text-neutral-300 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: gold }} />
                    <Link to={item.path} className="hover:text-[#F5B942] transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: line, backgroundColor: '#0d0d0f' }}>
            <button
              onClick={() => toggleSection('categories')}
              className="w-full flex items-center justify-between p-4 text-left font-serif text-[15px] font-semibold"
              style={{ color: gold }}
            >
              <span className="tracking-wide">MENYU KATEGORIYALARI</span>
              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openSection === 'categories' ? 'rotate-180' : ''}`} />
            </button>
            {openSection === 'categories' && (
              <ul className="px-4 pb-4 space-y-3 border-t pt-3" style={{ borderColor: line }}>
                {categoryLinks.map(item => (
                  <li key={item.label} className="text-[14px] text-neutral-300 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: gold }} />
                    <Link to={item.path} className="hover:text-[#F5B942] transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: line, backgroundColor: '#0d0d0f' }}>
            <button
              onClick={() => toggleSection('useful')}
              className="w-full flex items-center justify-between p-4 text-left font-serif text-[15px] font-semibold"
              style={{ color: gold }}
            >
              <span className="tracking-wide">FOYDALI HAVOLALAR</span>
              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openSection === 'useful' ? 'rotate-180' : ''}`} />
            </button>
            {openSection === 'useful' && (
              <ul className="px-4 pb-4 space-y-3 border-t pt-3" style={{ borderColor: line }}>
                {usefulLinks.map(item => (
                  <li key={item.label} className="text-[14px] text-neutral-300 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: gold }} />
                    <Link to={item.path} className="hover:text-[#F5B942] transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: line, backgroundColor: '#0d0d0f' }}>
            <button
              onClick={() => toggleSection('contact')}
              className="w-full flex items-center justify-between p-4 text-left font-serif text-[15px] font-semibold"
              style={{ color: gold }}
            >
              <span className="tracking-wide">ALOQA VA ISH VAQTI</span>
              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openSection === 'contact' ? 'rotate-180' : ''}`} />
            </button>
            {openSection === 'contact' && (
              <div className="px-4 pb-4 space-y-3 border-t pt-3 text-[14px] text-neutral-300" style={{ borderColor: line }}>
                <div className="flex items-center gap-2.5 rounded-lg border p-3" style={{ borderColor: line, backgroundColor: '#111113' }}>
                  <Clock className="h-5 w-5 shrink-0" style={{ color: gold }} />
                  <div>
                    <p className="font-serif font-semibold" style={{ color: gold }}>10:00 – 23:00</p>
                    <p className="text-[12px] text-neutral-400">Har kuni</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <Phone className="h-4 w-4 shrink-0" style={{ color: gold }} />
                  <span>+998 91 123 45 67</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0" style={{ color: gold }} />
                  <span>info@tanho.uz</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" style={{ color: gold }} />
                  <span>Qarshi shahri, Alisher Navoiy ko'chasi 15</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t py-8"
          style={{ borderColor: '#1a1a1a' }}
        >
          <p className="text-center md:text-left text-[13.5px] text-neutral-500">
            © 2024 Tanho Restaurant. Barcha huquqlar himoyalangan.
          </p>
          <p className="flex items-center justify-center gap-2 text-[13.5px] text-neutral-500">
            Mehmonlarimiz uchun
            <Heart
              className="h-[15px] w-[15px] animate-[heartBeat_2s_ease-in-out_infinite]"
              style={{ color: gold }}
              strokeWidth={1.8}
            />
            maxsus yaratilgan
          </p>
        </div>
      </Container>
      <style>{`
        @keyframes footerUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes diamondPulse {
          0%,
          100% {
            opacity: 0.7;
            transform: rotate(0deg) scale(1);
          }
          50% {
            opacity: 1;
            transform: rotate(45deg) scale(1.15);
          }
        }
        @keyframes heartBeat {
          0%,
          100% {
            transform: scale(1);
          }
          15% {
            transform: scale(1.18);
          }
          30% {
            transform: scale(1);
          }
          45% {
            transform: scale(1.12);
          }
          60% {
            transform: scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </footer>
  )
}