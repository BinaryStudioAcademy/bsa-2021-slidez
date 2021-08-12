import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from '../containers/user/store'
import presentationReducer from '../containers/presentation_session/store'

export const store = configureStore({
    reducer: {
        user: userReducer,
        presentationSession: presentationReducer,
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
