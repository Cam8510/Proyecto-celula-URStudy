import { useEffect, useRef, useState } from 'react'
import type { AppNotification } from '../../../types/notification'
import './NotificationBell.css'

interface NotificationBellProps {
  notifications: AppNotification[]
}

const ICONS = { request: '📩', success: '✅', warning: '🔔' }

function NotificationBell({ notifications }: NotificationBellProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Mientras el panel está abierto: cerrar con clic afuera o con Escape
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

  return (
    <div className="bell" ref={ref}>
      <button
        type="button"
        className="bell__button"
        aria-label="Notificaciones"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        🔔
        {notifications.length > 0 && <i>{notifications.length}</i>}
      </button>

      {open && (
        <div className="bell__panel">
          <header>
            <h4>Notificaciones</h4>
            <button type="button" aria-label="Cerrar" onClick={() => setOpen(false)}>✕</button>
          </header>
          <div className="bell__list">
            {notifications.length === 0 && <p className="bell__empty">No tienes notificaciones.</p>}
            {notifications.map((n) => (
              <div className="bell__item" key={n.id}>
                <span className="bell__icon">{ICONS[n.type]}</span>
                <div>
                  <b>{n.title}</b>
                  <p>{n.text}</p>
                </div>
                <time>{n.time}</time>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationBell