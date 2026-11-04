import { useEffect, useRef, useState } from 'react'
import type { AppNotification } from '../../../types/notification'
// @ts-ignore - the stylesheet is declared by the project's Vite setup
import './NotificationBell.css'

interface NotificationBellProps {
  notifications: AppNotification[]
}

const ICONS = {
  request: '📩',
  success: '✅',
  warning: '🕭',
}

function NotificationBell({ notifications }: NotificationBellProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Cierra el panel con clic afuera o con Escape.
  useEffect(() => {
    if (!open) return

    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
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
        onClick={() => setOpen((previous) => !previous)}
      >
        <svg
          className="mi-campana"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>

        {notifications.length > 0 && (
          <i>{notifications.length}</i>
        )}
      </button>

      {open && (
        <div className="bell__panel">
          <header>
            <h4>Notificaciones</h4>

            <button
              type="button"
              aria-label="Cerrar notificaciones"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </header>

          <div className="bell__list">
            {notifications.length === 0 && (
              <p className="bell__empty">
                No tienes notificaciones.
              </p>
            )}

            {notifications.map((notification) => (
              <div className="bell__item" key={notification.id}>
                <span className="bell__icon" aria-hidden="true">
                  {ICONS[notification.type]}
                </span>

                <div>
                  <b>{notification.title}</b>
                  <p>{notification.text}</p>
                </div>

                <time>{notification.time}</time>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationBell