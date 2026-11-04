import StatusBadge from '../shared/StatusBadge/StatusBadge'

interface SystemStatusProps {
  items: { label: string; value: string | number; tone?: 'ok' | 'pending' | 'review' }[]
}

function SystemStatus({ items }: SystemStatusProps) {
  return (
    <div style={{ display: 'grid', gap: 12, fontSize: 14 }}>
      {items.map((item) => (
        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{item.label}</span>
          {item.tone ? <StatusBadge tone={item.tone}>{item.value}</StatusBadge> : <b>{item.value}</b>}
        </div>
      ))}
    </div>
  )
}

export default SystemStatus