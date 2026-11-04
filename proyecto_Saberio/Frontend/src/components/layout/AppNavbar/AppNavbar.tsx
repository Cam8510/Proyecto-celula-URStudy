import { NavLink } from 'react-router-dom'
import type { NavItem } from '../../../types/navigation'
import type { AppNotification } from '../../../types/notification'
import NotificationBell from '../../shared/NotificationBell/NotificationBell'
import UserMenu from '../../shared/UserMenu/UserMenu'
// @ts-ignore - the stylesheet is declared by the project's Vite setup
import './AppNavbar.css'

interface AppNavbarProps {
  logo: string
  brand: string
  homeTo: string
  items: NavItem[]
  userName: string
  userEmail: string
  userRole: string
  userInitials: string
  avatarColor?: 'primary' | 'purple' | 'blue' | 'dark'
  notifications: AppNotification[]
  onSettings: () => void
  onLogout: () => void
}

function AppNavbar({
  logo,
  brand,
  homeTo,
  items,
  userName,
  userEmail,
  userRole,
  userInitials,
  avatarColor = 'primary',
  notifications,
  onSettings,
  onLogout,
}: AppNavbarProps) {
  return (
    <header className="navbar">
      <div className="navbar__wrap">
        <NavLink className="navbar__logo" to={homeTo} aria-label={brand}>
          <img src={logo} alt={brand} />
        </NavLink>

        <nav className="navbar__links" aria-label="Principal">
          {items.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === homeTo}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__user">
          <NotificationBell notifications={notifications} />
          <UserMenu
            userName={userName}
            userEmail={userEmail}
            userRole={userRole}
            userInitials={userInitials}
            avatarColor={avatarColor}
            onSettings={onSettings}
            onLogout={onLogout}
          />
        </div>
      </div>
    </header>
  )
}

export default AppNavbar