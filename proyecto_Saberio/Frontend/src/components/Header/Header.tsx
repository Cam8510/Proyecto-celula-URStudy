import type { LinkItem, ActionItem } from '../../types/navigation'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './header.css'

interface HeaderProps {
  brand: string
  subtitle?: string
  homeHref?: string
  links?: LinkItem[]
  actions?: ActionItem[]
}

function Header({
  brand,
  subtitle,
  homeHref = '/',
  links = [],
  actions = [],
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header__wrap">
        <a className="header__logo" href={homeHref}>
          <b>{brand}</b>
          {subtitle && <small>{subtitle}</small>}
        </a>

        {links.length > 0 && (
          <nav className="header__links" aria-label="Secciones">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {actions.length > 0 && (
          <div className="header__actions">
            {actions.map((action) => (
              <a
                key={action.href}
                href={action.href}
                className={`btn btn--${action.variant ?? 'outline'}`}
              >
                {action.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header