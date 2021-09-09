import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from '../containers/user/store'
import presentationReducer from '../containers/session/store/store'
import presentationInfoReducer from '../pages/dashboard/store'
import editorReducer from '../containers/poll-editor/store'
import reactionReducer from '../pages/interactive/presenter/ReactionOverlay/store'
import { reducer as toastrReducer } from 'react-redux-toastr'

export const store = configureStore({
    reducer: {
        user: userReducer,
        presentationSession: presentationReducer,
        presentation: presentationInfoReducer,
        toastr: toastrReducer,
        editor: editorReducer,
        reactions: reactionReducer,
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
