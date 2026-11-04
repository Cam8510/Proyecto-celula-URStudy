import { Navigate, Outlet } from 'react-router-dom'
import type { Role } from '../types/auth'
import { getSession } from '../services/authService'
import { ROLE_HOME } from '../config/navigation'

interface ProtectedRouteProps {
  role: Role
}

function ProtectedRoute({ role }: ProtectedRouteProps) {
  const user = getSession()

  // Sin sesión: al login
  if (!user) return <Navigate to="/login" replace />

  // Con otro rol: lo mandamos a su propia zona
  if (user.role !== role) return <Navigate to={ROLE_HOME[user.role]} replace />

  // Todo bien: muestra las páginas hijas
  return <Outlet />
}

export default ProtectedRoute