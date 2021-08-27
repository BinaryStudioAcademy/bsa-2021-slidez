import { InteractiveElementType } from '../enums/InteractiveElementType'
import { PollAnswerDto } from './PollAnswerDto'
import { PollOptionDto } from './PollOptionDto'

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

// Poll | Quiz | QA in the future
export type InteractiveElement = PollDto
