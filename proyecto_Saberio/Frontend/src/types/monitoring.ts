export type Modality = 'Presencial' | 'Virtual' | 'Ambas'
export type AvatarColor = 'primary' | 'purple' | 'blue' | 'dark'
export type SessionStatus = 'Confirmada' | 'Realizada' | 'Cancelada' | 'Pendiente'

export interface Monitor {
  id: number
  name: string
  initials: string
  color: AvatarColor
  career: string
  subject: string
  rating: number
  helped: number
  response: string
  online: boolean
  modality: Modality
  tagline: string
  topics: string[]
  keywords: string[]
  slots: string[]
}

// Una sesión del historial (sirve para estudiante y monitor)
export interface SessionRecord {
  id: number
  subject: string
  person: string      // el monitor (si lo ve el estudiante) o el estudiante (si lo ve el monitor)
  date: string
  status: SessionStatus
  rating: number | null
}

export interface UpcomingSession {
  id: number
  person: string
  initials: string
  color: AvatarColor
  subject: string
  modality: Modality
  date: string
  status: SessionStatus
}

export interface StudentProfile {
  career: string
  semester: number
  subjects: string
  availability: string
  modality: string
}

export interface PendingRequest {
  id: number
  initials: string
  color: AvatarColor
  subject: string
  detail: string
  status: 'pending' | 'review'
}

export interface SessionRequestForm {
  modality: string
  topic: string
  goal: string
  location: string
  notes: string
}