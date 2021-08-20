import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
    initWebSocketSession,
    selectConnectionStatus,
    selectSnapshot,
} from '../../containers/presentation_session/store'
import { WsConnectionStatus } from '../../containers/presentation_session/enums/ws-connection-status'
import Loader from '../../common/components/loader/Loader'
import Poll from '../../common/components/interactive-elements/poll/Poll'
import { poll } from '../../common/components/interactive-elements/poll/dto/pollDtoMock'
import InteractiveWrapper from '../../common/components/interactive-elements/interactive-wrapper/InteractiveWrapper'

const EventPage: React.FC = () => {
    const { link } = useParams<{ link?: string }>()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (link) {
            dispatch(initWebSocketSession(link))
        }
    }, [])

    const connectionStatus = useAppSelector(selectConnectionStatus)
    const snapshot = useAppSelector(selectSnapshot)

    const activePoll = snapshot?.polls.find((poll) => poll)

    const body = activePoll ?? <>Waiting for an interaction to start...</>
    return (
        <div>
            {connectionStatus !== WsConnectionStatus.CONNECTED && <Loader />}
            <InteractiveWrapper eventCode='aaacce'>{body}</InteractiveWrapper>
        </div>
    )
}

export default EventPage
