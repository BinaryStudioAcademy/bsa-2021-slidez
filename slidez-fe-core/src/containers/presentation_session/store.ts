import { SnapshotDto } from './dto/SnapshotDto'
import { LoadSessionStatus } from './enums/load-session-status'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as WebSocketService from '../../services/ws/ws-service'
import { WsConnectionStatus } from './enums/ws-connection-status'
import { RootState } from '../../store'

export interface PresentationSessionState {
    connectionStatus: string
    loadStatus: string
    snapshot: SnapshotDto | undefined
}

const initialState: PresentationSessionState = {
    connectionStatus: WsConnectionStatus.ESTABLISHING,
    loadStatus: LoadSessionStatus.IN_PROGRESS,
    snapshot: undefined,
}

const gotSnapshot = createAsyncThunk(
    'presentationSession/gotSnapshot',
    async (snapshot: SnapshotDto) => {
        const out: PresentationSessionState = { ...initialState }
        out.snapshot = snapshot
        out.loadStatus =
            snapshot.status === 'OK'
                ? LoadSessionStatus.OK
                : LoadSessionStatus.FAILED
        return out
    }
)

export const initWebSocketSession = createAsyncThunk(
    'presentationSession/initWebSocketSession',
    async (link: string, { dispatch }) => {
        const out: PresentationSessionState = { ...initialState }
        const onConnectionSuccess = () => {
            out.connectionStatus = WsConnectionStatus.CONNECTED
        }
        const onGetSnapshot = (snapshot: SnapshotDto) => {
            dispatch(gotSnapshot(snapshot))
        }
        await WebSocketService.connectToAllEvents(
            link,
            onConnectionSuccess,
            onGetSnapshot
        ).then(() => WebSocketService.sendSnapshotRequest(link))
        return out
    }
)

export const presentationSessionSlice = createSlice({
    name: 'presentationSession',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initWebSocketSession.fulfilled, (state, action) => {
                state.connectionStatus = action.payload.connectionStatus
            })
            .addCase(gotSnapshot.fulfilled, (state, action) => {
                state.loadStatus = action.payload.loadStatus
                state.snapshot = action.payload.snapshot
            })
    },
})

export const selectConnectionStatus = (state: RootState) =>
    state.presentationSession.connectionStatus

export const selectSnapshot = (state: RootState) =>
    state.presentationSession.snapshot

export default presentationSessionSlice.reducer
