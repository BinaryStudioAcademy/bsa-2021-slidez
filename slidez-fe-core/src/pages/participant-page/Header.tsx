import React, { useState } from 'react'
import './participantPage.scss'
import SlidezLogo from '../../../src/logo_Slidez_black.svg'
import Qa from '../qa/Qa'

interface IProps {
    eventName: string
}

const Header: React.FC<IProps> = ({ eventName }: IProps) => {
    const [showQAModal, setShowQAModal] = useState(false)

    const handleQAClose = () => {
        setShowQAModal(false)
    }
    const handleQAShow = () => {
        setShowQAModal(true)
    }

    return (
        <div className='participant-header'>
            <div className='logo'>
                <a href=''>
                    <img src={SlidezLogo} alt='Slidez Logo'></img>
                </a>
            </div>
            <button type='button' onClick={() => handleQAShow()}>
                Open Q&amp;A page
            </button>
            <Qa show={showQAModal} handleClose={handleQAClose}></Qa>
            <div className='event-name'>{eventName}</div>
        </div>
    )
}

export default Header
