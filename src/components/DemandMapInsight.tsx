import { memo } from 'react'
import { MapPin, Lightbulb, TrendingUp, Users, Target } from 'lucide-react'
import type { CityDemand } from '../types/simia'
import { BulletChart } from './SmartCharts'

type Props = {
  cities: CityDemand[]
}

export default memo(function DemandMapInsight({ cities }: Props) {
  const total = cities.reduce((s, c) => s + c.solicitudes, 0)
  const topCity = cities.reduce((a, b) => a.solicitudes > b.solicitudes ? a : b)
  const maxSolicitudes = Math.max(...cities.map(c => c.solicitudes))
  const avgSolicitudes = Math.round(total / cities.length)
  const zones = [
    { label: 'Bajo', color: '#fca5a5', max: Math.round(maxSolicitudes * 0.33) },
    { label: 'Medio', color: '#fcd34d', max: Math.round(maxSolicitudes * 0.66) },
    { label: 'Alto', color: '#86efac', max: maxSolicitudes },
  ]

  return (
    <div className="rounded-3xl bg-night p-6 md:p-8 text-white relative overflow-hidden shadow-xl shadow-night/15">
      <div className="hero-orb hero-orb-green" style={{ width: '260px', height: '260px', top: '-10%', right: '-5%', opacity: 0.35 }} />
      <div className="hero-orb hero-orb-blue" style={{ width: '200px', height: '200px', bottom: '-10%', left: '-5%', opacity: 0.25 }} />

      <div className="relative z-10 space-y-8">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-emerald-200 border border-white/10">
            <MapPin className="h-3.5 w-3.5 inline mr-1" />
            Mapa de demanda inteligente
          </div>
        </div>

        <div className="space-y-4">
          {cities.map((city) => (
            <div key={city.city} className="rounded-xl bg-white/[0.06] border border-white/10 p-4">
              <BulletChart
                label={city.city}
                value={city.solicitudes}
                max={maxSolicitudes}
                reference={avgSolicitudes}
                zones={zones}
              />
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-amber-400/10 via-amber-400/5 to-transparent border border-amber-400/20 p-6 shadow-[0_0_30px_rgba(245,158,11,0.08)]">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/15">
              <Lightbulb className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-300 mb-2">Insight IA</p>
              <p className="text-sm leading-relaxed text-slate-200">
                <strong className="text-white">{topCity.city}</strong> muestra una concentracion relevante de familias con ahorro inicial bajo y necesidad de cuotas largas. Se recomienda evaluar un convenio piloto de lotes o viviendas iniciales con constructora privada.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white/8 border border-white/10 p-4 flex items-center gap-4 hover:bg-white/12 transition-colors">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-400/15">
              <Users className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <div className="text-xl font-black">{total}</div>
              <div className="text-xs text-slate-400">solicitudes totales analizadas</div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/8 border border-white/10 p-4 flex items-center gap-4 hover:bg-white/12 transition-colors">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-400/15">
              <Target className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <div className="text-xl font-black">{cities.length}</div>
              <div className="text-xs text-slate-400">zonas calientes detectadas</div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/8 border border-white/10 p-4 flex items-center gap-4 hover:bg-white/12 transition-colors">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400/15">
              <TrendingUp className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <div className="text-xl font-black">42%</div>
              <div className="text-xs text-slate-400">necesita financiacion</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
