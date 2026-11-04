// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './SearchFilters.css'

interface SearchFiltersProps {
  query: string
  onQueryChange: (value: string) => void
  modality: string
  onModalityChange: (value: string) => void
  minRating: string
  onMinRatingChange: (value: string) => void
  sort: string
  onSortChange: (value: string) => void
  quickSubjects: string[]
}

function SearchFilters({
  query, onQueryChange, modality, onModalityChange,
  minRating, onMinRatingChange, sort, onSortChange, quickSubjects,
}: SearchFiltersProps) {
  return (
    <div className="search">
      <form className="search__box" role="search" onSubmit={(e) => e.preventDefault()}>
        <span aria-hidden="true">🔎</span>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Ej: integrales por partes, parcial el jueves"
          aria-label="Cuéntanos qué necesitas repasar"
        />
      </form>

      <div className="search__filters">
        <label>Modalidad
          <select value={modality} onChange={(e) => onModalityChange(e.target.value)}>
            <option value="">Todas</option>
            <option value="Presencial">Presencial</option>
            <option value="Virtual">Virtual</option>
          </select>
        </label>
        <label>Calif. mínima
          <select value={minRating} onChange={(e) => onMinRatingChange(e.target.value)}>
            <option value="">Sin filtro</option>
            <option value="4.5">4.5+</option>
            <option value="4.7">4.7+</option>
            <option value="4.9">4.9+</option>
          </select>
        </label>
        <label>Ordenar por
          <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
            <option value="best">Mejor coincidencia</option>
            <option value="slots">Más horarios</option>
            <option value="rating">Calificación</option>
            <option value="exp">Experiencia</option>
          </select>
        </label>
      </div>

      <div className="search__chips">
        {quickSubjects.map((subject) => (
          <button
            key={subject}
            type="button"
            aria-pressed={query === subject}
            onClick={() => onQueryChange(query === subject ? '' : subject)}
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchFilters