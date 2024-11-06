import { CategoryResponse, CategoryState, SubCategoryResponse } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: CategoryState = {
  selectedCategory: null,
  selectedSubCategory: null,
  singleCategory: null,
  singleSubCategory: null,
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    resetCategory: (state) => {
      state.selectedCategory = null
      state.singleCategory = null
    },
    resetSubCategory: (state) => {
      state.selectedSubCategory = null
      state.singleSubCategory = null
    },
    resetData: (state) => {
      state.selectedCategory = null
      state.selectedSubCategory = null
      state.singleCategory = null
      state.singleSubCategory = null
    },
    setSelectedCategory: (
      state,
      action: PayloadAction<CategoryResponse | null>,
    ) => {
      state.selectedCategory = action.payload
      if (action?.payload) {
        state.singleCategory = {
          title: action.payload.title,
          Slug: action.payload.Slug,
        }
      } else {
        state.singleCategory = null
      }
    },
    setSelectedSubCategory: (
      state,
      action: PayloadAction<SubCategoryResponse | CategoryResponse | null>,
    ) => {
      state.selectedSubCategory = action.payload
      if (action?.payload) {
        const data = action.payload as SubCategoryResponse
        state.singleSubCategory = {
          title: data.title,
          Slug: action.payload.Slug,
          category: data.category,
        }
      } else {
        state.singleSubCategory = null
      }
    },
    setSingleCategory: (
      state,
      action: PayloadAction<Pick<CategoryResponse, 'title' | 'Slug'> | null>,
    ) => {
      state.singleCategory = action.payload
    },
  },
})

// Actions
export const categoryAction = categorySlice.actions

export default categorySlice.reducer
