/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import QRCode from 'react-qr-code'
import './interactive-wrapper.scss'
import '../../../../global/styles.scss'
import { InteractiveLogo } from '../../logo/logo'
import { QR_CODE_HOST } from '../../../../env'

export type InteractiveWrapperProps = { eventCode: string }

const InteractiveWrapper: React.FC<InteractiveWrapperProps> = ({
    eventCode,
    children,
}) => {
    const link = `${QR_CODE_HOST}/${eventCode}`
    return (
        <div className='wrapper'>
            <div className='wrapped-component'>{children}</div>
            <div className='interactive-wrapper-sidebar'>
                <div className='logo-holder container-with-centered-content'>
                    <InteractiveLogo width='100%' height='150px' />
                </div>
                <div className='link-holder'>
                    Join at
                    <div className='link-domain'>slidez.link</div>
                    <div className='link-code'>{eventCode}</div>
                </div>
                <div className='qr-code-holder'>
                    <QRCode
                        className='qr-code'
                        value={link}
                        size={256}
                        fgColor='#663999'
                    />
                </div>
            </div>
        </div>
    )
}

export default InteractiveWrapper
