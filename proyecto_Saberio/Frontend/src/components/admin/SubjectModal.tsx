import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Subject, SubjectForm } from '../../types/admin'
import { FACULTIES } from '../../data/adminMock'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import FormField from '../FormField/FormField'
import SelectField from '../shared/FormControls/SelectField'

interface SubjectModalProps {
  subject?: Subject                          // si viene, estamos editando
  isCodeTaken: (code: string) => boolean     // la página decide si el código ya existe
  onClose: () => void
  onSave: (data: SubjectForm) => void
}

function SubjectModal({ subject, isCodeTaken, onClose, onSave }: SubjectModalProps) {
  const [form, setForm] = useState({
    name: subject?.name ?? '',
    code: subject?.code ?? '',
    faculty: subject?.faculty ?? '',
    credits: subject ? String(subject.credits) : '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const update = (field: keyof typeof form) => (value: string) => {
    setForm({ ...form, [field]: value })
    setErrors({ ...errors, [field]: '' })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const found: Record<string, string> = {}
    const credits = Number(form.credits)
    if (!form.name.trim()) found.name = 'Escribe el nombre de la materia'
    if (!form.code.trim()) found.code = 'Escribe el código'
    else if (isCodeTaken(form.code.trim())) found.code = 'Ya existe una materia con ese código'
    if (!form.faculty) found.faculty = 'Selecciona una facultad'
    if (!Number.isInteger(credits) || credits < 1 || credits > 6) found.credits = 'Los créditos van de 1 a 6'
    setErrors(found)
    if (Object.keys(found).length > 0) return

    onSave({ name: form.name.trim(), code: form.code.trim(), faculty: form.faculty, credits })
  }

  return (
    <Modal
      open
      title={subject ? 'Editar materia' : 'Nueva materia'}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" form="form-materia">{subject ? 'Guardar cambios' : 'Crear materia'}</Button>
        </>
      }
    >
      <form id="form-materia" onSubmit={handleSubmit} noValidate>
        <FormField id="mat-nombre" label="Nombre de la materia *" value={form.name}
          onChange={update('name')} placeholder="Ej: Cálculo Diferencial" error={errors.name} />
        <div className="form-row">
          <FormField id="mat-codigo" label="Código *" value={form.code}
            onChange={update('code')} placeholder="Ej: CALC-101" error={errors.code} />
          <SelectField id="mat-facultad" label="Facultad *" value={form.faculty}
            onChange={update('faculty')} options={FACULTIES} error={errors.faculty} />
        </div>
        <FormField id="mat-creditos" label="Créditos *" value={form.credits}
          onChange={update('credits')} placeholder="1 a 6" error={errors.credits} />
      </form>
    </Modal>
  )
}

export default SubjectModal