import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CategoryResponse,
  CategoryState,
  SubCategoryResponse,
} from "../../types";

const initialState: CategoryState = {
  selectedCategory: null,
  selectedSubCategory: null,
  singleCategory: null,
  singleSubCategory: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategory: (state) => {
      state.selectedCategory = null;
      state.singleCategory = null;
    },
    resetSubCategory: (state) => {
      state.selectedSubCategory = null;
      state.singleSubCategory = null;
    },
    // resetWithReload: (state) => {
    //   state.reRender = !state.reRender;
    // },
    resetData: (state) => {
      state.selectedCategory = null;
      state.selectedSubCategory = null;
      state.singleCategory = null;
      state.singleSubCategory = null;
    },
    // setSelectedVendor: (
    //   state,
    //   action: PayloadAction<VendorResponse | null>
    // ) => {
    //   state.selectedVendor = action.payload;
    // },
    setSelectedCategory: (
      state,
      action: PayloadAction<CategoryResponse | null>
    ) => {
      state.selectedCategory = action.payload;
      if (action?.payload) {
        state.singleCategory = {
          title: action.payload.title,
        };
      } else {
        state.singleCategory = null;
      }
    },
    setSelectedSubCategory: (
      state,
      action: PayloadAction<SubCategoryResponse | CategoryResponse | null>
    ) => {
      state.selectedSubCategory = action.payload;
      if (action?.payload) {
        const data = action.payload as SubCategoryResponse;
        state.singleSubCategory = {
          title: data.title,
          category: data.category,
        };
      } else {
        state.singleSubCategory = null;
      }
    },
    setSingleCategory: (
      state,
      action: PayloadAction<Pick<CategoryResponse, "title"> | null>
    ) => {
      state.singleCategory = action.payload;
    },
  },
});

// Actions
export const categoryAction = categorySlice.actions;

export default categorySlice.reducer;
