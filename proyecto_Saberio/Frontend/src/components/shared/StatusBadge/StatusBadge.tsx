import type { ReactNode } from 'react'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './StatusBadge.css'

interface StatusBadgeProps {
  tone: 'ok' | 'pending' | 'review' | 'urgent' | 'info'
  children: ReactNode
}

function StatusBadge({ tone, children }: StatusBadgeProps) {
  return <span className={`badge badge--${tone}`}>{children}</span>
}

export default StatusBadge