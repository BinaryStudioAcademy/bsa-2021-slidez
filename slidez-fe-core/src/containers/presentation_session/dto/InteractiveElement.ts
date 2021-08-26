import { InteractiveElementType } from '../enums/InteractiveElementType'

export interface InteractiveElement {
    id: string
    type: InteractiveElementType
    slideId: string
    ownerId: string
}
