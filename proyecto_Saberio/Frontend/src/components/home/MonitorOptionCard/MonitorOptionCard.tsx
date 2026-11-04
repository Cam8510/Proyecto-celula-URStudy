import type { AssistantMonitor } from '../../../types/assistant'
import Avatar from '../../shared/Avatar/Avatar'
// @ts-ignore - the stylesheet is declared by the project's Vite setup
import './MonitorOptionCard.css'

interface MonitorOptionCardProps {
  monitor: AssistantMonitor
  subjectName: string
  tags: string[]
  chosenKey: string | null          // "Nombre|Horario" del horario ya elegido
  onChoose: (slot: string) => void
}

function MonitorOptionCard({ monitor, subjectName, tags, chosenKey, onChoose }: MonitorOptionCardProps) {
  return (
    <div className="option">
      <div className="option__row">
        <Avatar initials={monitor.initials} color={monitor.color} size={42} />
        <div className="option__who">
          <b>{monitor.name}</b>
          <span>{subjectName} · {monitor.rating} de calificación</span>
        </div>
        {monitor.online && <span className="option__online">En línea</span>}
      </div>

      <div className="option__tags">
        {[...tags, monitor.modality].map((t) => <i key={t}>{t}</i>)}
      </div>

      <div className="option__slots">
        {monitor.slots.map((slot) => {
          const key = `${monitor.name}|${slot}`
          return (
            <button
              key={slot}
              type="button"
              className={chosenKey === key ? 'is-selected' : ''}
              disabled={chosenKey !== null && chosenKey !== key}
              onClick={() => onChoose(slot)}
            >
              {slot}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MonitorOptionCard