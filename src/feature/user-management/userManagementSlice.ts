import { roleOptions } from '@/constants/role-constant'
import { IOptions, IUserManagementForm } from '@/models'
import { filterPermission } from '@/utils/validateSchema'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  RolePermissionResponse,
  UserManagementResponse,
  UserManagementState,
} from '../../types'

const initialState: UserManagementState = {
  selectedRolePermission: null,
  selectedUser: null,
  singleUser: null,
  singleRolePermission: null,
}

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    setSelectedRolePermission: (
      state,
      action: PayloadAction<RolePermissionResponse | null>,
    ) => {
      state.selectedRolePermission = action.payload
      if (action.payload) {
        const { Permissions } = action.payload
        const permissions: Record<string, IOptions[]> = {}
        roleOptions?.forEach((role) => {
          const check = Object.keys(Permissions)?.includes(role)
          if (check) {
            permissions[role] = filterPermission(Permissions[role])
          } else {
            permissions[role] = []
          }
        })
        state.singleRolePermission = {
          Title: action.payload.Title,
          ...permissions,
        }
      } else {
        state.singleRolePermission = null
      }
    },
    setSelectedUser: (
      state,
      action: PayloadAction<UserManagementResponse | null>,
    ) => {
      state.selectedUser = action.payload
      if (action.payload) {
        state.singleUser = {
          name: action.payload.name,
          email: action.payload.email,
          password: '',
          role: action?.payload?.role as IUserManagementForm['role'],
        }
      } else {
        state.singleUser = null
      }
    },

    resetAdminUser: (state) => {
      state.selectedUser = null
      state.singleUser = null
    },
    resetRolePermission: (state) => {
      state.selectedRolePermission = null
      state.singleRolePermission = null
    },

    resetAll: (state) => {
      state.selectedUser = null
      state.singleUser = null
      state.selectedRolePermission = null
      state.singleRolePermission = null
    },
  },
})

// Actions
export const userManagementAction = userManagementSlice.actions

export default userManagementSlice.reducer
