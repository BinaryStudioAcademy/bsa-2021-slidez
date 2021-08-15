import { configureStore } from '@reduxjs/toolkit'
import eventBus from '../containers/event-bus/redux/eventBusSlice'
import authentication from '../containers/login/redux/authenticationSlice'

export const store = configureStore({
    reducer: {
        eventBus,
        authentication,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
