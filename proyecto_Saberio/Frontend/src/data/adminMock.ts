import type { ActivityItem, AdminSession, PlatformUser, Subject, SupportDoc } from '../types/admin'
import type { AppNotification } from '../types/notification'

export const initialSupports: SupportDoc[] = [
  { id: 1, monitor: 'Carlos Ruiz', email: 'carlos.ruiz@urosario.edu.co', subject: 'Cálculo Diferencial', kind: 'Historial académico', date: '25 Sep 2026', status: 'pendiente' },
  { id: 2, monitor: 'Ana María López', email: 'ana.lopez@urosario.edu.co', subject: 'Álgebra Lineal', kind: 'Certificación', date: '24 Sep 2026', status: 'pendiente' },
  { id: 3, monitor: 'Diego Herrera', email: 'diego.herrera@urosario.edu.co', subject: 'Programación I', kind: 'Historial académico', date: '23 Sep 2026', status: 'pendiente' },
]

export const FACULTIES = ['Ingeniería', 'Economía', 'Matemáticas', 'Derecho'].map((f) => ({ value: f, label: f }))

export const initialSubjects: Subject[] = [
  { id: 1, code: 'CALC-101', name: 'Cálculo Diferencial', faculty: 'Matemáticas', credits: 4, active: true },
  { id: 2, code: 'ALGB-102', name: 'Álgebra Lineal', faculty: 'Matemáticas', credits: 3, active: true },
  { id: 3, code: 'PROG-101', name: 'Programación I', faculty: 'Ingeniería', credits: 4, active: true },
  { id: 4, code: 'MICR-201', name: 'Microeconomía', faculty: 'Economía', credits: 3, active: false },
]

export const platformUsers: PlatformUser[] = [
  { id: 1, name: 'Sofía Martínez', email: 'sofia.martinez@urosario.edu.co', role: 'Estudiante', career: 'Ingeniería de Sistemas', date: '26 Sep 2026' },
  { id: 2, name: 'Juan Pérez', email: 'juan.perez@urosario.edu.co', role: 'Estudiante', career: 'Economía', date: '25 Sep 2026' },
  { id: 3, name: 'Laura Gutiérrez', email: 'laura.gutierrez@urosario.edu.co', role: 'Monitor', career: 'Economía', date: '24 Sep 2026' },
  { id: 4, name: 'Andrés Morales', email: 'andres.morales@urosario.edu.co', role: 'Monitor', career: 'Ingeniería de Sistemas', date: '23 Sep 2026' },
  { id: 5, name: 'Carlos Ruiz', email: 'carlos.ruiz@urosario.edu.co', role: 'Monitor', career: 'Ingeniería de Sistemas', date: '20 Sep 2026' },
]

export const adminSessions: AdminSession[] = [
  { id: 101, student: 'Sofía Martínez', monitor: 'Carlos Ruiz', subject: 'Cálculo Diferencial', date: '26 Sep 2026, 10:00 AM', status: 'Confirmada', rating: null },
  { id: 102, student: 'Juan Pérez', monitor: 'Ana María López', subject: 'Álgebra Lineal', date: '25 Sep 2026, 2:00 PM', status: 'Realizada', rating: 5 },
  { id: 103, student: 'María Gómez', monitor: 'Diego Herrera', subject: 'Programación I', date: '24 Sep 2026, 4:00 PM', status: 'Realizada', rating: 4 },
  { id: 104, student: 'Pedro Sánchez', monitor: 'Laura Gutiérrez', subject: 'Microeconomía', date: '23 Sep 2026, 11:00 AM', status: 'Cancelada', rating: null },
]

export const recentActivity: ActivityItem[] = [
  { id: 1, text: 'Carlos Ruiz cargó un nuevo soporte académico', time: 'Hace 2 horas' },
  { id: 2, text: 'Nueva materia creada: Ecuaciones Diferenciales', time: 'Hace 5 horas' },
  { id: 3, text: '5 monitorías realizadas hoy', time: 'Hace 8 horas' },
  { id: 4, text: 'Respaldo automático completado', time: 'Hoy 2:00 AM' },
]

export const platformStats = { users: 1248, monitors: 86, sessionsMonth: 328 }

export const adminNotifications: AppNotification[] = [
  { id: 1, type: 'request', title: 'Nuevo soporte pendiente', text: 'Carlos Ruiz cargó historial académico para verificación', time: 'Hace 2 horas' },
  { id: 2, type: 'warning', title: 'Materia desactivada', text: 'Microeconomía fue desactivada del catálogo', time: 'Hace 5 horas' },
  { id: 3, type: 'success', title: 'Reporte generado', text: 'Reporte de monitorías de septiembre disponible', time: 'Hace 1 día' },
]