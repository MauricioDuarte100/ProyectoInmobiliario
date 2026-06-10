import { demoFinancingPrograms } from '../data/demoData'
import type { FinancingProgram, ScoreResult, UserProfile } from '../types/simia'

function clampCompatibility(value: number) {
  return Math.max(35, Math.min(96, Math.round(value)))
}

export function recommendFinancingPrograms(
  profile: UserProfile,
  score: ScoreResult
): FinancingProgram[] {
  const totalIncome = profile.monthlyFormalIncome + profile.monthlyInformalIncome
  const informalShare = totalIncome > 0 ? profile.monthlyInformalIncome / totalIncome : 0
  const rentSignal = score.maxMonthlyPayment > 0 ? profile.currentRent / score.maxMonthlyPayment : 0

  return demoFinancingPrograms
    .map((program) => {
      let compatibility = 52 + score.score * 0.32

      if (program.id === 'camara-comercio-vivienda-pyme') {
        compatibility += informalShare >= 0.25 ? 14 : 4
        compatibility += totalIncome >= 1100000 ? 8 : 0
        compatibility += profile.savings >= 2500000 ? 7 : 0
      }

      if (program.id === 'credito-joven-primera-vivienda') {
        compatibility += score.classification === 'apto' ? 18 : 8
        compatibility += profile.householdMembers <= 2 ? 10 : 3
        compatibility += profile.monthlyDebt === 0 ? 8 : 0
        compatibility += profile.savings >= 5000000 ? 9 : 0
        compatibility += profile.monthlyFormalIncome >= 1800000 ? 10 : 0
      }

      if (program.id === 'programa-desarrollo-urbano-municipal') {
        compatibility += profile.householdMembers >= 3 ? 14 : 6
        compatibility += profile.acceptsProgressiveBuild ? 12 : 3
        compatibility += informalShare >= 0.2 ? 8 : 3
        compatibility += profile.savings >= 3000000 ? 7 : 0
        compatibility += profile.currentRent >= 300000 ? 6 : 0
      }

      if (program.id === 'mutual-misionera-primera-vivienda') {
        compatibility += score.classification === 'semiapto' ? 14 : 6
        compatibility += rentSignal >= 0.55 ? 8 : 0
        compatibility += profile.householdMembers >= 3 ? 5 : 0
      }

      if (program.id === 'constructora-aliada-llave-en-mano') {
        compatibility += profile.acceptsProgressiveBuild ? 16 : 3
        compatibility += ['Casa', 'Duplex', 'Lote'].includes(profile.desiredPropertyType) ? 8 : 0
        compatibility += score.maxMonthlyPayment >= program.estimatedMonthlyPayment * 0.85 ? 8 : 0
      }

      const paymentFactor = score.maxMonthlyPayment > 0
        ? Math.min(1.18, Math.max(0.82, score.maxMonthlyPayment / program.estimatedMonthlyPayment))
        : 0.9

      return {
        ...program,
        compatibility: clampCompatibility(compatibility),
        maxAmount: Math.round(Math.min(program.maxAmount, score.maxPropertyValue * 1.05)),
        estimatedMonthlyPayment: Math.round(program.estimatedMonthlyPayment * paymentFactor),
      }
    })
    .sort((a, b) => b.compatibility - a.compatibility)
}
