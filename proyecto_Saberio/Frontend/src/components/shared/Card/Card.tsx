import type { ReactNode } from 'react'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.

import './Card.css'

interface CardProps {
  title?: string
  subtitle?: string
  children: ReactNode
  small?: boolean
}

function Card({ title, subtitle, children, small = false }: CardProps) {
  return (
    <section className="card">
      {title && (
        <div className="card__head">
          <h2 className={small ? 'card__title card__title--small' : 'card__title'}>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  )
}

export default Card