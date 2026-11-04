import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import AssistantChat from '../components/home/AssistantChat/AssistantChat'
import FeatureCard from '../components/home/FeatureCard/FeatureCard'
import BecomeMonitorBanner from '../components/home/BecomeMonitorBanner/BecomeMonitorBanner'
// @ts-ignore - the stylesheet is declared by the project's Vite setup
import './HomePage.css'

const logo = new URL('../assets/logo.png', import.meta.url).href

const HIGHLIGHTS = [
  { icon: '🛡️', text: 'Monitores verificados' },
  { icon: '⭐', text: 'Calificaciones reales' },
  { icon: '🕒', text: 'Virtual o presencial, hoy mismo' },
]

const FEATURES = [
  { icon: '🎓', title: 'Tu misma universidad', text: 'Monitores que cursaron tu materia con tus profesores.' },
  { icon: '⭐', title: 'Elige con confianza', text: 'Ves nota, temas y horarios antes de reservar.' },
  { icon: '🔒', title: 'Datos protegidos', text: 'Tu información personal no es visible para otros usuarios.' },
]

function HomePage() {
  return (
    <div className="page">
      <Header
        brand="Saberio"
        logo={logo}
        links={[
          { label: 'Por qué Saberio', href: '#como-funciona' },
          { label: 'Ser monitor', href: '#ser-monitor' },
        ]}
        actions={[
          { label: 'Iniciar sesión', href: '/login', variant: 'outline' },
          { label: 'Crear cuenta', href: '/registro', variant: 'primary' },
        ]}
      />

      <main className="home">
        <section className="home-hero" aria-labelledby="home-title">
          <div>
            <h1 id="home-title">
              Un monitor que necesitas, antes de tu parcial. <span>Dile qué tema necesitas.</span>
            </h1>
            <p className="home-hero__sub">
              Nuestro asistente busca monitores de tu universidad y te muestra horarios disponibles.
            </p>
            <ul className="home-hero__list">
              {HIGHLIGHTS.map((h) => (
                <li key={h.text}>
                  <span aria-hidden="true">{h.icon}</span>
                  {h.text}
                </li>
              ))}
            </ul>
            <p className="home-hero__note">Entra con tu correo institucional del Rosario.</p>
          </div>

          <AssistantChat />
        </section>

        <section className="home-features" id="como-funciona" aria-label="Por qué Saberio">
          {FEATURES.map((f) => <FeatureCard key={f.title} {...f} />)}
        </section>

        <BecomeMonitorBanner
          id="ser-monitor"
          title="¿Dominas una materia? Conviértete en monitor"
          text="Define tus horarios y construye tu historial dentro de la universidad."
          ctaLabel="Postularme como monitor"
          ctaTo="/registro?rol=monitor"
        />
      </main>

      <Footer
        text="Saberio, Universidad del Rosario"
        links={[
          { label: 'Términos', href: '#' },
          { label: 'Privacidad', href: '#' },
          { label: 'Contacto', href: '#' },
        ]}
      />
    </div>
  )
}

export default HomePage