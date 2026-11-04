import { useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Role } from '../../../types/auth'
import type { AppNotification } from '../../../types/notification'
import { NAV_BY_ROLE, ROLE_COLOR, ROLE_HOME, ROLE_LABEL } from '../../../config/navigation'
import { getSession, logout } from '../../../services/authService'
import { getInitials } from '../../../utils/format'
import { useToast } from '../../../hooks/useToast'
import AppNavbar from '../AppNavbar/AppNavbar'
import MobileTabBar from '../MobileTabBar/MobileTabBar'
import SettingsModal from '../SettingsModal/SettingsModal'
import Toast from '../../shared/Toast/Toast'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.
import './DashboardLayout.css'

const logo = new URL('../../../assets/logo.png', import.meta.url).href

interface DashboardLayoutProps {
  role: Role
  notifications: AppNotification[]
  settingsExtra?: ReactNode
  children: ReactNode
}

function DashboardLayout({ role, notifications, settingsExtra, children }: DashboardLayoutProps) {
  const navigate = useNavigate()
  const user = getSession()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { message, visible, showToast } = useToast()

  // ProtectedRoute ya garantiza que hay sesión; esto solo satisface a TypeScript
  if (!user) return null

  const homeTo = ROLE_HOME[role]
  const items = NAV_BY_ROLE[role]

  const handleSave = () => {
    showToast('Configuración guardada ✅')
    setSettingsOpen(false)
  }

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
        userRole={ROLE_LABEL[role]}
        userInitials={getInitials(user.name)}
        avatarColor={ROLE_COLOR[role]}
        notifications={notifications}
        onUserClick={() => setSettingsOpen(true)}
      />

      <div className="dashboard">{children}</div>

      <MobileTabBar items={items} homeTo={homeTo} />

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSave={handleSave}
        onLogout={handleLogout}
      >
        {settingsExtra}
      </SettingsModal>

      <Toast message={message} visible={visible} />
    </>
  )
}

export default DashboardLayout