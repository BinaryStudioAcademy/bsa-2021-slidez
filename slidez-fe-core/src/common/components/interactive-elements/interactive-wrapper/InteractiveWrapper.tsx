/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import QRCode from 'react-qr-code'
import './interactive-wrapper.scss'
import '../../../../global/styles.scss'
import { InteractiveLogo } from '../../logo/logo'

export type InteractiveWrapperProps = { eventCode: string }

const InteractiveWrapper: React.FC<InteractiveWrapperProps> = ({
    eventCode,
    children,
}) => {
    const link = `http://localhost:5000/event/${eventCode}`
    return (
        <div className='wrapper'>
            <div className='wrapped-component'>{children}</div>
            <div className='interactive-wrapper-sidebar'>
                <div className='container-with-centered-content'>
                    <InteractiveLogo width='60%' />
                </div>
                <div className='link-holder'>
                    Join at
                    <a href=''>
                        <div className='link-domain'>Slidez.com</div>
                        <div className='link-code'>{eventCode}</div>
                    </a>
                </div>
                <div className='qr-code-holder container-with-centered-content'>
                    <QRCode value={link} fgColor='#59D0A5' />
                </div>
            </div>
        </div>
    )
}

export default InteractiveWrapper
