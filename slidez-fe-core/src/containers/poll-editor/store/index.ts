import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventType, InsertSlideSuccess } from 'slidez-shared'
import { handleNotification } from '../../../common/notification/Notification'
import { getMessageBusUnsafe } from '../../../hooks/event-bus'
import httpHelper from '../../../services/http/http-helper'
import { CreatePresentationSessionDto } from '../../../services/session/dto/CreatePresentationSessionDto'
import { createPresentationSession } from '../../../services/session/session-service'
import {
    QaInteractiveElement,
    PollInteractiveElement,
    QuizInteractiveElement,
    FetchInteractiveElementsResponse,
    isPollInteractiveElement,
    isQaSessionElement,
    isQuizInteractiveElement,
    WritePollDto,
    WriteQADto,
} from '../../../types/editor'

export enum EditorTab {
    QA = 'qa',
    POLL = 'poll',
    QUIZ = 'quiz',
    MENU = 'menu',
}

type EditorState = {
    isFetching: boolean
    activeTab: EditorTab | null
    error: string | null
    presentationId: string
    polls: PollInteractiveElement[]
    qaSessions: QaInteractiveElement[]
    quizzes: QuizInteractiveElement[]
    session: {
        code: string
        presentationName: string
    } | null
}

const initialState: EditorState = {
    isFetching: false,
    activeTab: null,
    error: null,
    session: null,
    presentationId: '',
    qaSessions: [],
    quizzes: [],
    polls: [],
}

export const preloadState = createAsyncThunk(
    'init-load',
    async (presentationId: string, { dispatch }) => {
        dispatch(setPresentationId(presentationId))

        const presentationData: FetchInteractiveElementsResponse = (
            await httpHelper.doGet(
                `/presentation/${presentationId}/interactions`
            )
        ).data.data
        return presentationData
    }
)

export const loadActiveSession = createAsyncThunk(
    'load-active-session',
    async (presentationId: string, { dispatch }) => {
        try {
            const sessionData = await httpHelper.doGet(
                `/presentation/${presentationId}/active-session`
            )
            const sessionCode = sessionData.data.data.code
            dispatch(setActiveSession(sessionCode))

            getMessageBusUnsafe()!.sendMessageNoCallback({
                type: EventType.SET_ACTIVE_SESSION,
                data: { presentationId, sessionCode: sessionCode },
            })
        } catch (error) {
            //remove active session
            getMessageBusUnsafe()!.sendMessageNoCallback({
                type: EventType.SET_ACTIVE_SESSION,
                data: { presentationId, sessionCode: null },
            })
            throw error
        }
    }
)

export const createSessionForPresentation = createAsyncThunk(
    'create-session',
    async (dto: CreatePresentationSessionDto, { dispatch }) => {
        try {
            const res = await createPresentationSession(dto)
            const link = res.link

            dispatch(setActiveSession(link))

            getMessageBusUnsafe()!.sendMessageNoCallback({
                type: EventType.SET_ACTIVE_SESSION,
                data: {
                    presentationId: dto.presentationLink,
                    sessionCode: link,
                },
            })
        } catch (error: any) {
            handleNotification(
                'Failed to create session',
                error.message,
                'error'
            )
        }
    }
)

export const createPoll = createAsyncThunk(
    'create-poll',
    async (pollWriteDto: WritePollDto, { dispatch }) => {
        const data =
            await getMessageBusUnsafe()!.sendMessageAndListen<InsertSlideSuccess>(
                {
                    type: EventType.INSERT_SLIDE,
                    data: {
                        id: pollWriteDto.slideId,
                        title: `Poll: ${pollWriteDto.title}`,
                    },
                },
                EventType.INSERT_SLIDE_SUCCESS,
                5000
            )
        const presentationData: FetchInteractiveElementsResponse = (
            await httpHelper.doPost('/polls', pollWriteDto)
        ).data.data
        dispatch(setActiveTab(null))
        return presentationData
    }
)

export const createQA = createAsyncThunk(
    'create-qa',
    async (qaWriteDto: WriteQADto, { dispatch }) => {
        const data =
            await getMessageBusUnsafe()!.sendMessageAndListen<InsertSlideSuccess>(
                {
                    type: EventType.INSERT_SLIDE,
                    data: {
                        id: qaWriteDto.slideId,
                        title: `Question: ${qaWriteDto.title}`,
                    },
                },
                EventType.INSERT_SLIDE_SUCCESS,
                5000
            )
        const presentationData: FetchInteractiveElementsResponse = (
            await httpHelper.doPost('/qa-sessions/new', qaWriteDto)
        ).data.data
        dispatch(setActiveTab(null))
        return presentationData
    }
)

const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setPresentationId: (
            state: EditorState,
            payload: PayloadAction<string>
        ) => {
            state.presentationId = payload.payload
        },

        setActiveTab: (
            state: EditorState,
            payload: PayloadAction<EditorTab | null>
        ) => {
            state.activeTab = payload.payload
        },

        setActiveSession: (
            state: EditorState,
            payload: PayloadAction<string>
        ) => {
            state.session = {
                ...(state.session ?? { presentationName: '' }),
                code: payload.payload,
            }
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(preloadState.pending, (state) => {
                state.isFetching = true
                state.error = null
            })
            .addCase(preloadState.fulfilled, (state, editorData) => {
                state.isFetching = false
                state.error = null
                state.polls = editorData.payload.filter(
                    isPollInteractiveElement
                )
                state.qaSessions = editorData.payload.filter(isQaSessionElement)
                state.quizzes = editorData.payload.filter(
                    isQuizInteractiveElement
                )
            })
            .addCase(preloadState.rejected, (state, errorResponse) => {
                state.error = errorResponse.error.message ?? null
            })
            .addCase(createPoll.pending, (state) => {
                state.isFetching = true
                state.error = null
            })
            .addCase(createPoll.fulfilled, (state, action) => {
                state.isFetching = false
                state.error = null
                state.polls = state.polls
                    .concat(action.payload as PollInteractiveElement[])
                    .filter(isPollInteractiveElement)
            })
            .addCase(createPoll.rejected, (state, errorResponse) => {
                state.error = errorResponse.error.message ?? null
            })
            .addCase(createQA.pending, (state) => {
                state.isFetching = true
                state.error = null
            })
            .addCase(createQA.fulfilled, (state, action) => {
                state.isFetching = false
                state.error = null
                state.qaSessions = state.qaSessions
                    .concat(action.payload as QaInteractiveElement[])
                    .filter(isQaSessionElement)
            })
            .addCase(createQA.rejected, (state, errorResponse) => {
                state.error = errorResponse.error.message ?? null
            })
            .addCase(loadActiveSession.rejected, (state, error) => {
                state.session = null
            }),
})

export const { setPresentationId, setActiveTab, setActiveSession } =
    editorSlice.actions

export default editorSlice.reducer
