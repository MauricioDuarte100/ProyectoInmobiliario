import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

type Toast = {
  id: number
  message: string
  type: ToastType
  exiting: boolean
}

type ToastContextType = {
  addToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

const icons: Record<ToastType, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const colors: Record<ToastType, string> = {
  success: 'bg-green-trust text-white',
  error: 'bg-red-alert text-white',
  info: 'bg-night text-white',
}

let nextId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = nextId++
    setToasts((prev) => [...prev, { id, message, type, exiting: false }])
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)))
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 280)
    }, 3200)
  }, [])

  return (
    <ToastContext value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col items-end gap-2 pointer-events-none">
        {toasts.map((toast) => {
          const Icon = icons[toast.type]
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center gap-2.5 rounded-xl px-4 py-3 shadow-2xl text-sm font-semibold max-w-sm ${colors[toast.type]} ${toast.exiting ? 'toast-exit' : 'toast-enter'}`}
              role="alert"
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="leading-snug">{toast.message}</span>
              <button
                onClick={() => {
                  setToasts((prev) => prev.map((t) => (t.id === toast.id ? { ...t, exiting: true } : t)))
                  setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== toast.id)), 280)
                }}
                className="ml-1 rounded-full p-0.5 hover:bg-white/20 transition-colors"
                aria-label="Cerrar notificacion"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext>
  )
}
