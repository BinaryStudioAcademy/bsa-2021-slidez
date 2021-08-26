import { WsHelper } from './ws-helper'
import { WsEndpoint } from './ws-endpoint'
import { Message } from 'webstomp-client'
import {
    DomainEvent,
    DomainEventType,
} from '../../containers/presentation_session/event/DomainEvent'

export const connectToInteractiveEvents = (
    sessionLink: string,
    onConnectionSuccess: () => void,
    onEvent: (sessionLink: string, event: DomainEvent) => void
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
