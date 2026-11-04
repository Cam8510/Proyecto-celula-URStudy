import type { RegisterData, User } from '../types/auth'
import { ROLE_HOME } from '../config/navigation'
const TEST_USERS = [
  { name: 'Sofía Martínez', email: 'sofia.martinez@urosario.edu.co', password: '12345678', role: 'estudiante' },
  { name: 'Carlos Ruiz', email: 'carlos.ruiz@urosario.edu.co', password: '12345678', role: 'monitor' },
  { name: 'Administrador', email: 'admin@urosario.edu.co', password: 'admin123', role: 'admin' },
] as const

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function login(email: string, password: string): Promise<User> {
  await wait(1000)
  const found = TEST_USERS.find((u) => u.email === email && u.password === password)
  if (!found) throw new Error('Correo o contraseña incorrectos.')
  return { name: found.name, email: found.email, role: found.role }
}

export async function register(data: RegisterData): Promise<void> {
  await wait(1200)
  if (TEST_USERS.some((u) => u.email === data.email)) {
    throw new Error('Ya existe una cuenta con ese correo.')
  }
}

export async function sendRecoveryLink(email: string): Promise<void> {
  await wait(800)
  console.log('Enlace enviado a', email)
}

export function saveSession(user: User, remember: boolean) {
  const storage = remember ? localStorage : sessionStorage
  storage.setItem('usuario', JSON.stringify(user))
}

export function redirectByRole(role: User['role']) {
  window.location.href = ROLE_HOME[role]
}

// Lee la sesión simulada (la guardó saveSession)
export function getSession(): User | null {
  const raw = localStorage.getItem('usuario') ?? sessionStorage.getItem('usuario')
  return raw ? (JSON.parse(raw) as User) : null
}

export function logout() {
  localStorage.removeItem('usuario')
  sessionStorage.removeItem('usuario')
}