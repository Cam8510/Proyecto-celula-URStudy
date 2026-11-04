import type { Monitor } from '../../../types/monitoring'
import Avatar from '../../shared/Avatar/Avatar'
import Button from '../../Button/Button'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './monitorCard.css'

interface MonitorCardProps {
  monitor: Monitor
  selectedSlot: string | null
  onSelectSlot: (slot: string) => void
  onReserve: () => void
}

function MonitorCard({ monitor, selectedSlot, onSelectSlot, onReserve }: MonitorCardProps) {
  return (
    <article className="monitor">
      <Avatar initials={monitor.initials} color={monitor.color} size={60} />

      <div>
        <div className="monitor__head">
          <div>
            <h3>{monitor.name}</h3>
            <p>{monitor.career} · monitor de {monitor.subject}</p>
          </div>
          <span className="monitor__rating" aria-label={`Calificación ${monitor.rating}`}>⭐ {monitor.rating.toFixed(1)}</span>
        </div>

        <p className="monitor__tagline">{monitor.tagline}</p>

        <div className="monitor__topics">
          {monitor.topics.map((t) => <span key={t}>{t}</span>)}
        </div>

        <p className="monitor__trust">
          {monitor.online && <b className="monitor__online">● En línea</b>}
          <span>Ayudó a <b>{monitor.helped}</b> estudiantes</span>
          <span>Responde en <b>{monitor.response}</b></span>
          <span>{monitor.modality}</span>
        </p>
      </div>

      <div className="monitor__agenda">
        <span>Reserva un horario</span>
        {monitor.slots.map((slot) => (
          <button
            key={slot}
            type="button"
            aria-pressed={selectedSlot === slot}
            onClick={() => onSelectSlot(slot)}
          >
            {slot}
          </button>
        ))}
        <div className="monitor__reserve">
          <Button disabled={!selectedSlot} onClick={onReserve}>Reservar tutoría</Button>
        </div>
      </div>
    </article>
  )
}

export default MonitorCard