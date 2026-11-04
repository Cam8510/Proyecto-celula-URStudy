// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './FormControls.css'

interface SelectFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  error?: string
}

function SelectField({ id, label, value, onChange, options, placeholder = 'Selecciona', error }: SelectFieldProps) {
  return (
    <div className={`control ${error ? 'control--error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <p>{error}</p>}
    </div>
  )
}

export default SelectField