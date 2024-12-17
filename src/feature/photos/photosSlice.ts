import { PhotoResponse, PhotoState } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: PhotoState = {
  selectedPhoto: null,
  singlePhoto: null,
}

const photosSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    resetPhoto: (state) => {
      state.selectedPhoto = null
      state.singlePhoto = null
    },
    setSelectedPhoto: (state, action: PayloadAction<PhotoResponse | null>) => {
      state.selectedPhoto = action.payload
      if (action?.payload) {
        state.singlePhoto = {
          title: action.payload.title,
          description: action.payload.description,
          url: action.payload.url,
        }
      } else {
        state.singlePhoto = null
      }
    },
  },
})

// Actions
export const photoAction = photosSlice.actions

// Reducer
export default photosSlice.reducer
