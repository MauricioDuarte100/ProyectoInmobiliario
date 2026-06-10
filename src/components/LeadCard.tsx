import { memo } from 'react'
import { Phone, MapPin, AlertTriangle, TrendingUp, Home } from 'lucide-react'
import type { RealEstateLead } from '../types/simia'
import { formatCurrency } from '../utils/formatting'
import { getClassificationLabel } from '../utils/formatting'

type LeadCardProps = {
  lead: RealEstateLead
}

export default memo(function LeadCard({ lead }: LeadCardProps) {
  const { user, score, topProperty, contactProbability, alerts } = lead
  const scoreColor = score.score >= 70 ? '#1F8A5B' : score.score >= 40 ? '#F59E0B' : '#DC2626'
  const contactColor = contactProbability >= 80 ? '#1F8A5B' : contactProbability >= 60 ? '#F59E0B' : '#DC2626'

  return (
    <div className="gsap-card premium-card rounded-3xl">
      <div className="relative z-10 p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-black text-text-primary">{user.name}</h3>
            <div className="mt-1 flex items-center gap-1 text-sm font-medium text-ink-soft">
              <MapPin className="w-3.5 h-3.5" />
              <span>{user.desiredZone}</span>
              <span className="mx-1">|</span>
              <Home className="w-3.5 h-3.5" />
              <span>{user.desiredPropertyType}</span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span
              className="text-3xl font-black"
              style={{ color: scoreColor }}
            >
              {Math.round(score.score)}
            </span>
            <span className="rounded-full px-2 py-0.5 text-xs font-black" style={{ color: scoreColor, backgroundColor: `${scoreColor}18` }}>
              {getClassificationLabel(score.classification)}
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-gray-100 bg-gray-50 p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-soft">Propiedad sugerida</span>
            <span className="max-w-[55%] text-right font-black text-text-primary">{topProperty.title}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-500">Cuota est. / Capacidad</span>
            <span className="text-green-trust font-semibold">
              {formatCurrency(topProperty.estimatedMonthlyPayment)} / {formatCurrency(score.maxMonthlyPayment)}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white/80 p-3 text-sm shadow-sm">
            <div className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-green-trust" />
            <span
                className="font-black"
                style={{ color: contactColor }}
            >
              {contactProbability}%
            </span>
            </div>
            <span className="text-xs font-bold text-ink-soft">prob. contacto</span>
          </div>

          <div className="rounded-2xl bg-white/80 p-3 text-sm shadow-sm">
            <div className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-blue-tech" />
              <span className="font-black text-blue-tech">{formatCurrency(score.maxMonthlyPayment)}</span>
            </div>
            <span className="text-xs font-bold text-ink-soft">cuota max.</span>
          </div>
        </div>

        {alerts.length > 0 && (
          <div className="mt-3 space-y-1">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className="flex items-start gap-1.5 text-xs text-orange-opp bg-orange-opp/10 rounded-lg px-2.5 py-1.5"
              >
                <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                <span>{alert}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
})
