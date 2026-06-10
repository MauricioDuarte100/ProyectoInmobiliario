import { useState, type ReactNode } from 'react'

type TooltipProps = {
  children: ReactNode
  content: ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export default function Tooltip({ children, content, side = 'top' }: TooltipProps) {
  const [open, setOpen] = useState(false)

  const sideClasses = {
    top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
    bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
    left: 'right-full top-1/2 mr-2 -translate-y-1/2',
    right: 'left-full top-1/2 ml-2 -translate-y-1/2',
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <div className={`absolute z-50 w-max max-w-xs ${sideClasses[side]}`}>
          <div className="rounded-xl border border-white/60 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
            {content}
          </div>
        </div>
      )}
    </div>
  )
}
