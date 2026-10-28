const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isInstitutionalEmail(email: string): boolean {
  const value = email.trim()
  return EMAIL_REGEX.test(value) && value.endsWith('@urosario.edu.co')
}

// Mínimo 8 caracteres, una mayúscula y un número
export function isStrongPassword(password: string): boolean {
  return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)
}