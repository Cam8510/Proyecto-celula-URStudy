import { useState } from 'react'
import type { AdminSession } from '../../types/admin'
import { statusTone } from '../../utils/status'
import { adminSessions } from '../../data/adminMock'
import AdminLayout from '../../components/admin/AdminLayout/AdminLayout'
import PageHero from '../../components/layout/PageHero/PageHero'
import Card from '../../components/shared/Card/Card'
import StatusBadge from '../../components/shared/StatusBadge/StatusBadge'
import FilterTabs from '../../components/shared/FilterTabs/FilterTabs'
import DataTable from '../../components/shared/DataTable/DataTable'
import type { Column } from '../../components/shared/DataTable/DataTable'

const STATUS_FILTERS = [
  { value: 'todas', label: 'Todas' },
  { value: 'Confirmada', label: 'Confirmadas' },
  { value: 'Realizada', label: 'Realizadas' },
  { value: 'Cancelada', label: 'Canceladas' },
]

const columns: Column<AdminSession>[] = [
  { header: 'Estudiante', render: (s) => s.student },
  { header: 'Monitor', render: (s) => s.monitor },
  { header: 'Materia', render: (s) => s.subject },
  { header: 'Fecha', render: (s) => s.date },
  { header: 'Estado', render: (s) => <StatusBadge tone={statusTone(s.status)}>{s.status}</StatusBadge> },
  { header: 'Calif.', render: (s) => (s.rating ? <StatusBadge tone="info">⭐ {s.rating}</StatusBadge> : '-') },
]

function AdminSessionsPage() {
  const [status, setStatus] = useState('todas')
  const rows = adminSessions.filter((s) => status === 'todas' || s.status === status)

  return (
    <AdminLayout>
      <PageHero title="Monitorías" description="Supervisa las monitorías de toda la plataforma." />

      <div style={{ marginTop: 48 }}>
        <Card title="Monitorías recientes" subtitle={`${rows.length} registro${rows.length !== 1 ? 's' : ''}`}>
          <FilterTabs label="Filtrar por estado" options={STATUS_FILTERS} value={status} onChange={setStatus} />
          <DataTable columns={columns} rows={rows} getKey={(s) => s.id} emptyMessage="No hay monitorías con ese estado." />
        </Card>
      </div>
    </AdminLayout>
  )
}

export default AdminSessionsPage