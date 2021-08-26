import { SessionPoll } from '../model/SessionPoll'
import { SessionPollAnswer } from '../model/SessionPollAnswer'

export enum DomainEventType {
    startPollEvent = 'startPollEvent',
    snapshotRequestEvent = 'snapshotRequestEvent',
    answerPollEvent = 'answerPollEvent',
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
