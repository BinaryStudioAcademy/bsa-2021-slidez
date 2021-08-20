import React, { Component } from 'react'
import QRCode from 'react-qr-code'
import './interactive-wrapper.scss'
import '../../../../global/styles.scss'
import { InteractiveLogo } from '../../logo/logo'
// @ts-ignore
// eslint-disable-next-line react/prop-types
const InteractiveWrapper = ({ wrappedComponent: Component }) => {
    //TODO: link must be taken from state
    const link = 'http://localhost:5000/event/aaaaac'
    return (
        <div className='wrapper'>
            <div className='wrapped-component'>
                <Component />
            </div>
            <div className='interactive-wrapper-sidebar'>
                <div className='container-with-centered-content'>
                    <InteractiveLogo width='60%' />
                </div>
                <div className='link-holder'>
                    Join at
                    <a href=''>
                        <div className='link-domain'>Slidez.com</div>
                        <div className='link-code'>#aaaaac</div>
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
