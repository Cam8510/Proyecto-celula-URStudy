import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '../pages/Homepage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import PlaceholderPage from '../pages/PlaceHolder'
import ProtectedRoute from './ProtectedRoutes'
import StudentHomePage from '../pages/estudiantes/StudentHomePage.tsx'
import MyMonitoringsPage from '../pages/estudiantes/MyMonitoratingPages.tsx'
import StudentHistoryPage from '../pages/estudiantes/StudentHistoryPage'
import MonitorHomePage from '../pages/monitor/MonitorHomePage'
import PublicationsPage from '../pages/monitor/PublicationsPage'
import RequestsPage from '../pages/monitor/RequestsPage'
import CalendarPage from '../pages/monitor/CalendarPage'
import MonitorHistoryPage from '../pages/monitor/MonitorHistoryPage'
import AdminHomePage from '../pages/admin/AdminHomePage'
import SupportsPage from '../pages/admin/SupportsPage'
import SubjectsPage from '../pages/admin/SubjectsPage'
import UsersPage from '../pages/admin/UsersPage'
import AdminSessionsPage from '../pages/admin/AdminSessionsPage'
import SettingsPage from '../pages/SettingsPage'



function AppRoutes() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />

      {/* Estudiante */}
      <Route path="/estudiante" element={<ProtectedRoute role="estudiante" />}>
        <Route index element={<StudentHomePage />} />
        <Route path="mis-monitorias" element={<MyMonitoringsPage />} />
        <Route path="historial" element={<StudentHistoryPage />} />
        <Route path="configuracion" element={<SettingsPage role="estudiante" />} />
      </Route>

      {/* Monitor */}
      <Route path="/monitor" element={<ProtectedRoute role="monitor" />}>
        <Route index element={<MonitorHomePage />} />
        <Route path="publicaciones" element={<PublicationsPage />} />
        <Route path="solicitudes" element={<RequestsPage />} />
        <Route path="calendario" element={<CalendarPage />} />
        <Route path="historial" element={<MonitorHistoryPage />} />
        <Route path="configuracion" element={<SettingsPage role="monitor" />} />
      </Route>

      {/* Administrador */}
      <Route path="/admin" element={<ProtectedRoute role="admin" />}>
        <Route index element={<AdminHomePage />} />
        <Route path="soportes" element={<SupportsPage />} />
        <Route path="materias" element={<SubjectsPage />} />
        <Route path="usuarios" element={<UsersPage />} />
        <Route path="monitorias" element={<AdminSessionsPage />} />
        <Route path="configuracion" element={<SettingsPage role="admin" />} />
      </Route>

      {/* Cualquier otra ruta volvera al inicio */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
{/* Estudiante */}
<Route path="/estudiante" element={<ProtectedRoute role="estudiante" />}>
  <Route index element={<StudentHomePage />} />
  <Route path="mis-monitorias" element={<MyMonitoringsPage />} />
  <Route path="historial" element={<StudentHistoryPage />} />
</Route>
export default AppRoutes