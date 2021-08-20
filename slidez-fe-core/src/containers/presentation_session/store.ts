import { SnapshotDto } from './dto/SnapshotDto'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as WebSocketService from '../../services/ws/ws-service'
import { WsConnectionStatus } from './enums/ws-connection-status'
import { RootState } from '../../store'
import { GenericResponse } from 'slidez-shared/src/net/dto/GenericResponse'
import { CreatePresentationSessionDto } from '../../services/presentation-session/dto/CreatePresentationSessionDto'
import { createPresentationSession } from '../../services/presentation-session/presentation-session-servise'

export interface PresentationSessionState {
    connectionStatus: string
    error: string | undefined
    link: string | undefined
    snapshot: SnapshotDto | undefined
}

const initialState: PresentationSessionState = {
    connectionStatus: WsConnectionStatus.ESTABLISHING,
    error: undefined,
    link: undefined,
    snapshot: undefined,
}

export const createSessionForPresentation = createAsyncThunk(
    'presentationSession/create',
    async (dto: CreatePresentationSessionDto) => {
        return await createPresentationSession(dto)
    }
)

const gotSnapshot = createAsyncThunk(
    'presentationSession/gotSnapshot',
    async (response: string) => {
        const genericResponse: GenericResponse<SnapshotDto, string> =
            JSON.parse(response)
        const out: PresentationSessionState = { ...initialState }
        out.snapshot = genericResponse.data
        out.error = genericResponse.error
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
        const onGetSnapshot = (response: string) => {
            dispatch(gotSnapshot(response))
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
                state.error = action.payload.error
                state.snapshot = action.payload.snapshot
            })
            .addCase(
                createSessionForPresentation.fulfilled,
                (state, action) => {
                    state.link = action.payload.link
                }
            )
    },
})

export const selectConnectionStatus = (state: RootState) =>
    state.presentationSession.connectionStatus

export const selectSnapshot = (state: RootState) =>
    state.presentationSession.snapshot

export const selectLink = (state: RootState) => state.presentationSession.link

export default presentationSessionSlice.reducer
