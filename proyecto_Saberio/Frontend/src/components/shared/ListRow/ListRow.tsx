import type { ReactNode } from 'react'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './ListRow.css'

interface ListRowProps {
  leading?: ReactNode
  title: string
  subtitle?: string
  trailing?: ReactNode
  onClick?: () => void
}

function ListRow({ leading, title, subtitle, trailing, onClick }: ListRowProps) {
  // Si recibe onClick, la fila se comporta como botón (también con teclado)
  const clickable = onClick
    ? {
        role: 'button',
        tabIndex: 0,
        onClick,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        },
      }
    : {}

  return (
    <div className={`row ${onClick ? 'row--click' : ''}`} {...clickable}>
      {leading}
      <div className="row__text">
        <b>{title}</b>
        {subtitle && <span>{subtitle}</span>}
      </div>
      {trailing}
    </div>
  )
}

export default ListRow