import { useEffect, useRef, useState } from 'react'
import Avatar from '../Avatar/Avatar'
// @ts-ignore - the stylesheet is declared by the project's Vite setup
import './UserMenu.css'

interface UserMenuProps {
  userName: string
  userEmail: string
  userRole: string
  userInitials: string
  avatarColor?: 'primary' | 'purple' | 'blue' | 'dark'
  onSettings: () => void
  onLogout: () => void
}

function UserMenu({
  userName,
  userEmail,
  userRole,
  userInitials,
  avatarColor = 'primary',
  onSettings,
  onLogout,
}: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Mientras el menú está abierto: se cierra con clic afuera o con Escape
  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  // Cierra el menú y ejecuta la acción elegida
  const choose = (action: () => void) => () => {
    setOpen(false)
    action()
  }

  return (
    <div className="user-menu" ref={ref}>
      <button
        type="button"
        className="user-menu__button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Abrir menú de mi cuenta"
        onClick={() => setOpen(!open)}
      >
        <div>
          <b>{userName}</b>
          <span>{userRole}</span>
        </div>
        <Avatar initials={userInitials} color={avatarColor} size={42} />
        <span className="user-menu__chevron" aria-hidden="true">▾</span>
      </button>

      {open && (
        <div className="user-menu__panel" role="menu">
          <div className="user-menu__who">
            <b>{userName}</b>
            <span>{userEmail}</span>
          </div>
          <button type="button" role="menuitem" onClick={choose(onSettings)}>
            ⚙️ Configuración
          </button>
          <button type="button" role="menuitem" onClick={choose(onLogout)}>
            🚪 Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu