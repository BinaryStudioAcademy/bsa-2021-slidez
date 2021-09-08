export type ReadPollOption = {
    id: string
    title: string
}

export type ReadPollDto = {
    id: string
    title: string
    isTemplate: boolean
    isMultiple: boolean
    pollOptions: ReadPollDto[]
}

export type ReadQuizOption = {
    id: string
    title: string
    isCorrect: boolean
}

export type ReadQuizDto = {
    id: string
    title: string
    isTemplate: boolean
    isMultiple: boolean
    options: ReadQuizOption[]
}

export type ReadQaSessionDto = {
    id: string
    title: string
}

//TODO: check type enum values
export type PollInteractiveElement = {
    id: string
    type: 'POLL'
} & ReadPollDto

//TODO: check type enum values
export type QuizInteractiveElement = {
    id: string
    type: 'QUIZ'
    quiz: ReadQuizDto
}

export type QaInteractiveElement = {
    id: string
    type: 'QASession'
} & ReadQaSessionDto

export type InteractiveElement =
    | PollInteractiveElement
    | QuizInteractiveElement
    | QaInteractiveElement

export type FetchInteractiveElementsResponse = InteractiveElement[]

export type WritePollDto = {
    presentationId: string
    presentationName: string
    slideId: string
    title: string
    options: { title: string }[]
}

export type WriteQADto = {
    presentationId: string
    slideId: string
    title: string
}

export const isPollInteractiveElement = (
    ie: InteractiveElement
): ie is PollInteractiveElement => {
    return ie.type === 'POLL'
}

export const isQuizInteractiveElement = (
    ie: InteractiveElement
): ie is QuizInteractiveElement => {
    return ie.type === 'QUIZ'
}

export const isQaSessionElement = (
    ie: InteractiveElement
): ie is QaInteractiveElement => {
    return ie.type === 'QASession'
}
