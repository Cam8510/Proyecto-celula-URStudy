import { useState } from 'react'
import type { FormEvent } from 'react'
import type { MonitorProfile } from '../../types/monitoring'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import FormField from '../FormField/FormField'
import SelectField from '../shared/FormControls/SelectField'
import TextAreaField from '../shared/FormControls/TextAreaField'

interface MonitorProfileModalProps {
  profile: MonitorProfile
  onClose: () => void
  onSave: (profile: MonitorProfile) => void
}

function MonitorProfileModal({ profile, onClose, onSave }: MonitorProfileModalProps) {
  const [form, setForm] = useState(profile)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <Modal
      open
      title="Tu perfil de monitor"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" form="form-perfil-monitor">Guardar cambios</Button>
        </>
      }
    >
      <form id="form-perfil-monitor" onSubmit={handleSubmit}>
        <TextAreaField id="pm-bio" label="Biografía" value={form.bio}
          onChange={(v) => setForm({ ...form, bio: v })} />
        <FormField id="pm-exp" label="Experiencia" value={form.experience}
          onChange={(v) => setForm({ ...form, experience: v })} />
        <FormField id="pm-enfoque" label="Enfoque de enseñanza" value={form.approach}
          onChange={(v) => setForm({ ...form, approach: v })} />
        <FormField id="pm-materias" label="Materias ofrecidas (separadas por coma)" value={form.subjects}
          onChange={(v) => setForm({ ...form, subjects: v })} />
        <div className="form-row">
          <FormField id="pm-tarifa" label="Tarifa por hora" value={String(form.rate)}
            onChange={(v) => setForm({ ...form, rate: Number(v) || 0 })} />
          <SelectField id="pm-modalidad" label="Modalidades" value={form.modality}
            onChange={(v) => setForm({ ...form, modality: v })}
            options={[{ value: 'Presencial', label: 'Presencial' }, { value: 'Virtual', label: 'Virtual' }, { value: 'Ambas', label: 'Ambas' }]} />
        </div>
        <FormField id="pm-dispo" label="Disponibilidad general" value={form.availability}
          onChange={(v) => setForm({ ...form, availability: v })} />
      </form>
    </Modal>
  )
}

export default MonitorProfileModal