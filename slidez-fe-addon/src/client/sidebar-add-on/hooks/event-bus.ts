import { useEffect, useState } from 'react';
import {
    ChromeMessageConnector,
    BasicMessagingBus,
    isRunningInChrome,
    MESSAGING_TOPIC,
    InsertSlide,
    DeleteSlide,
    UpdateSlide,
    EventType,
    of,
    InsertSlideRequestSuccess,
    DeleteSlideRequestSuccess,
    UpdateSlideRequestSuccess,
} from 'slidez-shared';
import { EXTENSION_ID } from '../env';
import { runGoogleScript } from '../helpers';

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
        connected: EventBusConnectionStatus.CONNECTED;
        eventBus: BasicMessagingBus;
    };

let messageBusState: EventBusState = {
    connected: EventBusConnectionStatus.NOT_INITIALIZED,
};

export const getMessageBusUnsafe: () => BasicMessagingBus | undefined = () =>
    messageBusState.connected === EventBusConnectionStatus.CONNECTED
        ? messageBusState.eventBus
        : undefined;

/**
 * WARNING: this effect works with module-level state, which is not reactive. Make sure that single entry point waits for proper event bus connection setup with either success or fail before other
 */
export const useEventBus = () => {
    const [state, setState] = useState<EventBusState>(messageBusState);

    useEffect(() => {
        //violates event bus operational procedure
        if (messageBusState.connected === EventBusConnectionStatus.CONNECTING) {
            throw new Error(
                '[Event Bus]: Detected concurrent event bus connection attempt. Wait until proper connection established before rendering any other components with useEventBus hook'
            );
        }
        //already initialized => state is initialized
        if (
            messageBusState.connected !==
            EventBusConnectionStatus.NOT_INITIALIZED
        ) {
            return;
        }
        if (!isRunningInChrome()) {
            messageBusState = { connected: EventBusConnectionStatus.FAILED };
            setState(messageBusState);
            return;
        }
        ChromeMessageConnector.connect({
            descriptor: EXTENSION_ID,
        })
            .then(driver => {
                messageBusState = {
                    connected: EventBusConnectionStatus.CONNECTED,
                    eventBus: new BasicMessagingBus(driver),
                };
                setState(messageBusState);
                return messageBusState.eventBus;
            })
            .then(registerListeners)
            .catch(error => {
                console.error('Caught message bus init error', error);
                messageBusState = {
                    connected: EventBusConnectionStatus.FAILED,
                };
                setState(messageBusState);
            });
    }, []);

    return state;
};

const registerListeners = (bus: BasicMessagingBus) => {
    bus.registerEventHandler(
        EventType.INSERT_SLIDE,
        of<InsertSlide>(event => {
            console.log('Slide insert request intercepted!');
            runGoogleScript<InsertSlideRequestSuccess>(
                'insertSlide',
                event.data
            ).then(data =>
                bus.sendMessageNoCallback({
                    type: EventType.INSERT_SLIDE_SUCCESS,
                    data,
                })
            );
        })
    );

    bus.registerEventHandler(
        EventType.DELETE_SLIDE,
        of<DeleteSlide>(event => {
            console.log('Slide delete request intercepted!');
            runGoogleScript<DeleteSlideRequestSuccess>(
                'deleteSlide',
                event.data
            ).then(data =>
                bus.sendMessageNoCallback({
                    type: EventType.DELETE_SLIDE_SUCCESS,
                    data
                })
            )
        })
    )

    bus.registerEventHandler(
        EventType.UPDATE_SLIDE,
        of<UpdateSlide>(event => {
            console.log('Slide update request intercepted!');
            runGoogleScript<UpdateSlideRequestSuccess>(
                'updateSlide',
                event.data
            ).then(data =>
                bus.sendMessageNoCallback({
                    type: EventType.UPDATE_SLIDE_SUCCESS,
                    data
                })
            )
        })
    )

    console.log('Registered listeners!');
};
