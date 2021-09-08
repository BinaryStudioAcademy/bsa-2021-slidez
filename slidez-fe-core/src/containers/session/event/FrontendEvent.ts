import { Reactions } from '../../../types/reactions'
import { SessionPollAnswer } from '../model/SessionPollAnswer'
import {
    AddReactionEvent,
    AnswerPollEvent,
    AskQuestionEvent,
    DomainEventType,
    LikeQuestionEvent,
    SetQuestionVisibilityEvent,
    SnapshotEvent,
    DisplayInteractionEvent,
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

export type LikeQuestionRequest = {
    link: string
    event: LikeQuestionEvent
}

export type SetQuestionVisibilityRequest = {
    link: string
    event: SetQuestionVisibilityEvent
}

export type AddReactionRequest = {
    link: string
    event: AddReactionEvent
}

export type DisplayInteractionRequest = {
    link: string
    event: DisplayInteractionEvent
}

export const createDisplayInteractionRequest = (
    link: string,
    slideId: string
): DisplayInteractionRequest => {
    return {
        link,
        event: { type: DomainEventType.displayInteractionEvent, slideId },
    }
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

export const createLikeQuestionRequest = (
    link: string,
    questionId: string,
    participantId: string
): LikeQuestionRequest => {
    return {
        link: link,
        event: {
            type: DomainEventType.likeQuestionEvent,
            questionLike: {
                questionId: questionId,
                participantId: participantId,
            },
        },
    }
}

export const createSetQuestionVisibilityRequest = (
    link: string,
    questionId: string,
    isVisible: boolean
): SetQuestionVisibilityRequest => {
    return {
        link: link,
        event: {
            type: DomainEventType.setQuestionVisibilityEvent,
            visibility: {
                questionId: questionId,
                isVisible: isVisible,
            },
        },
    }
}

export const createAddReactionEvent = (
    link: string,
    reactionType: Reactions,
    username: string
): AddReactionRequest => {
    return {
        link,
        event: {
            type: DomainEventType.addReactionEvent,
            reaction: {
                reactionType,
                username,
            },
        },
    }
}
