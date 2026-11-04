import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Modality, Publication, PublicationForm } from '../../types/monitoring'
import { SUBJECT_OPTIONS } from '../../data/monitorMock'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import FormField from '../FormField/FormField'
import SelectField from '../shared/FormControls/SelectField'
import TextAreaField from '../shared/FormControls/TextAreaField'

interface PublicationModalProps {
  publication?: Publication     // si viene, estamos editando
  onClose: () => void
  onSave: (data: PublicationForm) => void
}

const MODALITIES = ['Presencial', 'Virtual', 'Ambas'].map((m) => ({ value: m, label: m }))
const DURATIONS = [60, 90, 120].map((d) => ({ value: String(d), label: `${d} minutos` }))

function PublicationModal({ publication, onClose, onSave }: PublicationModalProps) {
  const [form, setForm] = useState({
    subject: publication?.subject ?? '',
    description: publication?.description ?? '',
    modality: publication?.modality ?? '',
    rate: publication ? String(publication.rate) : '',
    duration: String(publication?.duration ?? 60),
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const update = (field: keyof typeof form) => (value: string) => {
    setForm({ ...form, [field]: value })
    setErrors({ ...errors, [field]: '' })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const found: Record<string, string> = {}
    if (!form.subject) found.subject = 'Selecciona una materia'
    if (!form.description.trim()) found.description = 'Escribe una descripción'
    if (!form.modality) found.modality = 'Selecciona una modalidad'
    if (form.rate && Number(form.rate) < 0) found.rate = 'La tarifa no puede ser negativa'
    setErrors(found)
    if (Object.keys(found).length > 0) return

    onSave({
      subject: form.subject,
      description: form.description.trim(),
      modality: form.modality as Modality,
      rate: Number(form.rate) || 0,
      duration: Number(form.duration),
    })
  }

  return (
    <Modal
      open
      title={publication ? 'Editar publicación' : 'Nueva publicación de monitoría'}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" form="form-publicacion">{publication ? 'Guardar cambios' : 'Publicar'}</Button>
        </>
      }
    >
      <form id="form-publicacion" onSubmit={handleSubmit} noValidate>
        <SelectField id="pub-materia" label="Materia *" value={form.subject}
          onChange={update('subject')} options={SUBJECT_OPTIONS} error={errors.subject} />
        <TextAreaField id="pub-desc" label="Descripción *" value={form.description}
          onChange={update('description')} placeholder="Ej: apoyo en derivadas y preparación de parciales..." error={errors.description} />
        <div className="form-row">
          <SelectField id="pub-modalidad" label="Modalidad *" value={form.modality}
            onChange={update('modality')} options={MODALITIES} error={errors.modality} />
          <SelectField id="pub-duracion" label="Duración de la sesión" value={form.duration}
            onChange={update('duration')} options={DURATIONS} />
        </div>
        <FormField id="pub-tarifa" label="Tarifa por hora (opcional)" value={form.rate}
          onChange={update('rate')} placeholder="Ej: 25000" error={errors.rate} />
      </form>
    </Modal>
  )
}

export default PublicationModal