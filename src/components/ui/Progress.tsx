type ProgressProps = {
  value: number
  max?: number
  label?: string
  size?: 'sm' | 'md'
  color?: 'green' | 'blue' | 'amber' | 'red' | 'slate'
}

const colorMap = {
  green: 'bg-emerald-500',
  blue: 'bg-blue-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  slate: 'bg-slate-500',
}

export default function Progress({ value, max = 100, label, size = 'sm', color = 'green' }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const height = size === 'sm' ? 'h-2' : 'h-3'
  return (
    <div className="w-full">
      {label && (
        <div className="mb-1.5 flex justify-between text-xs font-semibold text-slate-600">
          <span>{label}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full bg-slate-100 ${height}`}>
        <div
          className={`${height} rounded-full ${colorMap[color]} transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
