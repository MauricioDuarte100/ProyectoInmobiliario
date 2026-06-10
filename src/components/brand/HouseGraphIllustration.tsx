type HouseGraphIllustrationProps = {
  className?: string
  variant?: 'default' | 'compact'
}

export default function HouseGraphIllustration({ className = '', variant = 'default' }: HouseGraphIllustrationProps) {
  const w = variant === 'compact' ? 320 : 440
  const h = variant === 'compact' ? 120 : 160

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={`w-full ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="graph-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1F8A5B" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#1F8A5B" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="graph-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1F8A5B" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[24, 48, 72, 96, 120, 144].map((y) => (
        <line
          key={`grid-${y}`}
          x1={20}
          y1={y}
          x2={w - 20}
          y2={y}
          stroke={variant === 'compact' ? '#E5E7EB' : '#E5E7EB'}
          strokeWidth="0.5"
          strokeDasharray="4 6"
          opacity="0.5"
        />
      ))}

      {/* Area under curve */}
      <path
        d={`M20 ${h - 20} L20 ${h * 0.55} C60 ${h * 0.35}, 100 ${h * 0.65}, 140 ${h * 0.45} S220 ${h * 0.25}, 260 ${h * 0.35} S${w - 60} ${h * 0.2}, ${w - 20} ${h * 0.25} L${w - 20} ${h - 20} Z`}
        fill="url(#graph-fill)"
      />

      {/* Trend line */}
      <path
        d={`M20 ${h * 0.55} C60 ${h * 0.35}, 100 ${h * 0.65}, 140 ${h * 0.45} S220 ${h * 0.25}, 260 ${h * 0.35} S${w - 60} ${h * 0.2}, ${w - 20} ${h * 0.25}`}
        stroke="url(#graph-line)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Data points */}
      <circle cx={20} cy={h * 0.55} r="4" fill="#1F8A5B" stroke="white" strokeWidth="2" />
      <circle cx={140} cy={h * 0.45} r="4" fill="#1F8A5B" stroke="white" strokeWidth="2" />
      <circle cx={260} cy={h * 0.35} r="4" fill="#2563EB" stroke="white" strokeWidth="2" />
      <circle cx={w - 20} cy={h * 0.25} r="4" fill="#2563EB" stroke="white" strokeWidth="2" />

      {/* House icons on key points */}
      <g transform={`translate(${80 + (variant === 'compact' ? 40 : 80)}, ${h * 0.38 - 18})`} opacity="0.7">
        <path d="M0 14 L7 4 L14 14" stroke="#1F8A5B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M2.5 14 L2.5 20 L11.5 20 L11.5 14" stroke="#1F8A5B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* AI sparkle dots near trend */}
      <circle cx={w * 0.55} cy={h * 0.36} r="2" fill="#2563EB" opacity="0.6" />
      <circle cx={w * 0.58} cy={h * 0.32} r="1.5" fill="#1F8A5B" opacity="0.5" />
      <circle cx={w * 0.62} cy={h * 0.38} r="2.5" fill="#2563EB" opacity="0.4" />
      <circle cx={w * 0.7} cy={h * 0.3} r="1.5" fill="#1F8A5B" opacity="0.6" />
      <circle cx={w * 0.75} cy={h * 0.34} r="2" fill="#2563EB" opacity="0.5" />

      {/* Projection dashed line */}
      {variant !== 'compact' && (
        <path
          d={`M${w - 20} ${h * 0.25} L${w + 10} ${h * 0.18}`}
          stroke="#2563EB"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          strokeLinecap="round"
          opacity="0.5"
        />
      )}

      {/* X axis */}
      <line x1={20} y1={h - 20} x2={w - 20} y2={h - 20} stroke="#D1D5DB" strokeWidth="0.8" />

      {/* Y axis */}
      <line x1={20} y1={18} x2={20} y2={h - 20} stroke="#D1D5DB" strokeWidth="0.8" />
    </svg>
  )
}
