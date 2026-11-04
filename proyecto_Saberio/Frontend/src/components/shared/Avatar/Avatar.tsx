// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.

import './Avatar.css'

interface AvatarProps {
  initials: string
  color?: 'primary' | 'purple' | 'blue' | 'dark'
  size?: number
}

function Avatar({ initials, color = 'primary', size = 44 }: AvatarProps) {
  return (
    <span
      className={`avatar avatar--${color}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

export default Avatar