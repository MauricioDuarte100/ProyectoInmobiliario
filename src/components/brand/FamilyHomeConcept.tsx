type FamilyHomeConceptProps = {
  className?: string
  variant?: 'light' | 'dark'
}

export default function FamilyHomeConcept({ className = '', variant = 'light' }: FamilyHomeConceptProps) {
  const isDark = variant === 'dark'
  const textColor = isDark ? '#E2E8F0' : '#172033'
  const subtextColor = isDark ? '#94A3B8' : '#6B7280'
  const cardBg = isDark ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.75)'
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(23, 32, 51, 0.08)'

  return (
    <svg
      viewBox="0 0 400 230"
      className={`w-full ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Shadow for floating cards */}
        <filter id="premium-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#0F172A" floodOpacity={isDark ? "0.4" : "0.06"} />
        </filter>

        {/* Gradients */}
        <linearGradient id="house-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14B869" />
          <stop offset="50%" stopColor="#1F8A5B" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>

        <linearGradient id="family-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
        </linearGradient>

        <linearGradient id="data-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.02" />
        </linearGradient>

        <linearGradient id="engine-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1F8A5B" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {/* === CONNECTION LINES === */}
      {/* Family to Vivienda Hub (Left to Center) */}
      <path
        d="M100 115 C130 115, 120 100, 150 100"
        stroke={isDark ? 'rgba(31, 138, 91, 0.3)' : 'rgba(31, 138, 91, 0.15)'}
        strokeWidth="2.5"
        strokeDasharray="5 5"
      />
      {/* Data to Vivienda Hub (Right to Center) */}
      <path
        d="M300 115 C270 115, 280 100, 250 100"
        stroke={isDark ? 'rgba(37, 99, 235, 0.3)' : 'rgba(37, 99, 235, 0.15)'}
        strokeWidth="2.5"
        strokeDasharray="5 5"
      />
      {/* Return loop line at the bottom */}
      <path
        d="M200 155 C200 190, 80 190, 65 145"
        stroke={isDark ? 'rgba(148, 163, 184, 0.15)' : 'rgba(23, 32, 51, 0.05)'}
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />

      {/* Animated dots along flow */}
      <circle cx="123" cy="111" r="3" fill="#1F8A5B" className="animate-pulse" />
      <circle cx="277" cy="111" r="3" fill="#2563EB" className="animate-pulse" />

      {/* === LEFT CARD: Familia === */}
      <g filter="url(#premium-shadow)" transform="translate(15, 45)">
        {/* Card base */}
        <rect width="85" height="110" rx="16" fill={cardBg} stroke={cardBorder} strokeWidth="1" />
        <rect width="85" height="110" rx="16" fill="url(#family-grad)" pointerEvents="none" />
        {/* Icon container */}
        <circle cx="42.5" cy="35" r="18" fill="rgba(16, 185, 129, 0.1)" />
        {/* Custom SVG Family Icon */}
        <g transform="translate(30, 23)" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Father */}
          <circle cx="8" cy="5" r="3" />
          <path d="M3 13 C3 10.5 5 9 8 9 C11 9 13 10.5 13 13" />
          {/* Child */}
          <circle cx="17" cy="7" r="2" />
          <path d="M14 13 C14 11.5 15 10.5 17 10.5 C19 10.5 20 11.5 20 13" />
        </g>
        {/* Labels */}
        <text x="42.5" y="76" fontFamily="system-ui" fontSize="11" fontWeight="800" fill={textColor} textAnchor="middle">Familia</text>
        <text x="42.5" y="90" fontFamily="system-ui" fontSize="8" fontWeight="600" fill={subtextColor} textAnchor="middle">Ingresos y Ahorro</text>
      </g>

      {/* === RIGHT CARD: Datos + IA === */}
      <g filter="url(#premium-shadow)" transform="translate(300, 45)">
        {/* Card base */}
        <rect width="85" height="110" rx="16" fill={cardBg} stroke={cardBorder} strokeWidth="1" />
        <rect width="85" height="110" rx="16" fill="url(#data-grad)" pointerEvents="none" />
        {/* Icon container */}
        <circle cx="42.5" cy="35" r="18" fill="rgba(37, 99, 235, 0.1)" />
        {/* Custom SVG Data/Brain Icon */}
        <g transform="translate(30, 23)" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="3" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="8" y="13" width="8" height="5" rx="1" />
          <line x1="6.5" y1="8" x2="6.5" y2="10" />
          <line x1="17.5" y1="8" x2="17.5" y2="10" />
          <path d="M6.5 10 C6.5 11.5 8 13 12 13 C16 13 17.5 11.5 17.5 10" />
        </g>
        {/* Labels */}
        <text x="42.5" y="76" fontFamily="system-ui" fontSize="11" fontWeight="800" fill={textColor} textAnchor="middle">Datos + IA</text>
        <text x="42.5" y="90" fontFamily="system-ui" fontSize="8" fontWeight="600" fill={subtextColor} textAnchor="middle">Precios y Zonas</text>
      </g>

      {/* === CENTER CARD: Vivienda (AI Core Engine) === */}
      <g filter="url(#premium-shadow)" transform="translate(140, 25)">
        {/* Glowing aura */}
        <rect x="-2" y="-2" width="124" height="134" rx="22" fill="none" stroke="rgba(31, 138, 91, 0.15)" strokeWidth="4" pointerEvents="none" />
        {/* Card base */}
        <rect width="120" height="130" rx="20" fill={cardBg} stroke={isDark ? "rgba(31, 138, 91, 0.3)" : "rgba(31, 138, 91, 0.18)"} strokeWidth="1.5" />
        <rect width="120" height="130" rx="20" fill="url(#engine-grad)" pointerEvents="none" />

        {/* Icon container */}
        <circle cx="60" cy="42" r="24" fill="rgba(31, 138, 91, 0.08)" />

        {/* Custom SVG House Gradient Icon */}
        <g transform="translate(43, 25)">
          {/* Main House Path */}
          <path
            d="M5 15 L17 4 L29 15 L29 31 C29 32.1 28.1 33 27 33 L7 33 C5.9 33 5 32.1 5 31 Z"
            fill="url(#house-grad)"
            opacity="0.85"
          />
          {/* Roof line */}
          <path
            d="M3 16 L17 3 L31 16"
            stroke="#1F8A5B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Glowing door */}
          <rect x="13" y="22" width="8" height="11" rx="1" fill="#FFFFFF" opacity="0.9" />
          {/* Small window */}
          <circle cx="17" cy="12" r="2.5" fill="#FFFFFF" opacity="0.95" />
        </g>

        {/* Dynamic Nodes linked to the house */}
        <circle cx="20" cy="40" r="3.5" fill="#1F8A5B" />
        <circle cx="100" cy="40" r="3.5" fill="#2563EB" />
        <line x1="23.5" y1="40" x2="38" y2="42" stroke="#1F8A5B" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
        <line x1="96.5" y1="40" x2="82" y2="42" stroke="#2563EB" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />

        {/* Labels */}
        <text x="60" y="90" fontFamily="system-ui" fontSize="12" fontWeight="900" fill={textColor} textAnchor="middle" letterSpacing="0.5">Motor SimIA</text>
        <text x="60" y="104" fontFamily="system-ui" fontSize="8" fontWeight="800" fill="#1F8A5B" textAnchor="middle" letterSpacing="2">IA ACTIVA</text>
        <text x="60" y="116" fontFamily="system-ui" fontSize="8" fontWeight="600" fill={subtextColor} textAnchor="middle">Rutas de Acceso</text>
      </g>
    </svg>
  )
}
