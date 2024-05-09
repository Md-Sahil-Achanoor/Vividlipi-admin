import { ProductResponse, ProductState } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ProductState = {
  selectedProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // rerenderVendor: (state) => {
    //   state.reRender = !state.reRender;
    // },
    // resetWithReload: (state) => {
    //   state.reRender = !state.reRender;
    // },
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
