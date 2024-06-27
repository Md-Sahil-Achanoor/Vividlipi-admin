import { IRolePermissionForm, IUserManagement } from '@/models/user-management'
import { ReqQuery } from '../common'

export type RoleBase = {
  add: number
  update: number
  delete: number
  view: number
}

export interface IRolePermission {
  Title: string
  Permissions: Record<string, Partial<RoleBase>>
}

export interface RolePermissionPayLoad extends IRolePermission {}

export interface RolePermissionResponse extends IRolePermission {
  id: number | string
  isDeleted: number
}

export interface RolePermissionQuery extends ReqQuery {}

export interface IAdminUser<T> extends IUserManagement {
  role: T | null
}

export interface UserManagementPayLoad extends IAdminUser<number> {}

export interface UserManagementResponse
  extends IAdminUser<RolePermissionResponse> {
  id: number
}

export interface UserManagementState {
  selectedRolePermission: RolePermissionResponse | null
  selectedUser: UserManagementResponse | null
  singleUser: IUserManagement | null
  singleRolePermission: IRolePermissionForm | null
}
