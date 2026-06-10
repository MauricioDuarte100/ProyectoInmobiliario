import { Lightbulb, Users, Building2, LandPlot, AlertTriangle } from 'lucide-react'
import type { ChamberDecision, ExecutiveReport } from '../types/simia'

type Props = {
  decisions: ChamberDecision[]
  stats: ExecutiveReport['stats']
}

export default function ChamberDecisionPanel({ decisions, stats }: Props) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { value: '1.248', label: 'Solicitudes analizadas', icon: Users, color: 'text-blue-tech', bg: 'bg-blue-50' },
          { value: `${stats.necesitaFinanciacion}%`, label: 'Necesita financiacion', icon: Building2, color: 'text-amber-500', bg: 'bg-amber-50' },
          { value: `${stats.puedePreventa}%`, label: 'Puede entrar a preventa', icon: Building2, color: 'text-green-trust', bg: 'bg-green-50' },
          { value: `${stats.buscaLote}%`, label: 'Busca lote', icon: LandPlot, color: 'text-violet-500', bg: 'bg-violet-50' },
          { value: `${stats.asistenciaPrioritaria}%`, label: 'Asistencia prioritaria', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
          { value: `${stats.inversores}`, label: 'Inversores simulados', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        ].map((item) => (
          <div key={item.label} className={`rounded-2xl border border-slate-200/60 bg-white p-5 text-center space-y-3 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 gsap-reveal-scale`}>
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-inner ${item.bg} ring-1 ring-black/5 mx-auto`}>
              <item.icon className={`h-6 w-6 ${item.color}`} />
            </div>
            <div>
              <div className="text-2xl font-black text-text-primary mb-1">{item.value}</div>
              <div className="text-xs font-bold uppercase tracking-wide text-ink-soft/80">{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="premium-card rounded-3xl p-6 md:p-8 border-glow shadow-xl mt-8">
        <div className="flex items-center gap-4 pb-5 border-b border-border/80 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md shadow-amber-500/20">
            <Lightbulb className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-bold text-text-primary text-xl">Recomendacion Estrategica SimIA</h3>
        </div>
        <div className="space-y-4">
          {decisions.map((d, i) => {
            const isHigh = d.priority === 'alta'
            return (
              <div
                key={i}
                className="flex items-start gap-5 rounded-2xl bg-white p-6 transition-all hover:shadow-lg border border-slate-100"
                style={{ borderLeft: `4px solid ${isHigh ? '#DC2626' : '#F59E0B'}`, boxShadow: `0 4px 20px rgba(0,0,0,0.03), inset 2px 0 12px ${isHigh ? 'rgba(220,38,38,0.04)' : 'rgba(245,158,11,0.04)'}` }}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-night to-slate-800 text-base font-black text-white"
                  style={{ boxShadow: isHigh ? '0 0 20px rgba(220,38,38,0.3), 0 0 8px rgba(220,38,38,0.5)' : '0 0 20px rgba(245,158,11,0.25), 0 0 8px rgba(245,158,11,0.4)' }}
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-3">
                    <h4 className="font-bold text-base text-text-primary">{d.title}</h4>
                    <span className={`shrink-0 rounded-lg px-3 py-1 text-[11px] font-black uppercase tracking-wider ${
                      isHigh
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      Prioridad {d.priority}
                    </span>
                  </div>
                  <p className="text-sm text-ink-soft mb-4 leading-relaxed">{d.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {d.actors.map((actor) => (
                      <span key={actor} className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-text-primary border border-slate-200 shadow-sm">
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
