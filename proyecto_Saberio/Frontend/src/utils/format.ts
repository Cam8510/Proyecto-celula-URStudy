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
// 2026-11-04: clave para guardar un día del calendario
export function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}