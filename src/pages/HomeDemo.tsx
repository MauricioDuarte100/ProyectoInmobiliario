import {
  ArrowRight,
  Building2,
  ChartNoAxesCombined,
  Handshake,
  Landmark,
  Map,
  ScanSearch,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useState, useEffect, useRef, useLayoutEffect, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { AppPage } from '../types/simia'
import MetricCard from '../components/MetricCard'
import SimulatedMap from '../components/SimulatedMap'
import { demoFinancingPrograms, demoZoneDemands } from '../data/demoData'
import LogoCarousel from '../components/LogoCarousel'
import FeatureVectorCard from '../components/FeatureVectorCard'
import { AIParticleField, FamilyHomeConcept } from '../components/brand'
import AgenticHousingDemo from '../components/AgenticHousingDemo'
import logoMain from '../../assets/logoMain.png'

gsap.registerPlugin(ScrollTrigger)

type HomeDemoProps = {
  onNavigate: (page: AppPage) => void
}




const logoImages = [
  '/gallery-1.png',
  '/gallery-2.png',
  '/gallery-3.png',
  '/gallery-4.png',
  '/gallery-5.png',
  '/gallery-6.png',
]

const featureCards = [
  {
    title: 'Diagnostico habitacional explicable',
    text: 'La IA traduce ingresos, ahorro, alquiler y deudas en una lectura simple: capacidad de cuota, monto posible y motivos del resultado.',
    eyebrow: 'Scoring IA',
    accent: 'green' as const,
    icon: <Sparkles className="h-5 w-5 text-brand-red" />,
  },
  {
    title: 'Ruta recomendada de acceso',
    text: 'El sistema propone caminos concretos: credito, lote financiado, mutual, constructora aliada o alquiler con opcion a compra.',
    eyebrow: 'Matching',
    accent: 'blue' as const,
    icon: <Building2 className="h-5 w-5 text-blue-tech" />,
  },
  {
    title: 'Inteligencia comercial por zona',
    text: 'Cruza perfiles precalificados con zonas de demanda para ayudar a inmobiliarias, constructoras e inversores a decidir mejor.',
    eyebrow: 'Market view',
    accent: 'orange' as const,
    icon: <ChartNoAxesCombined className="h-5 w-5 text-orange-opp" />,
  },
]

const financingIcons: Record<string, ReactNode> = {
  BadgePercent: <Sparkles className="h-5 w-5" />,
  Handshake: <Handshake className="h-5 w-5" />,
  Hammer: <Building2 className="h-5 w-5" />,
}

function TypingReveal({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const words = text.split(' ')
    el.innerHTML = words.map(w => `<span class="inline-block opacity-0 translate-y-3 transition-all duration-200 font-display font-black" style="color:inherit;text-shadow:0 10px 24px rgba(0,0,0,0.32)">${w}</span>`).join(' ')
    const ctx = gsap.context(() => {
      gsap.to(el.children, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.045,
        ease: 'power3.out',
        delay: delay / 1000,
        clearProps: 'transform',
      })
    }, el)
    return () => ctx.revert()
  }, [text, delay])

  return <span ref={containerRef} className={`${className} inline-block`} />
}

