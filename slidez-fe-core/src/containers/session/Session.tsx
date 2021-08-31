import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import reset_button from '../../assets/svgs/reset_button.svg'
import pause_button from '../../assets/svgs/pause_button.svg'
import log_out from '../../assets/svgs/log_out.svg'
import './session.scss'
import { logout } from '../user/store'
import { useAppDispatch } from '../../hooks'

const Session = () => {
    const dispatch = useAppDispatch()
    const session_name = 'Determine Interfaces | Describe'
    const session_id = '#131324235'

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className='session-page'>
            <button className='close-button'>
                <CloseIcon style={{ fontSize: 'large' }} />
            </button>
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
    )
}

export default Session
