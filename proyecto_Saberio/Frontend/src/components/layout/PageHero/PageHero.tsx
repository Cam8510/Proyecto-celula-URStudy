import type { ReactNode } from 'react'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.

import './PageHero.css'

interface PageHeroProps {
  greeting?: string
  title: string
  description?: string
  children?: ReactNode   // buscador, botones de acción, etc.
}

function PageHero({ greeting, title, description, children }: PageHeroProps) {
  return (
    <section className="hero-box" aria-labelledby="hero-title">
      {greeting && <p className="hero-box__greeting">{greeting}</p>}
      <h1 id="hero-title">{title}</h1>
      {description && <p className="hero-box__desc">{description}</p>}
      {children}
    </section>
  )
}

export default PageHero