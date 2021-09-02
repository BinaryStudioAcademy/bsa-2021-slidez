import React, { useState } from 'react'
import './styles.scss'
import Qa from '../qa/Qa'

const NoEvent = () => {
    const [showQAModal, setShowQAModal] = useState(false)

    const handleQAClose = () => {
        setShowQAModal(false)
    }
    const handleQAShow = () => {
        setShowQAModal(true)
    }

    return (
        <div className='events-page'>
            <div className='error-content'>
                Please wait for the presenter to show the next slide.
            </div>
            <button
                className='btn-open-qa'
                type='button'
                onClick={() => handleQAShow()}
            >
                Open Q&amp;A page
            </button>
            <Qa show={showQAModal} handleClose={handleQAClose}></Qa>
        </div>
    )
}

export default NoEvent