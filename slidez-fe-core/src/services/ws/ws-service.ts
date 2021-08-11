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
    const promise = WsHelper.connect(WsEndpoint.REACT_APP_WEB_SOCKET_ENDPOINT)
        .then(() => WsHelper.subscribe('/topic/greetings', onMessage))
        .then(onConnectionSuccess)
        .catch((error) => console.log(error))
}

export const connectToAllEvents = (sessionLink: string) => {
    WsHelper.connect(WsEndpoint.REACT_APP_WEB_SOCKET_ENDPOINT)
        .then(() =>
            WsHelper.subscribe(
                `${WsEndpoint.REACT_APP_WEB_SOCKET_SNAPSHOT}/${sessionLink}`
            )
        )
        .then(() =>
            WsHelper.subscribe(
                `${WsEndpoint.REACT_APP_WEB_SOCKET_CREATED_POLL}/${sessionLink}`
            )
        )
        .then(() =>
            WsHelper.subscribe(
                `${WsEndpoint.REACT_APP_WEB_SOCKET_ANSWERED_POLL}/${sessionLink}`
            )
        )
        .catch((error) => console.log(error))
}

export const disconnect = () => {
    WsHelper.disconnect()
}
