import React from 'react'
import * as WebSocketService from '../../services/ws/ws-service'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { initWebSocketSession } from '../../containers/presentation_session/store'

// @ts-ignore
const EventPage = () => {
    // @ts-ignore
    const { link } = useParams()
    const dispatch = useAppDispatch()
    dispatch(initWebSocketSession(link))

    setTimeout(() => WebSocketService.disconnect(), 10_000)
    return <div>Hello</div>
}

export default EventPage
