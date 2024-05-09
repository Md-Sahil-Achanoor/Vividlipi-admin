import { combineReducers } from "@reduxjs/toolkit";
import API from "../app/services/api";
import authSlice from "./auth/authSlice";
import categorySlice from "./category/categorySlice";
import commonSlice from "./common/commonSlice";
import coreSlice from "./core/coreSlice";
import layoutSlice from "./layout/layoutSlice";
import productSlice from "./product/productSlice";
import userManagementSlice from "./user-management/userManagementSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  core: coreSlice,
  common: commonSlice,
  layout: layoutSlice,
  category: categorySlice,
  product: productSlice,
  userManagement: userManagementSlice,
  [API.reducerPath]: API.reducer,
});

export default rootReducer;
