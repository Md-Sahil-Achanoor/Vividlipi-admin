import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CouponResponse, CouponState } from '../../types'

const initialState: CouponState = {
  selectedCoupon: null,
  singleCoupon: null,
}

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    resetCoupon: (state) => {
      state.selectedCoupon = null
      state.singleCoupon = null
    },
    setSelectedCoupon: (
      state,
      action: PayloadAction<CouponResponse | null>,
    ) => {
      state.selectedCoupon = action.payload
      if (action?.payload) {
        state.singleCoupon = {
          name: action.payload.name,
          product: action.payload.product,
          category1: action.payload.category1,
          category2: action.payload.category2,
          publishers: action.payload.publishers,
          authors: action.payload.authors,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
          percentageOff: action.payload.percentageOff,
          valueOff: action.payload.valueOff,
          cartConditions: action.payload.cartConditions,
        }
      } else {
        state.singleCoupon = null
      }
    },
  },
})

// Actions
export const couponAction = couponSlice.actions

export default couponSlice.reducer
