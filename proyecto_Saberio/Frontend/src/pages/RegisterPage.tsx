import { useState } from 'react'
import type { FormEvent } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import AuthCard from '../components/AuthCard/AuthCard'
import FormField from '../components/FormField/FormField'
import RoleSelector from '../components/RoleSelector/RoleSelector'
import Button from '../components/Button/Button'
import Alert from '../components/Alert/Alert'
import { isInstitutionalEmail, isStrongPassword } from '../utils/validators'
import { register } from '../services/authService'
import type { SignUpRole } from '../types/auth'

interface FormErrors {
  name?: string
  email?: string
  emailConfirm?: string
  password?: string
  passwordConfirm?: string
  terms?: string
}

function RegisterPage() {
  // Si llegó con ?rol=monitor desde la página de inicio, lo dejamos preseleccionado
  const initialRole: SignUpRole =
    new URLSearchParams(window.location.search).get('rol') === 'monitor' ? 'monitor' : 'estudiante'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailConfirm, setEmailConfirm] = useState('')
  const [role, setRole] = useState<SignUpRole>(initialRole)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [terms, setTerms] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState(false)

  // Quita el error de un campo cuando el usuario lo vuelve a escribir
  const clearError = (field: keyof FormErrors) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }))

  const validate = (): FormErrors => {
    const result: FormErrors = {}
    if (name.trim().length < 3) result.name = 'Por favor ingresa tu nombre completo'
    if (!isInstitutionalEmail(email)) result.email = 'Ingresa un correo institucional válido (@urosario.edu.co)'
    if (email.trim() !== emailConfirm.trim()) result.emailConfirm = 'Los correos no coinciden'
    if (!isStrongPassword(password)) result.password = 'Mínimo 8 caracteres, con una mayúscula y un número'
    if (password !== passwordConfirm) result.passwordConfirm = 'Las contraseñas no coinciden'
    if (!terms) result.terms = 'Debes aceptar los términos y condiciones'
    return result
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setServerError('')
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setLoading(true)
    try {
      await register({ name: name.trim(), email: email.trim(), password, role })
      setCreated(true)
      setTimeout(() => { window.location.href = '/login' }, 3000)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Ocurrió un error')
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <Header brand="URStudy" subtitle="Universidad del Rosario" />

      <main className="page__content">
        <AuthCard
          wide
          title="Crea tu cuenta"
          subtitle="Usa tu correo institucional de la Universidad del Rosario"
          footer={<>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></>}
        >
          {created && (
            <Alert
              type="success"
              title="✅ Cuenta creada exitosamente"
              message={`Te enviamos un correo de verificación a ${email}. Revísalo y luego inicia sesión.`}
            />
          )}
          {serverError && <Alert type="error" title="⚠️ No pudimos crear la cuenta" message={serverError} />}

          {!created && (
            <form onSubmit={handleSubmit} noValidate>
              <FormField
                id="nombre" label="Nombre completo" value={name}
                onChange={(v) => { setName(v); clearError('name') }}
                placeholder="Ej: Sofía Martínez" autoComplete="name" error={errors.name}
              />
              <FormField
                id="email" label="Correo institucional" type="email" value={email}
                onChange={(v) => { setEmail(v); clearError('email') }}
                placeholder="ejemplo@urosario.edu.co" autoComplete="email"
                help="Debe terminar en @urosario.edu.co" error={errors.email}
              />
              <FormField
                id="email-conf" label="Confirmar correo" type="email" value={emailConfirm}
                onChange={(v) => { setEmailConfirm(v); clearError('emailConfirm') }}
                placeholder="ejemplo@urosario.edu.co" error={errors.emailConfirm}
              />

              <RoleSelector value={role} onChange={setRole} />

              <FormField
                id="password" label="Contraseña" type="password" value={password}
                onChange={(v) => { setPassword(v); clearError('password') }}
                placeholder="Mínimo 8 caracteres" autoComplete="new-password"
                help="Usa al menos 8 caracteres, incluye mayúsculas y números" error={errors.password}
              />
              <FormField
                id="password-conf" label="Confirmar contraseña" type="password" value={passwordConfirm}
                onChange={(v) => { setPasswordConfirm(v); clearError('passwordConfirm') }}
                placeholder="Repite tu contraseña" autoComplete="new-password" error={errors.passwordConfirm}
              />

              <div className="field">
                <label className="terms">
                  <input
                    type="checkbox" checked={terms}
                    onChange={(e) => { setTerms(e.target.checked); clearError('terms') }}
                  />
                  <span>Acepto los <a href="#">Términos y condiciones</a> y la <a href="#">Política de privacidad</a></span>
                </label>
                {errors.terms && <p className="field__error">{errors.terms}</p>}
              </div>

              <Button type="submit" fullWidth loading={loading} loadingText="Creando cuenta...">
                Crear cuenta
              </Button>
            </form>
          )}
        </AuthCard>
      </main>

      <Footer text="URStudy, Universidad del Rosario © 2026" />
    </div>
  )
}

export default RegisterPage