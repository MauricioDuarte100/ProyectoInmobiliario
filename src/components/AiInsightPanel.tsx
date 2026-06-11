import { memo } from 'react'
import { Bot, Loader2, Sparkles } from 'lucide-react'

type AiInsightPanelProps = {
  message: string
  isLoading?: boolean
}

export default memo(function AiInsightPanel({ message, isLoading }: AiInsightPanelProps) {
  return (
    <div className="gsap-card relative overflow-hidden rounded-3xl border border-blue-tech/15 bg-white p-5 shadow-[0_20px_60px_rgba(37,99,235,0.14)]">
      <div className="absolute right-4 top-4 text-blue-tech/10">
        <Sparkles className="h-16 w-16" />
      </div>
      <div className="relative z-10 mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-tech text-white shadow-lg shadow-blue-tech/20">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <span className="block text-sm font-black text-blue-tech">Cimia Insight</span>
          <span className="text-xs font-semibold text-ink-soft">Analisis habitacional explicado</span>
        </div>
      </div>

      {isLoading ? (
        <div className="relative z-10 flex items-center gap-2 text-ink-soft">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Analizando tu perfil...</span>
        </div>
      ) : (
        <p className="relative z-10 text-sm font-semibold leading-7 text-text-primary whitespace-pre-line">{message}</p>
      )}
    </div>
  )
})
