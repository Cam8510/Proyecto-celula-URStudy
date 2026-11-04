import type { SessionStatus } from './monitoring'

export type SupportStatus = 'pendiente' | 'aprobado' | 'rechazado'

export interface SupportDoc {
  id: number
  monitor: string
  email: string
  subject: string
  kind: string
  date: string
  status: SupportStatus
  rejectReason?: string
}

export interface Subject {
  id: number
  code: string
  name: string
  faculty: string
  credits: number
  active: boolean
}

export type SubjectForm = Omit<Subject, 'id' | 'active'>

export interface PlatformUser {
  id: number
  name: string
  email: string
  role: 'Estudiante' | 'Monitor'
  career: string
  date: string
}

export interface AdminSession {
  id: number
  student: string
  monitor: string
  subject: string
  date: string
  status: SessionStatus
  rating: number | null
}

export interface ActivityItem {
  id: number
  text: string
  time: string
}