import { NavLink } from 'react-router-dom'
import type { NavItem } from '../../../types/navigation'
import type { AppNotification } from '../../../types/notification'
import Avatar from '../../shared/Avatar/Avatar'
import NotificationBell from '../../shared/NotificationBell/NotificationBell'
import './AppNavbar.css'

interface AppNavbarProps {
  logo: string
  brand: string
  homeTo: string
  items: NavItem[]
  userName: string
  userRole: string
  userInitials: string
  avatarColor?: 'primary' | 'purple' | 'blue' | 'dark'
  notifications: AppNotification[]
  onUserClick: () => void
}

function AppNavbar({
  logo,
  brand,
  homeTo,
  items,
  userName,
  userRole,
  userInitials,
  avatarColor = 'primary',
  notifications,
  onUserClick,
}: AppNavbarProps) {
  return (
    <header className="navbar">
      <div className="navbar__wrap">
        <NavLink className="navbar__logo" to={homeTo} aria-label={brand}>
          <img src={logo} alt={brand} />
        </NavLink>

        <nav className="navbar__links" aria-label="Principal">
          {items.map((item) => (
            // "end" evita que Inicio quede activo en todas las subrutas
            <NavLink key={item.to} to={item.to} end={item.to === homeTo}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__user">
          <NotificationBell notifications={notifications} />
          <button type="button" className="navbar__me" onClick={onUserClick} aria-label="Abrir configuración">
            <div>
              <b>{userName}</b>
              <span>{userRole}</span>
            </div>
            <Avatar initials={userInitials} color={avatarColor} size={42} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default AppNavbar