const caseProfiles = {
  soltero: {
    title: 'Profesional Soltero',
    score: '85',
    status: 'Excelente / Apto bancario',
    statusClass: 'border-emerald-400/20 bg-emerald-400/12 text-emerald-200',
    explanation: 'Apto para Crédito Hipotecario Nación o pozo financiado. Cuenta con capacidad de ahorro suficiente.',
    lead: 'Demanda de depto 1-2 dorm en Posadas centro con entrega del 30% y saldo a convenir.',
    income: '$2.0M formal / mes',
    savings: '$15.0M ahorro previo',
    curvePath: 'M20 75 C60 45, 100 80, 140 50 S220 30, 260 40 S280 20, 300 25',
    points: [
      { cx: 20, cy: 75, color: '#10B981' },
      { cx: 140, cy: 50, color: '#10B981' },
      { cx: 260, cy: 40, color: '#2563EB' },
      { cx: 300, cy: 25, color: '#2563EB' }
    ]
  },
  joven: {
    title: 'Familia Martinez',
    score: '58',
    status: 'Regular / Lote social',
    statusClass: 'border-amber-400/20 bg-amber-400/12 text-amber-200',
    explanation: 'Califica para programas IPRODHA o lote social con servicios. Ingresos no aptos para cuotas bancarias.',
    lead: 'Busca lote social en Garupá o Itaembé Guazú, con planes de construcción progresiva.',
    income: '$1.5M formal / mes',
    savings: '$5.4M ahorro previo',
    curvePath: 'M20 90 C60 75, 100 85, 140 70 S220 65, 260 62 S280 58, 300 55',
    points: [
      { cx: 20, cy: 90, color: '#F59E0B' },
      { cx: 140, cy: 70, color: '#F59E0B' },
      { cx: 260, cy: 62, color: '#F59E0B' },
      { cx: 300, cy: 55, color: '#2563EB' }
    ]
  },
  independiente: {
    title: 'Trabajador Monotributista',
    score: '73',
    status: 'Apto / Financiación directa',
    statusClass: 'border-sky-400/20 bg-sky-400/12 text-sky-200',
    explanation: 'Apto para planes mutuales o fideicomiso directo sin requisitos bancarios. Ahorro inicial robusto.',
    lead: 'Monotributista busca financiación privada en Posadas con cuotas indexadas por CAC.',
    income: '$2.3M variable / mes',
    savings: '$9.9M ahorro previo',
    curvePath: 'M20 85 C60 65, 100 75, 140 60 S220 45, 260 48 S280 38, 300 35',
    points: [
      { cx: 20, cy: 85, color: '#0EA5E9' },
      { cx: 140, cy: 60, color: '#0EA5E9' },
      { cx: 260, cy: 48, color: '#0EA5E9' },
      { cx: 300, cy: 35, color: '#2563EB' }
    ]
  }
} as const

