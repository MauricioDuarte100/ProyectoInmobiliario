type LogoCarouselProps = {
  logos: string[]
}

const logoNames = ['Gobernacion', 'CIM', 'SimIA', 'Desarrollos', 'Inmobiliarias', 'Constructora']

export default function LogoCarousel({ logos }: LogoCarouselProps) {
  const track = [...logos, ...logos, ...logos]

  return (
    <section className="gsap-reveal w-full border-y border-border/70 bg-white/76 py-8 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-green-trust">Ecosistema inmobiliario</p>
            <h2 className="mt-1 text-2xl font-black text-text-primary">Actores que SimIA puede conectar</h2>
          </div>
          <p className="max-w-xl text-sm font-semibold leading-6 text-ink-soft">
            Red de actores para conectar demanda habitacional, oferta inmobiliaria, obras y financiamiento.
          </p>
        </div>
      </div>

      <div className="logo-carousel-mask">
        <div className="logo-carousel-track">
          {track.map((logo, index) => (
            <div key={`${logo}-${index}`} className="logo-tile">
              <img src={logo} alt={logoNames[index % logoNames.length]} className="max-h-16 max-w-[170px] object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
