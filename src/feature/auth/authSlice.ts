import { AuthResponse, AuthState } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: '',
  role: '',
  roleDetails: null,
  reRender: false,
  type: '',
  selectedUser: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      { payload: { user, token, Permissions } }: PayloadAction<AuthResponse>,
    ) => {
      if (typeof Permissions === 'object') {
        state.roleDetails = Permissions
      } else {
        state.roleDetails = 'All Access'
      }
      state.isLoggedIn = true
      state.user = user
      state.token = token
      state.role = user.role
      state.type = user?.role
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false
      state.token = ''
      state.role = ''
      state.user = null
    },
    // setSelectedUser: (state, action: PayloadAction<UpdateAdmin | null>) => {
    //   state.selectedUser = action.payload;
    // },
  },
})

export const authAction = authSlice.actions

export default authSlice.reducer
