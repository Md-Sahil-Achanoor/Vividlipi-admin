import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryResponse, CategoryState } from "../../types";

const initialState: CategoryState = {
  loading: false,
  adding: false,
  error: "",
  selectedCategory: null,
  reRender: false,
};

// export type AdselectedCategorys = (typeof initialState)[keyof typeof initialState];

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    rerenderVendor: (state) => {
      state.reRender = !state.reRender;
    },
    resetWithReload: (state) => {
      state.reRender = !state.reRender;
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
    },
  },
});

// Actions
export const categoryAction = categorySlice.actions;

export default categorySlice.reducer;
