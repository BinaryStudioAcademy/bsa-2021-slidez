import React, { useState } from 'react'
import './participantPage.scss'
import Header from '../Header'
import { MOCK_DATA } from './mock-data'
import './participantPage.scss'
import ParticipantNameDialog from './ParticipantNameModal'
import { ParticipantData } from '../../../services/participant/dto/ParticipantData'
import { getParticipantData } from '../../../services/participant/participant-service'
import { EventItem } from './EventItem'
import Qa from '../../qa/Qa'

const ParticipantPage = () => {
    const [listQuestions, setListQuestions] = useState(MOCK_DATA)
    const participantData: ParticipantData = getParticipantData()
    const areFirstAndLastNamePresent =
        participantData.participantFirstName &&
        participantData.participantLastName
    const [showQAModal, setShowQAModal] = useState(false)

    const handleQAClose = () => {
        setShowQAModal(false)
    }
    const handleQAShow = () => {
        setShowQAModal(true)
    }

    return (
        <div className='participant-page'>
            <Header eventName='' />
            {!areFirstAndLastNamePresent ? <ParticipantNameDialog /> : ''}
            <div className='input-block'>
                <div>Enter code</div>
                <input className='code-input' type='text' placeholder='#Code' />
                <button className='btn btn-code'>Join</button>
            </div>
            <div className='title'>Select event</div>
            <div className='page-content'>
                {listQuestions.map((event) => (
                    <EventItem event={event} key={event.code} />
                ))}
            </div>
            <button
                className='btn-open-qa'
                type='button'
                onClick={() => handleQAShow()}
            >
                Open Q&amp;A page
            </button>
            <Qa show={showQAModal} handleClose={handleQAClose} />
        </div>
    )
}

export default ParticipantPage
