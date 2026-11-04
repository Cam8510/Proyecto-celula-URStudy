import type { ReactNode } from 'react'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './Button.css'

interface ButtonProps {
  children: ReactNode
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'
  loading?: boolean
  loadingText?: string
  disabled?: boolean
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
  disabled = false,
  fullWidth = false,
  form,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      form={form}
      onClick={onClick}
      disabled={loading || disabled}
      className={`button button--${variant} ${fullWidth ? 'button--full' : ''}`}
    >
      {loading && loadingText ? loadingText : children}
    </button>
  )
}

export default Button