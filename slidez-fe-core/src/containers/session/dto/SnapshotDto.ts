import { InteractiveElement } from './InteractiveElement'

export interface SnapshotDto {
    sessionInteractiveElements: InteractiveElement[]
    currentInteractiveElement: InteractiveElement | undefined
    presentationLink: string
}
