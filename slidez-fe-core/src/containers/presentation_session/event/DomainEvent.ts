import { SessionPoll } from '../model/SessionPoll'
import { SessionPollAnswer } from '../model/SessionPollAnswer'

export enum DomainEventType {
    startPollEvent = 'StartPollEvent',
    snapshotRequestEvent = 'SnapshotRequestedEvent',
    answerPollEvent = 'AnswerPollEvent',
}

export type StartPollEvent = {
    type: DomainEventType.startPollEvent
    pollId: string
    sessionPoll: SessionPoll
}

export type SnapshotRequestEvent = {
    type: DomainEventType.snapshotRequestEvent
}

export type AnswerPollEvent = {
    type: DomainEventType.answerPollEvent
    pollAnswer: SessionPollAnswer
}

export type DomainEvent =
    | StartPollEvent
    | SnapshotRequestEvent
    | AnswerPollEvent
