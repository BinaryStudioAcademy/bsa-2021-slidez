import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventType, InsertSlideSuccess } from 'slidez-shared'
import { getMessageBusUnsafe } from '../../../hooks/event-bus'
import httpHelper from '../../../services/http/http-helper'
import {
    QaInteractiveElement,
    PollInteractiveElement,
    QuizInteractiveElement,
    FetchInteractiveElementsResponse,
    isPollInteractiveElement,
    isQaSessionElement,
    isQuizInteractiveElement,
    WritePollDto,
} from '../../../types/editor'

export enum EditorTab {
    QA = 'qa',
    POLL = 'poll',
    QUIZ = 'quiz',
}

type EditorState = {
    isFetching: boolean
    activeTab: EditorTab | null
    error: string | null
    presentationId: string
    polls: PollInteractiveElement[]
    qaSessions: QaInteractiveElement[]
    quizzes: QuizInteractiveElement[]
}

const initialState: EditorState = {
    isFetching: false,
    activeTab: null,
    error: null,
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

export const createPoll = createAsyncThunk(
    'create-poll',
    async (pollWriteDto: WritePollDto) => {
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

        await httpHelper.doPost('/polls', pollWriteDto)
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
            }),
})

export const { setPresentationId, setActiveTab } = editorSlice.actions

export default editorSlice.reducer
