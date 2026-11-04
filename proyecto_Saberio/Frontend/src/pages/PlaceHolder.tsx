interface PlaceholderPageProps {
  title: string
}

function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <main className="page__content">
      <h1>{title}</h1>
      <p>Página en construcción.</p>
    </main>
  )
}

export default PlaceholderPage