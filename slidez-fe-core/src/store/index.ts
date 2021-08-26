import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from '../containers/user/store'
import presentationReducer from '../containers/presentation_session/store'
import editorReducer from '../containers/poll-editor/store'
import { reducer as toastrReducer } from 'react-redux-toastr'

export const store = configureStore({
    reducer: {
        user: userReducer,
        presentationSession: presentationReducer,
        toastr: toastrReducer,
        editor: editorReducer,
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
