export function getInitials(name: string): string {
  return name.split(' ').filter(Boolean).map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

export function firstName(name: string): string {
  return name.split(' ')[0]
}

// Quita tildes y mayúsculas para comparar textos al buscar
export function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
}