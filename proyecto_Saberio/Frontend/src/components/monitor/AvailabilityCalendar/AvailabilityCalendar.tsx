import { useState } from 'react'
import type { AvailabilityMap } from '../../../types/monitoring'
import { toDateKey } from '../../../utils/format'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './AvailabilityCalendar.css'

interface AvailabilityCalendarProps {
  availability: AvailabilityMap
  onToggleDay: (key: string) => void
}

const WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

function AvailabilityCalendar({ availability, onToggleDay }: AvailabilityCalendarProps) {
  const [current, setCurrent] = useState(() => new Date())   // el mes que se está viendo
  const year = current.getFullYear()
  const month = current.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  const title = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(current)

  const goToMonth = (delta: number) => setCurrent(new Date(year, month + delta, 1))

  return (
    <div className="cal">
      <div className="cal__head">
        <h3>{title}</h3>
        <div>
          <button type="button" aria-label="Mes anterior" onClick={() => goToMonth(-1)}>‹</button>
          <button type="button" aria-label="Mes siguiente" onClick={() => goToMonth(1)}>›</button>
        </div>
      </div>

      <div className="cal__grid">
        {WEEKDAYS.map((d) => <span key={d} className="cal__weekday">{d}</span>)}

        {/* Espacios vacíos antes del día 1 */}
        {Array.from({ length: firstWeekday }, (_, i) => <span key={`blank-${i}`} />)}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const key = toDateKey(year, month, day)
          const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
          const state = availability[key]
          return (
            <button
              key={key}
              type="button"
              className={`cal__day ${state ? `cal__day--${state}` : ''} ${isToday ? 'cal__day--today' : ''}`}
              onClick={() => onToggleDay(key)}
            >
              {day}
            </button>
          )
        })}
      </div>

      <p className="cal__legend">
        <span className="cal__dot cal__dot--available" /> Disponible
        <span className="cal__dot cal__dot--blocked" /> Bloqueado
        <span className="cal__dot cal__dot--today" /> Hoy
      </p>
    </div>
  )
}

export default AvailabilityCalendar