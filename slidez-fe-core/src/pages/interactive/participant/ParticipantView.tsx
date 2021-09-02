import React, { useEffect } from 'react'
import './participantView.scss'
import Header from '../Header'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
    selectConnectionStatus,
    selectCurrentInteractiveElement,
    selectSnapshot,
} from '../../../containers/session/store/selectors'
import { initWebSocketSession } from '../../../containers/session/store/store'
import {
    InteractiveElement,
    PollDto,
} from '../../../containers/session/dto/InteractiveElement'
import { InteractiveElementType } from '../../../containers/session/enums/InteractiveElementType'
import { WsConnectionStatus } from '../../../containers/session/enums/ws-connection-status'
import Loader from '../../../common/components/loader/Loader'
import NoEvent from '../NoEventPage'
import { useParams } from 'react-router-dom'
import ParticipantPoll from '../../../common/components/interactive-elements/poll/ParticipantPoll'
import { saveParticipantEvent } from '../../../services/participant-event/participant-event-service'
import { SnapshotDto } from '../../../containers/session/dto/SnapshotDto'

const noCurrentInteraction = (
    <div>
        <Header eventName='' />
        <NoEvent />
    </div>
)

const getBodyContent = (
    interactiveElement: InteractiveElement,
    link: string
) => {
    if (interactiveElement.type === InteractiveElementType.poll) {
        return (
            <ParticipantPoll poll={interactiveElement as PollDto} link={link} />
        )
    }
    return undefined
}

const ParticipantView = () => {
    //@ts-ignore
    const { link } = useParams()
    const dispatch = useAppDispatch()
    if (link) {
        dispatch(initWebSocketSession(link))
    }

    const connectionStatus = useAppSelector(selectConnectionStatus)
    const currentInteraction = useAppSelector(selectCurrentInteractiveElement)

    if (!currentInteraction) {
        return noCurrentInteraction
    }

    const eventName = 'Animate'
    return (
        <div>
            {connectionStatus !== WsConnectionStatus.CONNECTED && <Loader />}
            <div className='participant-view-content'>
                <Header eventName={eventName} />
                {getBodyContent(currentInteraction, link || '')}
            </div>
        </div>
    )
}

export default ParticipantView
