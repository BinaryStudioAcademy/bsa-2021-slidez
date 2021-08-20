import SockJS from 'sockjs-client'
import Stomp, { Client, Message } from 'webstomp-client'

export interface WsHelper {
    send: Function
    connect: Function
    disconnect: Function
    subscribe: Function
}

export const WsHelper = (() => {
    let instance: WsHelper | undefined = undefined

    let socket: WebSocket | undefined = undefined
    let stompClient: Client | undefined = undefined

    const send = (stompSendDestination: string, message: object = {}) => {
        if (stompClient && stompClient.connected) {
            stompClient.send(stompSendDestination, JSON.stringify(message), {})
        }
    }

    const connect = (url: string) => {
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

    const disconnect = () => {
        if (stompClient && stompClient.connected) {
            stompClient.disconnect()
        }
    }

    const subscribe = (
        stompSubscribeDestination: string,
        onMessage: (message: Message) => void
    ) => {
        if (stompClient && stompClient.connected) {
            return stompClient.subscribe(
                stompSubscribeDestination,
                (message: Message) => onMessage(message)
            )
        }
        return undefined
    }

    const createInstance = () => {
        return {
            send: send,
            connect: connect,
            disconnect: disconnect,
            subscribe: subscribe,
        }
    }

    return {
        getInstance: () => {
            return instance || (instance = createInstance())
        },
    }
})()
