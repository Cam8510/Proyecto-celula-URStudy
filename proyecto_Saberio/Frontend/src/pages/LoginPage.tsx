import { useState } from 'react'
import type { FormEvent } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import AuthCard from '../components/AuthCard/AuthCard'
import FormField from '../components/FormField/FormField'
import Button from '../components/Button/Button'
import Alert from '../components/Alert/Alert'
import ForgotPasswordModal from '../components/ForgotPassword/ForgotPassword'
import { isInstitutionalEmail } from '../utils/validators'
import { login, saveSession, redirectByRole } from '../services/authService'
const logo = new URL('../assets/logo.png', import.meta.url).href

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showRecover, setShowRecover] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoginError('')

    const emailOk = isInstitutionalEmail(email)
    const passOk = password.length > 0
    setEmailError(emailOk ? '' : 'Ingresa un correo institucional válido (@urosario.edu.co)')
    setPasswordError(passOk ? '' : 'Ingresa tu contraseña')
    if (!emailOk || !passOk) return

    setLoading(true)
    try {
      const user = await login(email.trim(), password)
      saveSession(user, remember)
      redirectByRole(user.role)
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Ocurrió un error')
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <Header brand="Saberio" logo={logo} subtitle="Universidad del Rosario" />

      <main className="page__content">
        <AuthCard
          title="Bienvenido de nuevo"
          subtitle="Inicia sesión con tu correo institucional"
          footer={<>¿No tienes cuenta? <a href="/registro">Crear cuenta</a></>}
        >
          {loginError && <Alert type="error" title="⚠️ Error al iniciar sesión" message={loginError} />}

          <form onSubmit={handleSubmit} noValidate>
            <FormField
              id="email"
              label="Correo institucional"
              type="email"
              value={email}
              onChange={(v) => { setEmail(v); setEmailError('') }}
              placeholder="ejemplo@urosario.edu.co"
              autoComplete="email"
              error={emailError}
            />
            <FormField
              id="password"
              label="Contraseña"
              type="password"
              value={password}
              onChange={(v) => { setPassword(v); setPasswordError('') }}
              placeholder="Tu contraseña"
              autoComplete="current-password"
              error={passwordError}
            />

            <div className="login-options">
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />{' '}
                Recordarme
              </label>
              <button type="button" className="link-button" onClick={() => setShowRecover(true)}>
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <Button type="submit" fullWidth loading={loading} loadingText="Iniciando sesión...">
              Iniciar sesión
            </Button>
          </form>
        </AuthCard>
      </main>

      <Footer text="Saberio, Universidad del Rosario © 2026" />
      <ForgotPasswordModal open={showRecover} onClose={() => setShowRecover(false)} />
    </div>
  )
}

export default LoginPage