import { Building2, TrendingUp, MapPin, ArrowLeft } from 'lucide-react'
import type { RealEstateLead } from '../types/simia'
import { demoCases, demoProperties, demoZoneDemands } from '../data/demoData'
import { calculateHabitationalScore } from '../utils/scoring'
import { matchProperties } from '../utils/matching'
import LeadCard from '../components/LeadCard'
import SimulatedMap from '../components/SimulatedMap'
import DemandHeatmapLegend from '../components/DemandHeatmapLegend'

type RealEstatePanelProps = {
  onBack: () => void
}

export default function RealEstatePanel({ onBack }: RealEstatePanelProps) {
  const leads: RealEstateLead[] = demoCases.map((user) => {
    const score = calculateHabitationalScore(user)
    const matches = matchProperties(user, score, demoProperties)
    const topProperty = matches.length > 0 ? matches[0].property : demoProperties[0]

    let contactProbability = 50
    if (score.classification === 'apto') contactProbability = 92
    else if (score.classification === 'semiapto') contactProbability = 72
    else contactProbability = 35

    const alerts: string[] = []
    if (score.score < 40) alerts.push('El perfil no alcanza el minimo para financiacion bancaria')
    if (user.savings < topProperty.requiredDownPayment) {
      alerts.push(
        `Ahorro actual por debajo de la entrega requerida (${topProperty.requiredDownPayment.toLocaleString('es-AR')})`
      )
    }
    if (user.desiredZone !== topProperty.zone) {
      alerts.push(`Zona deseada (${user.desiredZone}) distinta a la propiedad sugerida (${topProperty.zone})`)
    }

    return {
      user,
      score,
      topProperty,
      contactProbability,
      alerts,
    }
  })

  const averageContactProb = Math.round(leads.reduce((sum, l) => sum + l.contactProbability, 0) / leads.length)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={onBack}
          className="flex cursor-pointer items-center gap-1.5 rounded-full bg-white/80 px-3 py-2 text-sm font-bold text-ink-soft shadow-sm transition-colors hover:text-text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
      </div>

      <div className="gsap-reveal mb-8 rounded-[2rem] bg-night p-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.2)] relative overflow-hidden">
        <div className="hero-orb hero-orb-green" style={{ width: '220px', height: '220px', top: '-20%', right: '-6%', opacity: 0.45 }} />
        <div className="hero-orb hero-orb-blue" style={{ width: '180px', height: '180px', bottom: '-15%', left: '-4%', opacity: 0.35 }} />
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">Broker command center</p>
          <h1 className="mt-3 text-4xl font-black md:text-5xl">Panel Inmobiliario</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            Leads precalificados, compatibilidad por propiedad y alertas comerciales para contactar mejor.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 gsap-stagger-children">
        <div className="gsap-card premium-card rounded-2xl p-4 text-center glow-pulse">
          <div className="relative z-10 text-3xl font-black text-green-trust">{leads.length}</div>
          <p className="relative z-10 mt-1 text-xs font-bold text-ink-soft">leads calificados</p>
        </div>
        <div className="gsap-card premium-card rounded-2xl p-4 text-center glow-blue" style={{ animationDelay: '0.8s' }}>
          <div className="relative z-10 text-3xl font-black text-blue-tech">{averageContactProb}%</div>
          <p className="relative z-10 mt-1 text-xs font-bold text-ink-soft">probabilidad media</p>
        </div>
        <div className="gsap-card premium-card rounded-2xl p-4 text-center breath">
          <div className="relative z-10 text-3xl font-black text-orange-opp">{demoZoneDemands.length}</div>
          <p className="relative z-10 mt-1 text-xs font-bold text-ink-soft">zonas con demanda</p>
        </div>
        <div className="gsap-card premium-card rounded-2xl p-4 text-center border-glow">
          <div className="relative z-10 flex items-center justify-center gap-1 text-2xl font-extrabold text-green-trust">
            <Building2 className="w-5 h-5" />
            <MapPin className="w-5 h-5" />
          </div>
          <p className="relative z-10 mt-1 text-xs font-bold text-ink-soft">senal comercial</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {leads.map((lead) => (
          <LeadCard key={lead.user.id} lead={lead} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-text-primary">Mapa de Demanda</h2>
              <p className="text-sm text-ink-soft">Zonas calientes en Gran Posadas</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-orange-opp/10 text-orange-opp text-xs font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Actualizado
            </span>
          </div>
          <SimulatedMap zoneDemands={demoZoneDemands} />
        </div>
        <div className="lg:col-span-1">
          <DemandHeatmapLegend zoneDemands={demoZoneDemands} />
        </div>
      </div>
    </div>
  )
}
