import React, { useState } from 'react'
import * as WebSocketService from '../../services/ws/ws-service'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
    initWebSocketSession,
    selectConnectionStatus,
    selectSnapshot,
} from '../../containers/presentation_session/store'
import { WsConnectionStatus } from '../../containers/presentation_session/enums/ws-connection-status'

// @ts-ignore
const EventPage = () => {
    const [sentConnectionRequest, setSentConnectionRequest] = useState(false)
    // @ts-ignore
    const { link } = useParams()
    const dispatch = useAppDispatch()
    if (!sentConnectionRequest) {
        setSentConnectionRequest(true)
        dispatch(initWebSocketSession(link))
        setTimeout(() => WebSocketService.disconnect(), 10_000)
    }
    const connectionStatus = useAppSelector(selectConnectionStatus)
    const snapshot = useAppSelector(selectSnapshot)

    const getHeader = () => {
        return (
            <h1>
                {connectionStatus === WsConnectionStatus.CONNECTED
                    ? 'Connected :D'
                    : 'Disconnected :('}
            </h1>
        )
    }

    const getBody = () => {
        if (snapshot === undefined) {
            return null
        }
        return <div>{JSON.stringify(snapshot)}</div>
    }

    return (
        <div>
            {getHeader()}
            <br />
            {getBody()}
        </div>
    )
}

export default EventPage
