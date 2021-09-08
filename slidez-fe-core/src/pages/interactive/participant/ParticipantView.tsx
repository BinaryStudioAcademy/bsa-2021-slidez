import React, { useEffect, useState } from 'react'
import './participantView.scss'
import Header from '../Header'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
    selectConnectionStatus,
    selectCurrentInteractiveElement,
    selectQASession,
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
import ParticipantReactionBar from './ParticipantReactionButton'
import Qa from '../../qa/Qa'

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
    const [showQAModal, setShowQAModal] = useState(false)
    const currentQASession = useAppSelector(selectQASession)

    const handleQAClose = () => {
        setShowQAModal(false)
    }
    const handleQAShow = () => {
        setShowQAModal(true)
    }
    useEffect(() => {
        if (link) {
            dispatch(initWebSocketSession(link))
        }
    }, [])

    const connectionStatus = useAppSelector(selectConnectionStatus)
    const currentInteraction = useAppSelector(selectCurrentInteractiveElement)
    const snapshot: SnapshotDto | undefined = useAppSelector(selectSnapshot)
    if (snapshot?.presentationName) {
        saveParticipantEvent(link, snapshot.presentationName)
    }
    if (!currentInteraction) {
        return noCurrentInteraction
    }

    const presentationName = snapshot?.presentationName ?? 'Unnamed'
    return (
        <div>
            {connectionStatus !== WsConnectionStatus.CONNECTED && <Loader />}
            <div className='participant-view-content'>
                <Header eventName={presentationName} />
                {getBodyContent(currentInteraction, link || '')}
                {Boolean(currentQASession) && (
                    <button
                        className='btn-open-qa'
                        type='button'
                        onClick={() => handleQAShow()}
                    >
                        Open Q&amp;A page
                    </button>
                )}
                <Qa show={showQAModal} handleClose={handleQAClose} />
                <ParticipantReactionBar link={link ?? ''} />
            </div>
        </div>
    )
}

export default ParticipantView
