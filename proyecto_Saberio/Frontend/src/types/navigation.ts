// Un enlace de texto (menú del header o del footer)
export interface LinkItem {
  label: string
  href: string
}

// Un botón del header: igual que un enlace, pero con estilo
export interface ActionItem extends LinkItem {
  variant?: 'primary' | 'outline'
}

export interface LinkItem {
  label: string
  href: string
}

export interface ActionItem extends LinkItem {
  variant?: 'primary' | 'outline'
}

// Opción del menú interno (AppNavbar y barra móvil)
export interface NavItem {
  label: string
  to: string      // ruta interna, por ejemplo '/monitor/solicitudes'
  icon: string    // emoji, para la barra inferior en móvil
}