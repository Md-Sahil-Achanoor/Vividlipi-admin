import { AlbumResponse, AlbumState } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AlbumState = {
  selectedAlbum: null,
  singleAlbum: null,
}

const albumsSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    resetAlbum: (state) => {
      state.selectedAlbum = null
      state.singleAlbum = null
    },
    setSelectedAlbum: (state, action: PayloadAction<AlbumResponse | null>) => {
      state.selectedAlbum = action.payload
      if (action?.payload) {
        state.singleAlbum = {
          title: action.payload.title,
          description: action.payload.description,
          cover: action.payload.cover,
        }
      } else {
        state.singleAlbum = null
      }
    },
  },
})

// Actions
export const albumAction = albumsSlice.actions

// Reducer
export default albumsSlice.reducer
