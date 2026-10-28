import { useState } from 'react'
import type { FormEvent } from 'react'
import Modal from '../Modal/Modal'
import FormField from '../FormField/FormField'
import Button from '../Button/Button'
import Alert from '../Alert/Alert'
import { sendRecoveryLink } from '../../services/authService'

const isInstitutionalEmail = (email: string) =>
  /^[^\s@]+@urosario\.edu\.co$/i.test(email.trim())

interface ForgotPasswordModalProps {
  open: boolean
  onClose: () => void
}

function ForgotPasswordModal({ open, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setEmail('')
    setError('')
    setSent(false)
    onClose()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!isInstitutionalEmail(email)) {
      setError('Ingresa un correo institucional válido (@urosario.edu.co)')
      return
    }
    setError('')
    setLoading(true)
    await sendRecoveryLink(email.trim())
    setLoading(false)
    setSent(true)
  }

  return (
    <Modal
      open={open}
      title="Recuperar contraseña"
      onClose={handleClose}
      footer={
        sent ? (
          <Button onClick={handleClose}>Entendido</Button>
        ) : (
          <>
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button type="submit" form="form-recuperar" loading={loading} loadingText="Enviando...">
              Enviar enlace
            </Button>
          </>
        )
      }
    >
      {sent ? (
        <Alert type="success" title="✅ Enlace enviado" message={`Revisa tu correo: ${email}`} />
      ) : (
        <form id="form-recuperar" onSubmit={handleSubmit} noValidate>
          <p style={{ color: 'var(--texto-suave)', marginBottom: 16 }}>
            Ingresa tu correo institucional y te enviaremos un enlace para restablecer tu contraseña.
          </p>
          <FormField
            id="recuperar-email"
            label="Correo institucional"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="ejemplo@urosario.edu.co"
            error={error}
          />
        </form>
      )}
    </Modal>
  )
}

export default ForgotPasswordModal