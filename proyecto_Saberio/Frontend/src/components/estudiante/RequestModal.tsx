import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Monitor, SessionRequestForm } from '../../types/monitoring'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import FormField from '../FormField/FormField'
import SelectField from '../shared/FormControls/SelectField'
import TextAreaField from '../shared/FormControls/TextAreaField'

interface RequestModalProps {
  monitor: Monitor
  slot: string
  onClose: () => void
  onSubmit: (data: SessionRequestForm) => void
}

const EMPTY: SessionRequestForm = { modality: '', topic: '', goal: '', location: '', notes: '' }

function RequestModal({ monitor, slot, onClose, onSubmit }: RequestModalProps) {
  const [form, setForm] = useState<SessionRequestForm>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof SessionRequestForm, string>>>({})

  // Actualiza un solo campo del formulario
  const update = (field: keyof SessionRequestForm) => (value: string) => {
    setForm({ ...form, [field]: value })
    setErrors({ ...errors, [field]: undefined })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const found: typeof errors = {}
    if (!form.modality) found.modality = 'Selecciona una modalidad'
    if (!form.topic.trim()) found.topic = 'Cuéntanos qué dudas tienes'
    if (!form.goal.trim()) found.goal = 'Indica el objetivo de la sesión'
    setErrors(found)
    if (Object.keys(found).length === 0) onSubmit(form)
  }

  const modalityOptions =
    monitor.modality === 'Ambas'
      ? [{ value: 'Presencial', label: 'Presencial' }, { value: 'Virtual', label: 'Virtual' }]
      : [{ value: monitor.modality, label: monitor.modality }]

  return (
    <Modal
      open
      title="Solicitar monitoría"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" form="form-solicitud">Enviar solicitud</Button>
        </>
      }
    >
      <p style={{ marginBottom: 16, color: 'var(--texto-suave)' }}>
        <b style={{ color: 'var(--primario)' }}>{monitor.name}</b> · {monitor.subject} · {slot}
      </p>
      <form id="form-solicitud" onSubmit={handleSubmit} noValidate>
        <SelectField id="sol-modalidad" label="Modalidad" value={form.modality}
          onChange={update('modality')} options={modalityOptions} error={errors.modality} />
        <TextAreaField id="sol-tema" label="Tema o dudas específicas" value={form.topic}
          onChange={update('topic')} placeholder="Ej: integrales por partes, ejercicios de repaso..." error={errors.topic} />
        <FormField id="sol-objetivo" label="Objetivo de la sesión" value={form.goal}
          onChange={update('goal')} placeholder="Ej: preparar parcial" error={errors.goal} />
        <FormField id="sol-ubicacion" label="Ubicación sugerida (si es presencial)" value={form.location}
          onChange={update('location')} placeholder="Ej: Biblioteca" />
        <TextAreaField id="sol-obs" label="Observaciones" value={form.notes}
          onChange={update('notes')} placeholder="Cualquier detalle adicional..." />
      </form>
    </Modal>
  )
}

export default RequestModal