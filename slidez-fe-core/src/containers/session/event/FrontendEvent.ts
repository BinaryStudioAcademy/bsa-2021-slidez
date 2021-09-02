import { SessionPollAnswer } from '../model/SessionPollAnswer'
import {
    AnswerPollEvent,
    AskQuestionEvent,
    DomainEventType,
    SnapshotEvent,
    StartPollEvent,
} from './DomainEvent'

const defaultAuthorName = 'Anonymous'

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

export type AskQuestionRequest = {
    link: string
    event: AskQuestionEvent
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

export const createAskQuestionRequest = (
    link: string,
    question: string,
    authorNickname: string | undefined | null,
    qaSessionId: string
): AskQuestionRequest => {
    return {
        link: link,
        event: {
            type: DomainEventType.askQuestionEvent,
            question: {
                question: question,
                authorNickname: authorNickname || defaultAuthorName,
                qaSessionId: qaSessionId,
            },
        },
    }
}
