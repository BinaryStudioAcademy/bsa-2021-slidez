import React, { useState } from 'react'
import './noEvent.scss'
import './common.scss'
import Qa from '../qa/Qa'
import { useAppSelector } from '../../hooks'
import { selectQASession } from '../../containers/session/store/selectors'

const NoEvent = () => {
    const [showQAModal, setShowQAModal] = useState(false)
    const currentQASession = useAppSelector(selectQASession)

    const handleQAClose = () => {
        setShowQAModal(false)
    }
    const handleQAShow = () => {
        setShowQAModal(true)
    }

    return (
        <div className='no-event-page'>
            <div className='error-content'>
                Please wait for the presenter to show the next slide.
            </div>
            {Boolean(currentQASession) && (
                <button
                    className='btn-open-qa'
                    type='button'
                    onClick={() => handleQAShow()}
                >
                    Open Q&amp;A page
                </button>
            )}
            <Qa show={showQAModal} handleClose={handleQAClose} />
        </div>
    )
}

export default NoEvent
