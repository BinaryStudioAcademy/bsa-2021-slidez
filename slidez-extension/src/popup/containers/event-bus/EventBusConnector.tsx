import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AuthenticationDetails, EventType, of } from 'slidez-shared'
import { EventBusConnectionStatus, useEventBus } from '../../hooks/event-bus'
import { setToken } from '../login/redux/authenticationSlice'
import { connect } from './redux/eventBusSlice'

const Loader = () => <span>Loader...</span>
const FailedToConnect = () => <span> Failed to connect to event bus </span>

const EventBusConnector: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const eventBus = useEventBus()
    useEffect(() => {
        if (eventBus.connected === EventBusConnectionStatus.CONNECTED) {
            eventBus.eventBus.registerEventHandler(
                EventType.AUTH_DETAILS,
                of((authData: AuthenticationDetails) => {
                    if (authData.data.success) {
                        setToken(authData.data.accessToken)
                    }
                })
            )
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
