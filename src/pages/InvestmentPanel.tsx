import { Building2, DollarSign, MapPin, TrendingUp, ArrowLeft, Lightbulb, LandPlot } from 'lucide-react'
import SimulatedMap from '../components/SimulatedMap'
import { demoZoneDemands } from '../data/demoData'

type InvestmentPanelProps = {
  onBack: () => void
}

const opportunities = [
  {
    icon: LandPlot,
    title: 'Lotes financiados en Garupa',
    description:
      'Alta demanda de primera vivienda con cuotas bajas. Terreno disponible. Proyecto sugerido: 20 lotes de 300m2.',
  },
  {
    icon: Building2,
    title: 'Viviendas evolutivas en Itaembe Guazu',
    description:
      'Perfil joven con capacidad de pago creciente. Proyecto sugerido: 15 unidades de 65m2.',
  },
  {
    icon: Building2,
    title: 'Duplex en Candelaria',
    description:
      'Expansion metropolitana. Interes de familias que buscan salir del centro. Proyecto sugerido: 10 duplex.',
  },
]

export default function InvestmentPanel({ onBack }: InvestmentPanelProps) {
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
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">Urban investment radar</p>
          <h1 className="mt-3 text-4xl font-black md:text-5xl">Panel de Demanda e Inversion</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            Zonas calientes, ticket posible y oportunidades de desarrollo para constructoras e inversores.
          </p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <span className="pulse-dot" />
              Mapa de Demanda
            </h2>
            <p className="text-sm text-gray-500">Gran Posadas - demanda sintetizada por SimIA</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-green-trust/10 text-green-trust text-xs font-semibold flex items-center gap-1 breather">
            <TrendingUp className="w-3.5 h-3.5" />
            Mercado local
          </span>
        </div>
        <div className="h-[400px]">
          <SimulatedMap zoneDemands={demoZoneDemands} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 gsap-stagger-children">
        <div className="gsap-card premium-card flex items-center gap-4 rounded-2xl p-5">
          <div className="relative z-10 rounded-2xl bg-green-trust/10 p-3 text-green-trust glow-pulse">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="relative z-10">
            <p className="text-xs text-gray-400">Rango de cuota promedio</p>
            <p className="text-base font-bold text-text-primary">$280.000 - $520.000</p>
          </div>
        </div>
        <div className="gsap-card premium-card flex items-center gap-4 rounded-2xl p-5">
          <div className="relative z-10 rounded-2xl bg-blue-tech/10 p-3 text-blue-tech glow-blue">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="relative z-10">
            <p className="text-xs text-gray-400">Tipologia mas buscada</p>
            <p className="text-base font-bold text-text-primary">Lote financiado / Casa evolutiva</p>
          </div>
        </div>
        <div className="gsap-card premium-card flex items-center gap-4 rounded-2xl p-5">
          <div className="relative z-10 rounded-2xl bg-orange-opp/10 p-3 text-orange-opp border-glow">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="relative z-10">
            <p className="text-xs text-gray-400">Zonas con mayor potencial</p>
            <p className="text-base font-bold text-text-primary">Garupa, Itaembe Guazu</p>
          </div>
        </div>
      </div>

      <div className="section-divider mb-10" />

      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-orange-opp float-soft" />
          <h2 className="text-xl font-bold text-text-primary">Oportunidades para constructora</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gsap-stagger-children">
          {opportunities.map((opp) => {
            const Icon = opp.icon
            return (
              <div
                key={opp.title}
                className="gsap-card premium-card rounded-3xl p-5 shimmer-overlay"
              >
                <div className="ornament-corner ornament-corner-tl" />
                <div className="relative z-10 mb-3 w-fit rounded-2xl bg-blue-tech/10 p-3 text-blue-tech">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="relative z-10 mb-2 font-black text-text-primary">{opp.title}</h3>
                <p className="relative z-10 text-sm leading-relaxed text-ink-soft">{opp.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <p className="text-center text-xs text-gray-400 pb-8">
        Lectura orientativa. No constituye asesoramiento de inversion.
      </p>
    </div>
  )
}
