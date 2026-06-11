import { useLayoutEffect, useRef } from 'react'
import { CircleCheck, AlertCircle, ArrowRight, RefreshCw, Eye, Sparkles, Building2, User } from 'lucide-react'
import gsap from 'gsap'
import type { UserProfile, ScoreResult, MatchedProperty, HabitationalRoute } from '../types/simia'

import ScoreRing from '../components/ScoreRing'
import AiInsightPanel from '../components/AiInsightPanel'
import RouteCard from '../components/RouteCard'
import PropertyCard from '../components/PropertyCard'
import FinancingProgramCard from '../components/FinancingProgramCard'
import CitizenDiagnosisCard from '../components/CitizenDiagnosisCard'
import HousingRouteClassifier from '../components/HousingRouteClassifier'
import FinancialGapAnalyzer from '../components/FinancialGapAnalyzer'
import SocialUrgencyTrafficLight from '../components/SocialUrgencyTrafficLight'
import ProgressIndicator from '../components/ProgressIndicator'
import { SparklineCard } from '../components/SmartCharts'
import { recommendFinancingPrograms } from '../utils/financing'
import { getCitizenDiagnosis, getFinancialGap } from '../data/demoData'

const PROGRESS_STEPS = [
  { key: 'datos', label: 'Datos' },
  { key: 'resultado', label: 'Resultado' },
  { key: 'expediente', label: 'Expediente' },
]

type ResultsPageProps = {
  profile: UserProfile
  scoreResult: ScoreResult
  aiMessage: string
  matchedProperties: MatchedProperty[]
  recommendedRoutes: HabitationalRoute[]
  onBack: () => void
  onViewRealEstate: () => void
  onViewChamber: () => void
  onViewCitizen: () => void
}

