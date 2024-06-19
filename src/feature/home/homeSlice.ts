import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  FeatureProductResponse,
  FeatureSliderResponse,
  FeatureSubSliderResponse,
  HomeState,
} from '../../types'

const initialState: HomeState = {
  selectedFeatureSlider: null,
  selectedFeatureSubSlider: null,
  selectedFeatureProduct: null,
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    resetHome: (state) => {
      state.selectedFeatureSlider = null
      state.selectedFeatureSubSlider = null
      state.selectedFeatureProduct = null
    },
    setSelectedFeatureSlider: (
      state,
      action: PayloadAction<FeatureSliderResponse | null>,
    ) => {
      state.selectedFeatureSlider = action.payload
    },
    setSelectedFeatureSubSlider: (
      state,
      action: PayloadAction<FeatureSubSliderResponse | null>,
    ) => {
      state.selectedFeatureSubSlider = action.payload
    },
    setSelectedFeatureProduct: (
      state,
      action: PayloadAction<FeatureProductResponse | null>,
    ) => {
      state.selectedFeatureProduct = action.payload
    },
  },
})

// Actions
export const homeAction = homeSlice.actions

export default homeSlice.reducer
