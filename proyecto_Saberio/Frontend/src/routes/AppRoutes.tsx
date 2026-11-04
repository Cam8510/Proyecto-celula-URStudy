import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage.tsx'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
//import PlaceholderPage from '../pages/PlaceholderPage'
import ProtectedRoute from './ProtectedRoutes'
import StudentHomePage from '../pages/estudiantes/StudentHomePage.tsx'
import MyMonitoringsPage from '../pages/estudiantes/MyMonitoratingPages.tsx'
import StudentHistoryPage from '../pages/estudiantes/StudentHistoryPage'



function AppRoutes() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />

      {/* Estudiante */}
      <Route path="/estudiante" element={<ProtectedRoute role="estudiante" />}>
        <Route index element={<PlaceholderPage title="Inicio del estudiante" />} />
        <Route path="mis-monitorias" element={<PlaceholderPage title="Mis monitorías" />} />
        <Route path="historial" element={<PlaceholderPage title="Historial" />} />
      </Route>

      {/* Monitor */}
      <Route path="/monitor" element={<ProtectedRoute role="monitor" />}>
        <Route index element={<PlaceholderPage title="Inicio del monitor" />} />
        <Route path="publicaciones" element={<PlaceholderPage title="Publicaciones" />} />
        <Route path="solicitudes" element={<PlaceholderPage title="Solicitudes" />} />
        <Route path="calendario" element={<PlaceholderPage title="Calendario" />} />
        <Route path="historial" element={<PlaceholderPage title="Historial" />} />
      </Route>

      {/* Administrador */}
      <Route path="/admin" element={<ProtectedRoute role="admin" />}>
        <Route index element={<PlaceholderPage title="Inicio del administrador" />} />
        <Route path="soportes" element={<PlaceholderPage title="Soportes" />} />
        <Route path="materias" element={<PlaceholderPage title="Materias" />} />
        <Route path="usuarios" element={<PlaceholderPage title="Usuarios" />} />
        <Route path="monitorias" element={<PlaceholderPage title="Monitorías" />} />
      </Route>

      {/* Cualquier otra ruta vuelve al inicio */}
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