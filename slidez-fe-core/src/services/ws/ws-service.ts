import * as WsHelper from './ws-helper'
import { WsEndpoint } from './ws-endpoint'
import { Message } from 'webstomp-client'

export const helloConnect = () => {
    const msg = { name: 'Alex' }
    const onMessage = (message: Message) => {
        alert(message.body)
    }
    const onConnectionSuccess = () => WsHelper.send('/slidez/hello', msg)
    WsHelper.disconnect()
    const promise = WsHelper.connect(WsEndpoint.ENDPOINT)
        .then(() => WsHelper.subscribe('/topic/greetings', onMessage))
        .then(onConnectionSuccess)
        .catch((error) => console.log(error))
}

export const connectToAllEvents = (sessionLink: string) => {
    const onMessage = (message: Message) => {
        alert(message.body)
    }
    return WsHelper.connect(WsEndpoint.ENDPOINT)
        .then(() =>
            WsHelper.subscribe(
                `${WsEndpoint.SNAPSHOT_TOPIC}/${sessionLink}`,
                onMessage
            )
        )
        .then(() =>
            WsHelper.subscribe(
                `${WsEndpoint.CREATED_POLL_TOPIC}/${sessionLink}`
            )
        )
        .then(() =>
            WsHelper.subscribe(
                `${WsEndpoint.ANSWERED_POLL_TOPIC}/${sessionLink}`
            )
        )
        .catch((error) => console.log(error))
}

export const disconnect = () => {
    WsHelper.disconnect()
}

export const sendSnapshotRequest = (sessionLink: string) => {
    WsHelper.send(`${WsEndpoint.SNAPSHOT_QUEUE}/${sessionLink}`)
}
