// Un enlace de texto (menú del header o del footer)
export interface LinkItem {
  label: string
  href: string
}

// Un botón del header: igual que un enlace, pero con estilo
export interface ActionItem extends LinkItem {
  variant?: 'primary' | 'outline'
}