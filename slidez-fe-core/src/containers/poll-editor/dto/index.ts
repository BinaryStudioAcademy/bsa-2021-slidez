import { ReadPollDto } from '../../../types/editor'

export type CreatePollOptionDto = {
    title: string
}

export type CreatePollDto = {
    title: string
    presentationId: string
    presentationName: string
    options: CreatePollOptionDto[]
}

export type UpdatePollDto = {
    id: string
    title: string
    slideId: string
    options: ReadPollDto[]
}
