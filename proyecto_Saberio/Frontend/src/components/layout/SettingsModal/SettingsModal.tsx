import type { ReactNode } from 'react'
import Modal from '../../Modal/Modal'
import Button from '../../Button/Button'

interface SettingsModalProps {
  open: boolean
  onClose: () => void
  onSave: () => void
  onLogout: () => void
  children?: ReactNode   // opciones extra según el rol
}

function SettingsModal({ open, onClose, onSave, onLogout, children }: SettingsModalProps) {
  return (
    <Modal
      open={open}
      title="Configuración"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onLogout}>Cerrar sesión</Button>
          <Button onClick={onSave}>Guardar</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gap: 12 }}>
        <b>Preferencias de notificaciones</b>
        <label><input type="checkbox" defaultChecked /> Notificaciones por correo electrónico</label>
        <label><input type="checkbox" defaultChecked /> Notificaciones push en la plataforma</label>
        {children}
      </div>
    </Modal>
  )
}

export default SettingsModal