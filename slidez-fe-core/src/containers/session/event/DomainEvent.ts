import { SessionPollAnswer } from '../model/SessionPollAnswer'

export enum DomainEventType {
    startPollEvent = 'StartPollEvent',
    snapshotRequestEvent = 'SnapshotRequestedEvent',
    answerPollEvent = 'AnswerPollEvent',
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

export type DomainEvent = StartPollEvent | SnapshotEvent | AnswerPollEvent
