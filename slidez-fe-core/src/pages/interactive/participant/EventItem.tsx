import React from 'react'
import './participantPage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { AppRoute } from '../../../common/routes/app-route'
import { ParticipantEvent } from '../../../services/participant-event/dto/ParticipantEvent'
import { Link } from 'react-router-dom'

const createEndpoint = (code: string) => `${AppRoute.EVENTS}/${code}`

const lastViewsDate = (date: Date) => {
    const diffDate = moment(date).fromNow()
    return 'watched ' + diffDate
}

export type EventItemProps = {
    event: ParticipantEvent
}

export const EventItem = ({ event }: EventItemProps) => {
    return (
        <Link to={createEndpoint(event.code)}>
            <div className='event-item'>
                <div className='event-info'>
                    <div className='event-info-text'>
                        <div className='event-info-name'>{event.name}</div>
                        <div className='event-code'>#{event.code}</div>
                    </div>
                    <div className='event-info-viewsDate'>
                        {lastViewsDate(event.viewsDate)}
                    </div>
                </div>
                <a className='event-icon'>
                    <FontAwesomeIcon
                        className='angle-right'
                        icon={faAngleRight}
                    />
                </a>
            </div>
        </Link>
    )
}
