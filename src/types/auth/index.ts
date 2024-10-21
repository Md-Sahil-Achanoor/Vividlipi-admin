import { RolePermission } from '../user-management'

export type Role = 'admin' | 'sub-admin' | ''

export interface ResponseUser {
  email: string
  Id: number
  picture: string
  first_name: string
  last_name: string
  role: Role
  subRole: string
}

export interface AuthResponse {
  token: string
  status: number
  message: string
  user: ResponseUser
  admin: ResponseUser
  Permissions: RolePermission | 'All Access'
}

export interface AuthState {
  isLoggedIn: boolean
  user: ResponseUser | null
  token: string
  reRender: boolean
  role: Role
  type: string
  selectedUser: null
  roleDetails: RolePermission | 'All Access' | null
}
