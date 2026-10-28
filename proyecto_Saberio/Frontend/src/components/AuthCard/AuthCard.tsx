import type { ReactNode } from 'react'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './AuthCard.css'

interface AuthCardProps {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
  wide?: boolean
}

function AuthCard({ title, subtitle, children, footer, wide = false }: AuthCardProps) {
  return (
    <div className={`auth-card ${wide ? 'auth-card--wide' : ''}`}>
      <header className="auth-card__header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </header>
      {children}
      {footer && <div className="auth-card__footer">{footer}</div>}
    </div>
  )
}

export default AuthCard