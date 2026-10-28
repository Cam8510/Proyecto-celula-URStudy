export type Role = 'estudiante' | 'monitor' | 'admin'

// Al registrarse solo se puede elegir estos dos
export type SignUpRole = Exclude<Role, 'admin'>

export interface User {
  name: string
  email: string
  role: Role
}

export interface RegisterData {
  name: string
  email: string
  password: string
  role: SignUpRole
}