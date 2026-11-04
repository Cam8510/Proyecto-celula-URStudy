import { useMemo, useState } from 'react'
import { getInitials, normalize } from '../../utils/format'
import { platformUsers } from '../../data/adminMock'
import AdminLayout from '../../components/admin/AdminLayout/AdminLayout'
import PageHero from '../../components/layout/PageHero/PageHero'
import Card from '../../components/shared/Card/Card'
import Avatar from '../../components/shared/Avatar/Avatar'
import ListRow from '../../components/shared/ListRow/ListRow'
import StatusBadge from '../../components/shared/StatusBadge/StatusBadge'
import EmptyState from '../../components/shared/EmptyState/EmptyState'
import FilterTabs from '../../components/shared/FilterTabs/FilterTabs'
import FormField from '../../components/FormField/FormField'

const ROLE_FILTERS = [
  { value: 'todos', label: 'Todos' },
  { value: 'Estudiante', label: 'Estudiantes' },
  { value: 'Monitor', label: 'Monitores' },
]

function UsersPage() {
  const [role, setRole] = useState('todos')
  const [search, setSearch] = useState('')

  const users = useMemo(() => {
    const term = normalize(search)
    return platformUsers.filter(
      (u) =>
        (role === 'todos' || u.role === role) &&
        (!term || normalize(u.name).includes(term) || normalize(u.email).includes(term)),
    )
  }, [role, search])

  return (
    <AdminLayout>
      <PageHero title="Usuarios" description="Consulta a los estudiantes y monitores registrados en la plataforma." />

      <div style={{ marginTop: 48 }}>
        <Card title="Usuarios registrados" subtitle={`${users.length} resultado${users.length !== 1 ? 's' : ''}`}>
          <FilterTabs label="Filtrar por rol" options={ROLE_FILTERS} value={role} onChange={setRole} />
          <FormField id="buscar-usuario" label="Buscar por nombre o correo" value={search}
            onChange={setSearch} placeholder="Ej: laura" />

          {users.length === 0 ? (
            <EmptyState title="Sin resultados" message="Prueba con otro nombre o cambia el filtro de rol." />
          ) : (
            <div className="stack" style={{ gap: 12 }}>
              {users.map((u) => (
                <ListRow
                  key={u.id}
                  leading={<Avatar initials={getInitials(u.name)} color={u.role === 'Monitor' ? 'purple' : 'primary'} size={44} />}
                  title={u.name}
                  subtitle={`${u.email} · ${u.career}`}
                  trailing={<StatusBadge tone={u.role === 'Monitor' ? 'review' : 'info'}>{u.role}</StatusBadge>}
                />
              ))}
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  )
}

export default UsersPage