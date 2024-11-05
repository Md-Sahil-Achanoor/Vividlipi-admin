import {
  AssignOrderResponse,
  OrderUserManagementState,
  OrderUserResponse,
} from '@/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: OrderUserManagementState = {
  selectedOrderUser: null,
  singleOrderUser: null,
  selectedAssignOrder: null,
  singleAssignOrder: null,
}

const orderManagementSlice = createSlice({
  name: 'orderManagement',
  initialState,
  reducers: {
    setSelectedOrderUser: (
      state,
      action: PayloadAction<OrderUserResponse | null>,
    ) => {
      state.selectedOrderUser = action.payload
      if (action.payload) {
        state.singleOrderUser = {
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
          email: action.payload.email,
          MobileNumber: action.payload.MobileNumber,
          country: action.payload.country,
          password: '',
          confirmPassword: '',
          countryInfo: {},
        }
      } else {
        state.singleOrderUser = null
      }
    },
    setSelectedAssignUser: (
      state,
      action: PayloadAction<AssignOrderResponse | null>,
    ) => {
      state.selectedAssignOrder = action.payload
      if (action.payload) {
        // state.singleAssignOrder = {
        //   name: action.payload.name,
        //   email: action.payload.email,
        //   password: '',
        //   role: action?.payload?.role as IUserManagementForm['role'],
        // }
      } else {
        state.singleAssignOrder = null
      }
    },
    resetAssignOrder: (state) => {
      state.selectedAssignOrder = null
      state.singleAssignOrder = null
    },
    resetOrderUser: (state) => {
      state.selectedOrderUser = null
      state.singleOrderUser = null
    },
    resetAll: (state) => {
      state.selectedAssignOrder = null
      state.singleAssignOrder = null
      state.selectedOrderUser = null
      state.singleOrderUser = null
    },
  },
})

// Actions
export const orderManagementAction = orderManagementSlice.actions

export default orderManagementSlice.reducer
