import { useState } from 'react'
import type { FormEvent } from 'react'
import type { StudentProfile } from '../../types/monitoring'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import FormField from '../FormField/FormField'
import SelectField from '../shared/FormControls/SelectField'

interface ProfileModalProps {
  profile: StudentProfile
  onClose: () => void
  onSave: (profile: StudentProfile) => void
}

function ProfileModal({ profile, onClose, onSave }: ProfileModalProps) {
  const [form, setForm] = useState(profile)   // empieza con los datos actuales

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <Modal
      open
      title="Tu perfil de estudiante"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" form="form-perfil">Guardar cambios</Button>
        </>
      }
    >
      <form id="form-perfil" onSubmit={handleSubmit}>
        <FormField id="pf-carrera" label="Carrera" value={form.career}
          onChange={(v) => setForm({ ...form, career: v })} />
        <FormField id="pf-semestre" label="Semestre" value={String(form.semester)}
          onChange={(v) => setForm({ ...form, semester: Number(v) || 1 })} />
        <FormField id="pf-materias" label="Materias de interés (separadas por coma)" value={form.subjects}
          onChange={(v) => setForm({ ...form, subjects: v })} />
        <FormField id="pf-dispo" label="Disponibilidad preferida" value={form.availability}
          onChange={(v) => setForm({ ...form, availability: v })} />
        <SelectField id="pf-modalidad" label="Modalidad preferida" value={form.modality}
          onChange={(v) => setForm({ ...form, modality: v })}
          options={[{ value: 'Presencial', label: 'Presencial' }, { value: 'Virtual', label: 'Virtual' }, { value: 'Ambas', label: 'Ambas' }]} />
      </form>
    </Modal>
  )
}

export default ProfileModal