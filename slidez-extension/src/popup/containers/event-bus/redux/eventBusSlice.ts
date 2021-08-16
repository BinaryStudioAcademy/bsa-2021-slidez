import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface EventBusState {
    isReady: boolean
}

const initialState: EventBusState = {
    isReady: false,
}

export const eventBusSlice = createSlice({
    name: 'eventBus',
    initialState,
    reducers: {
        connect: (state) => {
            state.isReady = true
        },
    },
})

// Action creators are generated for each case reducer function
export const { connect } = eventBusSlice.actions

export default eventBusSlice.reducer
