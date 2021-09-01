import React from 'react'
import './participantPage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { AppRoute } from '../../common/routes/app-route'
import { ParticipantEvent } from '../../services/participant/dto/ParticipantEvent'

const createEndpoint = (code: string) => `/#${AppRoute.EVENTS}/${code}`

const lastViewsDate = (date: string) => {
    const diffDate = moment(date, 'YYYY-MM-DD HH:mm:ss').fromNow()
    return 'watched ' + diffDate
}

export type EventItemProps = {
    event: ParticipantEvent
}

export const EventItem = ({ event }: EventItemProps) => {
    return (
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
            <a className='event-icon' href={createEndpoint(event.code)}>
                <FontAwesomeIcon className='angle-right' icon={faAngleRight} />
            </a>
        </div>
    )
}
