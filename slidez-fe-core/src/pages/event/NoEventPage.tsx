import React, { useState } from 'react'
import './styles.scss'
import Header from '../participant-page/Header'

const NoEvent = () => {
    return (
        <div className='events-page'>
            <div className='error-content'>
                Please wait for the presenter to show the next slide.
            </div>
            {/* create button q&a*/}
        </div>
    )
}

export default NoEvent
