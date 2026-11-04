import { useState } from 'react'
import type { IncomingRequest } from '../../../types/monitoring'
import Modal from '../../Modal/Modal'
import Button from '../../Button/Button'
import Avatar from '../../shared/Avatar/Avatar'
import TextAreaField from '../../shared/FormControls/TextAreaField'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './RequestDetailModal.css'

interface RequestDetailModalProps {
  request: IncomingRequest
  onClose: () => void
  onAccept: () => void
  onReject: (reason: string) => void
}

function RequestDetailModal({ request, onClose, onAccept, onReject }: RequestDetailModalProps) {
  const [reason, setReason] = useState('')
  const pending = request.status === 'pendiente'

  const details = [
    { label: 'Fecha y hora', value: request.date },
    { label: 'Modalidad', value: request.modality },
    { label: 'Tema', value: request.topic },
    { label: 'Objetivo', value: request.goal },
    ...(request.location ? [{ label: 'Ubicación', value: request.location }] : []),
    ...(request.notes ? [{ label: 'Observaciones', value: request.notes }] : []),
  ]

  return (
    <Modal
      open
      title="Detalle de solicitud"
      onClose={onClose}
      footer={
        pending ? (
          <>
            <Button variant="secondary" onClick={() => onReject(reason.trim())}>Rechazar</Button>
            <Button onClick={onAccept}>Aceptar</Button>
          </>
        ) : (
          <Button onClick={onClose}>Cerrar</Button>
        )
      }
    >
      <div className="request-head">
        <Avatar initials={request.initials} color={request.color} size={56} />
        <div>
          <b>{request.student}</b>
          <span>{request.subject}</span>
        </div>
      </div>

      <dl className="request-details">
        {details.map((d) => (
          <div key={d.label}>
            <dt>{d.label}</dt>
            <dd>{d.value}</dd>
          </div>
        ))}
      </dl>

      {pending && (
        <TextAreaField id="motivo" label="Motivo del rechazo (opcional)" value={reason}
          onChange={setReason} placeholder="Solo se usa si rechazas la solicitud" />
      )}
    </Modal>
  )
}

export default RequestDetailModal