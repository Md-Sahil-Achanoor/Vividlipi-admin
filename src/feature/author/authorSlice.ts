import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthorResponse, AuthorState } from '../../types'

const initialState: AuthorState = {
  selectedAuthor: null,
  singleAuthor: null,
}

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    resetAuthor: (state) => {
      state.selectedAuthor = null
      state.singleAuthor = null
    },

    setSelectedAuthor: (
      state,
      action: PayloadAction<AuthorResponse | null>,
    ) => {
      state.selectedAuthor = action.payload
      if (action?.payload) {
        state.singleAuthor = {
          Name: action.payload.Name,
          Slug: action.payload.Slug,
          description: action.payload.description,
          Pic: action.payload.Pic,
        }
      } else {
        state.singleAuthor = null
      }
    },
  },
})

// Actions
export const authorAction = authorSlice.actions

export default authorSlice.reducer
