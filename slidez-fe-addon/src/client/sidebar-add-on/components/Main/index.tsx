import React from 'react';
import EventBusConnector from '../event-bus/EventBusConnector';
import { useSelector } from 'react-redux';
import Poll from '../Poll/Poll';
import { RootState } from '../../store';
import { EventBusStatus } from '../event-bus/redux/eventBusSlice';

const Main = () => {
    const connectivityStatus = useSelector(
        (state: RootState) => state.eventBus.connectionStatus
    );

    if (connectivityStatus === EventBusStatus.INITIALIZING) {
        return <EventBusConnector />;
    }

    if (connectivityStatus === EventBusStatus.CONNECTION_FAILED) {
        return (
            <div>
                Failed to connect to browser extension. Please, check that it is
                installed and enabled
            </div>
        );
    }

    if (connectivityStatus === EventBusStatus.CONNECTED_NOT_AUTHENTICATED) {
        return <div>Please, authenticate using extension</div>;
    }

    return <Poll />;
};

export default Main;
