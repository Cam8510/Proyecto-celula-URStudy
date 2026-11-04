import type { Publication } from '../../../types/monitoring'
import StatusBadge from '../../shared/StatusBadge/StatusBadge'
import Button from '../../Button/Button'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './PublicationCard.css'

interface PublicationCardProps {
  publication: Publication
  onEdit: () => void
  onDelete: () => void
}

function PublicationCard({ publication, onEdit, onDelete }: PublicationCardProps) {
  return (
    <article className="pub">
      <div className="pub__letter" aria-hidden="true">{publication.subject.charAt(0)}</div>

      <div>
        <h3>{publication.subject}</h3>
        <p>{publication.description}</p>
        <div className="pub__tags">
          <span>{publication.modality}</span>
          <span>${publication.rate.toLocaleString('es-CO')}/hora</span>
          <span>{publication.duration} min</span>
          <StatusBadge tone={publication.active ? 'ok' : 'urgent'}>
            {publication.active ? 'Activa' : 'Inactiva'}
          </StatusBadge>
        </div>
      </div>

      <div className="pub__actions">
        <Button variant="secondary" onClick={onEdit}>Editar</Button>
        <Button variant="secondary" onClick={onDelete}>Eliminar</Button>
      </div>
    </article>
  )
}

export default PublicationCard