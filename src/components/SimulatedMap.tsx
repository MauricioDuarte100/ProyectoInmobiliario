import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { ZoneDemand } from '../types/simia'
import { formatCurrency } from '../utils/formatting'

type SimulatedMapProps = {
  zoneDemands: ZoneDemand[]
}

const zoneCoordinates: Record<string, [number, number]> = {
  Garupa: [-27.4819, -55.8273],
  'Itaembe Guazu': [-27.405, -55.965],
  'Posadas Centro': [-27.3671, -55.8961],
  Candelaria: [-27.4594, -55.7446],
  Posadas: [-27.3671, -55.8961],
}

function demandColor(score: number) {
  if (score >= 84) return '#DC2626'
  if (score >= 74) return '#F59E0B'
  return '#2563EB'
}

export default function SimulatedMap({ zoneDemands }: SimulatedMapProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) return

    const map = L.map(mapElementRef.current, {
      center: [-27.413, -55.84],
      zoom: 11,
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    zoneDemands.forEach((zone) => {
      const coords = zoneCoordinates[zone.zone] ?? zoneCoordinates.Posadas
      const color = demandColor(zone.demandScore)

      L.circle(coords, {
        radius: 2600 + zone.demandScore * 28,
        color,
        fillColor: color,
        fillOpacity: 0.14,
        weight: 2,
      }).addTo(map)

      const icon = L.divIcon({
        className: '',
        html: `
          <div class="leaflet-demand-marker" style="--marker-color:${color}">
            <span>${zone.demandScore}%</span>
          </div>
        `,
        iconSize: [54, 54],
        iconAnchor: [27, 27],
      })

      L.marker(coords, { icon })
        .addTo(map)
        .bindPopup(`
          <strong>${zone.zone}</strong><br/>
          Demanda: ${zone.demandScore}%<br/>
          Capacidad de pago: ${formatCurrency(zone.averagePaymentCapacity)}<br/>
          Producto: ${zone.preferredProduct}
        `)
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [zoneDemands])

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.12)]">
      <div className="flex items-center justify-between gap-4 border-b border-border/70 bg-white/92 px-5 py-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-green-trust">Mapa georreferenciado</p>
          <h3 className="mt-1 text-lg font-black text-text-primary">Demanda habitacional en Gran Posadas</h3>
        </div>
        <span className="rounded-full bg-green-trust/10 px-3 py-1 text-xs font-black text-green-trust">
          OpenStreetMap
        </span>
      </div>
      <div ref={mapElementRef} className="h-[430px] w-full" />
      <div className="grid gap-2 border-t border-border/70 bg-white/92 p-4 sm:grid-cols-4">
        {zoneDemands.map((zone) => (
          <div key={zone.zone} className="rounded-2xl border border-border/70 bg-slate-50 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: demandColor(zone.demandScore) }} />
              <span className="text-xs font-black text-text-primary">{zone.zone}</span>
            </div>
            <p className="mt-1 text-xs font-semibold text-ink-soft">{zone.preferredProduct}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
