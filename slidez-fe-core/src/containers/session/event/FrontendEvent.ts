import { SessionPollAnswer } from '../model/SessionPollAnswer'
import {
    DomainEventType,
    AnswerPollEvent,
    SnapshotEvent,
    StartPollEvent,
} from './DomainEvent'

export type StartPollRequest = {
    link: string
    event: StartPollEvent
}

export type SnapshotRequest = {
    link: string
    event: SnapshotEvent
}

export type AnswerPollRequest = {
    link: string
    event: AnswerPollEvent
}

export const createStartPollRequest = (
    link: string,
    slideId: string
): StartPollRequest => {
    return {
        link,
        event: { type: DomainEventType.startPollEvent, slideId },
    }
}

export const createSnapshotRequest = (link: string): SnapshotRequest => {
    return {
        link,
        event: { type: DomainEventType.snapshotRequestEvent },
    }
}

export const createAnswerPollRequest = (
    link: string,
    pollAnswer: SessionPollAnswer
): AnswerPollRequest => {
    return {
        link,
        event: { type: DomainEventType.answerPollEvent, pollAnswer },
    }
}
