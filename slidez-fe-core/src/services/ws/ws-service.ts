import * as WsHelper from './ws-helper'
import { WsEndpoint } from './ws-endpoint'
import { Message } from 'webstomp-client'
import { SnapshotDto } from '../../containers/presentation_session/dto/SnapshotDto'

export const connectToAllEvents = (
    sessionLink: string,
    onConnectionSuccess: Function = () => {},
    onGetSnapshot: Function = (snapshot: SnapshotDto) => {}
) => {
    return WsHelper.connect(WsEndpoint.ENDPOINT)
        .then(() => onConnectionSuccess())
        .then(() =>
            WsHelper.subscribe(
                `${WsEndpoint.SNAPSHOT_TOPIC}/${sessionLink}`,
                (message: Message) => onGetSnapshot(message.body)
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
