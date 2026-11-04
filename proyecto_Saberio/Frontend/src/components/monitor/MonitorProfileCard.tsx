import type { MonitorProfile } from '../../types/monitoring'
import Card from '../shared/Card/Card'
import Button from '../Button/Button'

interface MonitorProfileCardProps {
  profile: MonitorProfile
  onEdit: () => void
}

function MonitorProfileCard({ profile, onEdit }: MonitorProfileCardProps) {
  return (
    <Card title="Tu perfil de monitor" small>
      <div style={{ display: 'grid', gap: 10, fontSize: 14 }}>
        <p><b>Biografía:</b> {profile.bio}</p>
        <p><b>Experiencia:</b> {profile.experience}</p>
        <p><b>Enfoque:</b> {profile.approach}</p>
        <p><b>Materias:</b> {profile.subjects}</p>
        <p><b>Tarifa:</b> ${profile.rate.toLocaleString('es-CO')}/hora</p>
        <p><b>Modalidad:</b> {profile.modality}</p>
        <p><b>Disponibilidad:</b> {profile.availability}</p>
      </div>
      <div style={{ marginTop: 14 }}>
        <Button onClick={onEdit}>Editar perfil</Button>
      </div>
    </Card>
  )
}

export default MonitorProfileCard