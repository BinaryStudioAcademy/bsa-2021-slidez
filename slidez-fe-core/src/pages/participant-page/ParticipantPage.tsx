import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React, { useState } from 'react'
import Header from './Header'
import { MOCK_DATA } from './mock-data'
import './participantPage.scss'

const ParticipantPage = () => {
    const [listQuestions, setListQuestions] = useState(MOCK_DATA)
    const createEndpoint = (id: number) => '/#/event/' + id

    const lastViewsDate = (date: string) => {
        const diffDate = moment(date, 'YYYY-MM-DD HH:mm:ss').fromNow()
        return 'watched ' + diffDate
    }

    return (
        <div className='participant-page'>
            <Header eventName='' />
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
