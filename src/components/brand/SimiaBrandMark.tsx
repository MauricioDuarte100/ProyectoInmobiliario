type SimiaBrandMarkProps = {
  className?: string
  size?: number
}

export default function SimiaBrandMark({ className = '', size = 48 }: SimiaBrandMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="bmark-roof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1F8A5B" />
          <stop offset="100%" stopColor="#0F6B8F" />
        </linearGradient>
        <linearGradient id="bmark-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1F8A5B" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Background glow */}
      <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#bmark-glow)" />

      {/* House roof */}
      <path
        d="M10 26 L24 12 L38 26"
        stroke="url(#bmark-roof)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* House walls */}
      <path
        d="M14 26 L14 36 L34 36 L34 26"
        stroke="url(#bmark-roof)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Door */}
      <rect x="20" y="26" width="8" height="10" rx="1.5" fill="#1F8A5B" fillOpacity="0.2" />
      <rect x="20" y="26" width="8" height="10" rx="1.5" stroke="#1F8A5B" strokeWidth="1.2" />

      {/* AI brain dot pattern inside roof area */}
      <circle cx="22" cy="18" r="1.8" fill="#2563EB" opacity="0.6" />
      <circle cx="26" cy="16" r="1.8" fill="#2563EB" opacity="0.8" />
      <circle cx="18" cy="20" r="1.5" fill="#1F8A5B" opacity="0.5" />
      <circle cx="28" cy="20" r="1.5" fill="#1F8A5B" opacity="0.6" />
      <circle cx="24" cy="20" r="1.2" fill="#2563EB" opacity="0.9" />

      {/* AI connection lines */}
      <path
        d="M22 18 L26 16 L28 20 L24 20 L22 18"
        stroke="#2563EB"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M18 20 L22 18 L24 20"
        stroke="#1F8A5B"
        strokeWidth="0.8"
        fill="none"
        opacity="0.4"
      />

      {/* Sparkle */}
      <path
        d="M32 13 L32.8 15 L35 15.8 L32.8 16.6 L32 18.8 L31.2 16.6 L29 15.8 L31.2 15 Z"
        fill="#2563EB"
        opacity="0.7"
      />
    </svg>
  )
}
