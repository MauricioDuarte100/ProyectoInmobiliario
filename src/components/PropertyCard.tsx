import { memo } from 'react'
import type { ComponentType } from 'react'
import { MapPin, Bed, Ruler, Calendar, CreditCard, Building2, Home, Warehouse } from 'lucide-react'
import type { Property } from '../types/simia'
import { formatCurrency, formatArea } from '../utils/formatting'
import { useCinematicHover } from '../hooks/useCinematicHover'

type PropertyCardProps = {
  property: Property
  compatibility?: number
  matchReasons?: string[]
  suggestedRoute?: string
}

const typeIcons: Record<string, ComponentType<{ className?: string }>> = {
  Casa: Home,
  Departamento: Building2,
  Duplex: Warehouse,
  Lote: Ruler,
}

const typeGradients: Record<string, string> = {
  Casa: 'from-emerald-900 via-brand-red to-emerald-200',
  Departamento: 'from-slate-950 via-blue-tech to-sky-200',
  Duplex: 'from-slate-950 via-orange-opp to-amber-200',
  Lote: 'from-slate-950 via-brand-red to-lime-200',
}

export default memo(function PropertyCard({
  property,
  compatibility,
  matchReasons,
  suggestedRoute,
}: PropertyCardProps) {
  const cardRef = useCinematicHover<HTMLDivElement>()
  const Icon = typeIcons[property.type] ?? Building2
  const gradient = typeGradients[property.type] ?? 'from-gray-200 to-gray-100'
  const compatibilityColor =
    compatibility === undefined
      ? '#1F8A5B'
      : compatibility >= 80
        ? '#1F8A5B'
        : compatibility >= 60
          ? '#F59E0B'
          : '#DC2626'

  return (
    <div ref={cardRef} className="gsap-card premium-card group rounded-3xl" style={{ transformStyle: 'preserve-3d' }}>
      <div
        className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} rounded-t-3xl`}
      >
        <img
          src={property.imageUrl}
          alt={property.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-600 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,32,0.0)_0%,rgba(11,18,32,0.08)_30%,rgba(11,18,32,0.45)_65%,rgba(11,18,32,0.82)_100%)]" />
        <div className="absolute right-4 top-14 rounded-2xl border border-white/18 bg-white/10 p-3 backdrop-blur-xl shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Icon className="relative h-8 w-8 text-white/90 drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]" />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-text-primary shadow-md backdrop-blur-sm">
          {property.type}
        </span>
        {suggestedRoute && (
          <span className="absolute right-4 top-4 max-w-[52%] rounded-full bg-gradient-to-br from-[#0B162C] via-blue-950 to-[#0A1120]/85 px-3 py-1.5 text-right text-xs font-black text-white shadow-md backdrop-blur-sm">
            {suggestedRoute}
          </span>
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">{property.zone}</p>
          <p className="mt-1 text-2xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">{formatCurrency(property.price)}</p>
        </div>
      </div>

      <div className="relative z-10 p-5">
        <h3 className="text-base font-black leading-tight text-text-primary group-hover:text-brand-red transition-colors duration-300">
          {property.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-1 text-sm font-medium text-ink-soft">
          <MapPin className="w-3.5 h-3.5" />
          <span>
            {property.zone}, {property.city}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-ink-soft">
          <div className="rounded-2xl bg-slate-50 p-3">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
            <CreditCard className="w-3.5 h-3.5" />
              Cuota
            </div>
            <span className="font-black text-text-primary">{formatCurrency(property.estimatedMonthlyPayment)}</span>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
            <Calendar className="w-3.5 h-3.5" />
              Entrega
            </div>
            <span className="font-black text-text-primary">{formatCurrency(property.requiredDownPayment)}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-2xl bg-slate-50 p-3">
            <Ruler className="w-3.5 h-3.5" />
            <span>{formatArea(property.areaM2)}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-2xl bg-slate-50 p-3">
            <Bed className="w-3.5 h-3.5" />
            <span>{property.bedrooms || '--'} dorm.</span>
          </div>
        </div>

        {compatibility !== undefined && (
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
            <span
                className="rounded-full px-3 py-1 text-xs font-black"
              style={{
                  backgroundColor: `${compatibilityColor}18`,
                  color: compatibilityColor,
              }}
            >
              {compatibility}% compatible
            </span>
            {property.financingType && (
                <span className="text-xs font-bold text-ink-soft">{property.financingType}</span>
            )}
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full" style={{ width: `${compatibility}%`, backgroundColor: compatibilityColor }} />
            </div>
          </div>
        )}

        {matchReasons && matchReasons.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {matchReasons.map((r, i) => (
              <li key={i} className="flex items-center gap-2 text-xs font-medium text-ink-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                {r}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
})
