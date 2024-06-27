import { combineReducers } from '@reduxjs/toolkit'
import API from '../app/services/api'
import authSlice from './auth/authSlice'
import authorSlice from './author/authorSlice'
import categorySlice from './category/categorySlice'
import commonSlice from './common/commonSlice'
import coreSlice from './core/coreSlice'
import homeSlice from './home/homeSlice'
import layoutSlice from './layout/layoutSlice'
import productSlice from './product/productSlice'
import publisherSlice from './publisher/publisherSlice'
import userManagementSlice from './user-management/userManagementSlice'

const rootReducer = combineReducers({
  auth: authSlice,
  core: coreSlice,
  common: commonSlice,
  layout: layoutSlice,
  category: categorySlice,
  product: productSlice,
  userManagement: userManagementSlice,
  publisher: publisherSlice,
  author: authorSlice,
  home: homeSlice,
  [API.reducerPath]: API.reducer,
})

export default rootReducer
