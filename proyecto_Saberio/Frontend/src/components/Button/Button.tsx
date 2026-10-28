import type { ReactNode } from 'react'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './Button.css'

interface ButtonProps {
  children: ReactNode
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'
  loading?: boolean
  loadingText?: string
  fullWidth?: boolean
  form?: string
  onClick?: () => void
}

function Button({
  children,
  type = 'button',
  variant = 'primary',
  loading = false,
  loadingText,
  fullWidth = false,
  form,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      form={form}
      onClick={onClick}
      disabled={loading}
      className={`button button--${variant} ${fullWidth ? 'button--full' : ''}`}
    >
      {loading && loadingText ? loadingText : children}
    </button>
  )
}

export default Button