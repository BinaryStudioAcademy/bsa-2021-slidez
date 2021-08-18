import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AuthenticationDetails, EventType, of } from 'slidez-shared';
import { EventBusConnectionStatus, useEventBus } from '../../hooks/event-bus';
import {
    connect,
    connectionNotAuthenticated,
    connectionTimeout,
} from './redux/eventBusSlice';

const Loader = () => <span>Loader...</span>;

const EventBusConnector: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const eventBus = useEventBus();
    useEffect(() => {
        if (eventBus.connected === EventBusConnectionStatus.CONNECTED) {
            //now request authentication data
            eventBus.eventBus
                .sendMessageAndListen<AuthenticationDetails>(
                    {
                        type: EventType.AUTH_REQUESTED,
                        data: {},
                    },
                    EventType.AUTH_DETAILS,
                    3000
                )
                .then((message) => {
                    if (message.data.success) {
                        return dispatch(connect(message.data.accessToken));
                    }
                    return dispatch(connectionNotAuthenticated());
                })
                .catch(() => dispatch(connectionTimeout()));
        }
        if (eventBus.connected === EventBusConnectionStatus.FAILED) {
            dispatch(connectionTimeout);
            return;
        }
    }, [eventBus.connected]);

    if (
        eventBus.connected === EventBusConnectionStatus.NOT_INITIALIZED ||
        eventBus.connected === EventBusConnectionStatus.CONNECTING
    ) {
        return <Loader />;
    }

    return <>Connected successfully</>;
};

export default EventBusConnector;
