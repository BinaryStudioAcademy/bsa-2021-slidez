import * as WsHelper from './ws-helper'
import { WsEndpoint } from './ws-endpoint'
import { Message } from 'webstomp-client'

export const connect = () => {
    const msg = { name: 'Alex' }
    const subscribeCallback = (message: Message) => {
        alert(message.body)
    }
    const connectCallback = () => WsHelper.send('/slidez/hello', msg)
    WsHelper.disconnect()
    WsHelper.connect(
        WsEndpoint.REACT_APP_WEB_SOCKET_ENDPOINT,
        '/topic/greetings',
        subscribeCallback,
        connectCallback
    )
}
