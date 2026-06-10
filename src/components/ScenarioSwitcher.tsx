import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { UserProfile } from '../types/simia'

const personas = [
  {
    id: 'martinez',
    label: 'Familia Martinez',
    tag: 'Semiapto',
    color: '#F59E0B',
    icon: '👨‍👩‍👧',
    profile: {
      id: 'martinez',
      name: 'Familia Martinez',
      monthlyFormalIncome: 700000,
      monthlyInformalIncome: 150000,
      savings: 3000000,
      currentRent: 200000,
      monthlyDebt: 120000,
      householdMembers: 3,
      desiredZone: 'Posadas',
      desiredPropertyType: 'Casa',
      hasOwnLand: false,
      acceptsProgressiveBuild: true,
      acceptsRentToOwn: false,
    } as UserProfile,
  },
  {
    id: 'acosta',
    label: 'Lucia Acosta',
    tag: 'Apto',
    color: '#1F8A5B',
    icon: '👩‍💼',
    profile: {
      id: 'acosta',
      name: 'Lucia Acosta',
      monthlyFormalIncome: 1200000,
      monthlyInformalIncome: 0,
      savings: 8000000,
      currentRent: 0,
      monthlyDebt: 80000,
      householdMembers: 2,
      desiredZone: 'Garupa',
      desiredPropertyType: 'Departamento',
      hasOwnLand: false,
      acceptsProgressiveBuild: false,
      acceptsRentToOwn: true,
    } as UserProfile,
  },
  {
    id: 'benitez',
    label: 'Diego Benitez',
    tag: 'No Apto',
    color: '#DC2626',
    icon: '👷',
    profile: {
      id: 'benitez',
      name: 'Diego Benitez',
      monthlyFormalIncome: 300000,
      monthlyInformalIncome: 150000,
      savings: 500000,
      currentRent: 150000,
      monthlyDebt: 180000,
      householdMembers: 4,
      desiredZone: 'Posadas',
      desiredPropertyType: 'Casa',
      hasOwnLand: false,
      acceptsProgressiveBuild: true,
      acceptsRentToOwn: false,
    } as UserProfile,
  },
]

type ScenarioSwitcherProps = {
  currentProfile: UserProfile | null
  onSelect: (profile: UserProfile) => void
}

export default function ScenarioSwitcher({ currentProfile, onSelect }: ScenarioSwitcherProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.scenario-btn'),
        { autoAlpha: 0, y: 12, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out', stagger: 0.08 },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      {personas.map((p) => {
        const isActive = currentProfile?.name === p.profile.name
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.profile)}
            className={`scenario-btn relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 ${
              isActive
                ? 'border-green-trust/40 bg-green-trust/8 shadow-lg'
                : 'border-border/80 bg-white/80 hover:border-green-trust/30 hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{p.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-text-primary truncate">{p.label}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: p.color }}
                  />
                  <span className="text-xs font-semibold text-ink-soft">{p.tag}</span>
                </div>
              </div>
              {isActive && (
                <svg className="h-5 w-5 text-green-trust shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
