import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
    createSessionForPresentation,
    initWebSocketSession,
    selectConnectionStatus,
    selectLink,
    selectSnapshot,
} from '../../containers/presentation_session/store'
import { WsConnectionStatus } from '../../containers/presentation_session/enums/ws-connection-status'
import Loader from '../../common/components/loader/Loader'
import Poll from '../../common/components/interactive-elements/poll/Poll'
import { poll } from '../../common/components/interactive-elements/poll/dto/pollDtoMock'
import InteractiveWrapper from '../../common/components/interactive-elements/interactive-wrapper/InteractiveWrapper'
import { CreatePresentationSessionDto } from '../../services/presentation-session/dto/CreatePresentationSessionDto'

const EventPage: React.FC = () => {
    // const { link } = useParams<{ link?: string }>()
    const query = new URLSearchParams(useLocation().search)
    const presentationId = query.get('presentationLink') ?? ''
    const link: string | undefined = useAppSelector(selectLink)
    const [sentCreateSession, setSentCreateSession] = useState(false)
    const [sentInitWsSession, setSentInitWsSession] = useState(false)
    const dispatch = useAppDispatch()
    if (link === undefined && !sentCreateSession) {
        const dto: CreatePresentationSessionDto = {
            presentationId: presentationId, //'ed60e789-ab15-4756-b95e-218b43b6dfff',
        }
        setSentCreateSession(true)
        dispatch(createSessionForPresentation(dto))
    }
    if (link !== undefined && !sentInitWsSession) {
        setSentInitWsSession(true)
        dispatch(initWebSocketSession(link))
    }
    // useEffect(() => {
    //     if (link) {
    //         dispatch(initWebSocketSession(link))
    //     }
    // }, [])

    const connectionStatus = useAppSelector(selectConnectionStatus)
    const snapshot = useAppSelector(selectSnapshot)

    const activePoll = snapshot?.polls.find((poll) => poll)

    const body = activePoll ? (
        <Poll poll={activePoll as any} />
    ) : (
        <>Waiting for an interaction to start...</>
    )
    return (
        <div>
            {connectionStatus !== WsConnectionStatus.CONNECTED && <Loader />}
            <InteractiveWrapper eventCode={link || ''}>
                {body}
            </InteractiveWrapper>
        </div>
    )
}

export default EventPage
