import { Calculator, ArrowRight } from 'lucide-react'

type StickyCTAProps = {
  onClick: () => void
  label?: string
  sublabel?: string
}

export default function StickyCTA({
  onClick,
  label = 'Precalificate ahora',
  sublabel = 'Gratis, sin compromiso',
}: StickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 md:hidden">
      <div className="glass-panel rounded-[1.5rem] p-3 shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/60">
        <button
          onClick={onClick}
          className="flex w-full items-center justify-between gap-3 rounded-[1.1rem] bg-green-trust px-4 py-3.5 text-left transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/20 text-white">
              <Calculator className="h-4 w-4" />
            </div>
            <div>
              <span className="block text-sm font-black text-white">{label}</span>
              <span className="block text-[11px] font-medium text-white/80">{sublabel}</span>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-white/70" />
        </button>
      </div>
    </div>
  )
}
