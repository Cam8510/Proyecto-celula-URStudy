import type { SessionStatus } from '../types/monitoring'

export function statusTone(status: SessionStatus): 'ok' | 'pending' | 'urgent' {
  if (status === 'Realizada' || status === 'Confirmada') return 'ok'
  if (status === 'Cancelada') return 'urgent'
  return 'pending'
}