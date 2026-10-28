import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

function HomePage() {
  return (
    <div className="page">
      <Header
        brand="URStudy"
        subtitle="Universidad del Rosario"
        links={[
          { label: 'Por qué URStudy', href: '#como-funciona' },
          { label: 'Ser monitor', href: '#ser-monitor' },
        ]}
        actions={[
          { label: 'Iniciar sesión', href: '/login', variant: 'outline' },
          { label: 'Crear cuenta', href: '/registro', variant: 'primary' },
        ]}
      />

      <main className="page__content">
        <h1>Un monitor del Rosario, antes de tu parcial.</h1>
      </main>

      <Footer
        text="URStudy, Universidad del Rosario"
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