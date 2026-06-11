import { memo } from 'react'
import { Calendar, User, FileText, Circle } from 'lucide-react'

export type CaseEvent = {
  date: string
  actor: string
  title: string
  description: string
}

type Props = {
  events: CaseEvent[]
}

export default memo(function CaseTracker({ events }: Props) {
  return (
    <div className="relative">
      <div className="absolute left-[22px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-brand-red/40 via-blue-tech/30 to-night/10" />
      <ul className="space-y-6">
        {events.map((event, i) => {
          const isLast = i === events.length - 1
          return (
            <li key={i} className="relative flex gap-5">
              <div className="relative z-10 mt-1">
                {isLast ? (
                  <span className="relative flex h-5 w-5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-60" />
                    <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-red/60 shadow-lg shadow-brand-red/40">
                      <Circle className="h-1.5 w-1.5 text-white" fill="white" />
                    </span>
                  </span>
                ) : (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-tech/30 shadow-sm">
                    <Circle className="h-1.5 w-1.5 text-blue-tech" fill="currentColor" />
                  </span>
                )}
              </div>
              <div className={`flex-1 rounded-xl border border-border/60 bg-white/70 backdrop-blur px-4 py-3.5 ${isLast ? 'shadow-md border-brand-red/20' : ''}`}>
                <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-ink-soft">
                  <Calendar className="h-3 w-3" />
                  {event.date}
                  <span className="text-border">|</span>
                  <User className="h-3 w-3" />
                  {event.actor}
                </div>
                <h4 className="flex items-center gap-1.5 text-sm font-bold text-text-primary">
                  <FileText className="h-3.5 w-3.5 text-brand-red" />
                  {event.title}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{event.description}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
})
