import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
    createSessionForPresentation,
    initWebSocketSession,
    requestStartPoll,
} from '../../containers/session/store/store'
import { WsConnectionStatus } from '../../containers/session/enums/ws-connection-status'
import Loader from '../../common/components/loader/Loader'
import { CreatePresentationSessionDto } from '../../services/session/dto/CreatePresentationSessionDto'
import {
    selectConnectionStatus,
    selectCurrentInteractiveElement,
    selectLink,
} from '../../containers/session/store/selectors'
import {
    createStartPollRequest,
    StartPollRequest,
} from '../../containers/session/event/FrontendEvent'
import { PollDto } from '../../containers/session/dto/InteractiveElement'
import { InteractiveElementType } from '../../containers/session/enums/InteractiveElementType'

const useEditorParams = () => {
    const params = new URLSearchParams(useLocation().search)

    //TODO: This are hardcoded developer-specific values
    return {
        presentationLink: params.get('presentationId') ?? 'fffffff',
        slideId: params.get('slideId') ?? 'lol_poll_id',
    }
}

import ParticipantView from './ParticipantView'
import NoEvent from './NoEventPage'
import Header from '../participant-page/Header'

const EventPage: React.FC = () => {
    const link = useAppSelector(selectLink)
    //TODO: Delete this
    const [startedPoll, setStartedPoll] = useState(false)
    const dispatch = useAppDispatch()
    const { presentationLink, slideId } = useEditorParams()

    console.log(presentationLink, slideId)

    useEffect(() => {
        const dto: CreatePresentationSessionDto = {
            presentationLink: presentationLink,
        }
        dispatch(createSessionForPresentation(dto))
    }, [])

    setTimeout(() => {
        if (link && !startedPoll) {
            setStartedPoll(true)
            dispatch(initWebSocketSession(link))
            const params: StartPollRequest = createStartPollRequest(
                link,
                slideId
            )
            setTimeout(() => dispatch(requestStartPoll(params)), 3000)
        }
    }, 3000)

    const connectionStatus = useAppSelector(selectConnectionStatus)

    const currentInteraction = useAppSelector(selectCurrentInteractiveElement)

    const activePoll: PollDto | undefined =
        currentInteraction?.type === InteractiveElementType.poll
            ? (currentInteraction as PollDto)
            : undefined
    const eventName = 'Animate'
    const body = activePoll ? (
        <div className='content'>
            <Header eventName={eventName} />
            <ParticipantView />
        </div>
    ) : (
        <div>
            <Header eventName='' />
            <NoEvent />
        </div>
    )

    return (
        <div>
            {connectionStatus !== WsConnectionStatus.CONNECTED && <Loader />}
            {body}
        </div>
    )
}

export default EventPage
