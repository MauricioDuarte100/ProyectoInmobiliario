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
import type { ReactNode } from 'react'
import type { AppPage } from '../types/simia'
import MetricCard from '../components/MetricCard'
import SimulatedMap from '../components/SimulatedMap'
import { demoFinancingPrograms, demoZoneDemands } from '../data/demoData'
import LogoCarousel from '../components/LogoCarousel'
import FeatureVectorCard from '../components/FeatureVectorCard'
import { HouseGraphIllustration, AIParticleField, FamilyHomeConcept } from '../components/brand'

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
    icon: <Sparkles className="h-5 w-5 text-green-trust" />,
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

export default function HomeDemo({ onNavigate }: HomeDemoProps) {
  const heroImage = '/hero-simia.png'

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-night px-4 py-10 shadow-[0_34px_100px_rgba(15,23,42,0.24)] md:px-8 lg:px-10">
        <div className="hero-orb hero-orb-green" style={{ width: '420px', height: '420px', top: '-10%', right: '-6%' }} />
        <div className="hero-orb hero-orb-blue" style={{ width: '340px', height: '340px', bottom: '-14%', left: '-8%' }} />
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="h-full w-full object-cover opacity-24 saturate-75" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,18,32,0.99)_0%,rgba(11,18,32,0.91)_48%,rgba(11,18,32,0.72)_100%)]" />
          <div className="absolute inset-0 opacity-[0.08]">
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

        <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="max-w-3xl">
            <div className="section-kicker gsap-reveal border-white/15 bg-white/10 text-emerald-200">
              <span className="pulse-dot" />
              Acceso inteligente a la vivienda
            </div>

            <h1 className="hero-title gsap-reveal mt-6 text-5xl font-black leading-[0.98] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-7xl">
              La IA que convierte ingresos en{' '}
              <span className="text-gradient-animated">rutas reales</span> de vivienda.
            </h1>
            <p className="text-balance gsap-reveal mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              SimIA precalifica familias, explica rechazos, recomienda alternativas y entrega una narrativa comercial util para el mercado inmobiliario de Misiones.
            </p>

            <div className="gsap-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={() => onNavigate('form')}
                className="btn-primary inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-base font-bold sm:w-auto"
              >
                Evaluar mi acceso
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-sm font-semibold text-slate-300">
                Resultado orientativo con rutas habitacionales y propiedades compatibles.
              </p>
            </div>
          </div>

          <div className="gsap-reveal-scale hidden lg:block">
            <div className="glass-panel rounded-[2rem] p-5 glow-pulse">
              <div className="overflow-hidden rounded-[1.5rem] bg-[#0F172A] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">Motor de acceso</p>
                    <p className="mt-1 text-2xl font-black text-white">Perfil, ruta y oferta conectados</p>
                  </div>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/12 px-3 py-1 text-xs font-black text-emerald-200">
                    IA activa
                  </span>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[1.4rem] bg-white p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-ink-soft">Indice de acceso</p>
                        <p className="text-2xl font-display font-black text-text-primary">82 / Apto potencial</p>
                      </div>
                      <Landmark className="h-8 w-8 text-green-trust" />
                    </div>
                    <HouseGraphIllustration variant="compact" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-[1.2rem] bg-white/8 p-4">
                      <ScanSearch className="mb-3 h-5 w-5 text-emerald-300" />
                      <p className="text-sm font-black text-white">Explicacion IA</p>
                      <p className="mt-2 text-xs leading-6 text-slate-300">
                        El usuario entiende por que califica y que necesita mejorar para acceder.
                      </p>
                    </div>
                    <div className="rounded-[1.2rem] bg-white/8 p-4">
                      <Building2 className="mb-3 h-5 w-5 text-sky-300" />
                      <p className="text-sm font-black text-white">Lead util</p>
                      <p className="mt-2 text-xs leading-6 text-slate-300">
                        La inmobiliaria recibe demanda alineada a cuota, zona y forma de pago.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F5F7FB] px-4 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-4">
          <MetricCard
            icon={<Users className="w-5 h-5" />}
            value="128"
            label="Familias analizadas"
            trend="+12 este mes"
          />
          <MetricCard
            icon={<Building2 className="w-5 h-5" />}
            value="34"
            label="Ofertas compatibles"
            trend="+5 nuevas"
          />
          <MetricCard
            icon={<Map className="w-5 h-5" />}
            value="9"
            label="Rutas de acceso"
            trend="disponibles"
          />
          <MetricCard
            icon={<TrendingUp className="w-5 h-5" />}
            value="3"
            label="Zonas priorizadas"
            trend="alta demanda"
          />
        </div>
      </section>

      <LogoCarousel logos={logoImages} />

      <div className="mx-auto max-w-7xl px-4"><div className="section-divider" /></div>

      <section className="gsap-reveal mx-auto max-w-7xl px-4 py-16">
        <div className="mb-6 max-w-3xl">
          <div className="section-kicker border-glow">
            <Sparkles className="h-3.5 w-3.5" />
            Producto
          </div>
          <h2 className="font-display mt-4 text-4xl font-black leading-[1.04] text-text-primary">
            Una IA para ordenar{' '}
            <span className="text-gradient-animated">decisiones habitacionales.</span>
          </h2>
          <p className="mt-3 text-base leading-8 text-ink-soft">
            SimIA convierte datos dispersos en recomendaciones concretas para familias, inmobiliarias, constructoras e inversores.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 grid gap-4 content-start gsap-stagger-children">
            {featureCards.map((feature) => (
              <FeatureVectorCard key={feature.title} {...feature} />
            ))}
          </div>
          <div className="hidden lg:block rounded-[1.6rem] border border-border bg-white/60 p-5 shadow-sm float-slow">
            <div className="flex items-center gap-2 mb-3">
              <span className="pulse-dot" />
              <span className="text-xs font-black uppercase tracking-[0.12em] text-ink-soft">Concepto</span>
            </div>
            <FamilyHomeConcept variant="light" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4"><div className="section-divider" /></div>

      <section className="gsap-reveal mx-auto max-w-7xl px-4 pb-16 pt-14">
        <div className="mb-6 max-w-3xl">
          <div className="section-kicker border-glow">
            <Landmark className="h-3.5 w-3.5" />
            Financiamiento
          </div>
          <h2 className="font-display mt-4 text-4xl font-black leading-[1.04] text-text-primary">
            Opciones pensadas para acercar la compra.
          </h2>
          <p className="mt-3 text-base leading-8 text-ink-soft">
            La IA no se queda en decir si alguien califica: ordena alternativas para convertir la consulta en una ruta posible.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 gsap-stagger-children">
          {demoFinancingPrograms.map((program) => (
            <article key={program.id} className="premium-card rounded-[1.6rem] p-5 shimmer-overlay">
              <div className="ornament-corner ornament-corner-tl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-green-trust/10 text-green-trust">
                    {financingIcons[program.icon] ?? <Landmark className="h-5 w-5" />}
                  </div>
                  <span className="rounded-full bg-blue-tech/10 px-3 py-1 text-xs font-black text-blue-tech">
                    Propuesta orientativa
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-black leading-7 text-text-primary">{program.name}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{program.benefit}</p>
                <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm font-bold leading-6 text-text-primary">
                  {program.bestFor}
                </div>
              </div>
              <div className="ornament-corner ornament-corner-br" />
            </article>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4"><div className="section-divider" /></div>

      <section className="gsap-reveal mx-auto max-w-7xl px-4 pb-16 pt-14">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Mapa de Demanda</h2>
            <p className="text-sm text-gray-500">Gran Posadas - demanda, capacidad de pago y producto recomendado</p>
          </div>
          <span className="rounded-full bg-green-trust/10 px-3 py-1 text-xs font-semibold text-green-trust border-glow">
            Mercado local
          </span>
        </div>
        <SimulatedMap zoneDemands={demoZoneDemands} />
      </section>

      <div className="mx-auto max-w-7xl px-4"><div className="section-divider" /></div>

      <section className="gsap-reveal mx-auto max-w-7xl px-4 pb-16 pt-14">
        <div className="rounded-[2rem] bg-night p-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.16)] shimmer-overlay relative overflow-hidden">
          <div className="hero-orb hero-orb-green" style={{ width: '280px', height: '280px', top: '-30%', right: '-10%', opacity: 0.5 }} />
          <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">SimIA</p>
              <h2 className="font-display mt-3 text-4xl font-black leading-[1.08]">De la consulta inmobiliaria a una ruta de acceso concreta.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
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

      <footer className="border-t border-border/70 py-6 text-center text-sm text-gray-400">
        SimIA — Sistema Inteligente Misionero de Acceso a la Vivienda
      </footer>
    </div>
  )
}
