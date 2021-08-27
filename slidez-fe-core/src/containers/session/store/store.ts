import { SnapshotDto } from '../dto/SnapshotDto'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as SessionService from '../../../services/session/session-service'
import { WsConnectionStatus } from '../enums/ws-connection-status'
import { createPresentationSession } from '../../../services/session/session-service'
import { responseHandler } from './responseHandler'
import { InteractiveElement, PollDto } from '../dto/InteractiveElement'
import {
    AnswerPollRequest,
    createSnapshotRequest,
    SnapshotRequest,
    StartPollRequest,
} from '../event/FrontendEvent'
import { CreatePresentationSessionDto } from '../../../services/session/dto/CreatePresentationSessionDto'

export interface PresentationSessionState {
    connectionStatus: string
    error: string | undefined
    snapshot: SnapshotDto | undefined
    currentInteractiveElement: InteractiveElement | undefined
}

const initialState: PresentationSessionState = {
    connectionStatus: WsConnectionStatus.ESTABLISHING,
    error: undefined,
    snapshot: undefined,
    currentInteractiveElement: undefined,
}

export const createSessionForPresentation = createAsyncThunk(
    'sessions/create',
    async (dto: CreatePresentationSessionDto) => {
        return await createPresentationSession(dto)
    }
)

export const requestStartPoll = createAsyncThunk(
    'poll/start',
    async (params: StartPollRequest) => {
        SessionService.sendRequest(params.link, params.event)
    }
)

export const receiveStartPoll = createAsyncThunk(
    'poll/received',
    async (poll: PollDto) => {
        const out: PresentationSessionState = { ...initialState }
        out.snapshot?.sessionInteractiveElements.push(poll)
        out.currentInteractiveElement = poll
        return out
    }
)

export const requestSnapshot = createAsyncThunk(
    'snapshot/get',
    async (params: SnapshotRequest) => {
        SessionService.sendRequest(params.link, params.event)
    }
)

export const receiveSnapshot = createAsyncThunk(
    'snapshot/received',
    async (snapshot: SnapshotDto) => {
        const out: PresentationSessionState = { ...initialState }
        out.snapshot = snapshot
        return out
    }
)

export const answerPoll = createAsyncThunk(
    'poll/answer',
    async (event: AnswerPollRequest) => {}
)

export const initWebSocketSession = createAsyncThunk(
    'presentationSession/initWebSocketSession',
    async (link: string, { dispatch }) => {
        const out: PresentationSessionState = { ...initialState }
        const onConnectionSuccess = () => {
            out.connectionStatus = WsConnectionStatus.CONNECTED
            const snapshotRequest = createSnapshotRequest(link)
            dispatch(requestSnapshot(snapshotRequest))
        }
        const onResponse = responseHandler(dispatch)

        await SessionService.connectToInteractiveEvents(
            link,
            onConnectionSuccess,
            onResponse
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
                (state, action) => {}
            )
            .addCase(receiveStartPoll.fulfilled, (state, action) => {
                state.snapshot = action.payload.snapshot
                state.currentInteractiveElement =
                    action.payload.currentInteractiveElement
            })
            .addCase(receiveSnapshot.fulfilled, (state, action) => {
                state.snapshot = action.payload.snapshot
            })
            .addCase(answerPoll.fulfilled, (state, action) => {})
    },
})

export default presentationSessionSlice.reducer
