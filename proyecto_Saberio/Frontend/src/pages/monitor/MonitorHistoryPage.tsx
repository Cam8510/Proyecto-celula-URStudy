import { monitorHistory } from '../../data/monitorMock'
import MonitorLayout from '../../components/monitor/MonitorLayout/MonitorLayout'
import PageHero from '../../components/layout/PageHero/PageHero'
import Card from '../../components/shared/Card/Card'
import SessionHistoryList from '../../components/shared/SessionHistoryList/SessionHistoryList'

function MonitorHistoryPage() {
  return (
    <MonitorLayout>
      <PageHero title="Historial de monitorías" description="Tus sesiones anteriores y las calificaciones que recibiste." />
      <div style={{ marginTop: 48 }}>
        <Card title="Sesiones anteriores" subtitle={`${monitorHistory.length} sesiones`}>
          <SessionHistoryList sessions={monitorHistory} />
        </Card>
      </div>
    </MonitorLayout>
  )
}

export default MonitorHistoryPage