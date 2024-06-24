import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublisherResponse, PublisherState } from '../../types'

const initialState: PublisherState = {
  selectedPublisher: null,
  singlePublisher: null,
}

const publisherSlice = createSlice({
  name: 'publisher',
  initialState,
  reducers: {
    resetPublisher: (state) => {
      state.selectedPublisher = null
      state.singlePublisher = null
    },

    setSelectedPublisher: (
      state,
      action: PayloadAction<PublisherResponse | null>,
    ) => {
      state.selectedPublisher = action.payload
      if (action?.payload) {
        state.singlePublisher = {
          Name: action.payload.Name,
          description: action.payload.description,
        }
      } else {
        state.singlePublisher = null
      }
    },
  },
})

// Actions
export const publisherAction = publisherSlice.actions

export default publisherSlice.reducer
