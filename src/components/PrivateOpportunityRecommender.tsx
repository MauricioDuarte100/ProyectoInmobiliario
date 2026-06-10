import { Building2, Home, TrendingUp, MapPin, Lightbulb } from 'lucide-react'
import type { PrivateChance } from '../types/simia'

type Props = {
  chances: PrivateChance[]
}

function formatARS(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  return `$${n.toLocaleString('es-AR')}`
}

export default function PrivateOpportunityRecommender({ chances }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-50">
          <TrendingUp className="h-5 w-5 text-amber-600" />
        </div>
        <h3 className="font-bold text-text-primary text-lg">Oportunidades para actores privados</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {chances.slice(0, 2).map((chance) => (
          <div key={chance.zone} className="premium-card rounded-3xl p-6 md:p-8 space-y-5 border-glow shadow-lg transition-transform hover:-translate-y-1 duration-300">
            <div className="flex items-center gap-4 pb-4 border-b border-border/80">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-inner ${chance.zone === 'Posadas' ? 'bg-blue-50/80 ring-1 ring-blue-100' : 'bg-amber-50/80 ring-1 ring-amber-100'}`}>
                {chance.zone === 'Posadas' ? (
                  <Home className="h-6 w-6 text-blue-600" />
                ) : (
                  <Building2 className="h-6 w-6 text-amber-600" />
                )}
              </div>
              <h4 className="text-xl font-black text-text-primary">
                {chance.zone === 'Posadas' ? 'Para inmobiliarias' : 'Para constructoras'}
              </h4>
            </div>

            <div className="rounded-2xl bg-slate-50/80 border border-slate-200/60 p-5 space-y-4">
              <div className="flex items-start gap-3 text-base">
                <MapPin className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-ink-soft/90 leading-relaxed">
                  En <strong className="text-text-primary font-black">{chance.zone}</strong> hay <strong className="text-text-primary font-black">{chance.interested}</strong> interesados.
                </p>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">{chance.profile}.</p>
              <div className="flex flex-wrap gap-4 text-sm mt-2">
                <div className="bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm">
                  <span className="text-ink-soft/80 uppercase tracking-wider text-[10px] font-bold block mb-0.5">Ahorro Promedio</span>
                  <strong className="text-text-primary text-base">{formatARS(chance.avgSavings)}</strong>
                </div>
                <div className="bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm">
                  <span className="text-ink-soft/80 uppercase tracking-wider text-[10px] font-bold block mb-0.5">Cuota Promedio</span>
                  <strong className="text-text-primary text-base">{formatARS(chance.avgCuota)}</strong>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/30 border border-emerald-200/50 p-5 shadow-inner">
              <div className="flex items-start gap-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100/80 mt-0.5">
                  <Lightbulb className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.1em] text-emerald-600 mb-1">Recomendacion</p>
                  <p className="text-sm text-emerald-900 font-medium leading-relaxed">{chance.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {chances.length > 2 && (
        <div className="premium-card rounded-3xl p-6 md:p-8 space-y-5 border-glow shadow-lg mt-6">
          <div className="flex items-center gap-4 pb-4 border-b border-border/80">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50/80 shadow-inner ring-1 ring-amber-100">
              <Building2 className="h-6 w-6 text-amber-600" />
            </div>
            <h4 className="text-xl font-black text-text-primary">Tambien en {chances[2].zone}</h4>
          </div>
          <div className="rounded-2xl bg-slate-50/80 border border-slate-200/60 p-5">
            <p className="text-sm text-ink-soft leading-relaxed">{chances[2].profile}.</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/30 border border-emerald-200/50 p-5 shadow-inner">
            <div className="flex items-start gap-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100/80 mt-0.5">
                <Lightbulb className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.1em] text-emerald-600 mb-1">Recomendacion</p>
                <p className="text-sm text-emerald-900 font-medium leading-relaxed">{chances[2].recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
