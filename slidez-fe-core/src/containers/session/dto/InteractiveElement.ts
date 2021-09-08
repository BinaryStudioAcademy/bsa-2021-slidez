import { InteractiveElementType } from '../enums/InteractiveElementType'
import { PollAnswerDto } from './PollAnswerDto'
import { PollOptionDto } from './PollOptionDto'
import { QASessionQuestionDto } from './QASessionQuestionDto'

type AbstractInteractiveElement = {
    id: string
    slideId: string
    ownerId: string
}

export type PollDto = AbstractInteractiveElement & {
    type: InteractiveElementType.poll
    title: string
    isMulti: boolean
    isTemplate: boolean
    options: PollOptionDto[]
    answers: PollAnswerDto[]
}

export type QASessionDto = AbstractInteractiveElement & {
    type: InteractiveElementType.qaSession
    title: string
    questions: QASessionQuestionDto[]
}

// Poll | Quiz in the future
export type InteractiveElement = PollDto | QASessionDto
