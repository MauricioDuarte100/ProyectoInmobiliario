import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { AppPage } from '../types/simia'
import { Building2, Home, Landmark, Menu, X, ChevronRight, ArrowRight } from 'lucide-react'
import logoMain from '../../assets/logoMain.png'

type HeaderProps = {
  currentPage: AppPage
  onNavigate: (page: AppPage) => void
}

const breadcrumbs: Partial<Record<AppPage, string>> = {
  form: 'Precalificacion',
  results: 'Resultados',
  citizen: 'Panel Ciudadano',
  chamber: 'Panel Camara',
  government: 'Panel Gobierno',
  realestate: 'Panel Inmobiliario',
  investment: 'Panel Inversor',
}

const navLinks: { page: AppPage; label: string; icon: typeof Home }[] = [
  { page: 'citizen', label: 'Ciudadano', icon: Home },
  { page: 'chamber', label: 'Camara', icon: Building2 },
  { page: 'government', label: 'Gobierno', icon: Landmark },
]

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLButtonElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [currentPage])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const isHome = currentPage === 'home'
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top -56px',
        onUpdate: (self) => {
          const p = Math.min(self.progress * 2.5, 1)
          gsap.to(el, {
            boxShadow: isHome && p < 0.1 ? 'none' : `0 ${4 + 12 * p}px ${20 + 30 * p}px rgba(15,23,42,${0.03 + 0.05 * p})`,
            duration: 0.15,
            ease: 'none',
            overwrite: 'auto',
          })
        },
      })
    })
    return () => ctx.revert()
  }, [currentPage])

  useEffect(() => {
    const btn = logoRef.current
    if (!btn) return
    const ctx = gsap.context(() => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn.querySelector('.logo-shell'), {
          y: -1,
          scale: 1.03,
          duration: 0.28,
          ease: 'power2.out',
        })
      })
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn.querySelector('.logo-shell'), {
          y: 0,
          scale: 1,
          duration: 0.32,
          ease: 'power3.out',
        })
      })
    })
    return () => ctx.revert()
  }, [])

  const bcrumb = breadcrumbs[currentPage]
  const isHomeTop = currentPage === 'home' && !isScrolled
  const showNav = currentPage !== 'home'

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isHomeTop
            ? 'border-b border-white/8 bg-gradient-to-br from-[#0B162C] via-blue-950 to-[#0A1120]/40 backdrop-blur-xl shadow-none'
            : 'border-b border-slate-200/40 bg-white/82 backdrop-blur-2xl shadow-[0_1px_3px_rgba(15,23,42,0.04)]'
        }`}
        style={{ willChange: 'box-shadow' }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button
            ref={logoRef}
            onClick={() => onNavigate('home')}
            className="group flex cursor-pointer items-center gap-3 shrink-0"
            aria-label="Cimia - Ir al inicio"
          >
            <span className={`logo-shell flex items-center rounded-2xl px-3 py-2 transition-all duration-300 ${
              isHomeTop
                ? 'bg-white/10 ring-1 ring-white/12 shadow-[0_10px_30px_rgba(11,18,32,0.18)]'
                : 'bg-white/88 ring-1 ring-slate-200/80 shadow-[0_10px_26px_rgba(15,23,42,0.08)]'
            }`}>
              <img
                src={logoMain}
                alt="CIMIA"
                className="h-9 w-auto object-contain sm:h-10"
              />
            </span>
            <span className="hidden leading-none text-left lg:block">
              <span className={`block text-[0.7rem] font-black uppercase tracking-[0.22em] ${
                isHomeTop ? 'text-slate-300' : 'text-ink-soft/70'
              }`}>Sistema Habitacional</span>
              <span className={`block text-sm font-bold tracking-tight ${
                isHomeTop ? 'text-white' : 'text-text-primary'
              }`}>Motor de acceso inteligente</span>
            </span>
          </button>

          {/* Breadcrumb (non-home pages) */}
          {showNav && bcrumb && (
            <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-[13px]">
              <button
                onClick={() => onNavigate('home')}
                className={`font-medium transition-colors cursor-pointer ${
                  isHomeTop ? 'text-slate-400 hover:text-white' : 'text-ink-soft/60 hover:text-brand-red'
                }`}
              >
                Inicio
              </button>
              <ChevronRight className={`h-3 w-3 ${isHomeTop ? 'text-slate-500' : 'text-ink-soft/30'}`} />
              <span className={`font-semibold ${isHomeTop ? 'text-white' : 'text-text-primary'}`}>{bcrumb}</span>
            </nav>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Desktop Navigation Links */}
          {showNav && (
            <nav className="hidden md:flex items-center gap-1" aria-label="Navegacion principal">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page
                return (
                  <button
                    key={link.page}
                    onClick={() => onNavigate(link.page)}
                    className={`relative px-4 py-2 text-[13px] font-semibold tracking-wide transition-all duration-200 cursor-pointer rounded-lg ${
                      isActive
                        ? isHomeTop
                          ? 'text-white bg-white/10'
                          : 'text-brand-red bg-brand-red/6'
                        : isHomeTop
                          ? 'text-slate-300 hover:text-white hover:bg-white/6'
                          : 'text-ink-soft hover:text-text-primary hover:bg-slate-50'
                    }`}
                    aria-label={link.label}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] w-5 rounded-full ${
                        isHomeTop ? 'bg-white/60' : 'bg-brand-red'
                      }`} />
                    )}
                  </button>
                )
              })}
            </nav>
          )}

          {/* CTA Button */}
          <button
            onClick={() => onNavigate('form')}
            className={`hidden sm:inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-bold transition-all duration-200 cursor-pointer ${
              isHomeTop
                ? 'bg-white text-night hover:bg-white/90 shadow-sm'
                : 'bg-gradient-to-br from-[#0B162C] via-blue-950 to-[#0A1120] text-white hover:bg-gradient-to-br from-[#0B162C] via-blue-950 to-[#0A1120]/90 shadow-sm shadow-night/10'
            }`}
          >
            Evaluar acceso
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className={`grid h-10 w-10 place-items-center rounded-xl transition-colors md:hidden cursor-pointer ${
              isHomeTop
                ? 'bg-white/8 hover:bg-white/12 text-white ring-1 ring-white/10'
                : 'bg-slate-50 hover:bg-slate-100 text-text-primary ring-1 ring-slate-200/60'
            }`}
            aria-label="Abrir menu de navegacion"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileOpen(false)}>
          <nav
            className="absolute top-0 right-0 h-full w-80 bg-white shadow-[0_0_60px_rgba(15,23,42,0.12)] p-6 flex flex-col gap-3 animate-[fadeSlideRight_0.3s_var(--ease-out-expo)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            aria-label="Menu de navegacion movil"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center rounded-xl bg-white px-2.5 py-2 shadow-sm ring-1 ring-slate-200/80">
                  <img src={logoMain} alt="CIMIA" className="h-8 w-auto object-contain" />
                </span>
                <span>
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-ink-soft/60">Sistema Habitacional</span>
                  <span className="block text-sm font-bold text-text-primary">Motor de acceso inteligente</span>
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Cerrar menu"
              >
                <X className="h-4.5 w-4.5 text-text-primary" />
              </button>
            </div>

            {/* Mobile CTA */}
            <button
              onClick={() => onNavigate('form')}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#0B162C] via-blue-950 to-[#0A1120] text-white px-5 py-3.5 text-sm font-bold cursor-pointer hover:bg-gradient-to-br from-[#0B162C] via-blue-950 to-[#0A1120]/90 transition-colors"
            >
              Evaluar acceso
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Separator */}
            <div className="h-px bg-slate-100 my-1" />

            {/* Mobile Nav Links */}
            <div className="flex-1 space-y-0.5">
              {navLinks.map((link) => {
                const Icon = link.icon
                const active = currentPage === link.page
                return (
                  <button
                    key={link.page}
                    onClick={() => onNavigate(link.page)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-brand-red/8 text-brand-red'
                        : 'text-text-primary hover:bg-slate-50'
                    }`}
                  >
                    <span className={`grid h-8 w-8 place-items-center rounded-lg ${
                      active ? 'bg-brand-red/12 text-brand-red' : 'bg-slate-100 text-ink-soft'
                    }`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {link.label}
                    {active && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-red" />
                    )}
                  </button>
                )
              })}

              {/* Additional link for precalificacion in mobile */}
              <button
                onClick={() => onNavigate('form')}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all cursor-pointer ${
                  currentPage === 'form'
                    ? 'bg-brand-red/8 text-brand-red'
                    : 'text-text-primary hover:bg-slate-50'
                }`}
              >
                <span className={`grid h-8 w-8 place-items-center rounded-lg ${
                  currentPage === 'form' ? 'bg-brand-red/12 text-brand-red' : 'bg-slate-100 text-ink-soft'
                }`}>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
                Precalificacion
                {currentPage === 'form' && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-red" />
                )}
              </button>
            </div>

            {/* Mobile Footer */}
            <div className="pt-3 border-t border-slate-100">
              <p className="text-[11px] text-ink-soft/40 text-center leading-relaxed">
                Cimia — Sistema Inteligente Misionero
                <br />de Acceso a la Vivienda
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
