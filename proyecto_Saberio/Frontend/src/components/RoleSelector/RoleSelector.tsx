import type { SignUpRole } from '../../types/auth'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './RoleSelector.css'

interface RoleSelectorProps {
  value: SignUpRole
  onChange: (role: SignUpRole) => void
}

const OPTIONS: { value: SignUpRole; icon: string; title: string; description: string }[] = [
  { value: 'estudiante', icon: '🎓', title: 'Estudiante', description: 'Buscar monitores y reservar tutorías' },
  { value: 'monitor', icon: '👨‍🏫', title: 'Monitor', description: 'Ofrecer tutorías y ganar experiencia' },
]

function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="field">
      <label id="rol-label">¿Qué rol quieres tener?</label>
      <div className="roles" role="radiogroup" aria-labelledby="rol-label">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={value === option.value}
            className="role-option"
            onClick={() => onChange(option.value)}
          >
            <span className="role-option__icon">{option.icon}</span>
            <b>{option.title}</b>
            <span>{option.description}</span>
          </button>
        ))}
      </div>
      <p className="field__help">Puedes cambiar o tener ambos roles después en Configuración</p>
    </div>
  )
}

export default RoleSelector