import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Publication, PublicationForm } from '../../types/monitoring'
import { useToast } from '../../hooks/useToast'
import { initialPublications } from '../../data/monitorMock'
import MonitorLayout from '../../components/monitor/MonitorLayout/MonitorLayout'
import PageHero from '../../components/layout/PageHero/PageHero'
import Button from '../../components/Button/Button'
import Card from '../../components/shared/Card/Card'
import EmptyState from '../../components/shared/EmptyState/EmptyState'
import ConfirmDialog from '../../components/shared/ConfirmDialog'
import Toast from '../../components/shared/Toast/Toast'
import PublicationCard from '../../components/monitor/PublicationCard/PublicationCard'
import PublicationModal from '../../components/monitor/PublicationModal'

function PublicationsPage() {
  const [searchParams] = useSearchParams()
  const { message, visible, showToast } = useToast()
  const [publications, setPublications] = useState<Publication[]>(initialPublications)

  // El modal puede estar cerrado, creando ('new'), o editando una publicación
  const [modal, setModal] = useState<'new' | Publication | null>(
    searchParams.get('nueva') === '1' ? 'new' : null,
  )
  const [toDelete, setToDelete] = useState<Publication | null>(null)

  const handleSave = (data: PublicationForm) => {
    if (modal === 'new') {
      setPublications([{ id: Date.now(), active: true, ...data }, ...publications])
      showToast('Publicación creada ✅')
    } else if (modal) {
      setPublications(publications.map((p) => (p.id === modal.id ? { ...p, ...data } : p)))
      showToast('Publicación actualizada ✅')
    }
    setModal(null)
  }

  const handleDelete = () => {
    if (!toDelete) return
    setPublications(publications.filter((p) => p.id !== toDelete.id))
    showToast('Publicación eliminada')
    setToDelete(null)
  }

  return (
    <MonitorLayout>
      <PageHero title="Tus publicaciones" description="Estas son las monitorías que ofreces a los estudiantes.">
        <div style={{ marginTop: 28 }}>
          <Button onClick={() => setModal('new')}>+ Nueva publicación</Button>
        </div>
      </PageHero>

      <div style={{ marginTop: 48 }}>
        <Card title="Publicaciones" subtitle={`${publications.length} publicación${publications.length !== 1 ? 'es' : ''}`}>
          {publications.length === 0 ? (
            <EmptyState
              title="Aún no tienes publicaciones"
              message="Crea la primera para que los estudiantes te encuentren."
              actionLabel="Crear publicación"
              onAction={() => setModal('new')}
            />
          ) : (
            <div className="stack" style={{ gap: 16 }}>
              {publications.map((p) => (
                <PublicationCard key={p.id} publication={p} onEdit={() => setModal(p)} onDelete={() => setToDelete(p)} />
              ))}
            </div>
          )}
        </Card>
      </div>

      {modal && (
        <PublicationModal
          publication={modal === 'new' ? undefined : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Eliminar publicación"
          message={`¿Seguro que quieres eliminar la publicación de ${toDelete.subject}?`}
          confirmLabel="Eliminar"
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
        />
      )}

      <Toast message={message} visible={visible} />
    </MonitorLayout>
  )
}

export default PublicationsPage