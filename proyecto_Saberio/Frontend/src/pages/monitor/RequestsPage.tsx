import { useState } from 'react'
import type { IncomingRequest } from '../../types/monitoring'
import { useToast } from '../../hooks/useToast'
import { initialRequests } from '../../data/monitorMock'
import MonitorLayout from '../../components/monitor/MonitorLayout/MonitorLayout'
import PageHero from '../../components/layout/PageHero/PageHero'
import Card from '../../components/shared/Card/Card'
import Avatar from '../../components/shared/Avatar/Avatar'
import ListRow from '../../components/shared/ListRow/ListRow'
import StatusBadge from '../../components/shared/StatusBadge/StatusBadge'
import EmptyState from '../../components/shared/EmptyState/EmptyState'
import Toast from '../../components/shared/Toast/Toast'
import RequestDetailModal from '../../components/monitor/RequestDetailModal/RequestDetailModal'

function RequestsPage() {
  const { message, visible, showToast } = useToast()
  const [requests, setRequests] = useState<IncomingRequest[]>(initialRequests)
  const [selected, setSelected] = useState<IncomingRequest | null>(null)

  const pending = requests.filter((r) => r.status === 'pendiente')
  const accepted = requests.filter((r) => r.status === 'aceptada')

  const respond = (status: 'aceptada' | 'rechazada', reason = '') => {
    if (!selected) return
    setRequests(requests.map((r) => (r.id === selected.id ? { ...r, status, rejectReason: reason } : r)))
    showToast(`Solicitud de ${selected.student} ${status === 'aceptada' ? 'aceptada ✅' : 'rechazada'}`)
    setSelected(null)
  }

  const renderRow = (r: IncomingRequest, badge: 'pending' | 'ok') => (
    <ListRow
      key={r.id}
      leading={<Avatar initials={r.initials} color={r.color} size={44} />}
      title={r.student}
      subtitle={`${r.subject} · ${r.date} · ${r.modality}`}
      trailing={<StatusBadge tone={badge}>{badge === 'ok' ? 'Confirmada' : 'Pendiente'}</StatusBadge>}
      onClick={() => setSelected(r)}
    />
  )

  return (
    <MonitorLayout>
      <PageHero title="Solicitudes" description="Revisa el detalle de cada solicitud y decide si la aceptas o la rechazas." />

      <div className="stack stack--lg" style={{ marginTop: 48 }}>
        <Card title="Pendientes" subtitle={`${pending.length} por responder`}>
          {pending.length === 0 ? (
            <EmptyState title="Estás al día" message="No tienes solicitudes pendientes." />
          ) : (
            <div className="stack" style={{ gap: 12 }}>{pending.map((r) => renderRow(r, 'pending'))}</div>
          )}
        </Card>

        <Card title="Confirmadas" subtitle={`${accepted.length} sesiones`}>
          {accepted.length === 0 ? (
            <EmptyState title="Sin sesiones confirmadas" message="Las solicitudes que aceptes aparecerán aquí." />
          ) : (
            <div className="stack" style={{ gap: 12 }}>{accepted.map((r) => renderRow(r, 'ok'))}</div>
          )}
        </Card>
      </div>

      {selected && (
        <RequestDetailModal
          request={selected}
          onClose={() => setSelected(null)}
          onAccept={() => respond('aceptada')}
          onReject={(reason) => respond('rechazada', reason)}
        />
      )}

      <Toast message={message} visible={visible} />
    </MonitorLayout>
  )
}

export default RequestsPage