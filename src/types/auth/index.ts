export type Role = 'admin' | ''

export interface ResponseUser {
  email: string
  Id: number
  picture: string
  first_name: string
  last_name: string
  role: Role
}

export interface AuthResponse {
  token: string
  status: number
  message: string
  user: ResponseUser
  admin: ResponseUser
}

export interface AuthState {
  isLoggedIn: boolean
  user: ResponseUser | null
  token: string
  reRender: boolean
  role: Role
  type: string
  selectedUser: null
}
