import type { ReactNode } from 'react'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './Alert.css'

interface AlertProps {
  type: 'error' | 'success'
  title: string
  message: string
}

function Alert({ type, title, message }: AlertProps) {
  return (
    <div className={`alert alert--${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <b>{title}</b>
      <p>{message}</p>
    </div>
  )
}

export default Alert