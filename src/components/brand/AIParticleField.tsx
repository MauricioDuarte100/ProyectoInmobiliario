type AIParticleFieldProps = {
  className?: string
  variant?: 'green' | 'blue' | 'mixed'
  density?: 'low' | 'medium' | 'high'
}

export default function AIParticleField({ className = '', variant = 'mixed', density = 'medium' }: AIParticleFieldProps) {
  const primaryColor = variant === 'green' ? '#1F8A5B' : variant === 'blue' ? '#2563EB' : '#1F8A5B'
  const secondaryColor = variant === 'green' ? '#2563EB' : variant === 'blue' ? '#1F8A5B' : '#2563EB'

  const nodes = density === 'low' ? 8 : density === 'high' ? 20 : 14
  const connections = density === 'low' ? 6 : density === 'high' ? 28 : 16

  // Generate deterministic node positions based on index
  const nodePositions = Array.from({ length: nodes }, (_, i) => ({
    x: 12 + ((i * 37 + 7) % 76),
    y: 8 + ((i * 53 + 11) % 84),
    r: i % 3 === 0 ? 2.5 : i % 3 === 1 ? 3.5 : 1.8,
    isPrimary: i % 2 === 0,
    opacity: 0.3 + (i % 4) * 0.15,
  }))

  // Generate deterministic connections
  const connectionPairs: Array<[number, number]> = []
  for (let i = 0; i < connections; i++) {
    const a = (i * 3 + 1) % nodes
    const b = (i * 7 + 2) % nodes
    if (a !== b && !connectionPairs.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) {
      connectionPairs.push([a, b])
    }
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-full ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Connection lines */}
      {connectionPairs.map(([a, b], i) => {
        const from = nodePositions[a]
        const to = nodePositions[b]
        return (
          <line
            key={`conn-${i}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={i % 2 === 0 ? primaryColor : secondaryColor}
            strokeWidth="0.5"
            opacity={0.25}
          />
        )
      })}

      {/* Nodes */}
      {nodePositions.map((node, i) => (
        <circle
          key={`node-${i}`}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill={node.isPrimary ? primaryColor : secondaryColor}
          opacity={node.opacity}
        />
      ))}

      {/* Pulsing center node */}
      <circle cx={50} cy={50} r="3" fill={primaryColor} opacity="0.15" />
      <circle cx={50} cy={50} r="5" fill={primaryColor} opacity="0.08" />
      <circle cx={50} cy={50} r="8" fill={primaryColor} opacity="0.04" />
    </svg>
  )
}
