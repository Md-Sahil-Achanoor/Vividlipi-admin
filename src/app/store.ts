import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import rootReducer from '../feature/rootReducers'
import API, { rtkQueryErrorLogger } from './services/api'
import albumsQuery from '@/feature/albums/albumsQuery'

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined,
) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(API.middleware)
        .concat(albumsQuery.middleware)
        .concat(rtkQueryErrorLogger),
    ...options,
  })

export const store = createStore()

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
