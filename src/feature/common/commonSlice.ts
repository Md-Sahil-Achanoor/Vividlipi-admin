import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommonState } from '../../types/common/common'

const initialState: CommonState = {
  progress: 0,
  uploading: false,
  totalPage: 0,
  reRenderBulk: false,
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload
      state.uploading = action.payload > 0
    },
    changePageNumber: (state, action: PayloadAction<number>) => {
      state.totalPage = action.payload
    },
    setRerenderBulk: (state) => {
      state.reRenderBulk = !state.reRenderBulk
    },
  },
})

export const commonAction = commonSlice.actions
export default commonSlice.reducer
