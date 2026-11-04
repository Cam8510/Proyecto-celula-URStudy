import { Link, useNavigate } from 'react-router-dom'
import { getInitials } from '../../utils/format'
import { useToast } from '../../hooks/useToast'
import { initialSubjects, initialSupports, platformStats, platformUsers, recentActivity } from '../../data/adminMock'
import AdminLayout from '../../components/admin/AdminLayout/AdminLayout'
import PageHero from '../../components/layout/PageHero/PageHero'
import Button from '../../components/Button/Button'
import Card from '../../components/shared/Card/Card'
import StatCard from '../../components/shared/StatCard/StatCard'
import Avatar from '../../components/shared/Avatar/Avatar'
import ListRow from '../../components/shared/ListRow/ListRow'
import StatusBadge from '../../components/shared/StatusBadge/StatusBadge'
import EmptyState from '../../components/shared/EmptyState/EmptyState'
import Toast from '../../components/shared/Toast/Toast'
import ActivityList from '../../components/admin/ActivityList'
import SystemStatus from '../../components/admin/SystemStatus'

function AdminHomePage() {
  const navigate = useNavigate()
  const { message, visible, showToast } = useToast()
  const pendingSupports = initialSupports.filter((s) => s.status === 'pendiente')
  const activeSubjects = initialSubjects.filter((s) => s.active).length

  return (
    <AdminLayout>
      <PageHero
        greeting="Hola, Admin 👋"
        title="Panel de Administración"
        description="Gestiona materias, verifica soportes académicos de monitores y supervisa usuarios y monitorías de la plataforma."
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
          <Button onClick={() => navigate('/admin/materias?nueva=1')}>+ Nueva materia</Button>
          <Button variant="secondary" onClick={() => showToast('Próximamente: reportes')}>Ver reportes</Button>
        </div>
      </PageHero>

      <div className="main-grid">
        <div className="stack stack--lg">
          <div className="stats-grid stats-grid--4">
            <StatCard value={platformStats.users.toLocaleString('es-CO')} label="Usuarios totales" />
            <StatCard value={platformStats.monitors} label="Monitores activos" />
            <StatCard value={activeSubjects} label="Materias activas" />
            <StatCard value={platformStats.sessionsMonth} label="Monitorías este mes" />
          </div>

          <Card title="Soportes académicos pendientes" subtitle={`${pendingSupports.length} por verificar`}>
            {pendingSupports.length === 0 ? (
              <EmptyState title="Todo verificado 🎉" message="No hay soportes pendientes." />
            ) : (
              <div className="stack" style={{ gap: 12 }}>
                {pendingSupports.map((s) => (
                  <ListRow
                    key={s.id}
                    leading={<Avatar initials={getInitials(s.monitor)} color="purple" size={44} />}
                    title={s.monitor}
                    subtitle={`${s.kind} · ${s.subject}`}
                    trailing={<StatusBadge tone="pending">Pendiente</StatusBadge>}
                  />
                ))}
              </div>
            )}
            <p style={{ marginTop: 16 }}>
              <Link to="/admin/soportes" style={{ color: 'var(--acento)', fontWeight: 700 }}>Verificar soportes →</Link>
            </p>
          </Card>

          <Card title="Usuarios recientes">
            <div className="stack" style={{ gap: 12 }}>
              {platformUsers.slice(0, 4).map((u) => (
                <ListRow
                  key={u.id}
                  leading={<Avatar initials={getInitials(u.name)} color={u.role === 'Monitor' ? 'purple' : 'primary'} size={44} />}
                  title={u.name}
                  subtitle={`${u.role} · ${u.career}`}
                  trailing={<StatusBadge tone="info">{u.date}</StatusBadge>}
                />
              ))}
            </div>
          </Card>
        </div>

        <aside className="stack side">
          <Card title="Accesos rápidos" small>
            <div className="stack" style={{ gap: 10 }}>
              <Button variant="secondary" onClick={() => navigate('/admin/soportes')}>Ver soportes pendientes</Button>
              <Button variant="secondary" onClick={() => navigate('/admin/materias')}>Gestionar materias</Button>
              <Button variant="secondary" onClick={() => navigate('/admin/usuarios')}>Ver usuarios</Button>
              <Button variant="secondary" onClick={() => navigate('/admin/monitorias')}>Supervisar monitorías</Button>
            </div>
          </Card>

          <Card title="Actividad reciente" small>
            <ActivityList items={recentActivity} />
          </Card>

          <Card title="Estado del sistema" small>
            <SystemStatus
              items={[
                { label: 'Usuarios en línea', value: 24, tone: 'ok' },
                { label: 'Solicitudes pendientes', value: 5, tone: 'pending' },
                { label: 'Soportes por verificar', value: pendingSupports.length, tone: 'review' },
                { label: 'Último respaldo', value: 'Hoy 2:00 AM' },
              ]}
            />
          </Card>
        </aside>
      </div>

      <Toast message={message} visible={visible} />
    </AdminLayout>
  )
}

export default AdminHomePage