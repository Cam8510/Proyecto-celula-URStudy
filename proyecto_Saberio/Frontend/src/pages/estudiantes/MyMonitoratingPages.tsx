import { initialRequests, studentNotifications, upcomingSessions } from '../../data/studentMock'
import DashboardLayout from '../../components/layout/DashboardLayout/DashboardLayout'
import PageHero from '../../components/layout/PageHero/PageHero'
import Card from '../../components/shared/Card/Card'
import Avatar from '../../components/shared/Avatar/Avatar'
import ListRow from '../../components/shared/ListRow/ListRow'
import StatusBadge from '../../components/shared/StatusBadge/StatusBadge'
import EmptyState from '../../components/shared/EmptyState/EmptyState'
import { statusTone } from '../../utils/status'

function MyMonitoringsPage() {
  return (
    <DashboardLayout role="estudiante" notifications={studentNotifications}>
      <PageHero title="Mis monitorías" description="Tus próximas sesiones y las solicitudes que aún esperan respuesta." />

      <div className="main-grid">
        <Card title="Próximas sesiones">
          {upcomingSessions.length === 0 ? (
            <EmptyState title="No tienes sesiones próximas" message="Busca un monitor en Inicio y reserva tu primera tutoría." />
          ) : (
            <div className="stack" style={{ gap: 12 }}>
              {upcomingSessions.map((s) => (
                <ListRow
                  key={s.id}
                  leading={<Avatar initials={s.initials} color={s.color} size={44} />}
                  title={s.subject}
                  subtitle={`${s.person} · ${s.modality} · ${s.date}`}
                  trailing={<StatusBadge tone={statusTone(s.status)}>{s.status}</StatusBadge>}
                />
              ))}
            </div>
          )}
        </Card>

        <aside className="side">
          <Card title="Solicitudes en proceso" small>
            <div className="stack" style={{ gap: 12 }}>
              {initialRequests.map((r) => (
                <ListRow
                  key={r.id}
                  leading={<Avatar initials={r.initials} color={r.color} size={38} />}
                  title={r.subject}
                  subtitle={r.detail}
                  trailing={
                    <StatusBadge tone={r.status === 'pending' ? 'pending' : 'review'}>
                      {r.status === 'pending' ? 'Pendiente' : 'En revisión'}
                    </StatusBadge>
                  }
                />
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </DashboardLayout>
  )
}

export default MyMonitoringsPage