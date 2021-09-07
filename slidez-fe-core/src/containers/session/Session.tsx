import React, { useCallback, useState } from 'react'
import reset_button from '../../assets/svgs/reset_button.svg'
import pause_button from '../../assets/svgs/pause_button.svg'
import arrow_back from '../../assets/svgs/arrow_back.svg'
import log_out from '../../assets/svgs/log_out.svg'
import { ReactComponent as CloseIcon } from '../../assets/svgs/close_icon.svg'
import './session.scss'
import { useAppDispatch, useAppSelector } from '../../hooks'
import menu_icon from '../../assets/svgs/menu-icon.svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { createSessionForPresentation } from '../poll-editor/store'
import { UserLogo } from '../../common/components/user-logo/UserLogo'
import { logout, selectUserDetails } from '../user/store'
import { UserDetailsDto } from '../user/dto/UserDetailsDto'

export const initialValuesUserData: UserDetailsDto = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
}

const Session = () => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector(selectUserDetails) || initialValuesUserData
    const { session, presentationId } = useSelector(
        (state: RootState) => state.editor
    )
    const activeSessionLink = session?.code

    const [openMenu, setOpenMenu] = useState(false)

    const sideMenuClasses = openMenu ? 'session-page-active' : 'session-page'

    const handleCreateSession = useCallback(() => {
        dispatch(
            createSessionForPresentation({ presentationLink: presentationId })
        )
    }, [dispatch])

    const handleCloseMenu = () => {
        setOpenMenu(!openMenu)
    }

    const handleLogout = () => {
        dispatch(logout())
    }
    const handleIcon = openMenu ? (
        <div className='close-button-active'>
            <button className='close-button' onClick={handleCloseMenu}>
                <CloseIcon width='16' height='16' />
            </button>
        </div>
    ) : (
        <div className='addon-menu'>
            <button onClick={handleCloseMenu}>
                <img src={menu_icon} alt='menu' />
            </button>
        </div>
    )

    const logoComponent = (
        <UserLogo
            email={userData.email}
            firstName={userData.firstName}
            lastName={userData.lastName}
            width={43}
        />
    )

    const viewName = () => {
        if (userData.firstName && userData.lastName) {
            return (
                <div className='userName'>
                    {`${userData.firstName} ${userData.lastName}`}
                </div>
            )
        }
    }

    return (
        <div>
            {handleIcon}
            <div
                className={sideMenuClasses}
                style={{ height: `calc(${window.innerHeight}px - 59px)` }}
            >
                <div className='session-section'>
                    <div className='session-name'>
                        <div className='session-id'>
                            {activeSessionLink ?? 'No active session'}
                        </div>
                    </div>
                    <button className='arrow-back'>
                        <img src={arrow_back} />
                    </button>
                </div>
                <hr className='border-between-button' />
                {activeSessionLink && (
                    <div className='buttons-session-section'>
                        <button className='pause-button'>
                            <img src={pause_button} />
                            Finish session
                        </button>
                    </div>
                )}

                <div className='buttons-session-section'>
                    <button
                        className='reset-button'
                        onClick={handleCreateSession}
                    >
                        <img src={reset_button} />
                        Create session
                    </button>
                </div>

                <hr className='border-between-account' />
                <div className='account-section'>
                    <div className='userInfo'>
                        {logoComponent}
                        <div className='userInfoText'>
                            {viewName()}
                            <div className='userEmail'>{userData.email}</div>
                        </div>
                    </div>
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
