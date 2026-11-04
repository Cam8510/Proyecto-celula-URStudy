import type { SessionRecord } from '../../../types/monitoring'
import { statusTone } from '../../../utils/status'
import ListRow from '../ListRow/ListRow'
import StatusBadge from '../StatusBadge/StatusBadge'
import EmptyState from '../EmptyState/EmptyState'

interface SessionHistoryListProps {
  sessions: SessionRecord[]
}

function SessionHistoryList({ sessions }: SessionHistoryListProps) {
  if (sessions.length === 0) {
    return <EmptyState title="Aún no hay monitorías" message="Cuando tengas sesiones aparecerán aquí." />
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {sessions.map((s) => (
        <ListRow
          key={s.id}
          title={s.subject}
          subtitle={`${s.person} · ${s.date}`}
          trailing={
            <>
              {s.rating && <StatusBadge tone="info">⭐ {s.rating}</StatusBadge>}
              <StatusBadge tone={statusTone(s.status)}>{s.status}</StatusBadge>
            </>
          }
        />
      ))}
    </div>
  )
}

export default SessionHistoryList