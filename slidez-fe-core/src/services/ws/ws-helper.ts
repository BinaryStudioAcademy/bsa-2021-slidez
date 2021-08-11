import SockJS from 'sockjs-client'
import Stomp, { Client, Message } from 'webstomp-client'

let socket: WebSocket | undefined = undefined
let stompClient: Client | undefined = undefined

export const send = (stompSendDestination: string, message: object) => {
    if (stompClient && stompClient.connected) {
        stompClient.send(stompSendDestination, JSON.stringify(message), {})
    }
}

export const connect = (
    url: string,
    stompSubscribeDestination: string,
    subscribeCallback: Function = (message: Message) => {},
    connectCallback: Function = () => {}
) => {
    socket = new SockJS(url)
    stompClient = Stomp.over(socket)
    stompClient.debug = () => {}
    stompClient.connect(
        {},
        (frame) => {
            if (stompClient && stompClient.connected) {
                stompClient.subscribe(
                    stompSubscribeDestination,
                    (message: Message) => subscribeCallback(message)
                )
            }
            connectCallback()
        },
        (error) => {
            console.log(error)
        }
    )
}

export const disconnect = () => {
    if (stompClient && stompClient.connected) {
        stompClient.disconnect()
    }
}
