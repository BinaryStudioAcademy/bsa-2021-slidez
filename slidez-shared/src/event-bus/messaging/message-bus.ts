import { ProtocolMessage } from '../protocol';
import { MessageBusDriver } from './contract';
import * as MessageListener  from './listener';


export class BasicMessagingBus{
    //Listen for any type
    private globalListeners: MessageListener.MessageListener<any>[] = [];
    //Listen for specific type
    private messageListeners: Partial<Record<ProtocolMessage['type'], MessageListener.MessageListener<any>[]>> = {}

    public constructor(private readonly driver: MessageBusDriver){
        this.driver.setMessageHandler(this.handleIncomingMessage.bind(this));
    }

    private handleIncomingMessage(message: ProtocolMessage) {
        //run for all global listeners
        this.globalListeners = this.globalListeners
            .map(listener => listener(message))
            .filter(x => x !== null) as MessageListener.MessageListener<any>[];

        //run for all message-specific listeners
        this.messageListeners[message.type] = (this.messageListeners[message.type] ?? [])
            .map(listener => listener(message))
            .filter(x => x !== null) as MessageListener.MessageListener<any>[];
    }

    public sendMessageNoCallback(message: ProtocolMessage){
        this.driver.sendMessage(message);
    }

    public listenForMessage<T extends ProtocolMessage>(
        messageType: ProtocolMessage['type'], 
        timeout?: number
        ): Promise<T>{
        return new Promise((res, rej) => {
            let timer: NodeJS.Timeout | null = null;
            const listener: MessageListener.MessageListener<T> = message => {
                if(timer){
                    clearTimeout(timer);
                }
                res(message);
                return null;
            }
            if(timeout){
                setTimeout(() => {
                    this.unregisterEventHandler(messageType, listener);
                    rej(new Error(`Event bus request ${messageType} timeouted`));
                }, timeout);
            }

            this.registerEventHandler(messageType,  listener);
        });
    }

    public sendMessageAndListen<T extends ProtocolMessage>(
        message: ProtocolMessage, 
        messageType: ProtocolMessage['type'], 
        timeout?: number
    ): Promise<T>{
        const listenerPromise = this.listenForMessage<T>(messageType, timeout);
        this.sendMessageNoCallback(message);
        return listenerPromise;
    }

    public unregisterEventHandler(messageType: ProtocolMessage['type'], handler: MessageListener.MessageListener<any>){
        const registeredHandlers = this.messageListeners[messageType] ?? [];
        registeredHandlers.filter(x => x !== handler);
        this.messageListeners[messageType] = registeredHandlers;
    }

    public registerEventHandler(messageType: ProtocolMessage['type'], handler: MessageListener.MessageListener<any>){
        const registeredHandlers = this.messageListeners[messageType] ?? [];
        registeredHandlers.push(handler);
        this.messageListeners[messageType] = registeredHandlers; 
    }
}