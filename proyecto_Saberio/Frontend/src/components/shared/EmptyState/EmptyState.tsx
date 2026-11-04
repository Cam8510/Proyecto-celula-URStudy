import Button from '../../../components/Button/Button'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './EmptyState.css'

interface EmptyStateProps {
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

function EmptyState({ title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="empty">
      <b>{title}</b>
      <p>{message}</p>
      {actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  )
}

export default EmptyState