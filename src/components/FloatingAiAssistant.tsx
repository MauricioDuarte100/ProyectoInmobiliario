import { useState } from 'react'
import { Sparkles, X, MessageCircle, ChevronRight } from 'lucide-react'
import { explainScore } from '../services/aiClient'
import type { UserProfile, ScoreResult } from '../types/simia'

type FloatingAiAssistantProps = {
  profile: UserProfile | null
  scoreResult: ScoreResult | null
}

export default function FloatingAiAssistant({ profile, scoreResult }: FloatingAiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: 'Hola! Soy SimIA. Preguntame sobre tu precalificacion o rutas habitacionales.', isUser: false },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setMessages((prev) => [...prev, { text: userMsg, isUser: true }])
    setInput('')

    // Simulate AI response
    setTimeout(() => {
      let response = 'Para darte una respuesta precisa, necesito que completes el formulario de precalificacion.'
      if (profile && scoreResult) {
        if (userMsg.toLowerCase().includes('cuota')) {
          const totalIncome = profile.monthlyFormalIncome + profile.monthlyInformalIncome
          response = `Tu cuota maxima sugerida es de $${scoreResult.maxMonthlyPayment.toLocaleString('es-AR')}. Esto representa aproximadamente el ${Math.round((scoreResult.maxMonthlyPayment / totalIncome) * 100)}% de tus ingresos.`
        } else if (userMsg.toLowerCase().includes('ahorro') || userMsg.toLowerCase().includes('entrega')) {
          response = `Tu ahorro actual es de $${profile.savings.toLocaleString('es-AR')}. Para una propiedad de $${scoreResult.maxPropertyValue.toLocaleString('es-AR')}, necesitarias aproximadamente $${Math.round(scoreResult.maxPropertyValue * 0.2).toLocaleString('es-AR')} de entrega inicial.`
        } else if (userMsg.toLowerCase().includes('ruta') || userMsg.toLowerCase().includes('alternativa')) {
          response = `Basado en tu score de ${scoreResult.score}, te recomiendo explorar la ruta de lotes financiados o autoconstruccion progresiva. Estas opciones requieren menor entrega inicial.`
        } else if (userMsg.toLowerCase().includes('score') || userMsg.toLowerCase().includes('puntaje')) {
          response = explainScore(profile, scoreResult)
        } else {
          response = explainScore(profile, scoreResult)
        }
      }
      setMessages((prev) => [...prev, { text: response, isUser: false }])
    }, 600)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-[0_24px_80px_rgba(15,23,42,0.22)] backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-green-trust text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">SimIA Assistant</p>
                <p className="text-xs text-ink-soft">En linea</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-text-primary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="h-72 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                    msg.isUser
                      ? 'bg-green-trust text-white rounded-br-sm'
                      : 'bg-slate-50 text-text-primary rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border/60 px-4 py-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pregunta sobre tu score..."
                className="flex-1 rounded-xl border border-border/80 bg-white px-3 py-2.5 text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-trust/20"
              />
              <button
                onClick={handleSend}
                className="grid h-9 w-9 place-items-center rounded-xl bg-green-trust text-white hover:bg-green-trust/90 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`grid h-14 w-14 place-items-center rounded-full shadow-[0_12px_40px_rgba(31,138,91,0.35)] transition-all duration-300 ${
          isOpen ? 'bg-night text-white rotate-0' : 'bg-green-trust text-white hover:scale-105'
        }`}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  )
}
