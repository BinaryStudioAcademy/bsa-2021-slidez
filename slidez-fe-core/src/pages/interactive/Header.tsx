import React, { useState } from 'react'
import './header.scss'
import SlidezLogo from '../../logo_Slidez_black.svg'
import { Link } from 'react-router-dom'
import { AppRoute } from '../../common/routes/app-route'
import { ParticipantData } from '../../services/participant/dto/ParticipantData'
import { getParticipantData } from '../../services/participant/participant-service'
import ParticipantNameDialog from './participant/ParticipantNameModal/ParticipantNameModal'
import { UserLogo } from '../../common/components/user-logo/UserLogo'
import { boolean } from 'yup/lib/locale'

interface IProps {
    eventName: string
}

const Header: React.FC<IProps> = ({ eventName }: IProps) => {
    const participantData: ParticipantData = getParticipantData()
    const areFirstAndLastNamePresent: boolean =
        participantData.participantFirstName !== '' &&
        participantData.participantLastName !== ''
    const [isUserModalShown, setIsUserModalShown] = useState(false)
    const logoComponent = (
        <UserLogo
            email=''
            firstName={participantData.participantFirstName as string}
            lastName={participantData.participantLastName as string}
            width={43}
        />
    )

    const handleUserIconClick = () => {
        setIsUserModalShown(true)
    }

    const hideModal = () => {
        setIsUserModalShown(false)
    }

    return (
        <div className='participant-header'>
            <div className='participant-header-top'>
                <div className='logo'>
                    {!areFirstAndLastNamePresent || isUserModalShown ? (
                        <ParticipantNameDialog hideModal={() => hideModal()} />
                    ) : (
                        ''
                    )}

                    <img src={SlidezLogo} alt='Slidez Logo' />
                </div>
                <button onClick={handleUserIconClick}>
                    <div className='user-logo'> {logoComponent} </div>
                </button>
            </div>

            <div className='participant-header-bottom'>
                <Link to={AppRoute.EVENTS} />
            </div>
            <div className='event-name'>{eventName}</div>
        </div>
    )
}

export default Header
