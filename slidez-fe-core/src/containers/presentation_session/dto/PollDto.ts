import { PollOptionDto } from './PollOptionDto'
import { InteractiveElement } from './InteractiveElement'
import { PollAnswerDto } from './PollAnswerDto'

export interface PollDto extends InteractiveElement {
    title: string
    isMulti: boolean
    isTemplate: boolean
    options: PollOptionDto[]
    answers: PollAnswerDto[]
}
