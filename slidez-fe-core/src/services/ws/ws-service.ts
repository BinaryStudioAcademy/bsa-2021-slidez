import { WsHelper } from './ws-helper'
import { WsEndpoint } from './ws-endpoint'
import { Message } from 'webstomp-client'
import { AnswerPollDto } from './dto/AnswerPollDto'

export const connectToAllEvents = (
    sessionLink: string,
    onConnectionSuccess: () => void,
    onGetSnapshot: (response: string) => void,
    onVoted: () => void
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
                `${WsEndpoint.ANSWERED_POLL_TOPIC}/${sessionLink}`,
                (message: Message) => onVoted()
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

export const sendAnswerPollRequest = (dto: AnswerPollDto) => {
    WsHelper.getInstance().send(
        `${WsEndpoint.ANSWER_POLL_QUEUE}/${dto.link}`,
        dto
    )
}
