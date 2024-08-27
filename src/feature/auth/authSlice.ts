import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthResponse, AuthState } from '../../types'

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: '',
  role: '',
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
      { payload: { user, token } }: PayloadAction<AuthResponse>,
    ) => {
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
