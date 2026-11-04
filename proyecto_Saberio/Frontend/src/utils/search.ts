import type { Monitor } from '../types/monitoring'
import { normalize } from './format'

export interface MonitorFilters {
  query: string
  modality: string
  minRating: string
  sort: string
}

export function filterMonitors(monitors: Monitor[], filters: MonitorFilters): Monitor[] {
  const words = normalize(filters.query).split(/\s+/).filter((w) => w.length >= 3)
  const minRating = parseFloat(filters.minRating) || 0

  // Puntaje = cuántas palabras buscadas aparecen en los datos del monitor
  const scored = monitors.map((m) => {
    const fields = [m.name, m.subject, m.career, ...m.topics, ...m.keywords].map(normalize)
    const score = words.filter((w) => {
      const root = w.length > 6 ? w.slice(0, 6) : w   // "derivadas" encuentra "derivada"
      return fields.some((f) => f.includes(root))
    }).length
    return { monitor: m, score }
  })

  const result = scored
    .filter(({ score }) => words.length === 0 || score > 0)
    .filter(({ monitor }) => !filters.modality || monitor.modality === filters.modality || monitor.modality === 'Ambas')
    .filter(({ monitor }) => monitor.rating >= minRating)

  result.sort((a, b) => {
    if (filters.sort === 'rating') return b.monitor.rating - a.monitor.rating
    if (filters.sort === 'exp') return b.monitor.helped - a.monitor.helped
    if (filters.sort === 'slots') return b.monitor.slots.length - a.monitor.slots.length
    return b.score - a.score || Number(b.monitor.online) - Number(a.monitor.online)
  })

  return result.map((r) => r.monitor)
}