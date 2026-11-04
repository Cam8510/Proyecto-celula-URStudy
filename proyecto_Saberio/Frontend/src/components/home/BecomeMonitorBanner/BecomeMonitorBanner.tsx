import { Link } from 'react-router-dom'
// @ts-ignore - the stylesheet is declared by the project's Vite setup
import './BecomeMonitorBanner.css'

interface BecomeMonitorBannerProps {
  id?: string
  title: string
  text: string
  ctaLabel: string
  ctaTo: string
}

function BecomeMonitorBanner({ id, title, text, ctaLabel, ctaTo }: BecomeMonitorBannerProps) {
  return (
    <section className="banner" id={id}>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Link className="banner__cta" to={ctaTo}>{ctaLabel}</Link>
    </section>
  )
}

export default BecomeMonitorBanner