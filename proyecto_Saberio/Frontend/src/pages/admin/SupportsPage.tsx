import { useState } from 'react'
import type { SupportDoc } from '../../types/admin'
import { getInitials } from '../../utils/format'
import { useToast } from '../../hooks/useToast'
import { initialSupports } from '../../data/adminMock'
import AdminLayout from '../../components/admin/AdminLayout/AdminLayout'
import PageHero from '../../components/layout/PageHero/PageHero'
import Card from '../../components/shared/Card/Card'
import Avatar from '../../components/shared/Avatar/Avatar'
import ListRow from '../../components/shared/ListRow/ListRow'
import StatusBadge from '../../components/shared/StatusBadge/StatusBadge'
import EmptyState from '../../components/shared/EmptyState/EmptyState'
import Toast from '../../components/shared/Toast/Toast'
import SupportDetailModal from '../../components/admin/SupportDetailModal'

function SupportsPage() {
  const { message, visible, showToast } = useToast()
  const [supports, setSupports] = useState<SupportDoc[]>(initialSupports)
  const [selected, setSelected] = useState<SupportDoc | null>(null)

  const pending = supports.filter((s) => s.status === 'pendiente')
  const reviewed = supports.filter((s) => s.status !== 'pendiente')

  const resolve = (status: 'aprobado' | 'rechazado', reason = '') => {
    if (!selected) return
    setSupports(supports.map((s) => (s.id === selected.id ? { ...s, status, rejectReason: reason } : s)))
    showToast(`Soporte de ${selected.monitor} ${status === 'aprobado' ? 'aprobado ✅' : 'rechazado'}`)
    setSelected(null)
  }

  const renderRow = (s: SupportDoc) => (
    <ListRow
      key={s.id}
      leading={<Avatar initials={getInitials(s.monitor)} color="purple" size={44} />}
      title={s.monitor}
      subtitle={`${s.kind} · ${s.subject} · ${s.date}`}
      trailing={
        <StatusBadge tone={s.status === 'pendiente' ? 'pending' : s.status === 'aprobado' ? 'ok' : 'urgent'}>
          {s.status === 'pendiente' ? 'Pendiente' : s.status === 'aprobado' ? 'Aprobado' : 'Rechazado'}
        </StatusBadge>
      }
      onClick={() => setSelected(s)}
    />
  )

  return (
    <AdminLayout>
      <PageHero title="Soportes académicos" description="Verifica los documentos que cargan los monitores para acreditarse." />

      <div className="stack stack--lg" style={{ marginTop: 48 }}>
        <Card title="Pendientes" subtitle={`${pending.length} por verificar`}>
          {pending.length === 0 ? (
            <EmptyState title="No hay soportes pendientes 🎉" message="Todos los documentos fueron revisados." />
          ) : (
            <div className="stack" style={{ gap: 12 }}>{pending.map(renderRow)}</div>
          )}
        </Card>

        <Card title="Revisados" subtitle={`${reviewed.length} soportes`}>
          {reviewed.length === 0 ? (
            <EmptyState title="Aún no hay revisados" message="Los soportes que apruebes o rechaces aparecerán aquí." />
          ) : (
            <div className="stack" style={{ gap: 12 }}>{reviewed.map(renderRow)}</div>
          )}
        </Card>
      </div>

      {selected && (
        <SupportDetailModal
          support={selected}
          onClose={() => setSelected(null)}
          onApprove={() => resolve('aprobado')}
          onReject={(reason) => resolve('rechazado', reason)}
        />
      )}

      <Toast message={message} visible={visible} />
    </AdminLayout>
  )
}

export default SupportsPage