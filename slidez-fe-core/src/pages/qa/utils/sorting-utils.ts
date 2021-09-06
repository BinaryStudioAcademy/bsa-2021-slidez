import { QASessionQuestionDto } from '../../../containers/session/dto/QASessionQuestionDto'
import { QASessionDto } from '../../../containers/session/dto/InteractiveElement'

export const getQuestionsSortedByDate = (
    qaSession: QASessionDto | null | undefined
): QASessionQuestionDto[] => {
    if (!qaSession || !qaSession.questions) {
        return []
    }
    const sorted: QASessionQuestionDto[] = [
        ...(qaSession?.questions?.filter(
            (question: QASessionQuestionDto) => question.isVisible
        ) || []),
    ]
    sorted.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    return sorted
}

export const getQuestionsSortedByLikes = (
    qaSession: QASessionDto | null | undefined
): QASessionQuestionDto[] => {
    if (!qaSession || !qaSession.questions) {
        return []
    }
    const sorted: QASessionQuestionDto[] = [
        ...(qaSession?.questions?.filter(
            (question: QASessionQuestionDto) => question.isVisible
        ) || []),
    ]
    sorted.sort((a, b) => b.likedBy.length - a.likedBy.length)
    return sorted
}
