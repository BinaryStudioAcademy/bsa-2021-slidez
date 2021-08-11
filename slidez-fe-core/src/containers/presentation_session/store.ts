import { SnapshotDto } from './dto/SnapshotDto'
import { LoadSessionStatus } from './enums/load-session-status'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as WebSocketService from '../../services/ws/ws-service'

export interface PresentationSessionState {
    loadStatus: string
    snapshot: SnapshotDto | undefined
}

const initialState: PresentationSessionState = {
    loadStatus: LoadSessionStatus.OK,
    snapshot: undefined,
}

export const initWebSocketSession = createAsyncThunk(
    'presentationSession/initWebSocketSession',
    async (link: string) => {
        return WebSocketService.connectToAllEvents(link).then(() =>
            WebSocketService.getSnapshot()
        )
    }
)

export const presentationSessionSlice = createSlice({
    name: 'presentationSession',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initWebSocketSession.fulfilled, (state, action) => {
            // const status: string = action.payload.status
            // state.loadStatus = status
            // if (status === LoadSessionStatus.OK) {
            //     state.snapshot = action.payload.snapshot
            // }
        })
    },
})
