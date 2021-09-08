export type CreatePollOptionDto = {
    title: string
}

export type CreatePollDto = {
    title: string
    presentationId: string
    presentationName: string
    options: CreatePollOptionDto[]
}
