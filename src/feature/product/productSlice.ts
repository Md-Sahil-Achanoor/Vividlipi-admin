import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductResponse, ProductState } from "../../types";

const initialState: ProductState = {
  loading: false,
  adding: false,
  error: "",
  selectedProduct: null,
  reRender: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    rerenderVendor: (state) => {
      state.reRender = !state.reRender;
    },
    resetWithReload: (state) => {
      state.reRender = !state.reRender;
    },
    setSelectedProduct: (
      state,
      action: PayloadAction<ProductResponse | null>
    ) => {
      state.selectedProduct = action.payload;
    },
  },
});

// Actions
export const productAction = productSlice.actions;

export default productSlice.reducer;
