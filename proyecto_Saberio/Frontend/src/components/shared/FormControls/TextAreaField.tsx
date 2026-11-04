// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './FormControls.css'

interface TextAreaFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
}

function TextAreaField({ id, label, value, onChange, placeholder, error }: TextAreaFieldProps) {
  return (
    <div className={`control ${error ? 'control--error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      {error && <p>{error}</p>}
    </div>
  )
}

export default TextAreaField