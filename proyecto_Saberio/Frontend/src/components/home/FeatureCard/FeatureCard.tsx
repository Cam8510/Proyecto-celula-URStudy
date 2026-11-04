// @ts-ignore - the stylesheet is declared by the project's Vite setup
import './FeatureCard.css'

interface FeatureCardProps {
  icon: string
  title: string
  text: string
}

function FeatureCard({ icon, title, text }: FeatureCardProps) {
  return (
    <article className="feature">
      <span className="feature__icon" aria-hidden="true">{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

export default FeatureCard