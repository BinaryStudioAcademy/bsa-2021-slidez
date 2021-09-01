import React, { useEffect, useState } from 'react'
import './participantPage.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import Header from './Header'
import { MOCK_DATA } from './mock-data'
import './participantPage.scss'
import ParticipantNameDialog from './ParticipantNameModal'
import Qa from '../qa/Qa'

const ParticipantPage = () => {
    const [listQuestions, setListQuestions] = useState(MOCK_DATA)
    const [title, setTitle] = useState('Select event')
    const [open, setOpen] = useState(true)

    useEffect(() => {
        const userFirstName = window.localStorage.getItem('firstName')
        const userLastName = window.localStorage.getItem('lastName')
        if (userFirstName && userLastName) {
            setOpen(false)
        }
    })

    const createEndpoint = (id: number) => '/#/events/' + id

    const lastViewsDate = (date: string) => {
        const diffDate = moment(date, 'YYYY-MM-DD HH:mm:ss').fromNow()
        return 'watched ' + diffDate
    }

    const [showQAModal, setShowQAModal] = useState(false)

    const handleQAClose = () => {
        setShowQAModal(false)
    }
    const handleQAShow = () => {
        setShowQAModal(true)
    }

    return (
        <div className='participant-page'>
            <button type='button' onClick={() => handleQAShow()}>
                Open Q&amp;A page
            </button>
            <Qa show={showQAModal} handleClose={() => handleQAClose()}></Qa>
            <Header eventName='' />
            {open ? <ParticipantNameDialog /> : ''}
            <div className='input-block'>
                <div>Enter code</div>
                <input
                    className='code-input'
                    type='text'
                    placeholder='#Code'
                ></input>
                <button className='btn btn-code'>Join</button>
            </div>
            <div className='title'>Select event</div>
            <div className='page-content'>
                {listQuestions.map((event) => (
                    <div className='event-item' key={event.id}>
                        <div className='event-info'>
                            <div className='event-info-text'>
                                <div className='event-info-name'>
                                    {event.name}
                                </div>
                                <div className='event-id'>#{event.id + 1}</div>
                            </div>
                            <div className='event-info-viewsDate'>
                                {lastViewsDate(event.viewsDate)}
                            </div>
                        </div>
                        <a
                            className='event-icon'
                            href={createEndpoint(event.id)}
                        >
                            <FontAwesomeIcon
                                className='angle-right'
                                icon={faAngleRight}
                            />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ParticipantPage
