import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { AppPage } from '../types/simia'
import { Sparkles } from 'lucide-react'
import { SimiaBrandMark } from './brand'

type HeaderProps = {
  currentPage: AppPage
  onNavigate: (page: AppPage) => void
}

export default function Header({ onNavigate }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLButtonElement>(null)

  // Scroll-driven header shrink + shadow
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top -56px',
        onUpdate: (self) => {
          const p = Math.min(self.progress * 2.5, 1)
          gsap.to(el, {
            height: 64 - 14 * p,
            boxShadow: `0 ${8 + 18 * p}px ${30 + 30 * p}px rgba(15,23,42,${0.04 + 0.06 * p})`,
            borderBottomWidth: p > 0.4 ? '0px' : '1px',
            duration: 0.15,
            ease: 'none',
            overwrite: 'auto',
          })
        },
      })
    })
    return () => ctx.revert()
  }, [])

  // GSAP icon hover animation
  useEffect(() => {
    const btn = logoRef.current
    if (!btn) return
    const ctx = gsap.context(() => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn.querySelector('.logo-icon'), {
          rotation: -8,
          scale: 1.15,
          duration: 0.35,
          ease: 'back.out(2)',
        })
      })
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn.querySelector('.logo-icon'), {
          rotation: 0,
          scale: 1,
          duration: 0.45,
          ease: 'power3.out',
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/70 bg-white/78 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl"
      style={{ willChange: 'height, box-shadow' }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4">
        <button
          ref={logoRef}
          onClick={() => onNavigate('home')}
          className="group flex cursor-pointer items-center gap-3"
        >
          <span className="logo-icon grid h-10 w-10 place-items-center rounded-2xl bg-night text-white shadow-lg shadow-blue-tech/15 transition-shadow">
            <SimiaBrandMark size={22} />
          </span>
          <span className="leading-none">
            <span className="block text-xl font-display font-black tracking-tight text-text-primary">SimIA</span>
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft sm:block">
              Misiones Housing AI
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-green-trust/12 bg-green-trust/8 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-green-trust border-glow"
          >
            <Sparkles className="h-3.5 w-3.5" />
            IA inmobiliaria
          </span>
        </div>

        <button
          onClick={() => onNavigate('form')}
          className="btn-primary px-4 py-2 text-sm font-bold cursor-pointer transition-transform hover:scale-105 active:scale-95"
        >
          Evaluar acceso
        </button>
      </div>
    </header>
  )
}
