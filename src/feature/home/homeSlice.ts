import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FeatureSliderResponse, HomeState } from "../../types";

const initialState: HomeState = {
  selectedFeatureSlider: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    resetHome: (state) => {
      state.selectedFeatureSlider = null;
    },
    setSelectedFeatureSlider: (
      state,
      action: PayloadAction<FeatureSliderResponse>
    ) => {
      state.selectedFeatureSlider = action.payload;
    },
  },
});

// Actions
export const homeAction = homeSlice.actions;

export default homeSlice.reducer;
