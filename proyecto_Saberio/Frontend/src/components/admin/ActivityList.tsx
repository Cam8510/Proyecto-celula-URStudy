import type { ActivityItem } from '../../types/admin'

interface ActivityListProps {
  items: ActivityItem[]
}

function ActivityList({ items }: ActivityListProps) {
  return (
    <div>
      {items.map((a) => (
        <div key={a.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--linea)', fontSize: 14 }}>
          <p style={{ marginBottom: 4 }}>{a.text}</p>
          <time style={{ fontSize: 12, color: 'var(--texto-suave)' }}>{a.time}</time>
        </div>
      ))}
    </div>
  )
}

export default ActivityList