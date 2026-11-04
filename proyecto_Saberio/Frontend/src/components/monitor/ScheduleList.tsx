import type { ScheduleSlot } from '../../types/monitoring'
import Switch from '../shared/Switch/Switch'
import ListRow from '../shared/ListRow/ListRow'

interface ScheduleListProps {
  slots: ScheduleSlot[]
  onToggle: (id: number) => void
}

function ScheduleList({ slots, onToggle }: ScheduleListProps) {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {slots.map((s) => (
        <ListRow
          key={s.id}
          title={s.day}
          subtitle={s.hours}
          trailing={<Switch checked={s.active} onChange={() => onToggle(s.id)} label={`Activar ${s.day}`} />}
        />
      ))}
    </div>
  )
}

export default ScheduleList