import { WsHelper } from './ws-helper'
import { WsEndpoint } from './ws-endpoint'
import { Message } from 'webstomp-client'

export const connectToAllEvents = (
    sessionLink: string,
    onConnectionSuccess: Function = () => {},
    onGetSnapshot: Function = (response: string) => {}
) => {
    return WsHelper.getInstance()
        .connect(WsEndpoint.ENDPOINT)
        .then(() => onConnectionSuccess())
        .then(() =>
            WsHelper.getInstance().subscribe(
                `${WsEndpoint.SNAPSHOT_TOPIC}/${sessionLink}`,
                (message: Message) => onGetSnapshot(message.body)
            )
        )
        .then(() =>
            WsHelper.getInstance().subscribe(
                `${WsEndpoint.CREATED_POLL_TOPIC}/${sessionLink}`
            )
        )
        .then(() =>
            WsHelper.getInstance().subscribe(
                `${WsEndpoint.ANSWERED_POLL_TOPIC}/${sessionLink}`
            )
        )
        .catch((error: any) => console.log(error))
}

export const disconnect = () => {
    WsHelper.getInstance().disconnect()
}

export const sendSnapshotRequest = (sessionLink: string) => {
    WsHelper.getInstance().send(`${WsEndpoint.SNAPSHOT_QUEUE}/${sessionLink}`)
}
