import { studentHistory, studentNotifications } from '../../data/studentMock'
import DashboardLayout from '../../components/layout/DashboardLayout/DashboardLayout'
import PageHero from '../../components/layout/PageHero/PageHero'
import Card from '../../components/shared/Card/Card'
import SessionHistoryList from '../../components/shared/SessionHistoryList/SessionHistoryList'

function StudentHistoryPage() {
  return (
    <DashboardLayout role="estudiante" notifications={studentNotifications}>
      <PageHero title="Historial" description="Todas tus monitorías anteriores y las calificaciones que diste." />
      <div style={{ marginTop: 48 }}>
        <Card title="Monitorías anteriores" subtitle={`${studentHistory.length} sesiones`}>
          <SessionHistoryList sessions={studentHistory} />
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default StudentHistoryPage