import { motion } from 'framer-motion'
import { CircleCheck, AlertCircle, ArrowRight, RefreshCw, Eye, Home, Sparkles } from 'lucide-react'
import type { UserProfile, ScoreResult, MatchedProperty, HabitationalRoute } from '../types/simia'

import ScoreRing from '../components/ScoreRing'
import MetricCard from '../components/MetricCard'
import AiInsightPanel from '../components/AiInsightPanel'
import RouteCard from '../components/RouteCard'
import PropertyCard from '../components/PropertyCard'
import FinancingProgramCard from '../components/FinancingProgramCard'
import CounterNumber from '../components/animations/CounterNumber'
import StaggerReveal, { StaggerItem } from '../components/animations/StaggerReveal'
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] as const },
  },
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
    <motion.div
      className="mx-auto max-w-6xl px-4 py-10 space-y-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={itemVariants}
        className="rounded-[2rem] bg-night p-6 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)] md:p-8"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[280px_1fr]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="rounded-[1.75rem] border border-white/12 bg-white/10 p-6 backdrop-blur-xl"
          >
            <ScoreRing score={scoreResult.score} classification={scoreResult.classification} size="lg" />
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-emerald-200"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Resultado generado por SimIA
            </motion.div>
            <h1 className="hero-title text-4xl font-black leading-tight md:text-5xl">
              Tu ruta habitacional ya esta calculada.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              La precalificacion es orientativa: combina capacidad de cuota, ahorro, deuda y flexibilidad para recomendar caminos posibles.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricCard
                icon={<Home className="w-5 h-5" />}
                value={<CounterNumber value={scoreResult.maxMonthlyPayment} prefix="$" />}
                label="Cuota maxima"
              />
              <MetricCard
                icon={<Home className="w-5 h-5" />}
                value={<CounterNumber value={scoreResult.maxPropertyValue} prefix="$" />}
                label="Monto alcanzable"
              />
              <MetricCard
                icon={<Home className="w-5 h-5" />}
                value={<CounterNumber value={scoreResult.confidence} suffix="%" precision={0} />}
                label="Confianza"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <AiInsightPanel message={aiMessage} />
        </div>
      </motion.section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="gsap-card premium-card rounded-3xl p-6">
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
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="flex items-start gap-2.5"
                  >
                    {isPositive ? (
                      <CircleCheck className="w-4 h-4 text-green-trust mt-0.5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-orange-opp mt-0.5 shrink-0" />
                    )}
                    <span className="text-sm text-gray-600">{reason}</span>
                  </motion.li>
                )
              })}
            </ul>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="gsap-card premium-card rounded-3xl p-6">
          <div className="relative z-10">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
              <ArrowRight className="w-5 h-5 text-blue-tech" />
              Para mejorar
            </h2>
            <ul className="space-y-3">
              {scoreResult.improvements.map((imp, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className="flex items-start gap-2.5"
                >
                  <ArrowRight className="w-4 h-4 text-blue-tech mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600">{imp}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      <StaggerReveal>
        <StaggerItem>
          <div className="mb-4 max-w-3xl">
            <h2 className="text-xl font-bold text-text-primary">
              Financiamiento que podria acercarte a la compra
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              SimIA cruza tu perfil con opciones de credito, mutuales y planes de constructora para priorizar caminos accionables.
            </p>
          </div>
        </StaggerItem>
      </StaggerReveal>
      <StaggerReveal stagger={0.12}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {financingPrograms.slice(0, 3).map((program, i) => (
            <StaggerItem key={program.id}>
              <FinancingProgramCard program={program} featured={i === 0} />
            </StaggerItem>
          ))}
        </div>
      </StaggerReveal>

      <StaggerReveal>
        <StaggerItem>
          <h2 className="text-xl font-bold text-text-primary mb-4">
            Rutas habitacionales recomendadas
          </h2>
        </StaggerItem>
      </StaggerReveal>
      <StaggerReveal stagger={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedRoutes.map((route) => (
            <StaggerItem key={route.name}>
              <RouteCard route={route} isRecommended={recommendedRoutes.indexOf(route) === 0} />
            </StaggerItem>
          ))}
        </div>
      </StaggerReveal>

      <StaggerReveal>
        <StaggerItem>
          <h2 className="text-xl font-bold text-text-primary mb-4">
            Propiedades dentro de tu rango
          </h2>
        </StaggerItem>
      </StaggerReveal>
      <StaggerReveal stagger={0.08}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchedProperties.map((mp) => (
            <StaggerItem key={mp.property.id}>
              <PropertyCard
                property={mp.property}
                compatibility={mp.compatibility}
                matchReasons={mp.reasons}
                suggestedRoute={mp.suggestedRoute}
              />
            </StaggerItem>
          ))}
        </div>
      </StaggerReveal>

      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 pb-4"
      >
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn-secondary flex w-full items-center justify-center gap-2 px-6 py-3 text-sm font-black sm:w-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Nueva precalificacion
        </motion.button>
        <motion.button
          onClick={onViewRealEstate}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="btn-primary flex w-full items-center justify-center gap-2 px-6 py-3 text-sm font-black sm:w-auto"
        >
          <Eye className="w-4 h-4" />
          Ver panel inmobiliario
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
