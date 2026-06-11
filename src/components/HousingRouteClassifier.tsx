import { memo } from 'react'
import { Home, Key, LandPlot, Hammer, Warehouse, Building2, FileCheck, HeartHandshake } from 'lucide-react'
import type { HousingRouteCategory } from '../types/simia'

type Props = {
  route: HousingRouteCategory
  reason: string
}

const routeConfig: Record<HousingRouteCategory, { icon: React.ElementType; color: string; bg: string; desc: string }> = {
  'Compra inmediata': { icon: Home, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', desc: 'Acceso directo al mercado inmobiliario con credito o ahorro propio.' },
  'Preventa financiada': { icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', desc: 'Compra en etapa de proyecto con financiacion directa del desarrollador.' },
  'Credito complementario': { icon: FileCheck, color: 'text-violet-600', bg: 'bg-violet-50 border-violet-200', desc: 'Credito parcial para completar entrada o valor de la propiedad.' },
  'Lote con servicios': { icon: LandPlot, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', desc: 'Adquisicion de terreno urbanizado para construccion futura.' },
  'Construccion progresiva': { icon: Hammer, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', desc: 'Construccion por etapas segun disponibilidad de recursos.' },
  'Refaccion/ampliacion': { icon: Warehouse, color: 'text-teal-600', bg: 'bg-teal-50 border-teal-200', desc: 'Mejora o ampliacion de vivienda existente.' },
  'Alquiler con opcion a compra': { icon: Key, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200', desc: 'Alquiler donde parte del pago se acumula como anticipo de compra.' },
  'Asistencia prioritaria': { icon: HeartHandshake, color: 'text-red-600', bg: 'bg-red-50 border-red-200', desc: 'Acceso a programas publicos de vivienda social o asistencia habitacional.' },
}

export default memo(function HousingRouteClassifier({ route, reason }: Props) {
  const config = routeConfig[route]
  const Icon = config.icon

  return (
    <div className={`rounded-2xl ${config.bg} border p-6 shadow-md`}>
      <div className="flex items-start gap-5">
        <div className={`h-16 w-16 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0 border ${config.color.replace('text-', 'border-')}/20`}>
          <Icon className={`h-8 w-8 ${config.color}`} />
        </div>
        <div className="space-y-3 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white bg-gradient-to-r from-brand-red to-blue-tech rounded-full px-3 py-1.5 shadow-md shadow-brand-red/20">
              Ruta recomendada
            </span>
          </div>
          <h3 className={`text-xl font-bold ${config.color}`}>{route}</h3>
          <p className="text-sm text-ink-soft leading-relaxed">{config.desc}</p>
          <div className="rounded-xl bg-white/80 p-4 border border-white/70 shadow-sm">
            <p className="text-sm font-medium text-text-primary">
              <span className="text-xs uppercase tracking-wider text-ink-soft font-bold block mb-1.5">Motivo</span>
              {reason}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})
