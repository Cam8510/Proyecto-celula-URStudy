import { NavLink } from 'react-router-dom'
import type { NavItem } from '../../../types/navigation'
// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.

import './MobileTabBar.css'

interface MobileTabBarProps {
  items: NavItem[]
  homeTo: string
}

function MobileTabBar({ items, homeTo }: MobileTabBarProps) {
  return (
    <nav className="tabbar" aria-label="Navegación móvil">
      {/* En el celular caben máximo 4 opciones */}
      {items.slice(0, 4).map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === homeTo}>
          <span>{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default MobileTabBar