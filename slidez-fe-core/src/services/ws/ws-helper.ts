import SockJS from 'sockjs-client'
import Stomp, { Client, Message } from 'webstomp-client'

let socket: WebSocket | undefined = undefined
let stompClient: Client | undefined = undefined

export const send = (stompSendDestination: string, message: object = {}) => {
    if (stompClient && stompClient.connected) {
        stompClient.send(stompSendDestination, JSON.stringify(message), {})
    }
}

export const connect = (url: string) => {
    socket = new SockJS(url)
    stompClient = Stomp.over(socket)
    stompClient.debug = () => {}
    return new Promise((resolve, reject) => {
        // @ts-ignore
        stompClient.connect(
            {},
            (frame) => {
                if (stompClient && stompClient.connected) {
                    resolve(true)
                }
            },
            (error) => {
                reject(error)
            }
        )
    })
}

export const disconnect = () => {
    if (stompClient && stompClient.connected) {
        stompClient.disconnect()
    }
}

export const subscribe = (
    stompSubscribeDestination: string,
    onMessage: Function = (message: Message) => {}
) => {
    if (stompClient && stompClient.connected) {
        return stompClient.subscribe(
            stompSubscribeDestination,
            (message: Message) => onMessage(message)
        )
    }
    return undefined
}
