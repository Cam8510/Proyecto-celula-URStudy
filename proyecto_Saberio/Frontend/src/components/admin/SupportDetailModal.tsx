import { useState } from 'react'
import type { SupportDoc } from '../../types/admin'
import { getInitials } from '../../utils/format'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import Avatar from '../shared/Avatar/Avatar'
import DetailList from '../shared/DetailList/DetailList'
import TextAreaField from '../shared/FormControls/TextAreaField'

interface SupportDetailModalProps {
  support: SupportDoc
  onClose: () => void
  onApprove: () => void
  onReject: (reason: string) => void
}

function SupportDetailModal({ support, onClose, onApprove, onReject }: SupportDetailModalProps) {
  const [reason, setReason] = useState('')
  const pending = support.status === 'pendiente'

  return (
    <Modal
      open
      title="Verificar soporte académico"
      onClose={onClose}
      footer={
        pending ? (
          <>
            <Button variant="secondary" onClick={() => onReject(reason.trim())}>Rechazar</Button>
            <Button onClick={onApprove}>Aprobar</Button>
          </>
        ) : (
          <Button onClick={onClose}>Cerrar</Button>
        )
      }
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <Avatar initials={getInitials(support.monitor)} color="purple" size={56} />
        <div>
          <b style={{ display: 'block', fontSize: 18 }}>{support.monitor}</b>
          <span style={{ color: 'var(--texto-suave)' }}>{support.email}</span>
        </div>
      </div>

      <DetailList
        items={[
          { label: 'Tipo de soporte', value: support.kind },
          { label: 'Materia', value: support.subject },
          { label: 'Fecha de carga', value: support.date },
          { label: 'Estado', value: support.status },
        ]}
      />

      <div style={{ background: 'var(--lavanda)', border: '1px solid var(--linea)', borderRadius: 16, padding: 16, textAlign: 'center', marginBottom: 18 }}>
        <p style={{ fontSize: 14, color: 'var(--texto-suave)', marginBottom: 8 }}>Documento adjunto</p>
        <b style={{ color: 'var(--acento)' }}>historico_academico.pdf</b>
        <p style={{ fontSize: 12, color: 'var(--texto-suave)', marginTop: 6 }}>2.4 MB · Cargado el {support.date}</p>
      </div>

      {pending && (
        <TextAreaField id="motivo-soporte" label="Motivo del rechazo (opcional)" value={reason}
          onChange={setReason} placeholder="Solo se usa si rechazas el soporte" />
      )}
    </Modal>
  )
}

export default SupportDetailModal