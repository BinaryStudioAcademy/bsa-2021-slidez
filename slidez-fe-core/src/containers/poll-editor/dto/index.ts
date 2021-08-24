export type CreatePollOptionDto = {
    title: string
}

export type CreatePollDto = {
    title: string
    pollId?: string | null
    options: CreatePollOptionDto[]
}
