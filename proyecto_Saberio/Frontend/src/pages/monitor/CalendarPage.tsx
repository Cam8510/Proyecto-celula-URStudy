import { useState } from 'react'
import type { AvailabilityMap, ScheduleSlot } from '../../types/monitoring'
import { useToast } from '../../hooks/useToast'
import { buildInitialAvailability, initialSchedule } from '../../data/monitorMock'
import MonitorLayout from '../../components/monitor/MonitorLayout/MonitorLayout'
import PageHero from '../../components/layout/PageHero/PageHero'
import Card from '../../components/shared/Card/Card'
import Toast from '../../components/shared/Toast/Toast'
import AvailabilityCalendar from '../../components/monitor/AvailabilityCalendar/AvailabilityCalendar'
import ScheduleList from '../../components/monitor/ScheduleList'

function CalendarPage() {
  const { message, visible, showToast } = useToast()
  const [availability, setAvailability] = useState<AvailabilityMap>(buildInitialAvailability)
  const [schedule, setSchedule] = useState<ScheduleSlot[]>(initialSchedule)

  // Cada clic cambia el día: sin marcar → disponible → bloqueado → sin marcar
  const handleToggleDay = (key: string) => {
    const current = availability[key]
    const next = { ...availability }
    if (!current) {
      next[key] = 'available'
      showToast('Día marcado como disponible')
    } else if (current === 'available') {
      next[key] = 'blocked'
      showToast('Día bloqueado')
    } else {
      delete next[key]
      showToast('Día liberado')
    }
    setAvailability(next)
  }

  const handleToggleSlot = (id: number) => {
    const slot = schedule.find((s) => s.id === id)
    setSchedule(schedule.map((s) => (s.id === id ? { ...s, active: !s.active } : s)))
    if (slot) showToast(`Horario del ${slot.day} ${slot.active ? 'desactivado' : 'activado'}`)
  }

  return (
    <MonitorLayout>
      <PageHero
        title="Calendario de disponibilidad"
        description="Haz clic en un día para marcarlo como disponible o bloqueado."
      />

      <div className="main-grid">
        <Card>
          <AvailabilityCalendar availability={availability} onToggleDay={handleToggleDay} />
        </Card>

        <aside className="side">
          <Card title="Horarios semanales" small>
            <ScheduleList slots={schedule} onToggle={handleToggleSlot} />
          </Card>
        </aside>
      </div>

      <Toast message={message} visible={visible} />
    </MonitorLayout>
  )
}

export default CalendarPage