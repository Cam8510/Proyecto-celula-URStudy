import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { MonitorProfile } from '../../types/monitoring'
import { getSession } from '../../services/authService'
import { firstName } from '../../utils/format'
import { useToast } from '../../hooks/useToast'
import { initialRequests, monitorHistory, monitorProfile } from '../../data/monitorMock'
import MonitorLayout from '../../components/monitor/MonitorLayout/MonitorLayout'
import PageHero from '../../components/layout/PageHero/PageHero'
import Button from '../../components/Button/Button'
import Card from '../../components/shared/Card/Card'
import StatCard from '../../components/shared/StatCard/StatCard'
import Avatar from '../../components/shared/Avatar/Avatar'
import ListRow from '../../components/shared/ListRow/ListRow'
import StatusBadge from '../../components/shared/StatusBadge/StatusBadge'
import EmptyState from '../../components/shared/EmptyState/EmptyState'
import Toast from '../../components/shared/Toast/Toast'
import MonitorProfileCard from '../../components/monitor/MonitorProfileCard'
import MonitorProfileModal from '../../components/monitor/MonitorProfileModal'

function MonitorHomePage() {
  const user = getSession()
  const navigate = useNavigate()
  const { message, visible, showToast } = useToast()
  const [profile, setProfile] = useState<MonitorProfile>(monitorProfile)
  const [editingProfile, setEditingProfile] = useState(false)

  const pending = initialRequests.filter((r) => r.status === 'pendiente')
  const accepted = initialRequests.filter((r) => r.status === 'aceptada')
  const done = monitorHistory.filter((s) => s.status === 'Realizada').length

  return (
    <MonitorLayout>
      <PageHero
        greeting={`Hola, ${firstName(user?.name ?? '')} 👋`}
        title="Panel de Monitor"
        description="Gestiona tus publicaciones, revisa solicitudes y organiza tu disponibilidad en un solo lugar."
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
          <Button onClick={() => navigate('/monitor/publicaciones?nueva=1')}>+ Nueva publicación</Button>
          <Button variant="secondary" onClick={() => setEditingProfile(true)}>Editar perfil</Button>
          <Button variant="secondary" onClick={() => navigate('/monitor/calendario')}>Gestionar disponibilidad</Button>
        </div>
      </PageHero>

      <div className="main-grid">
        <div className="stack stack--lg">
          <div className="stats-grid">
            <StatCard value={pending.length} label="Solicitudes pendientes" />
            <StatCard value={accepted.length} label="Monitorías confirmadas" />
            <StatCard value={done} label="Monitorías realizadas" />
          </div>

          <Card title="Próximas sesiones" subtitle={`${accepted.length} confirmada${accepted.length !== 1 ? 's' : ''}`}>
            {accepted.length === 0 ? (
              <EmptyState title="Sin sesiones próximas" message="Cuando aceptes una solicitud aparecerá aquí." />
            ) : (
              <div className="stack" style={{ gap: 12 }}>
                {accepted.map((r) => (
                  <ListRow
                    key={r.id}
                    leading={<Avatar initials={r.initials} color={r.color} size={44} />}
                    title={r.student}
                    subtitle={`${r.subject} · ${r.date}`}
                    trailing={<StatusBadge tone="ok">Confirmada</StatusBadge>}
                  />
                ))}
              </div>
            )}
          </Card>

          <Card title="Solicitudes pendientes" subtitle={`${pending.length} por responder`}>
            {pending.length === 0 ? (
              <EmptyState title="Estás al día" message="No tienes solicitudes por responder." />
            ) : (
              <div className="stack" style={{ gap: 12 }}>
                {pending.map((r) => (
                  <ListRow
                    key={r.id}
                    leading={<Avatar initials={r.initials} color={r.color} size={44} />}
                    title={r.student}
                    subtitle={`${r.subject} · ${r.date}`}
                    trailing={<StatusBadge tone="pending">Pendiente</StatusBadge>}
                  />
                ))}
              </div>
            )}
            <p style={{ marginTop: 16 }}>
              <Link to="/monitor/solicitudes" style={{ color: 'var(--acento)', fontWeight: 700 }}>
                Ver y responder solicitudes →
              </Link>
            </p>
          </Card>
        </div>

        <aside className="side">
          <MonitorProfileCard profile={profile} onEdit={() => setEditingProfile(true)} />
        </aside>
      </div>

      {editingProfile && (
        <MonitorProfileModal
          profile={profile}
          onClose={() => setEditingProfile(false)}
          onSave={(p) => {
            setProfile(p)
            setEditingProfile(false)
            showToast('Perfil actualizado ✅')
          }}
        />
      )}

      <Toast message={message} visible={visible} />
    </MonitorLayout>
  )
}

export default MonitorHomePage