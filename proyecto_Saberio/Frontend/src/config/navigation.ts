import type { Role } from '../types/auth'
import type { NavItem } from '../types/navigation'

// Página principal de cada rol
export const ROLE_HOME: Record<Role, string> = {
  estudiante: '/estudiante',
  monitor: '/monitor',
  admin: '/admin',
}

// Opciones del menú de cada rol
export const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  estudiante: [
    { label: 'Inicio', to: '/estudiante', icon: '🏠' },
    { label: 'Mis monitorías', to: '/estudiante/mis-monitorias', icon: '📅' },
    { label: 'Historial', to: '/estudiante/historial', icon: '🕘' },
  ],
  monitor: [
    { label: 'Inicio', to: '/monitor', icon: '🏠' },
    { label: 'Publicaciones', to: '/monitor/publicaciones', icon: '📚' },
    { label: 'Solicitudes', to: '/monitor/solicitudes', icon: '🔔' },
    { label: 'Calendario', to: '/monitor/calendario', icon: '📅' },
    { label: 'Historial', to: '/monitor/historial', icon: '🕘' },
  ],
  admin: [
    { label: 'Inicio', to: '/admin', icon: '🏠' },
    { label: 'Soportes', to: '/admin/soportes', icon: '📄' },
    { label: 'Materias', to: '/admin/materias', icon: '📖' },
    { label: 'Usuarios', to: '/admin/usuarios', icon: '👥' },
    { label: 'Monitorías', to: '/admin/monitorias', icon: '📊' },
  ],
}

export const ROLE_LABEL: Record<Role, string> = {
  estudiante: 'Estudiante',
  monitor: 'Monitor',
  admin: 'Administrador',
}

export const ROLE_COLOR: Record<Role, 'primary' | 'purple' | 'dark'> = {
  estudiante: 'primary',
  monitor: 'purple',
  admin: 'dark',
}