import type { ReactNode } from 'react'
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout'
import { adminNotifications } from '../../../data/adminMock'

interface AdminLayoutProps {
  children: ReactNode
}

function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <DashboardLayout role="admin" notifications={adminNotifications}>
      {children}
    </DashboardLayout>
  )
}

export default AdminLayout