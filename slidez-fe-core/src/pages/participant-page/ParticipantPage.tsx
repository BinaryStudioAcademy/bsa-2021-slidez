import React, { useEffect, useState } from 'react'
import './participantPage.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { MOCK_DATA } from './mock-data'
import moment from 'moment'
import Header from './Header'
import ParticipantNameDialog from './ParticipantNameModal'

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

    const createEndpoint = (id: number) => '/#/event/' + id

    const lastViewsDate = (date: string) => {
        const diffDate = moment(date, 'YYYY-MM-DD HH:mm:ss').fromNow()
        return 'watched ' + diffDate
    }

    return (
        <div className='participant-page'>
            <Header />
            {/* <div className='menu'>
                <FontAwesomeIcon className='menu-icon' icon={faBars} />
            </div> */}
            {open ? <ParticipantNameDialog /> : ''}
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
