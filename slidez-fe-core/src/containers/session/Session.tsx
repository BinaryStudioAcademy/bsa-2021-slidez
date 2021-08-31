import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import reset_button from '../../assets/svgs/reset_button.svg'
import pause_button from '../../assets/svgs/pause_button.svg'
import log_out from '../../assets/svgs/log_out.svg'
import './session.scss'
import { logout } from '../user/store'
import { useAppDispatch } from '../../hooks'
import { useState } from 'react'
import menu_icon from '../../assets/svgs/menu-icon.svg'

const Session = () => {
    const dispatch = useAppDispatch()
    const [openMenu, setOpenMenu] = useState(false)
    const session_name = 'Determine Interfaces | Describe'
    const session_id = '#131324235'

    const sideMenuClasses = openMenu ? 'session-page-active' : 'session-page'
    console.log(openMenu)

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleCloseMenu = () => {
        setOpenMenu(!openMenu)
    }
    const handleIcon = openMenu ? (
        <div className='close-button-active'>
            <button className='close-button' onClick={handleCloseMenu}>
                <CloseIcon style={{ fontSize: 'large' }} />
            </button>
        </div>
    ) : (
        <div className='addon-menu'>
            <button onClick={handleCloseMenu}>
                <img src={menu_icon} alt='menu' />
            </button>
        </div>
    )

    return (
        <div>
            {handleIcon}
            <div className={sideMenuClasses}>
                <div className='session-section'>
                    <div className='session-text'>
                        <div className='session-name'>{session_name}</div>
                        <div className='session-id'>{session_id}</div>
                    </div>
                    <button className='arrow-back'>
                        <ArrowForwardIosIcon style={{ fontSize: 'small' }} />
                    </button>
                </div>
                <hr className='border-between-button' />
                <div className='buttons-session-section'>
                    <button className='reset-button'>
                        <img src={reset_button} />
                        Reset session
                    </button>
                    <button className='pause-button'>
                        <img src={pause_button} />
                        Pause session
                    </button>
                </div>
                <hr className='border-between-account' />
                <div className='account-section'>
                    <button className='logout' onClick={handleLogout}>
                        <img src={log_out} />
                        Log out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Session
