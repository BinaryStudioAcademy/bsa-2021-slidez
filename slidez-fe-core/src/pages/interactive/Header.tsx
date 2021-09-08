import React from 'react'
import './header.scss'
import SlidezLogo from '../../logo_Slidez_black.svg'
import { Link } from 'react-router-dom'
import { AppRoute } from '../../common/routes/app-route'

interface IProps {
    eventName: string
}

const Header: React.FC<IProps> = ({ eventName }: IProps) => {
    return (
        <div className='participant-header'>
            <div className='logo'>
                <Link to={AppRoute.EVENTS}>
                    <img src={SlidezLogo} alt='Slidez Logo' />
                </Link>
            </div>
            <div className='event-name'>{eventName}</div>
        </div>
    )
}

export default Header
