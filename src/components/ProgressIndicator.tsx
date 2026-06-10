import { Check } from 'lucide-react'

type Step = {
  label: string
  key: string
}

type Props = {
  steps: Step[]
  currentStep: string
}

export default function ProgressIndicator({ steps, currentStep }: Props) {
  const currentIdx = steps.findIndex((s) => s.key === currentStep)

  return (
    <nav aria-label="Progreso" className="mb-8">
      <ol className="flex items-center gap-2">
        {steps.map((step, i) => {
          const isCompleted = i < currentIdx
          const isCurrent = i === currentIdx
          const isLast = i === steps.length - 1

          return (
            <li key={step.key} className={`flex items-center gap-2 ${isLast ? '' : 'flex-1'}`}>
              <div className="flex items-center gap-2">
                <div
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-black transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-trust text-white'
                      : isCurrent
                        ? 'bg-green-trust text-white step-active ring-4 ring-green-trust/20'
                        : 'bg-gray-200 text-gray-400'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span
                  className={`text-xs font-semibold transition-colors hidden sm:inline ${
                    isCurrent ? 'text-green-trust' : isCompleted ? 'text-text-primary' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div className="hidden sm:block flex-1 h-px mx-1">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      i < currentIdx ? 'bg-green-trust w-full' : 'bg-gray-200 w-0'
                    }`}
                  />
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