export default function ResultsPage({
  profile,
  scoreResult,
  aiMessage,
  matchedProperties,
  recommendedRoutes,
  onBack,
  onViewRealEstate,
  onViewChamber,
  onViewCitizen,
}: ResultsPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.results-stagger-item',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  const financingPrograms = recommendFinancingPrograms(profile, scoreResult)
  const diagnosis = getCitizenDiagnosis(profile)
  const financialGap = getFinancialGap(profile)
  const totalIncome = profile.monthlyFormalIncome + profile.monthlyInformalIncome

  return (
    <div ref={containerRef} className="mx-auto max-w-6xl px-4 py-6 sm:py-10 space-y-8 sm:space-y-10">
      <div className="results-stagger-item max-w-lg mx-auto lg:max-w-none">
        <ProgressIndicator steps={PROGRESS_STEPS} currentStep="resultado" />
      </div>
      <section className="results-stagger-item rounded-[2rem] bg-gradient-to-br from-[#0B162C] via-blue-950 to-[#0A1120] p-5 sm:p-6 md:p-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)] relative overflow-hidden">
        <div className="hero-orb hero-orb-red" style={{ width: '260px', height: '260px', top: '-15%', right: '-5%', opacity: 0.5 }} />
        <div className="hero-orb hero-orb-blue" style={{ width: '200px', height: '200px', bottom: '-10%', left: '-5%', opacity: 0.4 }} />
        <div className="sparkle-container">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="sparkle" style={{ left: `${50 + i * 10}%`, top: `${10 + (i % 2) * 30}%`, animationDelay: `${i * 0.6}s`, animationDuration: `${2.2 + i * 0.3}s` }} />
          ))}
        </div>
        <div className="relative z-10 grid items-center gap-6 sm:gap-8 lg:grid-cols-[minmax(200px,280px)_1fr]">
          <div className="rounded-[1.75rem] border border-white/12 bg-white/10 p-4 sm:p-6 backdrop-blur-xl glow-pulse mx-auto w-fit">
            <ScoreRing score={scoreResult.score} classification={scoreResult.classification} size="lg" />
          </div>

          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-emerald-200">
              <Sparkles className="h-3.5 w-3.5" />
              Resultado generado por SimIA
            </div>
            <h1 className="hero-title text-4xl font-black md:text-5xl text-white">
              Tu ruta habitacional ya esta{' '}
              <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">calculada.</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 break-words">
              La precalificacion es orientativa: combina capacidad de cuota, ahorro, deuda y flexibilidad para recomendar caminos posibles.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 gsap-stagger-children">
              <SparklineCard
                label="Cuota maxima"
                value={`$ ${scoreResult.maxMonthlyPayment.toLocaleString('es-AR')}`}
                data={[220000, 235000, 248000, 260000, scoreResult.maxMonthlyPayment]}
                color="#16a34a"
              />
              <SparklineCard
                label="Monto alcanzable"
                value={`$ ${scoreResult.maxPropertyValue.toLocaleString('es-AR')}`}
                data={[28000000, 31000000, 34000000, 38000000, scoreResult.maxPropertyValue]}
                color="#2563eb"
              />
              <SparklineCard
                label="Confianza"
                value={`${scoreResult.confidence}%`}
                data={[50, 55, 60, 68, scoreResult.confidence]}
                color="#f59e0b"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-6">
          <AiInsightPanel message={aiMessage} />
        </div>
      </section>

      <div className="section-divider" />

      <section className="results-stagger-item">
        <div className="rounded-[2rem] bg-gradient-to-br from-violet-600 to-violet-800 p-6 md:p-8 text-white shadow-2xl shadow-violet-600/30 relative overflow-hidden border border-violet-400/20">
          <div className="hero-orb hero-orb-red" style={{ width: '200px', height: '200px', top: '-20%', right: '-10%', opacity: 0.3 }} />
          <div className="hero-orb hero-orb-blue" style={{ width: '160px', height: '160px', bottom: '-15%', left: '-8%', opacity: 0.25 }} />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-amber-200">
                <User className="h-3.5 w-3.5" />
                Tu expediente personal
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Tu ruta habitacional ya esta lista. <span className="text-amber-200">Consulta tu expediente completo.</span>
              </h2>
              <p className="text-sm text-violet-100 leading-relaxed">
                SimIA genero un informe detallado con tu puntaje, diagnostico, opciones de financiamiento y propiedades dentro de tu rango. Todo accesible desde tu panel ciudadano.
              </p>
            </div>
            <button
              type="button"
              onClick={onViewCitizen}
              className="shrink-0 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-black text-violet-700 shadow-xl shadow-violet-900/30 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl hover:shadow-violet-900/40 active:scale-95 group"
            >
              <User className="h-5 w-5 text-violet-600 group-hover:scale-110 transition-transform" />
              Ver mi expediente completo
              <ArrowRight className="h-4 w-4 text-violet-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="results-stagger-item">
        <CitizenDiagnosisCard
          diagnosis={diagnosis}
          city={profile.desiredZone}
          income={totalIncome}
          savings={profile.savings}
          score={scoreResult.score}
        />
      </section>

      <div className="section-divider" />

      <section className="results-stagger-item grid grid-cols-1 md:grid-cols-2 gap-6">
        <HousingRouteClassifier
          route={diagnosis.route}
          reason={diagnosis.explanation}
        />
        <SocialUrgencyTrafficLight
          urgency={diagnosis.urgency}
          reason={diagnosis.explanation}
        />
      </section>

      <div className="section-divider" />

      <section className="results-stagger-item grid grid-cols-1 md:grid-cols-2 gap-6">
        <FinancialGapAnalyzer gap={financialGap} />
        <div className="premium-card rounded-3xl p-6 border-glow shadow-lg">
          <div className="ornament-corner ornament-corner-tl" />
          <div className="ornament-corner ornament-corner-br" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red/10 to-brand-red/5">
                <CircleCheck className="w-5 h-5 text-brand-red" />
              </div>
              <h2 className="text-lg font-bold text-text-primary">
                Motivos de tu resultado
              </h2>
            </div>
            <ul className="space-y-3.5">
              {scoreResult.reasons.map((reason, i) => {
                const isPositive =
                  reason.toLowerCase().includes('adecuado') ||
                  reason.toLowerCase().includes('buen') ||
                  reason.toLowerCase().includes('suficiente') ||
                  reason.toLowerCase().includes('demuestra') ||
                  reason.toLowerCase().includes('alcanzan')
                return (
                  <li key={i} className="flex items-start gap-3 stagger-item" style={{ animationDelay: `${i * 0.1}s` }}>
                    {isPositive ? (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 mt-0.5">
                        <CircleCheck className="w-4 h-4 text-brand-red" />
                      </div>
                    ) : (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-opp/10 mt-0.5">
                        <AlertCircle className="w-4 h-4 text-orange-opp" />
                      </div>
                    )}
                    <span className="text-sm text-ink-soft leading-relaxed">{reason}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="results-stagger-item grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div className="premium-card rounded-3xl p-5 sm:p-6 border-glow shadow-lg md:col-span-2">
          <div className="ornament-corner ornament-corner-tl" />
          <div className="ornament-corner ornament-corner-br" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-tech/10 to-blue-tech/5">
                <ArrowRight className="w-5 h-5 text-blue-tech" />
              </div>
              <h2 className="text-lg font-bold text-text-primary">
                Para mejorar
              </h2>
            </div>
            <ul className="space-y-3.5 md:columns-2 md:gap-8">
              {scoreResult.improvements.map((imp, i) => (
                <li key={i} className="flex items-start gap-3 stagger-item break-inside-avoid mb-3.5 md:mb-0" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-tech/10 mt-0.5">
                    <ArrowRight className="w-4 h-4 text-blue-tech" />
                  </div>
                  <span className="text-sm text-ink-soft leading-relaxed">{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="results-stagger-item pt-6">
        <div className="mb-4 max-w-3xl">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <span className="pulse-dot" />
            Financiamiento que podria acercarte a la compra
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft break-words">
            SimIA cruza tu perfil con opciones de credito, mutuales y planes de constructora para priorizar caminos accionables.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 gsap-stagger-children">
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

      <section className="results-stagger-item pt-6">
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

      <section className="results-stagger-item pt-6">
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

      <div className="results-stagger-item flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-8 pb-4">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary flex items-center justify-center gap-2 px-6 py-3 text-sm font-black cursor-pointer btn-press"
          aria-label="Nueva precalificacion"
        >
          <RefreshCw className="w-4 h-4" />
          Nueva precalificacion
        </button>
        <button
          type="button"
          onClick={onViewCitizen}
          className="flex items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-violet-600/20 cursor-pointer transition-transform hover:scale-105 active:scale-95 btn-press"
          aria-label="Ver mi expediente"
        >
          <User className="w-4 h-4" />
          Ver mi expediente
        </button>
        <button
          type="button"
          onClick={onViewRealEstate}
          className="btn-primary flex items-center justify-center gap-2 px-6 py-3 text-sm font-black cursor-pointer btn-press"
          aria-label="Ver panel inmobiliario"
        >
          <Eye className="w-4 h-4" />
          Ver panel inmobiliario
        </button>
        <button
          type="button"
          onClick={onViewChamber}
          className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#0B162C] via-blue-950 to-[#0A1120] px-6 py-3 text-sm font-black text-white shadow-lg shadow-night/20 cursor-pointer transition-transform hover:scale-105 active:scale-95 btn-press"
          aria-label="Panel de la Camara"
        >
          <Building2 className="w-4 h-4" />
          Panel de la Camara
        </button>
      </div>
    </div>
  )
}
