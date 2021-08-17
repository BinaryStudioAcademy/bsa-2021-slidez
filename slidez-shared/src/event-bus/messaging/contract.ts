import { ProtocolMessage } from '../protocol'

export interface MessageBusDriver{
    sendMessage(message: ProtocolMessage): void;
    setMessageHandler(handler: (message: ProtocolMessage) => void): void;
}

export type ConnectDetails = {
    descriptor?: string,
    name?: string,
    delay?: number 
}

export interface MessageBusConnector{
    /**
     * Connects to a topic with a delay.
     */
    connect(details: ConnectDetails): Promise<MessageBusDriver>;
}