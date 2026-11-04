import type {
  AvailabilityMap, IncomingRequest, MonitorProfile, Publication, ScheduleSlot, SessionRecord,
} from '../types/monitoring'
import type { AppNotification } from '../types/notification'
import { toDateKey } from '../utils/format'

export const SUBJECT_OPTIONS = [
  'Cálculo Diferencial', 'Álgebra Lineal', 'Programación I', 'Microeconomía',
].map((s) => ({ value: s, label: s }))

export const initialPublications: Publication[] = [
  {
    id: 1, subject: 'Cálculo Diferencial', modality: 'Virtual', rate: 30000, duration: 90, active: true,
    description: 'Apoyo en derivadas, integrales y preparación de parciales. Clases prácticas con ejercicios.',
  },
  {
    id: 2, subject: 'Álgebra Lineal', modality: 'Ambas', rate: 28000, duration: 60, active: true,
    description: 'Matrices, determinantes, vectores y espacios vectoriales. Enfoque en comprensión conceptual.',
  },
]

export const initialRequests: IncomingRequest[] = [
  {
    id: 101, student: 'Sofía Martínez', initials: 'SM', color: 'primary', subject: 'Cálculo Diferencial',
    date: 'Mié 17 Sep, 10:00 AM', modality: 'Virtual', topic: 'Integrales por partes y aplicaciones',
    goal: 'Preparar parcial del viernes', location: '', notes: 'Tengo dudas con el método de sustitución', status: 'pendiente',
  },
  {
    id: 102, student: 'Juan Pérez', initials: 'JP', color: 'blue', subject: 'Álgebra Lineal',
    date: 'Jue 18 Sep, 2:00 PM', modality: 'Presencial', topic: 'Determinantes y valores propios',
    goal: 'Resolver taller 4', location: 'Biblioteca, piso 3', notes: '', status: 'pendiente',
  },
  {
    id: 103, student: 'Ana Gómez', initials: 'AG', color: 'purple', subject: 'Cálculo Diferencial',
    date: 'Vie 19 Sep, 4:00 PM', modality: 'Virtual', topic: 'Derivadas de funciones trigonométricas',
    goal: 'Repasar antes del quiz', location: '', notes: 'Prefiero por Meet', status: 'aceptada',
  },
]

export const monitorHistory: SessionRecord[] = [
  { id: 201, subject: 'Cálculo Diferencial', person: 'María López', date: '10 Sep 2026, 4:00 PM', status: 'Realizada', rating: 5 },
  { id: 202, subject: 'Programación I', person: 'Pedro Sánchez', date: '03 Sep 2026, 5:00 PM', status: 'Cancelada', rating: null },
  { id: 203, subject: 'Álgebra Lineal', person: 'Laura Díaz', date: '28 Ago 2026, 1:00 PM', status: 'Realizada', rating: 4 },
]

export const monitorProfile: MonitorProfile = {
  bio: 'Monitor de Cálculo con 2 años de experiencia. Enseñanza práctica y paciente.',
  experience: 'Monitor de Cálculo 2024-2025, tutor en academia',
  approach: 'Práctico, con ejercicios paso a paso',
  subjects: 'Cálculo, Álgebra, Programación',
  rate: 30000,
  modality: 'Virtual',
  availability: 'Mañanas y noches, Lun-Mié-Vie',
}

export const initialSchedule: ScheduleSlot[] = [
  { id: 1, day: 'Lunes', hours: '8:00 AM - 10:00 AM', active: true },
  { id: 2, day: 'Miércoles', hours: '2:00 PM - 4:00 PM', active: true },
  { id: 3, day: 'Viernes', hours: '10:00 AM - 12:00 PM', active: false },
]

export const monitorNotifications: AppNotification[] = [
  { id: 1, type: 'request', title: 'Nueva solicitud', text: 'Sofía Martínez solicitó monitoría de Cálculo Diferencial', time: 'Hace 10 min' },
  { id: 2, type: 'warning', title: 'Recordatorio', text: 'Monitoría con Juan Pérez mañana, 2:00 PM', time: 'Hace 1 hora' },
]

// Calendario de ejemplo: algunos días disponibles y otros bloqueados del mes actual
export function buildInitialAvailability(): AvailabilityMap {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const days = new Date(year, month + 1, 0).getDate()
  const result: AvailabilityMap = {}
  for (let d = 1; d <= days; d++) {
    if (d % 7 === 0) result[toDateKey(year, month, d)] = 'blocked'
    else if (d % 3 === 0) result[toDateKey(year, month, d)] = 'available'
  }
  return result
}