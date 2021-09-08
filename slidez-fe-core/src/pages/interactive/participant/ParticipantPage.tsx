import React, { useState } from 'react'
import './participantPage.scss'
import Header from '../Header'
import ParticipantNameDialog from './ParticipantNameModal/ParticipantNameModal'
import { ParticipantData } from '../../../services/participant/dto/ParticipantData'
import { getParticipantData } from '../../../services/participant/participant-service'
import { EventItem } from './EventItem'
import { getParticipantEvents } from '../../../services/participant-event/participant-event-service'
import { AppRoute } from '../../../common/routes/app-route'

type EventLinkError = {
    hasError: boolean
}

const EventLinkError = ({ hasError }: EventLinkError) => {
    let errorMessage: string | null = null
    if (!hasError) {
        errorMessage = null
    } else {
        errorMessage = 'Code should be only 6 characters long'
    }

    return <div className='error-text'>{errorMessage}</div>
}

const ParticipantPage = () => {
    const participantEvents = getParticipantEvents()
    const participantData: ParticipantData = getParticipantData()
    const areFirstAndLastNamePresent =
        participantData.participantFirstName &&
        participantData.participantLastName
    const [eventLink, setEventLink] = useState('')
    const [hasError, setHasError] = useState(false)

    const onRedirectClick = () => {
        if (validEventLink()) {
            setHasError(false)
            window.location.assign(`/#${AppRoute.EVENTS}/${eventLink}`)
        } else {
            setHasError(true)
        }
    }

    const handleEventLink = (event: string) => {
        setHasError(false)
        setEventLink(event)
    }

    const validEventLink = () => {
        let regex = /\w{6}/
        return eventLink.length === 6 && eventLink.match(regex)
    }

    return (
        <div className='participant-page'>
            <Header eventName='' />
            {!areFirstAndLastNamePresent ? <ParticipantNameDialog /> : ''}
            <div className='input-block'>
                <div>Enter code</div>
                <input
                    className='code-input'
                    type='text'
                    onChange={(event) => handleEventLink(event.target.value)}
                    placeholder='#Code (6 characters)'
                />
                <EventLinkError hasError={hasError} />
                <button
                    className='btn btn-code'
                    type='submit'
                    onClick={onRedirectClick}
                >
                    Join
                </button>
            </div>
            {participantEvents?.length > 0 ? (
                <div className='visited-events'>
                    <div className='title'>Select event</div>
                    <div className='page-content'>
                        {participantEvents.map((event) => (
                            <EventItem event={event} key={event.code} />
                        ))}
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export default ParticipantPage
