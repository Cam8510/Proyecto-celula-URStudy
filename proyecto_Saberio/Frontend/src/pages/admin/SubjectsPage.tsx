import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Subject, SubjectForm } from '../../types/admin'
import { useToast } from '../../hooks/useToast'
import { initialSubjects } from '../../data/adminMock'
import AdminLayout from '../../components/admin/AdminLayout/AdminLayout'
import PageHero from '../../components/layout/PageHero/PageHero'
import Button from '../../components/Button/Button'
import Card from '../../components/shared/Card/Card'
import StatusBadge from '../../components/shared/StatusBadge/StatusBadge'
import DataTable from '../../components/shared/DataTable/DataTable'
import type { Column } from '../../components/shared/DataTable/DataTable'
import Toast from '../../components/shared/Toast/Toast'
import SubjectModal from '../../components/admin/SubjectModal'

function SubjectsPage() {
  const [searchParams] = useSearchParams()
  const { message, visible, showToast } = useToast()
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects)
  const [modal, setModal] = useState<'new' | Subject | null>(searchParams.get('nueva') === '1' ? 'new' : null)

  const editingId = modal && modal !== 'new' ? modal.id : null

  // El código no puede repetirse (ignorando la materia que se está editando)
  const isCodeTaken = (code: string) =>
    subjects.some((s) => s.id !== editingId && s.code.toLowerCase() === code.toLowerCase())

  const handleSave = (data: SubjectForm) => {
    if (modal === 'new') {
      setSubjects([{ id: Date.now(), active: true, ...data }, ...subjects])
      showToast('Materia creada ✅')
    } else if (modal) {
      setSubjects(subjects.map((s) => (s.id === modal.id ? { ...s, ...data } : s)))
      showToast('Materia actualizada ✅')
    }
    setModal(null)
  }

  const toggleActive = (subject: Subject) => {
    setSubjects(subjects.map((s) => (s.id === subject.id ? { ...s, active: !s.active } : s)))
    showToast(`Materia ${subject.active ? 'desactivada' : 'activada'}`)
  }

  const columns: Column<Subject>[] = [
    { header: 'Código', render: (s) => <b>{s.code}</b> },
    { header: 'Materia', render: (s) => s.name },
    { header: 'Facultad', render: (s) => s.faculty },
    { header: 'Créditos', render: (s) => s.credits },
    {
      header: 'Estado',
      render: (s) => <StatusBadge tone={s.active ? 'ok' : 'urgent'}>{s.active ? 'Activa' : 'Inactiva'}</StatusBadge>,
    },
    {
      header: 'Acciones',
      render: (s) => (
        <div className="table__actions">
          <Button variant="secondary" onClick={() => setModal(s)}>Editar</Button>
          <Button variant="secondary" onClick={() => toggleActive(s)}>{s.active ? 'Desactivar' : 'Activar'}</Button>
        </div>
      ),
    },
  ]

  return (
    <AdminLayout>
      <PageHero title="Gestión de materias" description="Administra el catálogo de materias disponibles para las monitorías.">
        <div style={{ marginTop: 28 }}>
          <Button onClick={() => setModal('new')}>+ Nueva materia</Button>
        </div>
      </PageHero>

      <div style={{ marginTop: 48 }}>
        <Card title="Catálogo" subtitle={`${subjects.length} materia${subjects.length !== 1 ? 's' : ''}`}>
          <DataTable columns={columns} rows={subjects} getKey={(s) => s.id} emptyMessage="Aún no hay materias." />
        </Card>
      </div>

      {modal && (
        <SubjectModal
          subject={modal === 'new' ? undefined : modal}
          isCodeTaken={isCodeTaken}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      <Toast message={message} visible={visible} />
    </AdminLayout>
  )
}

export default SubjectsPage