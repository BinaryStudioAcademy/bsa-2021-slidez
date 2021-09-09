import { SnapshotDto } from '../dto/SnapshotDto'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as SessionService from '../../../services/session/session-service'
import { createPresentationSession } from '../../../services/session/session-service'
import { WsConnectionStatus } from '../enums/ws-connection-status'
import { responseHandler } from './responseHandler'
import {
    InteractiveElement,
    PollDto,
    QASessionDto,
} from '../dto/InteractiveElement'
import {
    AddReactionRequest,
    AnswerPollRequest,
    AskQuestionRequest,
    createSnapshotRequest,
    SlideChangedRequest,
    LikeQuestionRequest,
    SetQuestionVisibilityRequest,
    SnapshotRequest,
    EndInteractionRequest,
} from '../event/FrontendEvent'
import { CreatePresentationSessionDto } from '../../../services/session/dto/CreatePresentationSessionDto'
import { SessionPollAnswer } from '../model/SessionPollAnswer'
import { InteractiveElementType } from '../enums/InteractiveElementType'
import { QASessionQuestionDto } from '../dto/QASessionQuestionDto'
import { LikeQuestionDto } from '../dto/LikeQuestionDto'
import { ParticipantData } from '../../../services/participant/dto/ParticipantData'
import { getParticipantData } from '../../../services/participant/participant-service'
import { QuestionVisibilityDto } from '../dto/QuestionVisibilityDto'

export interface PresentationSessionState {
    connectionStatus: WsConnectionStatus
    error: string | undefined
    snapshot: SnapshotDto | undefined
    currentInteractiveElement: InteractiveElement | undefined | null
    qAndASession: QASessionDto | undefined | null
    link: string | undefined
}

const initialState: PresentationSessionState = {
    connectionStatus: WsConnectionStatus.ESTABLISHING,
    error: undefined,
    snapshot: undefined,
    currentInteractiveElement: undefined,
    qAndASession: undefined,
    link: undefined,
}

export const setQandAQuestions = createAsyncThunk(
    'QandA/set-questions',
    async (questions: QASessionQuestionDto[]) => {
        return questions
    }
)

export const createSessionForPresentation = createAsyncThunk(
    'sessions/create',
    async (dto: CreatePresentationSessionDto) => {
        return await createPresentationSession(dto)
    }
)

export const requestEndCurrentInteraction = createAsyncThunk(
    'request/interaction-end',
    async (dto: EndInteractionRequest) => {
        SessionService.sendRequest(dto.link, dto.event)
    }
)

export const endCurrentInteraction = createAsyncThunk(
    'interaction/end',
    async () => {}
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
        return snapshot
    }
)

export const requestSlideChanged = createAsyncThunk(
    'interaction/request',
    async (params: SlideChangedRequest) => {
        SessionService.sendRequest(params.link, params.event)
    }
)

export const receiveStartPoll = createAsyncThunk(
    'poll/received',
    async (poll: PollDto) => {
        return poll
    }
)

export const answerPoll = createAsyncThunk(
    'poll/answer',
    async (request: AnswerPollRequest) => {
        SessionService.sendRequest(request.link, request.event)
    }
)

export const addReaction = createAsyncThunk(
    'reactions/add',
    async (request: AddReactionRequest) => {
        console.log('send', request)
        SessionService.sendRequest(request.link, request.event)
    }
)

export const receiveAnswerPoll = createAsyncThunk(
    'poll/answer-received',
    async (answer: SessionPollAnswer) => {
        return answer
    }
)

export const askQuestion = createAsyncThunk(
    'QandA/ask-question',
    async (request: AskQuestionRequest) => {
        SessionService.sendRequest(request.link, request.event)
    }
)

export const receiveQuestion = createAsyncThunk(
    'QandA/receive-question',
    async (answer: QASessionQuestionDto) => {
        return answer
    }
)

export const likeQuestion = createAsyncThunk(
    'QandA/like-question',
    async (request: LikeQuestionRequest) => {
        SessionService.sendRequest(request.link, request.event)
    }
)

export const receiveLikeQuestion = createAsyncThunk(
    'QandA/receive-like-question',
    async (answer: LikeQuestionDto) => {
        return answer
    }
)

export const setQuestionVisibility = createAsyncThunk(
    'QandA/set-visibility-to-question',
    async (request: SetQuestionVisibilityRequest) => {
        SessionService.sendRequest(request.link, request.event)
    }
)

export const receiveQuestionVisibility = createAsyncThunk(
    'QandA/receive-question-visibility',
    async (visibility: QuestionVisibilityDto) => {
        return visibility
    }
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

const transformQuestionsForLike = (
    questions: QASessionQuestionDto[],
    likedQuestionId: string,
    participantId: string | null
) => {
    if (!participantId) {
        return
    }
    for (const question of questions) {
        if (question.id === likedQuestionId) {
            if (question.likedBy.includes(participantId)) {
                question.likedBy = question.likedBy.filter(
                    (id: string) => id !== participantId
                )
            } else {
                question.likedBy.push(participantId)
            }
            break
        }
    }
}

const transformQuestionsForVisibility = (
    questions: QASessionQuestionDto[],
    idOfQuestionWithChangedVisibility: string,
    isVisible: boolean
) => {
    for (const question of questions) {
        if (question.id === idOfQuestionWithChangedVisibility) {
            question.isVisible = isVisible
            break
        }
    }
}

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
            .addCase(receiveStartPoll.fulfilled, (state, action) => {
                state.snapshot?.sessionInteractiveElements.push(action.payload)
                state.currentInteractiveElement = action.payload
            })
            .addCase(receiveSnapshot.fulfilled, (state, action) => {
                const snapshotDto: SnapshotDto = action.payload
                state.snapshot = snapshotDto
                state.currentInteractiveElement =
                    snapshotDto.currentInteractiveElement
                state.qAndASession = snapshotDto.currentQASession
            })
            .addCase(receiveAnswerPoll.fulfilled, (state, action) => {
                if (
                    state.currentInteractiveElement?.type ===
                    InteractiveElementType.poll
                ) {
                    const poll: PollDto = <PollDto>(
                        state.currentInteractiveElement
                    )
                    poll.answers.push(action.payload)
                }
            })
            .addCase(receiveQuestion.fulfilled, (state, action) => {
                if (state.qAndASession) {
                    state.qAndASession.questions.push(action.payload)
                }
            })
            .addCase(receiveLikeQuestion.fulfilled, (state, action) => {
                if (!state.qAndASession) {
                    return
                }
                const participantData: ParticipantData = getParticipantData()
                transformQuestionsForLike(
                    state.qAndASession.questions,
                    action.payload.questionId,
                    participantData.id
                )
            })
            .addCase(receiveQuestionVisibility.fulfilled, (state, action) => {
                if (!state.qAndASession) {
                    return
                }
                transformQuestionsForVisibility(
                    state.qAndASession.questions,
                    action.payload.questionId,
                    action.payload.isVisible
                )
            })
            .addCase(setQandAQuestions.fulfilled, (state, action) => {
                if (state.qAndASession) {
                    state.qAndASession.questions = action.payload
                }
            })
            .addCase(endCurrentInteraction.fulfilled, (state, action) => {
                state.currentInteractiveElement = undefined
            })
    },
})

export default presentationSessionSlice.reducer
