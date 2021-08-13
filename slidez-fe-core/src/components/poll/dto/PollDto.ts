import { PollAnswerDto } from './PollAnswerDto'
import { PollOptionDto } from './PollOptionDto'

export type PollDto = {
    name: string
    options: PollOptionDto[]
    answers: Record<number, PollAnswerDto[]>
}
