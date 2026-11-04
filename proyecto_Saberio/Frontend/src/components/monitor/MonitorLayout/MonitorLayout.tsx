import type { ReactNode } from 'react'
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout'
import { monitorNotifications } from '../../../data/monitorMock'

interface MonitorLayoutProps {
  children: ReactNode
}

function MonitorLayout({ children }: MonitorLayoutProps) {
  return (
    <DashboardLayout role="monitor" notifications={monitorNotifications}>
      {children}
    </DashboardLayout>
  )
}

export default MonitorLayout