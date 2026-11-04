import type { AvatarColor, Modality } from './monitoring'

export interface AssistantMonitor {
  name: string
  initials: string
  color: AvatarColor
  rating: string
  modality: Modality
  online: boolean
  slots: string[]
}

export interface AssistantTopic {
  label: string
  keywords: string[]
}

export interface AssistantSubject {
  name: string
  keywords: string[]
  topics: AssistantTopic[]
  monitors: AssistantMonitor[]
}

// Lo que responde el "cerebro" del asistente
export type AssistantResult =
  | { kind: 'match'; subject: AssistantSubject; topic: string | null }
  | { kind: 'unknown' }

// Cualquier cerebro (simulado o IA real) debe cumplir esto
export interface AssistantService {
  ask: (text: string) => Promise<AssistantResult>
}

export interface Reservation {
  monitor: string
  subject: string
  topic: string
  slot: string
  modality: Modality
}