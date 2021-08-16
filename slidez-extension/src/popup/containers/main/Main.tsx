import React from 'react'
import EventBusConnector from '../event-bus/EventBusConnector'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import Login from '../login/Login'

const Main = () => {
    const { isEventBusConnected } = useSelector((state: RootState) => {
        return { isEventBusConnected: state.eventBus.isReady }
    })
    if (!isEventBusConnected) {
        return <EventBusConnector />
    }
    return <Login />
}

export default Main
