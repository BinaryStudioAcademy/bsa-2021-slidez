import { DomainEvent, DomainEventType } from '../event/DomainEvent'
import { startPoll, requestSnapshot, answerPoll } from './store'

function throwBadEvent(ev: never): never {
    throw new Error("Didn't expect to get here")
}

export const eventHandler = (dispatch: any) => (event: DomainEvent) => {
    switch (event.type) {
        case DomainEventType.startPollEvent:
            dispatch(startPoll(event))
            break
        case DomainEventType.snapshotRequestEvent:
            dispatch(requestSnapshot(event))
            break
        case DomainEventType.answerPollEvent:
            dispatch(answerPoll(event))
            break
        default:
            throwBadEvent(event)
    }
}
