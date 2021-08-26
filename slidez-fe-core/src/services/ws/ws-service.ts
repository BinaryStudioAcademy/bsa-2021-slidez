import { WsHelper } from './ws-helper'
import { WsEndpoint } from './ws-endpoint'
import { Message } from 'webstomp-client'
import { DomainEvent } from '../../containers/presentation_session/event/DomainEvent'
import { SessionResponse } from '../../containers/presentation_session/dto/SessionResponse'

export const connectToInteractiveEvents = (
    sessionLink: string,
    onConnectionSuccess: () => void,
    onResponse: (response: SessionResponse) => void
) => {
    return WsHelper.getInstance()
        .connect(WsEndpoint.ENDPOINT)
        .then(() => onConnectionSuccess())
        .then(() =>
            WsHelper.getInstance().subscribe(
                `${WsEndpoint.TOPIC_EVENT}/${sessionLink}`,
                (message: Message) => onResponse(JSON.parse(message.body))
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
