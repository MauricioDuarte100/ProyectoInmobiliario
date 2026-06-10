import { BarChart3, Target, MapPin, TrendingUp, Lightbulb } from 'lucide-react'
import type { ProjectRecommendation } from '../types/simia'

type Props = {
  recommendation: ProjectRecommendation
}

export default function ProjectRecommender({ recommendation }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 space-y-5 shadow-md">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-violet-50">
          <BarChart3 className="h-5 w-5 text-violet-600" />
        </div>
        <h3 className="font-bold text-text-primary text-lg">Recomendador de proyectos</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 p-3 text-center shadow-sm">
          <div className="text-[10px] text-ink-soft mb-1 uppercase tracking-wider font-semibold">Zona</div>
          <div className="text-sm font-bold text-text-primary">{recommendation.zone}</div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 p-3 text-center shadow-sm">
          <div className="text-[10px] text-ink-soft mb-1 uppercase tracking-wider font-semibold">Interesados</div>
          <div className="text-sm font-bold text-text-primary">{recommendation.solicitudes}</div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 p-3 text-center shadow-sm">
          <div className="text-[10px] text-ink-soft mb-1 uppercase tracking-wider font-semibold">Ahorro prom.</div>
          <div className="text-sm font-bold text-text-primary">${(recommendation.avgSavings / 1000000).toFixed(1)}M</div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 p-3 text-center shadow-sm">
          <div className="text-[10px] text-ink-soft mb-1 uppercase tracking-wider font-semibold">Tipo + buscado</div>
          <div className="text-sm font-bold text-text-primary">{recommendation.topNeed}</div>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-violet-50 to-violet-100/40 border border-violet-100 p-5 space-y-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-100 mt-0.5">
            <Target className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.1em] text-violet-700 mb-1">Proyecto sugerido</p>
            <p className="text-sm font-medium text-violet-900 leading-relaxed">{recommendation.suggestedProject}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-100 mt-0.5">
            <MapPin className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.1em] text-violet-700 mb-1">Modelo recomendado</p>
            <p className="text-sm text-violet-900 leading-relaxed">{recommendation.model}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-100 mt-0.5">
            <TrendingUp className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.1em] text-violet-700 mb-1">Motivo</p>
            <p className="text-sm text-violet-900 leading-relaxed">{recommendation.reason}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-green-50 to-green-100/40 border border-green-100 p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-100 mt-0.5">
            <Lightbulb className="h-4 w-4 text-green-600" />
          </div>
          <p className="text-sm text-green-800 font-medium leading-relaxed">
            Esto ayuda al gobierno y a constructoras a ver oportunidades concretas basadas en demanda real.
          </p>
        </div>
      </div>
    </div>
  )
}
