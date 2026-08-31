import React, { useState } from 'react'
import {
  Clock,
  MapPin,
  Phone,
  ChevronDown,
} from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import footerImage from '../../../assets/images/Layout/Footer/image.webp'
import logo from '../../../assets/images/Layout/Header/Logo-2.webp'
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

function LinkItem({
  to,
  children,
  onClick,
}: {
  to: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  return (
    <li className="group flex items-center gap-3">
      <span
        className="h-[6px] w-[6px] shrink-0 rounded-full transition-all duration-300 group-hover:scale-150"
        style={{ backgroundColor: gold }}
      />

      <Link
        to={to}
        onClick={onClick}
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
      <circle
        cx="17.1"
        cy="6.9"
        r="1.15"
        fill={gold}
        stroke="none"
      />
    </svg>
  )
}

export default function TanhoFooter() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const navigate = useNavigate()
  const location = useLocation()

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (!path.includes('#')) return

    e.preventDefault()

    const [targetPath, hash] = path.split('#')

    const scrollToElement = () => {
      const el = document.getElementById(hash)

      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }

    if (
      location.pathname === targetPath ||
      (targetPath === '/' && location.pathname === '/')
    ) {
      scrollToElement()
    } else {
      navigate(targetPath || '/')

      setTimeout(() => {
        scrollToElement()
      }, 100)
    }
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
    { label: 'Salatlar', path: '/menu?category=Salatlar' },
    { label: 'Osh', path: '/menu?category=Osh' },
    { label: 'Milliy taomlar', path: '/menu?category=Milliy%20taomlar' },
    { label: 'Grill', path: '/menu?category=Grill' },
    { label: 'Ichimliklar', path: '/menu?category=Ichimliklar' },
    { label: 'Desertlar', path: '/menu?category=Desertlar' },
  ]

  const usefulLinks = [
    { label: 'Stol band qilish', path: '/reservation' },
    { label: 'Maxsus takliflar', path: '/contact' },
    { label: 'Korporativ xizmat', path: '/contact' },
    { label: 'Fikr Mulohaza', path: '/#user-comments' },
    { label: 'Maxfiylik siyosati', path: '/privacy-policy' },
  ]

  const colDivider =
    'lg:border-r lg:border-white/[0.06] lg:pr-8'

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0b]">
      <img
        loading="lazy"
        src={footerImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 top-20 hidden h-[320px] w-auto object-contain opacity-90 transition-transform duration-[2000ms] hover:scale-105 md:block"
      />

      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#F5B942]/[0.03] blur-[100px]" />

      <Container className="pt-16">
        <div className="hidden lg:grid lg:grid-cols-[1.25fr_1fr_1fr_1fr_1.15fr] lg:gap-x-8">
          <div
            className={`${colDivider} animate-[footerUp_700ms_ease-out_both]`}
          >
            <div className="-mt-7">
              <div className="flex items-start -ml-1">
                <Link to="/" aria-label="Bosh sahifaga o'tish">
                  <img
                    loading="lazy"
                    src={logo}
                    alt="Tanho Restaurant"
                    className="h-[95px] w-auto max-w-[260px] object-contain object-left cursor-pointer transition-opacity duration-300 hover:opacity-90"
                  />
                </Link>
              </div>

              <p className="mt-4 max-w-[245px] text-[15px] leading-[1.85] text-neutral-300">
                Tanho restorani — mazali taomlar, yoqimli muhit va siz uchun
                eng yaxshi xizmat.
              </p>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                Rasmiy ijtimoiy tarmog‘imiz
              </p>

              <a
                href="https://www.instagram.com/tanho_restorani?igsi=MWUzbDV4OG5jb3M0bA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tanho Instagram"
                className="group inline-flex items-center gap-2.5 transition-all duration-300 hover:translate-x-1"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 group-hover:border-[#F5B942]/40 group-hover:bg-[#F5B942]/[0.06]"
                  style={{ borderColor: line }}
                >
                  <InstagramGlyph className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
                </span>

                <span className="text-[13px] text-neutral-400 transition-colors duration-300 group-hover:text-[#F5B942]">
                  Instagram
                </span>
              </a>
            </div>
          </div>

          <div
            className={`${colDivider} animate-[footerUp_700ms_100ms_ease-out_both]`}
          >
            <SectionHeading>MENYU</SectionHeading>

            <ul className="space-y-4">
              {menuLinks.map((item) => (
                <LinkItem key={item.label} to={item.path}>
                  {item.label}
                </LinkItem>
              ))}
            </ul>
          </div>

          <div
            className={`${colDivider} animate-[footerUp_700ms_200ms_ease-out_both]`}
          >
            <SectionHeading>
              MENYU
              <br />
              KATEGORIYALARI
            </SectionHeading>

            <ul className="space-y-4">
              {categoryLinks.map((item) => (
                <LinkItem key={item.label} to={item.path}>
                  {item.label}
                </LinkItem>
              ))}
            </ul>
          </div>

          <div
            className={`${colDivider} animate-[footerUp_700ms_300ms_ease-out_both]`}
          >
            <SectionHeading>
              FOYDALI
              <br />
              HAVOLALAR
            </SectionHeading>

            <ul className="space-y-4">
              {usefulLinks.map((item) => (
                <LinkItem
                  key={item.label}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                >
                  {item.label}
                </LinkItem>
              ))}
            </ul>
          </div>

          <div className="animate-[footerUp_700ms_400ms_ease-out_both]">
            <SectionHeading>ISH VAQTI</SectionHeading>

            <div
              className="group flex items-center gap-3.5 rounded-xl border px-4 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#F5B942]/30 hover:shadow-[0_10px_30px_rgba(245,185,66,0.06)]"
              style={{
                borderColor: line,
                backgroundColor: '#111113',
              }}
            >
              <Clock
                className="h-6 w-6 shrink-0 transition-transform duration-500 group-hover:rotate-12"
                style={{ color: gold }}
                strokeWidth={1.6}
              />

              <div>
                <p
                  className="font-serif text-[17px] font-semibold"
                  style={{ color: gold }}
                >
                  9:30 – 23:00
                </p>

                <p className="text-[13.5px] text-neutral-400">
                  Har kuni
                </p>
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
                  +998 98 222 00 93
                </span>
              </li>

              <li className="group flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: gold }}
                  strokeWidth={1.7}
                />

                <span className="text-[15px] leading-[1.5] text-neutral-200 transition-colors duration-300 group-hover:text-[#F5B942]">
                  Qarshi sh., Paxtazor MFY (Aloqa Bank ro’parasida)
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="block space-y-6 lg:hidden">
          <div
            className="rounded-2xl border p-6"
            style={{
              borderColor: line,
              backgroundColor: '#0d0d0f',
            }}
          >
            <div className="flex items-center justify-center">
              <Link to="/" aria-label="Bosh sahifaga o'tish">
                <img
                  loading="lazy"
                  src={logo}
                  alt="Tanho Restaurant"
                  className="h-[80px] w-auto max-w-[220px] object-contain cursor-pointer transition-opacity duration-300 hover:opacity-90"
                />
              </Link>
            </div>

            <p className="mx-auto mt-4 max-w-[280px] text-center text-[14px] leading-[1.7] text-neutral-300">
              Tanho restorani — mazali taomlar, yoqimli muhit va siz uchun
              eng yaxshi xizmat.
            </p>

            <div className="mt-5 flex flex-col items-center">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-500">
                Rasmiy ijtimoiy tarmog‘imiz
              </p>

              <a
                href="https://www.instagram.com/tanho_restorani?igsi=MWUzbDV4OG5jb3M0bA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tanho Instagram"
                className="group inline-flex items-center gap-2.5 transition-all duration-300"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full border"
                  style={{
                    borderColor: line,
                    backgroundColor: '#111113',
                  }}
                >
                  <InstagramGlyph className="h-[18px] w-[18px]" />
                </span>

                <span className="text-[13px] text-neutral-400">
                  Instagram
                </span>
              </a>
            </div>
          </div>

          <div
            className="overflow-hidden rounded-2xl border"
            style={{
              borderColor: line,
              backgroundColor: '#0d0d0f',
            }}
          >
            <button
              onClick={() => toggleSection('menu')}
              className="flex w-full items-center justify-between p-4 text-left font-serif text-[15px] font-semibold"
              style={{ color: gold }}
            >
              <span className="tracking-wide">MENYU</span>

              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ${
                  openSection === 'menu' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSection === 'menu' && (
              <ul
                className="space-y-3 border-t px-4 pb-4 pt-3"
                style={{ borderColor: line }}
              >
                {menuLinks.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-2 text-[14px] text-neutral-300"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: gold }}
                    />

                    <Link
                      to={item.path}
                      className="transition-colors hover:text-[#F5B942]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className="overflow-hidden rounded-2xl border"
            style={{
              borderColor: line,
              backgroundColor: '#0d0d0f',
            }}
          >
            <button
              onClick={() => toggleSection('categories')}
              className="flex w-full items-center justify-between p-4 text-left font-serif text-[15px] font-semibold"
              style={{ color: gold }}
            >
              <span className="tracking-wide">
                MENYU KATEGORIYALARI
              </span>

              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ${
                  openSection === 'categories' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSection === 'categories' && (
              <ul
                className="space-y-3 border-t px-4 pb-4 pt-3"
                style={{ borderColor: line }}
              >
                {categoryLinks.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-2 text-[14px] text-neutral-300"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: gold }}
                    />

                    <Link
                      to={item.path}
                      className="transition-colors hover:text-[#F5B942]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className="overflow-hidden rounded-2xl border"
            style={{
              borderColor: line,
              backgroundColor: '#0d0d0f',
            }}
          >
            <button
              onClick={() => toggleSection('useful')}
              className="flex w-full items-center justify-between p-4 text-left font-serif text-[15px] font-semibold"
              style={{ color: gold }}
            >
              <span className="tracking-wide">
                FOYDALI HAVOLALAR
              </span>

              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ${
                  openSection === 'useful' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSection === 'useful' && (
              <ul
                className="space-y-3 border-t px-4 pb-4 pt-3"
                style={{ borderColor: line }}
              >
                {usefulLinks.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-2 text-[14px] text-neutral-300"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: gold }}
                    />

                    <Link
                      to={item.path}
                      onClick={(e) =>
                        handleNavClick(e, item.path)
                      }
                      className="transition-colors hover:text-[#F5B942]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className="overflow-hidden rounded-2xl border"
            style={{
              borderColor: line,
              backgroundColor: '#0d0d0f',
            }}
          >
            <button
              onClick={() => toggleSection('contact')}
              className="flex w-full items-center justify-between p-4 text-left font-serif text-[15px] font-semibold"
              style={{ color: gold }}
            >
              <span className="tracking-wide">
                ALOQA VA ISH VAQTI
              </span>

              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ${
                  openSection === 'contact' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSection === 'contact' && (
              <div
                className="space-y-3 border-t px-4 pb-4 pt-3 text-[14px] text-neutral-300"
                style={{ borderColor: line }}
              >
                <div
                  className="flex items-center gap-2.5 rounded-lg border p-3"
                  style={{
                    borderColor: line,
                    backgroundColor: '#111113',
                  }}
                >
                  <Clock
                    className="h-5 w-5 shrink-0"
                    style={{ color: gold }}
                  />

                  <div>
                    <p
                      className="font-serif font-semibold"
                      style={{ color: gold }}
                    >
                      9:30 – 23:00
                    </p>

                    <p className="text-[12px] text-neutral-400">
                      Har kuni
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <Phone
                    className="h-4 w-4 shrink-0"
                    style={{ color: gold }}
                  />
                  <span>+998 98 222 00 93</span>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: gold }}
                  />
                  <span>
                    Qarshi sh., Paxtazor MFY (Aloqa Bank ro’parasida)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="mt-10 flex flex-col items-center justify-between gap-4 border-t py-8 md:flex-row"
          style={{ borderColor: '#1a1a1a' }}
        >
          <p className="text-center text-[13.5px] text-neutral-500 md:text-left">
            © 2026 Tanho Restaurant. Barcha huquqlar himoyalangan.
          </p>

          <p className="flex items-center justify-center gap-2 text-[13.5px] text-neutral-500">
            Mehmonlarimiz uchun maxsus yaratilgan
          </p>
        </div>
      </Container>
    </footer>
  )
}