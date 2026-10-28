import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const logo = new URL('../assets/logo.png', import.meta.url).href

function HomePage() {
  return (
    <div className="page">
      <Header
        brand="Saberio"
        logo={logo}
        subtitle="Universidad del Rosario"
        links={[
          { label: 'Por qué Saberio', href: '#como-funciona' },
          { label: 'Ser monitor', href: '#ser-monitor' },
        ]}
        actions={[
          { label: 'Iniciar sesión', href: '/login', variant: 'outline' },
          { label: 'Crear cuenta', href: '/registro', variant: 'primary' },
        ]}
      />

      <main className="page__content">
        <h1>Un monitor que necesitas, antes de tu parcial.</h1>
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