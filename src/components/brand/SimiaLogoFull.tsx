type SimiaLogoFullProps = {
  className?: string
  variant?: 'light' | 'dark'
  showTagline?: boolean
}

export default function SimiaLogoFull({ className = '', variant = 'dark', showTagline = true }: SimiaLogoFullProps) {
  const textColor = variant === 'dark' ? '#172033' : '#FFFFFF'
  const accentColor = variant === 'dark' ? '#1F8A5B' : '#6EE7B7'
  const mutedColor = variant === 'dark' ? '#526079' : '#94A3B8'

  return (
    <svg
      viewBox="0 0 220 52"
      width={220}
      height={52}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-roof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1F8A5B" />
          <stop offset="100%" stopColor="#0F6B8F" />
        </linearGradient>
      </defs>

      {/* Brand mark - compact house */}
      <g transform="translate(2, 6)">
        <path
          d="M4 18 L14 6 L24 18"
          stroke="url(#logo-roof)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 18 L7 26 L21 26 L21 18"
          stroke="url(#logo-roof)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="12" y="18" width="6" height="8" rx="1" fill={accentColor} fillOpacity="0.15" />
        {/* AI node */}
        <circle cx="16" cy="12" r="1.5" fill="#2563EB" opacity="0.8" />
        <circle cx="12" cy="14" r="1" fill={accentColor} opacity="0.5" />
        <circle cx="19" cy="14" r="1" fill="#2563EB" opacity="0.6" />
      </g>

      {/* Wordmark "SimIA" */}
      <text
        x="40"
        y="24"
        fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
        fontSize="22"
        fontWeight="800"
        fill={textColor}
        letterSpacing="-0.5"
      >
        Sim
      </text>
      <text
        x="84"
        y="24"
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize="22"
        fontWeight="800"
        fill="#2563EB"
        letterSpacing="-0.5"
      >
        IA
      </text>

      {/* Tagline */}
      {showTagline && (
        <text
          x="40"
          y="40"
          fontFamily="'Inter', system-ui, sans-serif"
          fontSize="7.5"
          fontWeight="600"
          fill={mutedColor}
          letterSpacing="4.5"
        >
          MISIONES HOUSING AI
        </text>
      )}
    </svg>
  )
}