export default function HomeDemo({ onNavigate }: HomeDemoProps) {
  const heroImage = '/hero-cimia-new.png'
  const heroRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const glassCardRef = useRef<HTMLDivElement>(null)
  const [selectedCase, setSelectedCase] = useState<keyof typeof caseProfiles>('soltero')

  useLayoutEffect(() => {
    const hero = heroRef.current
    const glow = glowRef.current
    const card = glassCardRef.current
    if (!hero) return

    const ctx = gsap.context(() => {
      // Shifting background orbs infinite animation
      gsap.to('.orb-drift-1', {
        x: 'random(-45, 45)',
        y: 'random(-45, 45)',
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
      gsap.to('.orb-drift-2', {
        x: 'random(-35, 35)',
        y: 'random(-35, 35)',
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // Mouse interactive parallax and tilt using pure GSAP for performance
      const onMouseMove = (e: MouseEvent) => {
        const rect = hero.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        if (glow) {
          gsap.to(glow, {
            x: x - 175,
            y: y - 175,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            overwrite: 'auto'
          })
        }

        if (card) {
          const cardRect = card.getBoundingClientRect()
          const cardX = e.clientX - (cardRect.left + cardRect.width / 2)
          const cardY = e.clientY - (cardRect.top + cardRect.height / 2)

          const rotX = -(cardY / cardRect.height) * 10
          const rotY = (cardX / cardRect.width) * 10

          gsap.to(card, {
            rotateX: rotX,
            rotateY: rotY,
            transformPerspective: 1000,
            duration: 0.6,
            ease: 'power2.out',
            overwrite: 'auto'
          })
        }
      }

      const onMouseLeave = () => {
        if (glow) {
          gsap.to(glow, {
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            overwrite: 'auto'
          })
        }
        if (card) {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: 'power3.out',
            overwrite: 'auto'
          })
        }
      }

      hero.addEventListener('mousemove', onMouseMove)
      hero.addEventListener('mouseleave', onMouseLeave)

      // Cinematic scroll parallax + scale on the hero image
      const cinematicImg = document.querySelector('.cinematic-hero-img')
      if (cinematicImg) {
        gsap.fromTo(cinematicImg, {
          scale: 1.15,
          yPercent: -5
        }, {
          scale: 1.0,
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.cinematic-image-trigger',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          }
        })
      }

      // Cinematic badge fade in
      gsap.fromTo('.cinematic-badge', {
        opacity: 0,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cinematic-image-trigger',
          start: 'top 60%',
        }
      })

      // Stagger reveal for metric cards
      gsap.fromTo('.metric-card-wrapper', {
        opacity: 0,
        y: 30,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.15)',
        scrollTrigger: {
          trigger: '.metrics-grid-trigger',
          start: 'top 90%',
        }
      })

      // Stagger reveal for feature cards
      gsap.fromTo('.feature-card-wrapper', {
        opacity: 0,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.features-grid-trigger',
          start: 'top 85%',
        }
      })

      // Stagger reveal for financing cards
      gsap.fromTo('.financing-card-wrapper', {
        opacity: 0,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.financing-grid-trigger',
          start: 'top 85%',
        }
      })
    }, hero)

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen">
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-[#0B162C] via-blue-950 to-[#0A1120] px-4 md:px-8 lg:px-10"
      >
        <div className="hero-orb hero-orb-red orb-drift-1" style={{ width: '520px', height: '520px', top: '-12%', right: '-8%' }} />
        <div className="hero-orb hero-orb-blue orb-drift-2" style={{ width: '400px', height: '400px', bottom: '-16%', left: '-10%' }} />
        <div
          ref={glowRef}
          className="absolute w-[350px] h-[350px] rounded-full pointer-events-none z-0 opacity-0"
          style={{
            background: 'radial-gradient(circle, rgba(31,138,91,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div className="absolute inset-0">
          <img src={heroImage} alt="Cimia - Inteligencia habitacional" loading="eager" className="h-full w-full object-cover opacity-20 saturate-75" />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(11,18,32,0.97)_0%,rgba(11,18,32,0.92)_30%,rgba(11,18,32,0.82)_60%,rgba(11,18,32,0.55)_100%)]" />
          <div className="absolute inset-0 opacity-[0.06]">
            <AIParticleField variant="blue" density="low" />
          </div>
          <div className="scan-line" />
          <div className="sparkle-container">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="sparkle"
                style={{
                  left: `${15 + i * 14}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${2.5 + i * 0.4}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative mx-auto grid min-h-[85vh] max-w-7xl items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-[1.4rem] border border-white/12 bg-white/8 p-3 shadow-[0_14px_34px_rgba(11,18,32,0.2)] backdrop-blur-md">
              <img
                src={logoMain}
                alt="CIMIA"
                className="h-12 w-auto object-contain sm:h-14"
              />
            </div>
            <div className="section-kicker border-white/15 bg-white/10 text-emerald-200">
              <span className="pulse-dot" />
              Acceso inteligente a la vivienda
            </div>

            <h1 className="hero-title mt-8 text-5xl font-black text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-7xl" style={{ color: '#ffffff' }}>
              <TypingReveal text="La IA que convierte ingresos en rutas reales de vivienda." />
            </h1>
            <p className="text-lead mt-7 max-w-2xl text-slate-100 text-lg leading-relaxed">
              Cimia precalifica familias, explica rechazos, recomienda alternativas y entrega una narrativa comercial util para el mercado inmobiliario de Misiones.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={() => onNavigate('form')}
                className="btn-primary ripple-container inline-flex w-full items-center justify-center gap-2 px-10 py-5 text-lg font-bold sm:w-auto cursor-pointer"
              >
                Evaluar mi acceso
                <ArrowRight className="h-5 w-5" />
              </button>
              <p className="text-sm font-semibold text-slate-100/90">
                Resultado orientativo con rutas habitacionales y propiedades compatibles.
              </p>
            </div>
          </div>

          <div ref={glassCardRef} className="hidden lg:block">
            <div className="glass-panel rounded-[2rem] p-5 glow-pulse shadow-[0_25px_60px_rgba(0,0,0,0.3)]">
              <div className="overflow-hidden rounded-[1.5rem] bg-[#0F172A] p-5">
                {/* Dynamic Selector Tabs */}
                <div className="mb-5 flex gap-1.5 rounded-xl bg-white/5 p-1 border border-white/5">
                  {(Object.keys(caseProfiles) as Array<keyof typeof caseProfiles>).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCase(key)}
                      className={`flex-1 rounded-lg py-2 text-center text-xs font-black transition-all cursor-pointer ${
                        selectedCase === key
                          ? 'bg-white text-[#0F172A] shadow-sm scale-102 font-extrabold'
                          : 'text-slate-400 hover:text-white hover:bg-white/3'
                      }`}
                    >
                      {key === 'soltero' ? 'Soltero' : key === 'joven' ? 'Fam. Joven' : 'Monotributo'}
                    </button>
                  ))}
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">Simulación en vivo</p>
                    <p className="mt-1 text-2xl font-black text-white leading-tight transition-all duration-300">{caseProfiles[selectedCase].title}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-2xs font-black uppercase tracking-wider transition-all duration-300 ${caseProfiles[selectedCase].statusClass}`}>
                    {caseProfiles[selectedCase].status.split(' / ')[0]}
                  </span>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[1.4rem] bg-white p-5 shadow-inner">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-ink-soft">Indice de acceso</p>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-4xl font-black text-text-primary tracking-tight transition-all duration-300">{caseProfiles[selectedCase].score}</span>
                          <span className="text-sm font-bold text-ink-soft">/ 100</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 text-right">
                        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold text-ink-soft uppercase tracking-wider">{caseProfiles[selectedCase].income}</span>
                        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold text-ink-soft uppercase tracking-wider">{caseProfiles[selectedCase].savings}</span>
                      </div>
                    </div>
                    
                    {/* Interactive Custom SVG Chart */}
                    <div className="relative mt-2 rounded-xl bg-slate-50/70 p-2 border border-slate-100">
                      <svg viewBox="0 0 320 120" className="w-full h-24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Grid lines */}
                        {[20, 40, 60, 80, 100].map((y) => (
                          <line
                            key={`grid-${y}`}
                            x1={10}
                            y1={y}
                            x2={310}
                            y2={y}
                            stroke="#E2E8F0"
                            strokeWidth="0.5"
                            strokeDasharray="4 6"
                          />
                        ))}
                        
                        {/* Area Fill */}
                        <path
                          d={`${caseProfiles[selectedCase].curvePath} L300 110 L20 110 Z`}
                          fill={selectedCase === 'soltero' ? 'url(#chart-fill-green)' : selectedCase === 'joven' ? 'url(#chart-fill-amber)' : 'url(#chart-fill-blue)'}
                          style={{ transition: 'all 0.5s ease-in-out' }}
                        />
                        
                        {/* Line */}
                        <path
                          d={caseProfiles[selectedCase].curvePath}
                          stroke={selectedCase === 'soltero' ? '#1F8A5B' : selectedCase === 'joven' ? '#F59E0B' : '#2563EB'}
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          style={{ transition: 'all 0.5s ease-in-out' }}
                        />
                        
                        {/* Dots */}
                        {caseProfiles[selectedCase].points.map((pt, idx) => (
                          <circle
                            key={idx}
                            cx={pt.cx}
                            cy={pt.cy}
                            r="4.5"
                            fill={pt.color}
                            stroke="white"
                            strokeWidth="2"
                            style={{ transition: 'all 0.5s ease-in-out' }}
                          />
                        ))}
                        
                        <defs>
                          <linearGradient id="chart-fill-green" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#1F8A5B" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#1F8A5B" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id="chart-fill-amber" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id="chart-fill-blue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 mt-1">
                    <div className="rounded-[1.2rem] bg-white/6 p-4 border border-white/5">
                      <ScanSearch className="mb-2.5 h-5 w-5 text-emerald-300" />
                      <p className="text-xs font-black uppercase tracking-wider text-white">Explicacion IA</p>
                      <p className="mt-2 text-2xs leading-5 text-slate-300 min-h-[96px] md:min-h-[96px] transition-all duration-300">
                        {caseProfiles[selectedCase].explanation}
                      </p>
                    </div>
                    <div className="rounded-[1.2rem] bg-white/6 p-4 border border-white/5">
                      <Building2 className="mb-2.5 h-5 w-5 text-sky-300" />
                      <p className="text-xs font-black uppercase tracking-wider text-white">Lead util</p>
                      <p className="mt-2 text-2xs leading-5 text-slate-300 min-h-[96px] md:min-h-[96px] transition-all duration-300">
                        {caseProfiles[selectedCase].lead}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CINEMATIC SCROLL IMAGE ===== */}
      <section className="cinematic-image-trigger relative overflow-hidden bg-[#0B162C] pb-4 sm:pb-6">
        <div className="relative mx-auto w-full max-w-[min(112rem,calc(100%-1.5rem))] sm:max-w-[min(112rem,calc(100%-3rem))]">
          <div className="cinematic-image-wrapper relative overflow-hidden rounded-[2rem] shadow-[0_40px_90px_rgba(11,18,32,0.34)] sm:rounded-[2.75rem]" style={{ height: 'clamp(420px, 55vh, 680px)' }}>
            <img
              src="/forLanding1.png"
              alt="Acceso familiar a la vivienda - Cimia"
              loading="eager"
              className="cinematic-hero-img absolute inset-0 h-full w-full object-cover"
              style={{ transform: 'scale(1.15)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/92 via-night/38 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-night/72 via-night/12 to-night/58" />
            
            {/* Floating stat badges on the image */}
            <div className="absolute bottom-8 left-0 right-0 px-6 sm:px-10 flex flex-wrap items-end justify-between gap-4">
              <div className="cinematic-badge flex items-center gap-6 sm:gap-10">
                {[
                  { label: 'Familias analizadas', value: '128+' },
                  { label: 'Ofertas compatibles', value: '34' },
                  { label: 'Rutas de acceso', value: '9' },
                ].map((stat) => (
                  <div key={stat.label} className="text-white">
                    <p className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-lg">{stat.value}</p>
                    <p className="mt-0.5 text-xs font-semibold text-white/85 sm:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="hidden sm:flex items-center gap-3">
                {['Acceso familiar', 'Crecimiento', 'Comunidad', 'Proyectos'].map((tag) => (
                  <span key={tag} className="inline-block rounded-full border border-white/18 bg-white/18 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F5F7FB] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 metrics-grid-trigger">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 sm:gap-8 lg:grid-cols-4">
          <div className="metric-card-wrapper">
            <MetricCard
              icon={<Users className="w-5 h-5" />}
              value="128"
              label="Familias analizadas"
              trend="+12 este mes"
            />
          </div>
          <div className="metric-card-wrapper">
            <MetricCard
              icon={<Building2 className="w-5 h-5" />}
              value="34"
              label="Ofertas compatibles"
              trend="+5 nuevas"
            />
          </div>
          <div className="metric-card-wrapper">
            <MetricCard
              icon={<Map className="w-5 h-5" />}
              value="9"
              label="Rutas de acceso"
              trend="disponibles"
            />
          </div>
          <div className="metric-card-wrapper">
            <MetricCard
              icon={<TrendingUp className="w-5 h-5" />}
              value="3"
              label="Zonas priorizadas"
              trend="alta demanda"
            />
          </div>
        </div>
      </section>

      <LogoCarousel logos={logoImages} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="section-divider" /></div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 features-grid-trigger">
        {/* Modern 2-column description + Concept illustration */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center mb-12">
          <div>
            <div className="section-kicker border-glow">
              <Sparkles className="h-3.5 w-3.5" />
              Producto
            </div>
            <h2 className="mt-4 text-4xl font-black leading-[1.04] text-text-primary">
              Una IA para ordenar{' '}
              <span className="text-gradient-animated">decisiones habitacionales.</span>
            </h2>
              <p className="text-lead mt-3 text-ink-soft">
                Cimia convierte datos dispersos en recomendaciones concretas para familias, inmobiliarias, constructoras e inversores.
              </p>
          </div>
          <div className="hidden lg:block rounded-[2rem] border border-border bg-white/80 p-6 shadow-md float-slow">
            <div className="flex items-center gap-2 mb-4">
              <span className="pulse-dot" />
              <span className="text-xs font-black uppercase tracking-[0.12em] text-ink-soft">Concepto de Flujo Cimia</span>
            </div>
            <FamilyHomeConcept variant="light" />
          </div>
        </div>

        {/* 3 Features fully stretched in a horizontal row grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {featureCards.map((feature) => (
            <div key={feature.title} className="feature-card-wrapper">
              <FeatureVectorCard {...feature} />
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="section-divider" /></div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <AgenticHousingDemo />
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="section-divider" /></div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 pt-16 sm:pb-28 sm:pt-20 financing-grid-trigger">
        <div className="mb-8 max-w-3xl">
          <div className="section-kicker border-glow">
            <Landmark className="h-3.5 w-3.5" />
            Financiamiento
          </div>
          <h2 className="mt-4 text-4xl font-black leading-[1.04] text-text-primary">
            Opciones pensadas para acercar la compra.
          </h2>
          <p className="text-lead mt-3 text-ink-soft">
            La IA no se queda en decir si alguien califica: ordena alternativas para convertir la consulta en una ruta posible.
          </p>
        </div>

        {/* Flexbox container wrapper to center remainder cards (preventing empty grid slot gaps) */}
        <div className="flex flex-wrap justify-center gap-6">
          {demoFinancingPrograms.map((program) => (
            <div key={program.id} className="financing-card-wrapper w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] max-w-md">
              <article className="premium-card rounded-[1.6rem] p-5 shimmer-overlay flex flex-col justify-between h-full">
                <div className="ornament-corner ornament-corner-tl" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-red/10 text-brand-red">
                        {financingIcons[program.icon] ?? <Landmark className="h-5 w-5" />}
                      </div>
                      <span className="rounded-full bg-blue-tech/10 px-3 py-1 text-xs font-black text-blue-tech">
                        Propuesta orientativa
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-black leading-7 text-text-primary">{program.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink-soft">{program.benefit}</p>
                  </div>
                  <div className="mt-5 rounded-2xl bg-slate-50 p-3.5 text-sm font-bold leading-6 text-text-primary">
                    {program.bestFor}
                  </div>
                </div>
                <div className="ornament-corner ornament-corner-br" />
              </article>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="section-divider" /></div>

      <section className="gsap-reveal mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-14">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Mapa de Demanda</h2>
            <p className="text-sm text-ink-soft">Gran Posadas - demanda, capacidad de pago y producto recomendado</p>
          </div>
          <span className="rounded-full bg-brand-red/10 px-3 py-1 text-xs font-semibold text-brand-red border-glow">
            Mercado local
          </span>
        </div>
        <SimulatedMap zoneDemands={demoZoneDemands} />
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="section-divider" /></div>

      <section className="gsap-reveal mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-14">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#0B162C] via-blue-950 to-[#0A1120] p-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.16)] shimmer-overlay relative overflow-hidden">
          <div className="hero-orb hero-orb-red" style={{ width: '280px', height: '280px', top: '-30%', right: '-10%', opacity: 0.5 }} />
          <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-eyebrow text-emerald-300">Cimia</p>
              {/* Added text-white class directly to prevent global dark styles from overriding visibility */}
              <h2 className="mt-3 text-4xl font-black leading-[1.08] text-white">De la consulta inmobiliaria a una ruta de acceso concreta.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200">
                La plataforma ayuda a explicar capacidad de compra, priorizar opciones y detectar donde existe demanda real para nuevas operaciones.
              </p>
            </div>
            <button
              onClick={() => onNavigate('form')}
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold"
            >
              Calcular ruta habitacional
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/70 py-8 text-center text-sm text-ink-soft space-y-3">
        <div>
          <p className="font-bold text-text-primary">Cimia — Sistema Inteligente Misionero de Acceso a la Vivienda</p>
          <p className="mt-1 text-xs text-ink-soft">
            Datos de precios actualizados a junio 2026. Fuentes: Zonaprop (relevamiento propio Misiones),
            IPRODHA (programas provinciales activos), BCRA (indices UVA), INDEC Censo 2022.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-[11px] text-ink-soft/75">
          <span>Posadas · Garupa · Candelaria · Obera · Eldorado · Santa Catalina</span>
        </div>
        <p className="text-[10px] text-ink-soft/70">
          Herramienta de decision para la Camara Inmobiliaria de Misiones. Datos simulados con fines demostrativos. No constituye asesoramiento financiero.
        </p>
      </footer>
    </div>
  )
}
