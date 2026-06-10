import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

type FinancingOption = {
  name: string
  rate: string
  term: string
  downPayment: string
  monthly: string
  totalCost: string
  pros: string[]
  cons: string[]
  trend: 'up' | 'down' | 'stable'
}

const options: FinancingOption[] = [
  {
    name: 'Banco Hipotecario',
    rate: '38% TNA',
    term: '20-30 años',
    downPayment: '20-30%',
    monthly: 'Variable UVI',
    totalCost: 'Alto (interes compuesto)',
    pros: ['Maxima financiacion', 'Largo plazo', 'Bancos establecidos'],
    cons: ['Tasa variable UVI', 'Requisitos estrictos', 'Tramites extensos'],
    trend: 'up',
  },
  {
    name: 'PROCREAR / Mi Casa',
    rate: 'Tasa fija preferencial',
    term: '20-30 años',
    downPayment: '10-20%',
    monthly: 'Fija en pesos',
    totalCost: 'Medio (subsidio)',
    pros: ['Tasa fija', 'Subsidio del Estado', 'Menor entrega'],
    cons: ['Cupos limitados', 'Requisitos socioeconomicos', 'Demora en adjudicacion'],
    trend: 'stable',
  },
  {
    name: 'Autoconstruccion Progresiva',
    rate: '0% (ahorro previo)',
    term: '3-5 años',
    downPayment: 'Lote + materiales',
    monthly: 'Costos de obra',
    totalCost: 'Bajo (sin interes)',
    pros: ['Sin intereses', 'Flexibilidad total', 'Control de calidad'],
    cons: ['Requiere supervision', 'Demora en terminar', 'Necesita terreno'],
    trend: 'down',
  },
  {
    name: 'Financiamiento Directo',
    rate: '0-15% (mutuo)',
    term: '5-10 años',
    downPayment: '50%',
    monthly: 'Fija acordada',
    totalCost: 'Variable',
    pros: ['Negociable', 'Sin bancos', 'Tramites minimos'],
    cons: ['Riesgo de incumplimiento', 'Requiere confianza', 'No siempre disponible'],
    trend: 'stable',
  },
]

export default function FinancingComparisonTable() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.financing-row'),
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08 },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="space-y-3">
      {options.map((opt) => (
        <div
          key={opt.name}
          className="financing-row rounded-2xl border border-border/80 bg-white/90 p-5 transition-all hover:border-green-trust/30 hover:shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-bold text-text-primary">{opt.name}</h3>
              {opt.trend === 'up' && <TrendingUp className="h-4 w-4 text-red-alert" />}
              {opt.trend === 'down' && <TrendingDown className="h-4 w-4 text-green-trust" />}
              {opt.trend === 'stable' && <Minus className="h-4 w-4 text-blue-tech" />}
            </div>
            <span className="rounded-full bg-night/8 px-3 py-1 text-xs font-bold text-text-primary">
              {opt.rate}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Plazo</p>
              <p className="text-sm font-bold text-text-primary mt-1">{opt.term}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Entrega</p>
              <p className="text-sm font-bold text-text-primary mt-1">{opt.downPayment}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Cuota</p>
              <p className="text-sm font-bold text-text-primary mt-1">{opt.monthly}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Costo total</p>
              <p className="text-sm font-bold text-text-primary mt-1">{opt.totalCost}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-green-trust mb-2">Pros</p>
              <ul className="space-y-1">
                {opt.pros.map((pro, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-ink-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-trust shrink-0" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-red-alert mb-2">Contras</p>
              <ul className="space-y-1">
                {opt.cons.map((con, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-ink-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-alert shrink-0" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
