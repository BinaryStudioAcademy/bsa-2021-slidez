import SockJS from 'sockjs-client'
import Stomp, { Client, Message, Subscription } from 'webstomp-client'
// @ts-ignore
import AbstractXHRObject from 'sockjs-client/lib/transport/browser/abstract-xhr'

export interface WsHelper {
    send: (stompSendDestination: string, message: object) => void
    connect: (url: string) => Promise<any>
    disconnect: () => void
    subscribe: (
        stompSubscribeDestination: string,
        onMessage: (message: Message) => void
    ) => Subscription | undefined
}

export const WsHelper = (() => {
    let instance: WsHelper | undefined = undefined

    let socket: WebSocket | undefined = undefined
    let stompClient: Client | undefined = undefined

    const _start = AbstractXHRObject.prototype._start

    AbstractXHRObject.prototype._start = function (
        method: any,
        url: any,
        payload: any,
        opts: { noCredentials: boolean }
    ) {
        if (!opts) {
            opts = { noCredentials: true }
        }
        return _start.call(this, method, url, payload, opts)
    }

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
            stompClient!.connect(
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
