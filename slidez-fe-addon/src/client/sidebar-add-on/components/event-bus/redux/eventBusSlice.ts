import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum EventBusStatus {
    INITIALIZING = 'initializing',
    CONNECTION_FAILED = 'connection_failed',
    CONNECTED_NOT_AUTHENTICATED = 'connected_not_authenticated',
    CONNECTED_READY = 'connected_ready',
}

export interface EventBusState {
    connectionStatus: EventBusStatus;
    accessToken?: string;
}

const initialState: EventBusState = {
    connectionStatus: EventBusStatus.INITIALIZING,
};

export const eventBusSlice = createSlice({
    name: 'eventBus',
    initialState,
    reducers: {
        connect: (state: EventBusState, token: PayloadAction<string>) => {
            state.connectionStatus = EventBusStatus.CONNECTED_READY;
            state.accessToken = token.payload;
        },
        connectionTimeout: (state) => {
            state.connectionStatus = EventBusStatus.CONNECTION_FAILED;
        },
        connectionNotAuthenticated: (state) => {
            state.connectionStatus = EventBusStatus.CONNECTED_NOT_AUTHENTICATED;
        },
    },
});

// Action creators are generated for each case reducer function
export const { connect, connectionNotAuthenticated, connectionTimeout } =
    eventBusSlice.actions;

export default eventBusSlice.reducer;
