import type { LinkItem } from '../../types/navigation'
// @ts-ignore - the stylesheet is declared by the project's Vite setup
import './footer.css'

interface FooterProps {
  text: string
  links?: LinkItem[]
}

function Footer({ text, links = [] }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer__wrap">
        <span>{text}</span>

        {links.length > 0 && (
          <nav aria-label="Pie de página" className="footer__links">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  )
}

export default Footer