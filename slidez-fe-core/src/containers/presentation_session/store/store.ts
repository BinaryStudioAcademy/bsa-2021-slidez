import { SnapshotDto } from '../dto/SnapshotDto'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as WebSocketService from '../../../services/ws/ws-service'
import { WsConnectionStatus } from '../enums/ws-connection-status'
import { GenericResponse } from 'slidez-shared/src/net/dto/GenericResponse'
import { CreatePresentationSessionDto } from '../../../services/presentation-session/dto/CreatePresentationSessionDto'
import { createPresentationSession } from '../../../services/presentation-session/presentation-session-servise'
import {
    AnswerPollEvent,
    SnapshotRequestEvent,
    StartPollEvent,
} from '../event/DomainEvent'
import { eventHandler } from './eventHandler'

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

export const startPoll = createAsyncThunk(
    'poll/start',
    async (event: StartPollEvent) => {}
)

export const requestSnapshot = createAsyncThunk(
    'snapshot/get',
    async (event: SnapshotRequestEvent) => {}
)

export const answerPoll = createAsyncThunk(
    'poll/answer',
    async (event: AnswerPollEvent) => {}
)

export const initWebSocketSession = createAsyncThunk(
    'presentationSession/initWebSocketSession',
    async (link: string, { dispatch }) => {
        const out: PresentationSessionState = { ...initialState }
        const onConnectionSuccess = () => {
            out.connectionStatus = WsConnectionStatus.CONNECTED
        }
        const onEvent = eventHandler(dispatch)

        await WebSocketService.connectToInteractiveEvents(
            link,
            onConnectionSuccess,
            onEvent
        )

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
            .addCase(
                createSessionForPresentation.fulfilled,
                (state, action) => {
                    state.link = action.payload.link
                }
            )
            .addCase(startPoll.fulfilled, (state, action) => {})
            .addCase(requestSnapshot.fulfilled, (state, action) => {})
            .addCase(answerPoll.fulfilled, (state, action) => {})
    },
})

export default presentationSessionSlice.reducer
