import { useEffect, useState } from 'react'
import {
    ChromeMessageConnector,
    BasicMessagingBus,
    isRunningInChrome,
    MESSAGING_TOPIC,
} from 'slidez-shared'

export enum EventBusConnectionStatus {
    NOT_INITIALIZED = 'not_initialized',
    CONNECTED = 'connected',
    CONNECTING = 'connecting',
    FAILED = 'failed',
}
export type EventBusState =
    | { connected: EventBusConnectionStatus.NOT_INITIALIZED }
    | { connected: EventBusConnectionStatus.CONNECTING }
    | { connected: EventBusConnectionStatus.FAILED }
    | {
          connected: EventBusConnectionStatus.CONNECTED
          eventBus: BasicMessagingBus
      }

let messageBusState: EventBusState = {
    connected: EventBusConnectionStatus.NOT_INITIALIZED,
}

export const getMessageBusUnsafe: () => BasicMessagingBus | undefined = () =>
    messageBusState.connected === EventBusConnectionStatus.CONNECTED
        ? messageBusState.eventBus
        : undefined

/**
 * WARNING: this effect works with module-level state, which is not reactive. Make sure that single entry point waits for proper event bus connection setup with either success or fail before other
 */
export const useEventBus = (extensionId: string) => {
    const [state, setState] = useState<EventBusState>(messageBusState)

    useEffect(() => {
        //violates event bus operational procedure
        if (messageBusState.connected === EventBusConnectionStatus.CONNECTING) {
            throw new Error(
                '[Event Bus]: Detected concurrent event bus connection attempt. Wait until proper connection established before rendering any other components with useEventBus hook'
            )
        }
        //already initialized => state is initialized
        if (
            messageBusState.connected !==
            EventBusConnectionStatus.NOT_INITIALIZED
        ) {
            return
        }
        if (!isRunningInChrome()) {
            messageBusState = { connected: EventBusConnectionStatus.FAILED }
            setState(messageBusState)
            return
        }
        ChromeMessageConnector.connect({
            descriptor: extensionId,
        })
            .then((driver) => {
                messageBusState = {
                    connected: EventBusConnectionStatus.CONNECTED,
                    eventBus: new BasicMessagingBus(driver),
                }
                setState(messageBusState)
            })
            .catch((error) => {
                console.error('Caught message bus init error', error)
                messageBusState = {
                    connected: EventBusConnectionStatus.FAILED,
                }
                setState(messageBusState)
            })
    }, [])

    return state
}
