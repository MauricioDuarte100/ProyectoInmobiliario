type FamilyHomeConceptProps = {
  className?: string
  variant?: 'light' | 'dark'
}

export default function FamilyHomeConcept({ className = '', variant = 'light' }: FamilyHomeConceptProps) {
  const bgColor = variant === 'dark' ? '#0B1220' : 'none'
  const houseColor = '#1F8A5B'
  const accentColor = '#2563EB'
  const textColor = variant === 'dark' ? '#94A3B8' : '#526079'
  const lineColor = variant === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(23,32,51,0.08)'

  return (
    <svg
      viewBox="0 0 400 260"
      className={`w-full ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'dark' && <rect width="400" height="260" rx="16" fill={bgColor} />}

      <defs>
        <linearGradient id="concept-house" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1F8A5B" />
          <stop offset="100%" stopColor="#0F6B8F" />
        </linearGradient>
        <linearGradient id="concept-data" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* === CENTER: Large House === */}
      <g transform="translate(160, 70)">
        {/* House body */}
        <path
          d="M-35 55 L-35 15 L0 -15 L35 15 L35 55 Z"
          stroke="url(#concept-house)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="rgba(31,138,91,0.06)"
        />
        {/* Roof highlight */}
        <path
          d="M-25 10 L0 -8 L25 10"
          stroke={houseColor}
          strokeWidth="1.2"
          opacity="0.4"
          fill="none"
        />
        {/* Door */}
        <rect x="-6" y="25" width="12" height="30" rx="1.5" fill="rgba(31,138,91,0.12)" stroke={houseColor} strokeWidth="1.2" />
        {/* Window left */}
        <rect x="-26" y="24" width="12" height="10" rx="1" fill="rgba(37,99,235,0.08)" stroke={accentColor} strokeWidth="1" />
        {/* Window right */}
        <rect x="14" y="24" width="12" height="10" rx="1" fill="rgba(37,99,235,0.08)" stroke={accentColor} strokeWidth="1" />
        {/* AI nodes inside house */}
        <circle cx="0" cy="3" r="2" fill={accentColor} opacity="0.5" />
        <circle cx="-6" cy="-2" r="1.5" fill={houseColor} opacity="0.4" />
        <circle cx="6" cy="-2" r="1.5" fill={accentColor} opacity="0.4" />
        {/* AI connections */}
        <line x1="-6" y1="-2" x2="0" y2="3" stroke={accentColor} strokeWidth="0.6" opacity="0.3" />
        <line x1="0" y1="3" x2="6" y2="-2" stroke={accentColor} strokeWidth="0.6" opacity="0.3" />
      </g>

      {/* === LEFT: Family silhouette === */}
      <g transform="translate(55, 85)" opacity="0.7">
        {/* Parent 1 */}
        <circle cx="0" cy="8" r="8" stroke={textColor} strokeWidth="1.5" fill="none" />
        <path d="M0 16 L0 40 M0 22 L-12 32 M0 22 L12 32 M0 40 L-8 52 M0 40 L8 52" stroke={textColor} strokeWidth="1.5" strokeLinecap="round" />
        {/* Parent 2 */}
        <circle cx="28" cy="8" r="8" stroke={textColor} strokeWidth="1.5" fill="none" />
        <path d="M28 16 L28 40 M28 22 L16 32 M28 22 L40 32 M28 40 L20 52 M28 40 L36 52" stroke={textColor} strokeWidth="1.5" strokeLinecap="round" />
        {/* Child */}
        <circle cx="14" cy="46" r="6" stroke={textColor} strokeWidth="1.5" fill="none" />
        <path d="M14 52 L14 64 M14 56 L8 60 M14 56 L20 60" stroke={textColor} strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* === RIGHT: Data/AI visualization === */}
      <g transform="translate(310, 60)" opacity="0.7">
        {/* Data cards */}
        <rect x="0" y="0" width="32" height="18" rx="3" stroke={accentColor} strokeWidth="1" fill="rgba(37,99,235,0.06)" />
        <line x1="6" y1="5" x2="26" y2="5" stroke={accentColor} strokeWidth="0.8" opacity="0.4" />
        <line x1="6" y1="9" x2="22" y2="9" stroke={accentColor} strokeWidth="0.8" opacity="0.3" />
        <line x1="6" y1="13" x2="18" y2="13" stroke={accentColor} strokeWidth="0.8" opacity="0.2" />

        <rect x="0" y="24" width="32" height="18" rx="3" stroke={houseColor} strokeWidth="1" fill="rgba(31,138,91,0.06)" />
        <line x1="6" y1="29" x2="26" y2="29" stroke={houseColor} strokeWidth="0.8" opacity="0.4" />
        <line x1="6" y1="33" x2="22" y2="33" stroke={houseColor} strokeWidth="0.8" opacity="0.3" />

        {/* Upward trend mini-chart */}
        <path d="M2 50 L8 44 L14 46 L20 38 L26 40 L30 34" stroke={houseColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>

      {/* === CONNECTION LINES === */}
      {/* Family -> House */}
      <path
        d="M95 110 C120 100, 130 85, 155 90"
        stroke={lineColor}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
      />
      {/* House -> Data */}
      <path
        d="M200 75 C240 65, 270 68, 305 70"
        stroke={lineColor}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
      />
      {/* Data -> Family */}
      <path
        d="M310 108 C260 130, 180 120, 110 120"
        stroke={lineColor}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
      />

      {/* Data flow dots along lines */}
      <circle cx="125" cy="102" r="2" fill={houseColor} opacity="0.5" />
      <circle cx="145" cy="95" r="1.5" fill={accentColor} opacity="0.4" />
      <circle cx="240" cy="70" r="2" fill={houseColor} opacity="0.5" />
      <circle cx="260" cy="72" r="1.5" fill={accentColor} opacity="0.4" />

      {/* === BOTTOM: Labels === */}
      <text
        x="70"
        y="178"
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize="7"
        fontWeight="600"
        fill={textColor}
        textAnchor="middle"
        letterSpacing="2"
      >
        FAMILIA
      </text>
      <text
        x="200"
        y="178"
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize="7"
        fontWeight="600"
        fill={textColor}
        textAnchor="middle"
        letterSpacing="2"
      >
        VIVIENDA
      </text>
      <text
        x="330"
        y="178"
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize="7"
        fontWeight="600"
        fill={textColor}
        textAnchor="middle"
        letterSpacing="2"
      >
        DATOS + IA
      </text>
    </svg>
  )
}
