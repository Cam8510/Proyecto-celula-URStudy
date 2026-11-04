import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Role } from '../types/auth'
import { ROLE_COLOR, ROLE_LABEL } from '../config/navigation'
import { getSession, logout } from '../services/authService'
import { getInitials } from '../utils/format'
import { useToast } from '../hooks/useToast'
import { studentNotifications } from '../data/studentMock'
import { monitorNotifications } from '../data/monitorMock'
import { adminNotifications } from '../data/adminMock'
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout'
import PageHero from '../components/layout/PageHero/PageHero'
import Button from '../components/Button/Button'
import Card from '../components/shared/Card/Card'
import Avatar from '../components/shared/Avatar/Avatar'
import ListRow from '../components/shared/ListRow/ListRow'
import StatusBadge from '../components/shared/StatusBadge/StatusBadge'
import Switch from '../components/shared/Switch/Switch'
import Toast from '../components/shared/Toast/Toast'
import BackupSection from '../components/admin/BackupSection/BackupSection'

const NOTIFICATIONS_BY_ROLE = {
  estudiante: studentNotifications,
  monitor: monitorNotifications,
  admin: adminNotifications,
}

interface SettingsPageProps {
  role: Role
}

function SettingsPage({ role }: SettingsPageProps) {
  const navigate = useNavigate()
  const user = getSession()
  const { message, visible, showToast } = useToast()

  const [prefs, setPrefs] = useState({
    email: true,
    push: true,
    reminders: true,
    publicProfile: true,
  })

  // Devuelve una función que actualiza solo la preferencia indicada
  const setPref = (key: keyof typeof prefs) => (value: boolean) => setPrefs({ ...prefs, [key]: value })

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <DashboardLayout role={role} notifications={NOTIFICATIONS_BY_ROLE[role]}>
      <PageHero title="Configuración" description="Administra tu cuenta, tus notificaciones y tu sesión." />

      <div className="main-grid">
        <div className="stack stack--lg">
          <Card title="Notificaciones" subtitle="Elige cómo quieres enterarte">
            <div className="stack" style={{ gap: 12 }}>
              <ListRow
                title="Correo electrónico"
                subtitle="Recibe avisos en tu correo institucional"
                trailing={<Switch checked={prefs.email} onChange={setPref('email')} label="Notificaciones por correo" />}
              />
              <ListRow
                title="Notificaciones push"
                subtitle="Avisos dentro de la plataforma"
                trailing={<Switch checked={prefs.push} onChange={setPref('push')} label="Notificaciones push" />}
              />
              {role !== 'admin' && (
                <ListRow
                  title="Recordatorios de monitorías"
                  subtitle="Te avisamos antes de cada sesión"
                  trailing={<Switch checked={prefs.reminders} onChange={setPref('reminders')} label="Recordatorios" />}
                />
              )}
            </div>
          </Card>

          {role !== 'admin' && (
            <Card title="Privacidad" subtitle="Tu correo, teléfono y documento nunca son visibles">
              <ListRow
                title="Mi perfil es visible para otros usuarios"
                subtitle="Solo se muestran tu nombre, carrera y calificaciones"
                trailing={<Switch checked={prefs.publicProfile} onChange={setPref('publicProfile')} label="Perfil visible" />}
              />
            </Card>
          )}

          {role === 'monitor' && (
            <Card title="Soportes académicos">
              <ListRow
                title="Estado de tu acreditación"
                subtitle="Verificada por el equipo de administración"
                trailing={<StatusBadge tone="ok">Aprobado</StatusBadge>}
              />
            </Card>
          )}

          {role === 'admin' && (
            <>
              <Card title="Seguridad">
                <p style={{ fontSize: 14, color: 'var(--texto-suave)' }}>
                  Contraseñas almacenadas con hashing seguro, comunicación cifrada por HTTPS y secretos gestionados con variables de entorno.
                </p>
              </Card>
              <Card title="Respaldo de datos">
                <BackupSection />
              </Card>
            </>
          )}
        </div>

        <aside className="stack side">
          <Card title="Tu cuenta" small>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Avatar initials={getInitials(user?.name ?? '')} color={ROLE_COLOR[role]} size={56} />
              <div>
                <b style={{ display: 'block', fontSize: 17 }}>{user?.name}</b>
                <span style={{ fontSize: 14, color: 'var(--texto-suave)' }}>{user?.email}</span>
                <div style={{ marginTop: 6 }}>
                  <StatusBadge tone="review">{ROLE_LABEL[role]}</StatusBadge>
                </div>
              </div>
            </div>
          </Card>

          {role !== 'admin' && (
            <Card title="Cambio de rol" small>
              <p style={{ fontSize: 14, color: 'var(--texto-suave)', marginBottom: 12 }}>
                Si también eres {role === 'estudiante' ? 'monitor' : 'estudiante'}, podrás alternar entre vistas.
              </p>
              <Button variant="secondary" disabled>Próximamente</Button>
            </Card>
          )}

          <Card title="Sesión" small>
            <div className="stack" style={{ gap: 10 }}>
              <Button onClick={() => showToast('Configuración guardada ✅')}>Guardar cambios</Button>
              <Button variant="secondary" onClick={handleLogout}>Cerrar sesión</Button>
            </div>
          </Card>
        </aside>
      </div>

      <Toast message={message} visible={visible} />
    </DashboardLayout>
  )
}

export default SettingsPage