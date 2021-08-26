import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
    createRequestStartPollParams,
    createSessionForPresentation,
    initWebSocketSession,
    requestStartPoll,
    RequestStartPollParams,
} from '../../containers/presentation_session/store/store'
import { WsConnectionStatus } from '../../containers/presentation_session/enums/ws-connection-status'
import Loader from '../../common/components/loader/Loader'
import Poll from '../../common/components/interactive-elements/poll/Poll'
import InteractiveWrapper from '../../common/components/interactive-elements/interactive-wrapper/InteractiveWrapper'
import { CreatePresentationSessionDto } from '../../services/presentation-session/dto/CreatePresentationSessionDto'
import {
    selectConnectionStatus,
    selectSnapshot,
} from '../../containers/presentation_session/store/selectors'

const EventPage: React.FC = () => {
    const { link } = useParams<{ link?: string }>()
    const [sentInitWsSession, setSentInitWsSession] = useState(false)
    const dispatch = useAppDispatch()
    if (link !== undefined && !sentInitWsSession) {
        setSentInitWsSession(true)
        dispatch(initWebSocketSession(link))
    }
    //TODO: SESSION MUST NOT BE CREATED HERE
    useEffect(() => {
        if (link) {
            const dto: CreatePresentationSessionDto = {
                presentationId: 'ed60e789-ab15-4756-b95e-218b43b6dfff',
            }
            dispatch(createSessionForPresentation(dto))
            const params: RequestStartPollParams = createRequestStartPollParams(
                link,
                'lol_poll_id'
            )
            setTimeout(() => dispatch(requestStartPoll(params)), 2000)
        }
    }, [])

    const connectionStatus = useAppSelector(selectConnectionStatus)
    const snapshot = useAppSelector(selectSnapshot)

    const activePoll = snapshot?.sessionInteractiveElements.find(
        (sessionInteractiveElements) => sessionInteractiveElements
    )
    console.log(snapshot)
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
