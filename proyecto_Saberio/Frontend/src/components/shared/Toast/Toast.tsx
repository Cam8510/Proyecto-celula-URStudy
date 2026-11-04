// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './Toast.css'

interface ToastProps {
  message: string
  visible: boolean
}

function Toast({ message, visible }: ToastProps) {
  return (
    <div className={`toast ${visible ? 'toast--visible' : ''}`} role="status" aria-live="polite">
      {message}
    </div>
  )
}

export default Toast