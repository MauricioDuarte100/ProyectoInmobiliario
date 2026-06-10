import { memo } from 'react'
import { BadgePercent, Building2, Handshake, MapPin, Hammer, Key, HandCoins, Landmark, Sparkles } from 'lucide-react'
import type { HabitationalRoute } from '../types/simia'
import { useCinematicHover } from '../hooks/useCinematicHover'

type RouteCardProps = {
  route: HabitationalRoute
  isRecommended?: boolean
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  MapPin,
  Hammer,
  Key,
  HandCoins,
  Landmark,
  BadgePercent,
  Handshake,
}

export default memo(function RouteCard({ route, isRecommended }: RouteCardProps) {
  const cardRef = useCinematicHover<HTMLDivElement>()
  const Icon = iconMap[route.icon] ?? Landmark
  const routeColor = route.compatibility >= 80 ? '#1F8A5B' : route.compatibility >= 60 ? '#F59E0B' : '#DC2626'

  return (
    <div
      ref={cardRef}
      className={`gsap-card premium-card rounded-3xl p-5 ${
        isRecommended ? 'ring-2 ring-green-trust/35' : ''
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {isRecommended && (
        <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-2xl bg-green-trust px-3 py-1.5 text-xs font-black text-white">
          <Sparkles className="w-3 h-3" />
          Recomendada
        </div>
      )}

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`grid h-12 w-12 place-items-center rounded-2xl ${
              isRecommended ? 'bg-green-trust/10 text-green-trust' : 'bg-slate-100 text-ink-soft'
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="pr-24 text-base font-bold text-text-primary">{route.name}</h3>
            <p className="mt-1 text-sm leading-6 text-ink-soft">{route.benefit}</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-5">
        <div className="mb-2 flex items-center justify-between gap-3">
        <div
            className="rounded-full px-3 py-1 text-xs font-black"
          style={{
              backgroundColor: `${routeColor}18`,
              color: routeColor,
          }}
        >
          {route.compatibility}% compatible
        </div>
          <span className="text-right text-xs font-bold text-ink-soft">{route.nextStep}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full" style={{ width: `${route.compatibility}%`, backgroundColor: routeColor }} />
        </div>
      </div>

      <p className="relative z-10 mt-4 rounded-2xl bg-slate-50 p-3 text-xs font-medium leading-5 text-ink-soft">
        {route.limitation}
      </p>
    </div>
  )
})
