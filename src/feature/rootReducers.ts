import { combineReducers } from "@reduxjs/toolkit";
import API from "../app/services/api";
import authSlice from "./auth/authSlice";
import commonSlice from "./common/commonSlice";
import coreSlice from "./core/coreSlice";
import layoutSlice from "./layout/layoutSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  core: coreSlice,
  common: commonSlice,
  layout: layoutSlice,
  [API.reducerPath]: API.reducer,
});

export default rootReducer;
