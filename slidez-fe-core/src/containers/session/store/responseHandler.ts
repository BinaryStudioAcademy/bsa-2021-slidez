import {
    receiveAnswerPoll,
    receiveLikeQuestion,
    receiveQuestion,
    receiveQuestionVisibility,
    receiveSnapshot,
    receiveStartPoll,
} from './store'
import { SessionResponseType } from '../enums/SessionResponse'
import { SessionResponse } from '../dto/SessionResponse'
import { SnapshotDto } from '../dto/SnapshotDto'
import { GenericResponse } from 'slidez-shared/src/net/dto/GenericResponse'
import { PollDto } from '../dto/InteractiveElement'
import { SessionPollAnswer } from '../model/SessionPollAnswer'
import { QASessionQuestionDto } from '../dto/QASessionQuestionDto'
import { LikeQuestionDto } from '../dto/LikeQuestionDto'
import { QuestionVisibilityDto } from '../dto/QuestionVisibilityDto'

function throwBadType(type: string): never {
    throw new Error("Didn't expect to get here")
}

export const responseHandler =
    (dispatch: any) => (response: GenericResponse<SessionResponse, string>) => {
        if (response.error) {
            throw new Error(response.error)
        }
        if (!response.data) {
            return
        }
        switch (response.data.type) {
            case SessionResponseType.snapshot:
                const snapshot: SnapshotDto = <SnapshotDto>response.data.data
                dispatch(receiveSnapshot(snapshot))
                break
            case SessionResponseType.answeredPoll:
                const answer: SessionPollAnswer = <SessionPollAnswer>(
                    response.data.data
                )
                dispatch(receiveAnswerPoll(answer))
                break
            case SessionResponseType.startedPoll:
                const poll: PollDto = <PollDto>response.data.data
                dispatch(receiveStartPoll(poll))
                break
            case SessionResponseType.askedQuestion:
                const question: QASessionQuestionDto = <QASessionQuestionDto>(
                    response.data.data
                )
                dispatch(receiveQuestion(question))
                break
            case SessionResponseType.likedQuestion:
                const questionLike: LikeQuestionDto = <LikeQuestionDto>(
                    response.data.data
                )
                dispatch(receiveLikeQuestion(questionLike))
                break
            case SessionResponseType.setQuestionVisibility:
                const questionVisibility = <QuestionVisibilityDto>(
                    response.data.data
                )
                dispatch(receiveQuestionVisibility(questionVisibility))
                break
            default:
                throwBadType(response.data.type)
        }
    }
