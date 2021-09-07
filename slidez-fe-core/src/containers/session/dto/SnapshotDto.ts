import { InteractiveElement, QASessionDto } from './InteractiveElement'

export interface SnapshotDto {
    sessionInteractiveElements: InteractiveElement[]
    currentInteractiveElement: InteractiveElement | undefined | null
    currentQASession: QASessionDto | undefined | null
    presentationLink: string
}
