import React from 'react'
import './participantPage.scss'
import Header from '../Header'
import { EventItem } from './EventItem'
import { getParticipantEvents } from '../../../services/participant-event/participant-event-service'

const ParticipantPage = () => {
    const participantEvents = getParticipantEvents()

    return (
        <div className='participant-page'>
            <Header eventName='' />
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
