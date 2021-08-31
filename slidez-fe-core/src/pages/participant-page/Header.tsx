import React from 'react'
import './participantPage.scss'
import SlidezLogo from '../../../src/logo_Slidez_black.svg'

interface IProps {
    eventName: string
}

const Header: React.FC<IProps> = ({ eventName }: IProps) => {
    return (
        <div className='participant-header'>
            <div className='logo'>
                <a href=''>
                    <img src={SlidezLogo} alt='Slidez Logo'></img>
                </a>
            </div>
            <div className='event-name'>{eventName}</div>
        </div>
    )
}

export default Header
