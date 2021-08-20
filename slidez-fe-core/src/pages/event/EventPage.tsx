import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
    const link: string | undefined = useAppSelector(selectLink)
    const dispatch = useAppDispatch()
    if (!link) {
        const dto: CreatePresentationSessionDto = {
            presentationId: '25c387f6-aad3-4a2b-947f-08a9808e10b7',
        }
        dispatch(createSessionForPresentation(dto))
    }
    useEffect(() => {
        if (link) {
            dispatch(initWebSocketSession(link))
        }
    }, [])

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
            <InteractiveWrapper eventCode='aaacce'>{body}</InteractiveWrapper>
        </div>
    )
}

export default EventPage
