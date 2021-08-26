import { SnapshotDto } from '../dto/SnapshotDto'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as WebSocketService from '../../../services/ws/ws-service'
import { WsConnectionStatus } from '../enums/ws-connection-status'
import { CreatePresentationSessionDto } from '../../../services/presentation-session/dto/CreatePresentationSessionDto'
import { createPresentationSession } from '../../../services/presentation-session/presentation-session-servise'
import {
    AnswerPollEvent,
    DomainEventType,
    SnapshotRequestEvent,
    StartPollEvent,
} from '../event/DomainEvent'
import { responseHandler } from './responseHandler'
import { InteractiveElement, PollDto } from '../dto/InteractiveElement'

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
    'presentationSession/create',
    async (dto: CreatePresentationSessionDto) => {
        return await createPresentationSession(dto)
    }
)

export type RequestStartPollParams = {
    link: string
    event: StartPollEvent
}

export const createRequestStartPollParams = (
    link: string,
    slideId: string
): RequestStartPollParams => {
    return {
        link: link,
        event: {
            type: DomainEventType.startPollEvent,
            slideId: slideId,
        },
    }
}

export const requestStartPoll = createAsyncThunk(
    'poll/start',
    async (params: RequestStartPollParams) => {
        WebSocketService.sendRequest(params.link, params.event)
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

type RequestSnapshotParams = {
    link: string
    event: SnapshotRequestEvent
}

const createSnapshotRequestParams = (link: string): RequestSnapshotParams => {
    return {
        link: link,
        event: {
            type: DomainEventType.snapshotRequestEvent,
        },
    }
}

export const requestSnapshot = createAsyncThunk(
    'snapshot/get',
    async (params: RequestSnapshotParams) => {
        WebSocketService.sendRequest(params.link, params.event)
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
    async (event: AnswerPollEvent) => {}
)

export const initWebSocketSession = createAsyncThunk(
    'presentationSession/initWebSocketSession',
    async (link: string, { dispatch }) => {
        const out: PresentationSessionState = { ...initialState }
        const onConnectionSuccess = () => {
            out.connectionStatus = WsConnectionStatus.CONNECTED
            const snapshotRequestParams: RequestSnapshotParams =
                createSnapshotRequestParams(link)
            dispatch(requestSnapshot(snapshotRequestParams))
        }
        const onResponse = responseHandler(dispatch)

        await WebSocketService.connectToInteractiveEvents(
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
                console.log(state.snapshot)
                console.log(state.currentInteractiveElement)
            })
            .addCase(receiveSnapshot.fulfilled, (state, action) => {
                state.snapshot = action.payload.snapshot
            })
            .addCase(answerPoll.fulfilled, (state, action) => {})
    },
})

export default presentationSessionSlice.reducer
