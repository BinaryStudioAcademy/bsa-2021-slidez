import { SessionResponseType } from '../enums/SessionResponse'
import { SnapshotDto } from './SnapshotDto'
import { PollDto } from './InteractiveElement'
import { SessionPollAnswer } from '../model/SessionPollAnswer'
import { QASessionQuestionDto } from './QASessionQuestionDto'
import { LikeQuestionDto } from './LikeQuestionDto'

export interface SessionResponse {
    type: SessionResponseType
    data:
        | SnapshotDto
        | PollDto
        | SessionPollAnswer
        | QASessionQuestionDto
        | LikeQuestionDto
}
