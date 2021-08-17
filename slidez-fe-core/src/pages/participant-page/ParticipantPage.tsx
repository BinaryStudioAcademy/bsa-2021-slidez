import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faBars } from '@fortawesome/free-solid-svg-icons'
import './participantPage.scss'
import { MOCK_DATA } from './mock-data'
import Header from './Header'
import moment from 'moment'

const ParticipantPage = () => {
    const [listQuestions, setListQuestions] = useState(MOCK_DATA)
    const [title, setTitle] = useState('Select event')

    const createEndpoint = (id: number) => '/event/' + id

    const lastViewsDate = (date: string) => {
        const diffDate = moment(date, 'YYYY-MM-DD HH:mm:ss').fromNow()
        return 'watched ' + diffDate
    }

    return (
        <div className='participant-page'>
            <Header></Header>
            {/* <div className='menu'>
                <FontAwesomeIcon className='menu-icon' icon={faBars} />
            </div> */}
            <div className='title'> {title} </div>
            <div className='page-content'>
                {listQuestions.map((event) => (
                    <div className='event-item' key={event.id}>
                        <div className='event-info'>
                            <div className='event-info-name'>{event.name}</div>
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
