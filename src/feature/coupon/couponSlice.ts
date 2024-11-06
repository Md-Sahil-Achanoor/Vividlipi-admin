import { CategoryResponse, CouponResponse, CouponState } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: CouponState = {
  selectedCoupon: null,
  singleCoupon: null,
  selectedCategories: [],
}

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    resetCoupon: (state) => {
      state.selectedCoupon = null
      state.singleCoupon = null
      state.selectedCategories = []
    },
    setSelectedCoupon: (
      state,
      action: PayloadAction<CouponResponse | null>,
    ) => {
      state.selectedCoupon = action.payload
      if (action?.payload) {
        state.singleCoupon = {
          coupon_name: action?.payload?.coupon_name,
          start_date: action?.payload?.start_date,
          end_date: action?.payload?.end_date,
          discount_type: action?.payload?.discount_type,
          discount_value: action?.payload?.discount_value,
          minimum_cart_value: action?.payload?.minimum_cart_value,
          category_1: action?.payload?.category_1,
          category_2: action?.payload?.category_2,
          product_ids: action?.payload?.product_ids,
          publisher_ids: action?.payload?.publisher_ids,
          author_ids: action?.payload?.author_ids,
        }
        state.selectedCategories = action?.payload
          ?.category_1 as CategoryResponse[]
      } else {
        state.singleCoupon = null
        state.selectedCategories = []
      }
    },
    setSelectedCategories: (
      state,
      action: PayloadAction<CategoryResponse[]>,
    ) => {
      state.selectedCategories = action.payload
    },
  },
})

// Actions
export const couponAction = couponSlice.actions

export default couponSlice.reducer
