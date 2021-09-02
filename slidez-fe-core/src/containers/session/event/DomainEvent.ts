import { SessionPollAnswer } from '../model/SessionPollAnswer'
import { AskQuestionDto } from '../dto/AskQuestionDto'

export enum DomainEventType {
    startPollEvent = 'StartPollEvent',
    snapshotRequestEvent = 'SnapshotRequestedEvent',
    answerPollEvent = 'AnswerPollEvent',
    askQuestionEvent = 'AskQuestionEvent',
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

export type DomainEvent =
    | StartPollEvent
    | SnapshotEvent
    | AnswerPollEvent
    | AskQuestionEvent
