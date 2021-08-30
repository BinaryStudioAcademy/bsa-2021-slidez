import React, { useState, useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
    faUser,
    faSignOutAlt,
    faTimes,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout, selectUserDetals } from '../../../containers/user/store'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { DropdownUserInfo } from './edit-profile/components/DropdownUserInfo'
import { handleLogo } from './edit-profile/handleLogo'
import FormUpdateUserData from './edit-profile/components/FormUpdateUserData'
import FormUpdatePassword from './edit-profile/components/FormUpdatePassword'
import { UserDetailsDto } from '../../../containers/user/dto/UserDetailsDto'
import '../dashboard.scss'
import './UserProfile.scss'
import './edit-profile/components/DropdownUserInfo.scss'
import './edit-profile/components/Form.scss'
import './edit-profile/components/Loader.scss'

export const initialValuesUserData: UserDetailsDto = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
}

const UserProfile = () => {
    const dispatch = useAppDispatch()
    const dropdownRef = useRef<HTMLInputElement>(null)
    const [isActive, setIsActive] = useState(false)
    const [logo, setLogo] = useState('')
    const [openEditProfile, setOpenEditProfile] = useState(false)
    const userData = useAppSelector(selectUserDetals) || initialValuesUserData

    useEffect(() => {
        setLogo(handleLogo(userData))
    }, [userData])

    const onOpenEditDialog = () => {
        setOpenEditProfile(true)
        handleDropDown()
    }

    const onCloseEditDialog = () => {
        setOpenEditProfile(false)
    }

    const handleDropDown = () => {
        setIsActive(!isActive)
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className='user-profile'>
            <div className='user-avatar'>
                <div onClick={handleDropDown} className='avatar'>
                    {logo}
                </div>
                <div
                    ref={dropdownRef}
                    className={`dropdown-content ${
                        isActive ? 'active' : 'inactive'
                    }`}
                >
                    <DropdownUserInfo logo={logo} userData={userData} />
                    <hr />
                    <div
                        className='user-profile-menu'
                        onClick={() => onOpenEditDialog()}
                    >
                        <FontAwesomeIcon className='user-icon' icon={faUser} />
                        <span className='user-profile-menu-name'>
                            Edit profile
                        </span>
                    </div>
                    <Dialog
                        open={openEditProfile}
                        onClose={onCloseEditDialog}
                        aria-labelledby='form-dialog-title'
                        maxWidth={false}
                    >
                        <div className='edit-profile'>
                            <DialogContent className='left-content'>
                                <div className='left-content-fixed'>
                                    <div className='side-btns'>
                                        <span className='window-name'>
                                            Edit profile
                                        </span>
                                        <Button>
                                            <FontAwesomeIcon
                                                className='button-icon'
                                                icon={faUser}
                                            />
                                            <span className='button-name'>
                                                Profile
                                            </span>
                                        </Button>
                                        <Button>
                                            <FontAwesomeIcon
                                                className='button-icon'
                                                icon={faTrashAlt}
                                            />
                                            <span className='button-name'>
                                                Delete account
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogContent className='right-content'>
                                <Button
                                    className='close'
                                    onClick={onCloseEditDialog}
                                >
                                    <FontAwesomeIcon
                                        className='close-icon'
                                        icon={faTimes}
                                    />
                                </Button>
                                <div className='form-title'>Profile info</div>
                                <div className='avatar-edit-profile'>
                                    {logo}
                                </div>
                                <div className='form'>
                                    <FormUpdateUserData />
                                    <FormUpdatePassword />
                                </div>
                            </DialogContent>
                        </div>
                    </Dialog>
                    <div
                        className='user-profile-menu'
                        onClick={() => handleLogout()}
                    >
                        <FontAwesomeIcon
                            className='user-icon'
                            icon={faSignOutAlt}
                        />
                        <span className='user-profile-menu-name'>Log out</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserProfile
