import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../containers/counter/store'
import userReducer from '../containers/user/store'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
