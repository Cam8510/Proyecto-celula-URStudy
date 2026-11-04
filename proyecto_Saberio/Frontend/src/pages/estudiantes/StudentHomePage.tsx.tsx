import { useMemo, useState } from 'react'
import type { Monitor, SessionRequestForm, StudentProfile } from '../../types/monitoring'
import { getSession } from '../../services/authService'
import { firstName } from '../../utils/format'
import { filterMonitors } from '../../utils/search'
import { useToast } from '../../hooks/useToast'
import { initialRequests, monitors, studentNotifications, studentProfile } from '../../data/studentMock'
import DashboardLayout from '../../components/layout/DashboardLayout/DashboardLayout'
import PageHero from '../../components/layout/PageHero/PageHero'
import Card from '../../components/shared/Card/Card'
import Avatar from '../../components/shared/Avatar/Avatar'
import ListRow from '../../components/shared/ListRow/ListRow'
import StatusBadge from '../../components/shared/StatusBadge/StatusBadge'
import EmptyState from '../../components/shared/EmptyState/EmptyState'
import Toast from '../../components/shared/Toast/Toast'
import SearchFilters from '../../components/estudiante/SearchFilters/SearchFilters'
import MonitorCard from '../../components/estudiante/monitorCard/monitorCard'
import RequestModal from '../../components/estudiante/RequestModal'
import ProfileCard from '../../components/estudiante/ProfileCard'
import ProfileModal from '../../components/estudiante/ProfileModal'

const QUICK_SUBJECTS = ['Cálculo', 'Programación', 'Álgebra', 'Microeconomía']

function StudentHomePage() {
  const user = getSession()
  const { message, visible, showToast } = useToast()

  // Filtros del buscador
  const [query, setQuery] = useState('')
  const [modality, setModality] = useState('')
  const [minRating, setMinRating] = useState('')
  const [sort, setSort] = useState('best')

  // Horario elegido (solo uno a la vez) y solicitud en curso
  const [selection, setSelection] = useState<{ monitorId: number; slot: string } | null>(null)
  const [requesting, setRequesting] = useState<{ monitor: Monitor; slot: string } | null>(null)

  const [profile, setProfile] = useState<StudentProfile>(studentProfile)
  const [editingProfile, setEditingProfile] = useState(false)
  const [requests, setRequests] = useState(initialRequests)

  // Solo se recalcula cuando cambian los filtros
  const results = useMemo(
    () => filterMonitors(monitors, { query, modality, minRating, sort }),
    [query, modality, minRating, sort],
  )

  const handleSelectSlot = (monitorId: number, slot: string) => {
    const same = selection?.monitorId === monitorId && selection.slot === slot
    setSelection(same ? null : { monitorId, slot })   // clic repetido = deseleccionar
  }

  const handleSubmitRequest = (_data: SessionRequestForm) => {
    if (!requesting) return
    setRequests([
      {
        id: Date.now(),
        initials: requesting.monitor.initials,
        color: requesting.monitor.color,
        subject: requesting.monitor.subject,
        detail: `Enviada a ${requesting.monitor.name}`,
        status: 'pending',
      },
      ...requests,
    ])
    showToast(`Solicitud enviada a ${requesting.monitor.name} para ${requesting.slot} ✅`)
    setRequesting(null)
    setSelection(null)
  }

  const clearFilters = () => {
    setQuery('')
    setModality('')
    setMinRating('')
  }

  return (
    <DashboardLayout role="estudiante" notifications={studentNotifications}>
      <PageHero greeting={`Hola, ${firstName(user?.name ?? '')} 👋`} title="¿Qué se te está complicando hoy?">
        <SearchFilters
          query={query} onQueryChange={setQuery}
          modality={modality} onModalityChange={setModality}
          minRating={minRating} onMinRatingChange={setMinRating}
          sort={sort} onSortChange={setSort}
          quickSubjects={QUICK_SUBJECTS}
        />
      </PageHero>

      <div className="main-grid">
        <Card title="Monitores para ti" subtitle={`${results.length} monitor${results.length !== 1 ? 'es' : ''}`}>
          {results.length === 0 ? (
            <EmptyState
              title="No encontramos monitores para eso"
              message="Prueba con el nombre de la materia, por ejemplo Cálculo o Programación."
              actionLabel="Ver todos los monitores"
              onAction={clearFilters}
            />
          ) : (
            <div className="stack">
              {results.map((m) => (
                <MonitorCard
                  key={m.id}
                  monitor={m}
                  selectedSlot={selection?.monitorId === m.id ? selection.slot : null}
                  onSelectSlot={(slot) => handleSelectSlot(m.id, slot)}
                  onReserve={() => selection?.monitorId === m.id && setRequesting({ monitor: m, slot: selection.slot })}
                />
              ))}
            </div>
          )}
        </Card>

        <aside className="stack side">
          <ProfileCard profile={profile} onEdit={() => setEditingProfile(true)} />
          <Card title="Solicitudes en proceso" small>
            <div className="stack" style={{ gap: 12 }}>
              {requests.map((r) => (
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

      {requesting && (
        <RequestModal
          monitor={requesting.monitor}
          slot={requesting.slot}
          onClose={() => setRequesting(null)}
          onSubmit={handleSubmitRequest}
        />
      )}

      {editingProfile && (
        <ProfileModal
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
    </DashboardLayout>
  )
}

export default StudentHomePage