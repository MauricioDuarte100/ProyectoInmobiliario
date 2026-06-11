import { useState, useEffect, useRef } from 'react'
import { Sparkles, X, MessageCircle, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { chatResponse } from '../services/aiClient'
import type { UserProfile, ScoreResult, MatchedProperty, HabitationalRoute } from '../types/simia'

type FloatingAiAssistantProps = {
  profile: UserProfile | null
  scoreResult: ScoreResult | null
  matchedProperties?: MatchedProperty[]
  recommendedRoutes?: HabitationalRoute[]
}

const chatVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.92, transformOrigin: 'bottom right' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 320,
      damping: 26,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.94,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const messageVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 400, damping: 22 },
  },
}

export default function FloatingAiAssistant({
  profile,
  scoreResult,
  matchedProperties = [],
  recommendedRoutes = [],
}: FloatingAiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: 'Hola! Soy SimIA. Preguntame sobre tu precalificacion o rutas habitacionales.', isUser: false },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    const userMsg = input.trim()
    setMessages((prev) => [...prev, { text: userMsg, isUser: true }])
    setInput('')
    setIsLoading(true)

    try {
      const response = await chatResponse(userMsg, {
        profile,
        scoreResult,
        matchedProperties,
        recommendedRoutes,
      })
      setMessages((prev) => [...prev, { text: response, isUser: false }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          text: 'Disculpa, no pude conectar con el asistente. Intenta de nuevo en unos segundos.',
          isUser: false,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-4 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-[0_24px_80px_rgba(15,23,42,0.22)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
              <div className="flex items-center gap-2">
                <motion.div
                  className="grid h-8 w-8 place-items-center rounded-full bg-brand-red text-white"
                  animate={isLoading ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                  transition={{ repeat: isLoading ? Infinity : 0, duration: 1.5, ease: 'easeInOut' }}
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
                <div>
                  <p className="text-sm font-bold text-text-primary">SimIA Assistant</p>
                  <p className="text-xs text-ink-soft flex items-center gap-1.5">
                    {isLoading ? (
                      <>
                        <span className="status-processing" />
                        Escribiendo...
                      </>
                    ) : (
                      <>
                        <span className="status-live" />
                        En linea
                      </>
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-text-primary transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="h-72 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-6 whitespace-pre-wrap ${
                      msg.isUser
                        ? 'bg-brand-red text-white rounded-br-sm'
                        : 'bg-slate-50 text-text-primary rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-50 px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 bounce-dot rounded-full bg-brand-red/60" />
                      <span className="h-2.5 w-2.5 bounce-dot rounded-full bg-brand-red/60" />
                      <span className="h-2.5 w-2.5 bounce-dot rounded-full bg-brand-red/60" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-border/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Pregunta sobre tu score..."
                  className="flex-1 rounded-xl border border-border/80 bg-white px-3 py-2.5 text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={isLoading}
                  whileTap={{ scale: 0.9 }}
                  className="grid h-9 w-9 place-items-center rounded-xl bg-brand-red text-white hover:bg-brand-red/90 transition-colors disabled:opacity-50"
                  aria-label="Enviar mensaje"
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.92 }}
        className={`grid h-14 w-14 place-items-center rounded-full shadow-[0_12px_40px_rgba(31,138,91,0.35)] transition-colors duration-300 ${
          !isOpen ? 'bg-brand-red text-white fab-bounce' : 'bg-gradient-to-br from-[#0B162C] via-blue-950 to-[#0A1120] text-white'
        }`}
        animate={isOpen ? {} : { y: [0, -8, 0] }}
        transition={isOpen ? {} : { repeat: Infinity, duration: 3, ease: 'easeInOut', repeatDelay: 5 }}
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir asistente IA'}
      >
        <motion.div
          key={isOpen ? 'x' : 'msg'}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </motion.div>
      </motion.button>
    </div>
  )
}
