import type { ChangeEvent } from 'react'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './FormField.css'

interface FormFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  autoComplete?: string
  help?: string
  error?: string
}

function FormField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  help,
  error,
}: FormFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)

  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
      />
      {help && !error && <p className="field__help">{help}</p>}
      {error && <p className="field__error">{error}</p>}
    </div>
  )
}

export default FormField