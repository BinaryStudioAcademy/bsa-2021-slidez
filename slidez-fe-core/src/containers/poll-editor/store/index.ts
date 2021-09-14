import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    DeleteSlideSuccess,
    EventType,
    InsertSlideSuccess,
    UpdateSlideSuccess,
} from 'slidez-shared'
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
import { UpdatePollDto } from '../dto'

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
    presentationName: string
    polls: PollInteractiveElement[]
    qaSessions: QaInteractiveElement[]
    quizzes: QuizInteractiveElement[]
    session: {
        code: string
        presentationName: string
    } | null
    pollToUpdate: PollInteractiveElement | null
    loading: boolean
}

const initialState: EditorState = {
    isFetching: false,
    activeTab: null,
    error: null,
    session: null,
    presentationId: '',
    presentationName: '',
    qaSessions: [],
    quizzes: [],
    polls: [],
    pollToUpdate: null,
    loading: false,
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
        dispatch(setLoading(true))
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
        dispatch(setLoading(false))
        return presentationData
    }
)

export const deleteSlide = createAsyncThunk(
    'delete-slide',
    async (slideId: string) => {
        const data =
            await getMessageBusUnsafe()!.sendMessageAndListen<DeleteSlideSuccess>(
                {
                    type: EventType.DELETE_SLIDE,
                    data: {
                        id: slideId,
                    },
                },
                EventType.DELETE_SLIDE_SUCCESS,
                5000
            )
    }
)

export const deletePoll = createAsyncThunk(
    'delete-poll',
    async (pollDto: PollInteractiveElement, { dispatch }) => {
        dispatch(deleteSlide(pollDto.slideId))
        await httpHelper.doDelete(`/polls/${pollDto.slideId}`)
        return pollDto
    }
)

export const deleteQA = createAsyncThunk(
    'delete-qa',
    async (QADto: QaInteractiveElement, { dispatch }) => {
        dispatch(deleteSlide(QADto.slideId))
        await httpHelper.doDelete(`/qa-sessions/${QADto.slideId}`)
        return QADto
    }
)

export const updatePoll = createAsyncThunk(
    'update-poll',
    async (pollUpdateDto: UpdatePollDto, { dispatch }) => {
        dispatch(setLoading(true))
        const data =
            await getMessageBusUnsafe()!.sendMessageAndListen<UpdateSlideSuccess>(
                {
                    type: EventType.UPDATE_SLIDE,
                    data: {
                        id: pollUpdateDto.slideId,
                        title: pollUpdateDto.title,
                    },
                },
                EventType.UPDATE_SLIDE_SUCCESS,
                5000
            )
        await httpHelper.doPatch(`/polls/${pollUpdateDto.id}`, pollUpdateDto)
        dispatch(setActiveTab(null))
        dispatch(setLoading(false))
        return pollUpdateDto
    }
)
export const createQA = createAsyncThunk(
    'create-qa',
    async (qaWriteDto: WriteQADto, { dispatch }) => {
        dispatch(setLoading(true))
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
        dispatch(setLoading(false))
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

        setPollToUpdate: (
            state: EditorState,
            payload: PayloadAction<PollInteractiveElement | null>
        ) => {
            state.pollToUpdate = payload.payload
        },

        setLoading: (state: EditorState, payload: PayloadAction<boolean>) => {
            state.loading = payload.payload
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
            .addCase(deletePoll.pending, (state) => {
                state.error = null
            })
            .addCase(deletePoll.fulfilled, (state, action) => {
                state.error = null
                state.polls = state.polls.filter(
                    (poll) => poll.id != action.payload.id
                )
            })
            .addCase(deletePoll.rejected, (state, errorResponse) => {
                state.error = errorResponse.error.message ?? null
            })
            .addCase(deleteQA.pending, (state) => {
                state.error = null
            })
            .addCase(deleteQA.fulfilled, (state, action) => {
                state.error = null
                state.qaSessions = state.qaSessions.filter(
                    (qa) => qa.id != action.payload.id
                )
            })
            .addCase(deleteQA.rejected, (state, errorResponse) => {
                state.error = errorResponse.error.message ?? null
            })
            .addCase(updatePoll.pending, (state) => {
                state.error = null
            })
            .addCase(updatePoll.fulfilled, (state, action) => {
                state.error = null
                state.polls = state.polls.map((poll) =>
                    poll.id === action.payload.id
                        ? {
                              ...poll,
                              title: action.payload.title,
                              pollOptions: action.payload.options,
                          }
                        : poll
                )
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

export const {
    setPresentationId,
    setActiveTab,
    setActiveSession,
    setPollToUpdate,
    setLoading,
} = editorSlice.actions

export default editorSlice.reducer
