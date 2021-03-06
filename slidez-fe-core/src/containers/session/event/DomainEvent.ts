import { SessionPollAnswer } from '../model/SessionPollAnswer'
import { AskQuestionDto } from '../dto/AskQuestionDto'
import { LikeQuestionDto } from '../dto/LikeQuestionDto'
import { QuestionVisibilityDto } from '../dto/QuestionVisibilityDto'
import { AddReactionDto } from '../dto/AddReactionDto'

export enum DomainEventType {
    addReactionEvent = 'AddReactionEvent',
    startPollEvent = 'StartPollEvent',
    snapshotRequestEvent = 'SnapshotRequestedEvent',
    answerPollEvent = 'AnswerPollEvent',
    askQuestionEvent = 'AskQuestionEvent',
    likeQuestionEvent = 'LikeQuestionEvent',
    setQuestionVisibilityEvent = 'SetQuestionVisibilityEvent',
    slideChangedEvent = 'SlideChangedEvent',
    endInteractionEvent = 'EndInteractionEvent',
}

export type SlideChangedEvent = {
    type: DomainEventType.slideChangedEvent
    slideId: string
}

export type EndInteractionEvent = {
    type: DomainEventType.endInteractionEvent
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

export type AddReactionEvent = {
    type: DomainEventType.addReactionEvent
    reaction: AddReactionDto
}

export type DomainEvent =
    | StartPollEvent
    | SlideChangedEvent
    | EndInteractionEvent
    | SnapshotEvent
    | AnswerPollEvent
    | AskQuestionEvent
    | LikeQuestionEvent
    | SetQuestionVisibilityEvent
    | AddReactionEvent
