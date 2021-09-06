import { SessionPollAnswer } from '../model/SessionPollAnswer'
import { AskQuestionDto } from '../dto/AskQuestionDto'
import { LikeQuestionDto } from '../dto/LikeQuestionDto'
import { QuestionVisibilityDto } from '../dto/QuestionVisibilityDto'

export enum DomainEventType {
    startPollEvent = 'StartPollEvent',
    snapshotRequestEvent = 'SnapshotRequestedEvent',
    answerPollEvent = 'AnswerPollEvent',
    askQuestionEvent = 'AskQuestionEvent',
    likeQuestionEvent = 'LikeQuestionEvent',
    setQuestionVisibilityEvent = 'SetQuestionVisibilityEvent',
}

export type StartPollEvent = {
    type: DomainEventType.startPollEvent
    slideId: string
}

export type SnapshotEvent = {
    type: DomainEventType.snapshotRequestEvent
}

export type AnswerPollEvent = {
    type: DomainEventType.answerPollEvent
    pollAnswer: SessionPollAnswer
}

export type AskQuestionEvent = {
    type: DomainEventType.askQuestionEvent
    question: AskQuestionDto
}

export type LikeQuestionEvent = {
    type: DomainEventType.likeQuestionEvent
    questionLike: LikeQuestionDto
}

export type SetQuestionVisibilityEvent = {
    type: DomainEventType.setQuestionVisibilityEvent
    visibility: QuestionVisibilityDto
}

export type DomainEvent =
    | StartPollEvent
    | SnapshotEvent
    | AnswerPollEvent
    | AskQuestionEvent
    | LikeQuestionEvent
    | SetQuestionVisibilityEvent
