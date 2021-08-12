import React, { Component } from 'react'
import QRCode from 'react-qr-code'
import './interactive-wrapper.scss'
import Logo from '../../common/components/logo/logo'
// @ts-ignore
// eslint-disable-next-line react/prop-types
const InteractiveWrapper = ({ wrappedComponent: Component }) => {
    //TODO: link must be taken from state
    const link = 'http://localhost:5000/event/aaaaac'
    return (
        <div className='wrapper'>
            <div className='interactive-wrapper-sidebar'>
                <div className='qr-code-holder'>
                    <QRCode value={link} />
                </div>
                <div>
                    <Logo width='100%' />
                </div>
                <div className='link-holder'>{`Join at ${link}`}</div>
            </div>
            <div className='wrapped-component'>
                <Component />
            </div>
        </div>
    )
}

export default InteractiveWrapper
