import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { EventBusConnectionStatus, useEventBus } from '../../hooks/event-bus'
import { connect } from './redux/eventBusSlice'

const Loader = () => <span>Loader...</span>
const FailedToConnect = () => <span> Failed to connect to event bus </span>

const EventBusConnector: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const eventBus = useEventBus()
    useEffect(() => {
        if (eventBus.connected === EventBusConnectionStatus.CONNECTED) {
            dispatch(connect())
        }
    }, [eventBus.connected])

    if (
        eventBus.connected === EventBusConnectionStatus.NOT_INITIALIZED ||
        eventBus.connected === EventBusConnectionStatus.CONNECTING
    ) {
        return <Loader />
    }
    if (eventBus.connected === EventBusConnectionStatus.FAILED) {
        return <FailedToConnect />
    }

    return <>Connected successfully</>
}

export default EventBusConnector
