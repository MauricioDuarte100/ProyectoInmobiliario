import { memo } from 'react'
import { Shield } from 'lucide-react'
import type { UrgencyLevel } from '../types/simia'

type Props = {
  urgency: UrgencyLevel
  reason: string
}

const config = {
  verde: { label: 'Puede resolver con mercado privado', color: 'bg-green-500', bg: 'bg-green-50 border-green-200', text: 'text-green-700', icon: 'text-green-600', ring: 'ring-green-300' },
  amarillo: { label: 'Necesita financiacion o convenio', color: 'bg-amber-500', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', icon: 'text-amber-600', ring: 'ring-amber-300' },
  rojo: { label: 'Requiere asistencia publica prioritaria', color: 'bg-red-500', bg: 'bg-red-50 border-red-200', text: 'text-red-700', icon: 'text-red-600', ring: 'ring-red-300' },
}

export default memo(function SocialUrgencyTrafficLight({ urgency, reason }: Props) {
  const c = config[urgency]

  return (
    <div className={`rounded-2xl border ${c.bg} p-6 space-y-4 shadow-md`}>
      <div className="flex items-center gap-4">
        <div className="flex gap-2.5">
          <div className={`h-8 w-8 rounded-full ${urgency === 'verde' ? c.color : 'bg-gray-200'} ${urgency === 'verde' ? `ring-3 ${c.ring}` : ''} transition-all duration-300`}
            style={urgency === 'verde' ? { boxShadow: '0 0 16px rgba(34,197,94,0.6), 0 2px 8px rgba(0,0,0,0.1)' } : { boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }} />
          <div className={`h-8 w-8 rounded-full ${urgency === 'amarillo' ? c.color : 'bg-gray-200'} ${urgency === 'amarillo' ? `ring-3 ${c.ring}` : ''} transition-all duration-300`}
            style={urgency === 'amarillo' ? { boxShadow: '0 0 16px rgba(245,158,11,0.6), 0 2px 8px rgba(0,0,0,0.1)' } : { boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }} />
          <div className={`h-8 w-8 rounded-full ${urgency === 'rojo' ? c.color : 'bg-gray-200'} ${urgency === 'rojo' ? `ring-3 ${c.ring}` : ''} transition-all duration-300`}
            style={urgency === 'rojo' ? { boxShadow: '0 0 16px rgba(220,38,38,0.6), 0 2px 8px rgba(0,0,0,0.1)' } : { boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }} />
        </div>
        <div>
          <h3 className={`font-bold text-lg ${c.text}`}>Semaforo: {urgency === 'verde' ? 'Verde' : urgency === 'amarillo' ? 'Amarillo' : 'Rojo'}</h3>
          <p className={`text-sm ${c.text}`}>{c.label}</p>
        </div>
      </div>
      <div className={`rounded-xl bg-white/70 border border-white/60 p-4 shadow-sm`}>
        <div className="flex items-start gap-3">
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${c.bg} mt-0.5`}>
            <Shield className={`h-4 w-4 ${c.icon}`} />
          </div>
          <p className={`text-sm ${c.text} leading-relaxed`}>{reason}</p>
        </div>
      </div>
    </div>
  )
})
