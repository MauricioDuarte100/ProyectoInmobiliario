const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount)
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`
}

export function formatArea(m2: number): string {
  return `${m2} m\u00B2`
}

export function getScoreColor(score: number): string {
  if (score >= 70) return '#16a34a'
  if (score >= 40) return '#ea580c'
  return '#dc2626'
}

export function getClassificationLabel(classification: string): string {
  switch (classification) {
    case 'apto':
      return 'Apto potencial'
    case 'semiapto':
      return 'Semiapto'
    case 'no_apto':
      return 'No apto actual'
    default:
      return classification
  }
}

export function getClassificationColor(classification: string): string {
  switch (classification) {
    case 'apto':
      return '#16a34a'
    case 'semiapto':
      return '#ea580c'
    case 'no_apto':
      return '#dc2626'
    default:
      return '#6b7280'
  }
}
