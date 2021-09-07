import React from 'react'
import './participantPage.scss'
import Header from '../Header'
import ParticipantNameDialog from './ParticipantNameModal/ParticipantNameModal'
import { ParticipantData } from '../../../services/participant/dto/ParticipantData'
import { getParticipantData } from '../../../services/participant/participant-service'
import { EventItem } from './EventItem'
import { getParticipantEvents } from '../../../services/participant-event/participant-event-service'

const ParticipantPage = () => {
    const participantEvents = getParticipantEvents()
    const participantData: ParticipantData = getParticipantData()
    const areFirstAndLastNamePresent =
        participantData.participantFirstName &&
        participantData.participantLastName

    return (
        <div className='participant-page'>
            <Header eventName='' />
            {!areFirstAndLastNamePresent ? <ParticipantNameDialog /> : ''}
            <div className='input-block'>
                <div>Enter code</div>
                <input className='code-input' type='text' placeholder='#Code' />
                <button className='btn btn-code'>Join</button>
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
