import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './authSlice'
import loadReducer from './loadSlice'
import notyfyReducer from './notifycationSlide'
import statusReducer from './statusSlics'
import { RootState } from './types'
import { combineReducers } from "redux"

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  auth: authReducer,
  load: loadReducer,
  notify: notyfyReducer,
  status: statusReducer
}))


const store = configureStore({
  reducer: {
    root: persistedReducer
  }
})

export const persistor = persistStore(store)

export default store