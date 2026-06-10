import { memo } from 'react'
import { Flame, Thermometer, Snowflake, TrendingUp } from 'lucide-react'
import type { ZoneDemand } from '../types/simia'

type DemandHeatmapLegendProps = {
  zoneDemands: ZoneDemand[]
}

export default memo(function DemandHeatmapLegend({ zoneDemands }: DemandHeatmapLegendProps) {
  const maxDemand = Math.max(...zoneDemands.map((z) => z.demandScore))
  
  const getHeatLevel = (score: number) => {
    const ratio = score / maxDemand
    if (ratio >= 0.75) return { label: 'Alta', color: 'text-orange-opp', bg: 'bg-orange-opp/12', border: 'border-orange-opp/30', icon: Flame }
    if (ratio >= 0.5) return { label: 'Media', color: 'text-amber-500', bg: 'bg-amber-500/12', border: 'border-amber-500/30', icon: Thermometer }
    return { label: 'Baja', color: 'text-blue-tech', bg: 'bg-blue-tech/12', border: 'border-blue-tech/30', icon: Snowflake }
  }

  return (
    <div className="gsap-card glass-panel rounded-[1.75rem] p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="grid h-8 w-8 place-items-center rounded-xl bg-orange-opp/10 text-orange-opp">
          <TrendingUp className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-text-primary">Leyenda de Demanda</h3>
          <p className="text-xs text-ink-soft">Intensidad por zona</p>
        </div>
      </div>

      <div className="space-y-3">
        {zoneDemands.map((zone) => {
          const heat = getHeatLevel(zone.demandScore)
          const Icon = heat.icon
          return (
            <div
              key={zone.zone}
              className={`flex items-center gap-3 rounded-2xl border ${heat.border} ${heat.bg} px-4 py-3 transition-all hover:scale-[1.02]`}
            >
              <div className={`grid h-9 w-9 place-items-center rounded-xl bg-white/80 ${heat.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-text-primary truncate">{zone.zone}</span>
                  <span className={`text-xs font-black ${heat.color}`}>{heat.label}</span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-white/60 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      heat.label === 'Alta'
                        ? 'bg-orange-opp'
                        : heat.label === 'Media'
                        ? 'bg-amber-500'
                        : 'bg-blue-tech'
                    }`}
                    style={{ width: `${(zone.demandScore / maxDemand) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-ink-soft font-medium">
                    Score: {zone.demandScore}
                  </span>
                  <span className="text-[10px] text-ink-soft truncate max-w-[60%]">
                    {zone.preferredProduct}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-5 pt-4 border-t border-border/40 grid grid-cols-2 gap-3">
        <div className="text-center">
          <span className="text-lg font-black text-text-primary">{zoneDemands.length}</span>
          <p className="text-[10px] font-bold text-ink-soft uppercase tracking-wider">Zonas</p>
        </div>
        <div className="text-center">
          <span className="text-lg font-black text-orange-opp">
            {Math.round(zoneDemands.reduce((s, z) => s + z.averagePaymentCapacity, 0) / zoneDemands.length).toLocaleString('es-AR')}
          </span>
          <p className="text-[10px] font-bold text-ink-soft uppercase tracking-wider">Cuota promedio</p>
        </div>
      </div>
    </div>
  )
})
