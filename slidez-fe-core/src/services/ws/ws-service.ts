import { WsHelper } from './ws-helper'
import { WsEndpoint } from './ws-endpoint'
import { Message } from 'webstomp-client'
import {
    DomainEvent,
    DomainEventType,
} from '../../containers/presentation_session/event/DomainEvent'
import { store } from '../../store'
import {
    answerPoll,
    requestSnapshot,
    startPoll,
} from '../../containers/presentation_session/store'

export const connectToInteractiveEvents = (
    sessionLink: string,
    onConnectionSuccess: () => void
) => {
    return WsHelper.getInstance()
        .connect(WsEndpoint.ENDPOINT)
        .then(() => onConnectionSuccess())
        .then(() =>
            WsHelper.getInstance().subscribe(
                `${WsEndpoint.TOPIC_EVENT}/${sessionLink}`,
                (message: Message) =>
                    onEvent(sessionLink, JSON.parse(message.body))
            )
        )
        .catch((error: any) => console.log(error))
}

export const disconnect = () => {
    WsHelper.getInstance().disconnect()
}

export const sendRequest = (link: string, event: DomainEvent) => {
    WsHelper.getInstance().send(`${WsEndpoint.QUEUE_EVENT}/${link}`, event)
}

function throwBadEvent(ev: never): never {
    throw new Error("Didn't expect to get here")
}

const onEvent = (sessionLink: string, event: DomainEvent) => {
    switch (event.type) {
        case DomainEventType.startPollEvent:
            store.dispatch(startPoll(event))
            break
        case DomainEventType.snapshotRequestEvent:
            store.dispatch(requestSnapshot(event))
            break
        case DomainEventType.answerPollEvent:
            store.dispatch(answerPoll(event))
            break
        default:
            throwBadEvent(event)
    }
}
