import { PollOptionDto } from './PollOptionDto'

export interface PollDto {
    id: string
    name: string
    options: PollOptionDto[]
    answers: string[]
}
