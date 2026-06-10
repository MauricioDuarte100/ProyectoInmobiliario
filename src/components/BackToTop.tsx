import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`back-to-top grid h-10 w-10 place-items-center rounded-full bg-night text-white shadow-xl shadow-night/20 cursor-pointer hover:bg-green-trust transition-colors ${visible ? 'visible' : ''}`}
      aria-label="Volver arriba"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  )
}
