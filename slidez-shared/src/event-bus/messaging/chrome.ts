import { ProtocolMessage } from '../protocol'
import { MessageBusConnector, MessageBusDriver } from './contract'

export class ChromeMessageBusDriver implements MessageBusDriver {
    constructor(private readonly port: chrome.runtime.Port) {}
    sendMessage(message: ProtocolMessage): void {
        console.log('Sending message', message)
        this.port.postMessage(message)
    }
    setMessageHandler(handler: (message: ProtocolMessage) => void): void {
        this.port.onMessage.addListener((message: any) => handler(message))
    }
}

export class ChromeMultiPortMessageBusDriver implements MessageBusDriver {
    private ports: chrome.runtime.Port[]
    private handler: (message: ProtocolMessage) => void
    constructor() {
        this.ports = []
        this.handler = () => {}
    }
    addPort(port: chrome.runtime.Port) {
        port.onMessage.addListener(this.handler)
        port.onDisconnect.addListener(
            () => (this.ports = this.ports.filter((p) => p !== port))
        )
        this.ports.push(port)
    }
    sendMessage(message: ProtocolMessage): void {
        this.ports.forEach((port) => port.postMessage(message))
    }
    setMessageHandler(handler: (message: ProtocolMessage) => void): void {
        this.ports.forEach((port) =>
            port.onMessage.removeListener(this.handler)
        )
        this.handler = handler
        this.ports.forEach((port) => port.onMessage.addListener(this.handler))
    }
}

export const ChromeMessageConnector: MessageBusConnector = {
    connect({ descriptor }) {
        try {
            if (!chrome.runtime?.connect) {
                throw new Error(
                    'Failed to connect to chrome message passing capabilities'
                )
            }
            return Promise.resolve(
                new ChromeMessageBusDriver(
                    chrome.runtime.connect(descriptor as any)
                )
            )
        } catch (error) {
            console.error(error)
            return Promise.reject(error)
        }
    },
}
