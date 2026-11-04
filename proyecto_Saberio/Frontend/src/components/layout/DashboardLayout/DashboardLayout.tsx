import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Role } from '../../../types/auth'
import type { AppNotification } from '../../../types/notification'
import { NAV_BY_ROLE, ROLE_COLOR, ROLE_HOME, ROLE_LABEL, ROLE_SETTINGS } from '../../../config/navigation'
import { getSession, logout } from '../../../services/authService'
import { getInitials } from '../../../utils/format'
import AppNavbar from '../AppNavbar/AppNavbar'
import MobileTabBar from '../MobileTabBar/MobileTabBar'
// @ts-ignore - the stylesheet is declared by the project's Vite setup
import './DashboardLayout.css'

const logo = new URL('../../../assets/logo.png', import.meta.url).href

interface DashboardLayoutProps {
  role: Role
  notifications: AppNotification[]
  children: ReactNode
}

function DashboardLayout({ role, notifications, children }: DashboardLayoutProps) {
  const navigate = useNavigate()
  const user = getSession()

  // ProtectedRoute ya garantiza que hay sesión; esto solo satisface a TypeScript
  if (!user) return null

  const homeTo = ROLE_HOME[role]
  const items = NAV_BY_ROLE[role]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <AppNavbar
        logo={logo}
        brand="Saberio"
        homeTo={homeTo}
        items={items}
        userName={user.name}
        userEmail={user.email}
        userRole={ROLE_LABEL[role]}
        userInitials={getInitials(user.name)}
        avatarColor={ROLE_COLOR[role]}
        notifications={notifications}
        onSettings={() => navigate(ROLE_SETTINGS[role])}
        onLogout={handleLogout}
      />

      <div className="dashboard">{children}</div>

      <MobileTabBar items={items} homeTo={homeTo} />
    </>
  )
}

export default DashboardLayout