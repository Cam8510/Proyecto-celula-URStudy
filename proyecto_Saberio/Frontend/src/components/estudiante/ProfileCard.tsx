import type { StudentProfile } from '../../types/monitoring'
import Card from '../shared/Card/Card'
import Button from '../Button/Button'

interface ProfileCardProps {
  profile: StudentProfile
  onEdit: () => void
}

function ProfileCard({ profile, onEdit }: ProfileCardProps) {
  return (
    <Card title="Tu perfil" small>
      <div style={{ display: 'grid', gap: 10, fontSize: 14 }}>
        <p><b>Carrera:</b> {profile.career}</p>
        <p><b>Semestre:</b> {profile.semester}</p>
        <p><b>Materias de interés:</b> {profile.subjects}</p>
        <p><b>Disponibilidad:</b> {profile.availability}</p>
        <p><b>Modalidad:</b> {profile.modality}</p>
      </div>
      <div style={{ marginTop: 14 }}>
        <Button onClick={onEdit}>Editar perfil</Button>
      </div>
    </Card>
  )
}

export default ProfileCard