import { CommentResponse, CommentState } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: CommentState = {
  selectedComment: null,
}

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    resetComment: (state) => {
      state.selectedComment = null
    },
    setSelectedComment: (
      state,
      action: PayloadAction<CommentResponse | null>,
    ) => {
      state.selectedComment = action.payload
    },
  },
})

// Actions
export const commentAction = commentSlice.actions

export default commentSlice.reducer
