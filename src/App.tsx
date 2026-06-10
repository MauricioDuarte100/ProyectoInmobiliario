import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import type { UserProfile, ScoreResult, MatchedProperty, HabitationalRoute, AppPage } from './types/simia'
import { calculateHabitationalScore } from './utils/scoring'
import { matchProperties } from './utils/matching'
import { recommendRoutes } from './utils/routes'
import { explainScore } from './services/aiClient'
import { demoProperties } from './data/demoData'
import Header from './components/Header'
import HomeDemo from './pages/HomeDemo'
import PrequalificationForm from './pages/PrequalificationForm'
import ResultsPage from './pages/ResultsPage'
import RealEstatePanel from './pages/RealEstatePanel'
import InvestmentPanel from './pages/InvestmentPanel'
import FloatingAiAssistant from './components/FloatingAiAssistant'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const pageRef = useRef<HTMLElement | null>(null)
  const [currentPage, setCurrentPage] = useState<AppPage>('home')
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null)
  const [aiMessage, setAiMessage] = useState<string | null>(null)
  const [matchedProperties, setMatchedProperties] = useState<MatchedProperty[]>([])
  const [recommendedRoutes, setRecommendedRoutes] = useState<HabitationalRoute[]>([])

  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page)
  }

  const handleCalculate = (userProfile: UserProfile) => {
    const score = calculateHabitationalScore(userProfile)
    const routes = recommendRoutes(userProfile, score)
    const matches = matchProperties(userProfile, score, demoProperties)
    const message = explainScore(userProfile, score)

    setProfile(userProfile)
    setScoreResult(score)
    setMatchedProperties(matches)
    setRecommendedRoutes(routes)
    setAiMessage(message)
    setCurrentPage('results')
  }

  const handleBack = () => {
    setCurrentPage('form')
  }

  useLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        page,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' },
      )

      gsap.fromTo(
        '.gsap-reveal',
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.68, ease: 'power3.out', stagger: 0.08, delay: 0.06 },
      )

      gsap.fromTo(
        '.gsap-reveal-left',
        { autoAlpha: 0, x: -40 },
        { autoAlpha: 1, x: 0, duration: 0.64, ease: 'power3.out', stagger: 0.07, delay: 0.08 },
      )

      gsap.fromTo(
        '.gsap-reveal-right',
        { autoAlpha: 0, x: 40 },
        { autoAlpha: 1, x: 0, duration: 0.64, ease: 'power3.out', stagger: 0.07, delay: 0.08 },
      )

      gsap.fromTo(
        '.gsap-reveal-scale',
        { autoAlpha: 0, scale: 0.92 },
        { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'back.out(1.2)', stagger: 0.06, delay: 0.1 },
      )

      gsap.fromTo(
        '.gsap-card',
        { autoAlpha: 0, y: 22, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.58, ease: 'power3.out', stagger: 0.06, delay: 0.14 },
      )

      gsap.utils.toArray<HTMLElement>('.gsap-scroll-reveal').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { autoAlpha: 0, y: 36 },
              { autoAlpha: 1, y: 0, duration: 0.72, ease: 'power3.out' },
            )
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.gsap-scroll-scale').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { autoAlpha: 0, scale: 0.88 },
              { autoAlpha: 1, scale: 1, duration: 0.75, ease: 'back.out(1.15)' },
            )
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.gsap-parallax').forEach((el) => {
        const speed = parseFloat(el.dataset.speed || '0.15')
        gsap.to(el, {
          y: () => -(ScrollTrigger.maxScroll(window) - window.scrollY) * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.gsap-stagger-children').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el.children,
              { autoAlpha: 0, y: 28 },
              { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.09, ease: 'power2.out' },
            )
          },
        })
      })
    }, page)

    return () => ctx.revert()
  }, [currentPage])

  const pageMotion = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const } },
    exit: { opacity: 0, y: -16, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const } },
  }

  return (
    <div className="app-shell">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main
        ref={pageRef}
        className={
          currentPage === 'home'
            ? 'relative w-full'
            : 'relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8'
        }
      >
        <AnimatePresence mode="wait">
          <motion.div key={currentPage} variants={pageMotion} initial="initial" animate="animate" exit="exit">
            {currentPage === 'home' && <HomeDemo onNavigate={handleNavigate} />}
            {currentPage === 'form' && <PrequalificationForm onCalculate={handleCalculate} />}
            {currentPage === 'results' && profile && scoreResult && aiMessage && (
              <ResultsPage
                profile={profile}
                scoreResult={scoreResult}
                aiMessage={aiMessage}
                matchedProperties={matchedProperties}
                recommendedRoutes={recommendedRoutes}
                onBack={handleBack}
                onViewRealEstate={() => setCurrentPage('realestate')}
              />
            )}
            {currentPage === 'realestate' && <RealEstatePanel onBack={() => setCurrentPage('home')} />}
            {currentPage === 'investment' && <InvestmentPanel onBack={() => setCurrentPage('home')} />}
          </motion.div>
        </AnimatePresence>
      </main>
      {currentPage !== 'home' && <FloatingAiAssistant profile={profile} scoreResult={scoreResult} />}
    </div>
  )
}
