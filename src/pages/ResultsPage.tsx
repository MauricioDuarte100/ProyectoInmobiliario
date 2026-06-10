import { useEffect, useRef, useState } from 'react'
import { CircleCheck, AlertCircle, ArrowRight, RefreshCw, Eye, Home, Sparkles, User } from 'lucide-react'
import type { UserProfile, ScoreResult, MatchedProperty, HabitationalRoute } from '../types/simia'

import ScoreRing from '../components/ScoreRing'
import MetricCard from '../components/MetricCard'
import AiInsightPanel from '../components/AiInsightPanel'
import RouteCard from '../components/RouteCard'
import PropertyCard from '../components/PropertyCard'
import FinancingProgramCard from '../components/FinancingProgramCard'
import { recommendFinancingPrograms } from '../utils/financing'

type ResultsPageProps = {
  profile: UserProfile
  scoreResult: ScoreResult
  aiMessage: string
  matchedProperties: MatchedProperty[]
  recommendedRoutes: HabitationalRoute[]
  onBack: () => void
  onViewRealEstate: () => void
}

function AnimatedNumber({ value, prefix = '', suffix = '', duration = 1200 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const startTime = useRef<number | null>(null)

  useEffect(() => {
    startTime.current = null
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const progress = Math.min((timestamp - startTime.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(animate)
    }
    const raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return (
    <span ref={ref}>
      {prefix}{display.toLocaleString('es-AR')}{suffix}
    </span>
  )
}

export default function ResultsPage({
  profile,
  scoreResult,
  aiMessage,
  matchedProperties,
  recommendedRoutes,
  onBack,
  onViewRealEstate,
}: ResultsPageProps) {
  const financingPrograms = recommendFinancingPrograms(profile, scoreResult)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      <section className="gsap-reveal rounded-[2rem] bg-night p-6 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)] md:p-8 relative overflow-hidden">
        <div className="hero-orb hero-orb-green" style={{ width: '260px', height: '260px', top: '-15%', right: '-5%', opacity: 0.5 }} />
        <div className="hero-orb hero-orb-blue" style={{ width: '200px', height: '200px', bottom: '-10%', left: '-5%', opacity: 0.4 }} />
        <div className="sparkle-container">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="sparkle"
              style={{
                left: `${50 + i * 10}%`,
                top: `${10 + (i % 2) * 30}%`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: `${2.2 + i * 0.3}s`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[280px_1fr]">
          <div className="rounded-[1.75rem] border border-white/12 bg-white/10 p-6 backdrop-blur-xl glow-pulse">
            <ScoreRing score={scoreResult.score} classification={scoreResult.classification} size="lg" />
          </div>

          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-emerald-200">
              <Sparkles className="h-3.5 w-3.5" />
              Resultado generado por SimIA
            </div>
            <h1 className="hero-title text-4xl font-black leading-tight md:text-5xl">
              Tu ruta habitacional ya esta{' '}
              <span className="text-gradient-animated">calculada.</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              La precalificacion es orientativa: combina capacidad de cuota, ahorro, deuda y flexibilidad para recomendar caminos posibles.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 gsap-stagger-children">
              <MetricCard
                icon={<Home className="w-5 h-5" />}
                value={<AnimatedNumber value={scoreResult.maxMonthlyPayment} prefix="$" />}
                label="Cuota maxima"
              />
              <MetricCard
                icon={<Home className="w-5 h-5" />}
                value={<AnimatedNumber value={scoreResult.maxPropertyValue} prefix="$" />}
                label="Monto alcanzable"
              />
              <MetricCard
                icon={<Home className="w-5 h-5" />}
                value={<AnimatedNumber value={scoreResult.confidence} suffix="%" />}
                label="Confianza"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-6">
          <AiInsightPanel message={aiMessage} />
        </div>
      </section>

      <div className="section-divider" />

      <section className="gsap-scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="gsap-card premium-card rounded-3xl p-6 border-glow">
          <div className="ornament-corner ornament-corner-tl" />
          <div className="relative z-10">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
              <CircleCheck className="w-5 h-5 text-green-trust" />
              Motivos de tu resultado
            </h2>
            <ul className="space-y-3">
              {scoreResult.reasons.map((reason, i) => {
                const isPositive =
                  reason.toLowerCase().includes('adecuado') ||
                  reason.toLowerCase().includes('buen') ||
                  reason.toLowerCase().includes('suficiente') ||
                  reason.toLowerCase().includes('demuestra') ||
                  reason.toLowerCase().includes('alcanzan')
                return (
                  <li key={i} className="flex items-start gap-2.5 stagger-item" style={{ animationDelay: `${i * 0.1}s` }}>
                    {isPositive ? (
                      <CircleCheck className="w-4 h-4 text-green-trust mt-0.5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-orange-opp mt-0.5 shrink-0" />
                    )}
                    <span className="text-sm text-gray-600">{reason}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="gsap-card premium-card rounded-3xl p-6 border-glow">
          <div className="relative z-10">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
              <ArrowRight className="w-5 h-5 text-blue-tech" />
              Para mejorar
            </h2>
            <ul className="space-y-3">
              {scoreResult.improvements.map((imp, i) => (
                <li key={i} className="flex items-start gap-2.5 stagger-item" style={{ animationDelay: `${i * 0.1}s` }}>
                  <ArrowRight className="w-4 h-4 text-blue-tech mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600">{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="gsap-scroll-reveal pt-6">
        <div className="mb-4 max-w-3xl">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <span className="pulse-dot" />
            Financiamiento que podria acercarte a la compra
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            SimIA cruza tu perfil con opciones de credito, mutuales y planes de constructora para priorizar caminos accionables.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 gsap-stagger-children">
          {financingPrograms.slice(0, 3).map((program, i) => (
            <FinancingProgramCard
              key={program.id}
              program={program}
              featured={i === 0}
            />
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section className="gsap-scroll-reveal pt-6">
        <h2 className="text-xl font-bold text-text-primary mb-4">
          Rutas habitacionales recomendadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gsap-stagger-children">
          {recommendedRoutes.map((route, i) => (
            <RouteCard key={route.name} route={route} isRecommended={i === 0} />
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section className="gsap-scroll-reveal pt-6">
        <h2 className="text-xl font-bold text-text-primary mb-4">
          Propiedades dentro de tu rango
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gsap-stagger-children">
          {matchedProperties.map((mp) => (
            <PropertyCard
              key={mp.property.id}
              property={mp.property}
              compatibility={mp.compatibility}
              matchReasons={mp.reasons}
              suggestedRoute={mp.suggestedRoute}
            />
          ))}
        </div>
      </section>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-8 pb-4">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary flex w-full items-center justify-center gap-2 px-6 py-3 text-sm font-black sm:w-auto cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Nueva precalificacion
        </button>
        <button
          type="button"
          onClick={onViewRealEstate}
          className="btn-primary flex w-full items-center justify-center gap-2 px-6 py-3 text-sm font-black sm:w-auto cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          Ver panel inmobiliario
        </button>
      </div>
    </div>
  )
}
