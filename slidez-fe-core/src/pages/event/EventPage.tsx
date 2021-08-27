import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
    createSessionForPresentation,
    initWebSocketSession,
    requestStartPoll,
} from '../../containers/session/store/store'
import { WsConnectionStatus } from '../../containers/session/enums/ws-connection-status'
import Loader from '../../common/components/loader/Loader'
import Poll from '../../common/components/interactive-elements/poll/Poll'
import InteractiveWrapper from '../../common/components/interactive-elements/interactive-wrapper/InteractiveWrapper'
import { CreatePresentationSessionDto } from '../../services/session/dto/CreatePresentationSessionDto'
import {
    selectConnectionStatus,
    selectCurrentInteractiveElement,
    selectSnapshot,
} from '../../containers/session/store/selectors'
import { StartPollRequest } from '../../containers/session/event/FrontendEvent'
import { DomainEventType } from '../../containers/session/event/DomainEvent'

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
            const params: StartPollRequest = {
                link: link,
                event: {
                    type: DomainEventType.startPollEvent,
                    slideId: 'lol_slide_id',
                },
            }
            setTimeout(() => dispatch(requestStartPoll(params)), 2000)
        }
    }, [])

    const connectionStatus = useAppSelector(selectConnectionStatus)
    const snapshot = useAppSelector(selectSnapshot)

    const currentInteraction = useAppSelector(selectCurrentInteractiveElement)
    console.log(snapshot)
    const body = currentInteraction ? (
        <Poll poll={currentInteraction as any} />
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
