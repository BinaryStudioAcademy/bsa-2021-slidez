import React from 'react'
import './header.scss'
import SlidezLogo from '../../logo_Slidez_black.svg'
import { Link } from 'react-router-dom'
import { AppRoute } from '../../common/routes/app-route'
import { ParticipantData } from '../../services/participant/dto/ParticipantData'
import { getParticipantData } from '../../services/participant/participant-service'
import ParticipantNameDialog from './participant/ParticipantNameModal/ParticipantNameModal'

interface IProps {
    eventName: string
}

const Header: React.FC<IProps> = ({ eventName }: IProps) => {
    const participantData: ParticipantData = getParticipantData()
    const areFirstAndLastNamePresent =
        participantData.participantFirstName &&
        participantData.participantLastName
    return (
        <div className='participant-header'>
            <div className='logo'>
                {!areFirstAndLastNamePresent ? <ParticipantNameDialog /> : ''}
                <Link to={AppRoute.EVENTS}>
                    <img src={SlidezLogo} alt='Slidez Logo' />
                </Link>
            </div>
            <div className='event-name'>{eventName}</div>
        </div>
    )
}

export default Header
