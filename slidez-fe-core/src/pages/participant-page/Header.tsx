import React from 'react'
import './header.scss'
import SlidezLogo from '../../../src/logo_Slidez_1.svg'

const Header = () => {
    return (
        <div className='participant-header'>
            <div className='logo'>
                <a href=''>
                    <img src={SlidezLogo} alt='Slidez Logo'></img>
                </a>
            </div>
        </div>
    )
}

export default Header
