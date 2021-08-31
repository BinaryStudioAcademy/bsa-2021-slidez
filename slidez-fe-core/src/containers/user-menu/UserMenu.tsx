import React, { useState, useRef, useEffect } from 'react'
import {
    faUser,
    faSignOutAlt,
    faTimes,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout, selectUserDetals } from '../user/store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { handleLogo } from './handleLogo'

import { useDetectOutsideClick } from '../../pages/dashboard/useDetectOutsideClick'
import styles from './styles.module.scss'
import './edit-profile/components/Form.scss'
import { UserDetailsDto } from '../user/dto/UserDetailsDto'
import { Button, Dialog, DialogContent } from '@material-ui/core'
import FormUpdateUserData from './edit-profile/components/FormUpdateUserData'
import FormUpdatePassword from './edit-profile/components/FormUpdatePassword'

export const initialValuesUserData: UserDetailsDto = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
}

const UserMenu: React.FC = () => {
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

    const viewName = () => {
        if (userData.firstName && userData.lastName) {
            return (
                <div className={styles.userName}>
                    {`${userData.firstName} ${userData.lastName}`}
                </div>
            )
        }
    }

    return (
        <div className={styles.userProfile}>
            <div className={styles.userAvatar}>
                <div onClick={handleDropDown} className={styles.avatar}>
                    {logo}
                </div>
                <div
                    ref={dropdownRef}
                    className={`${styles.dropdownContent} ${
                        isActive ? styles.active : styles.inactive
                    }`}
                >
                    <div className={styles.userInfo}>
                        <div className={styles.avatar}> {logo} </div>
                        <div>
                            {viewName()}
                            <div className={styles.userEmail}>
                                {userData.email}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div
                        className={styles.userProfileMenu}
                        onClick={() => onOpenEditDialog()}
                    >
                        <FontAwesomeIcon
                            className={styles.userIcon}
                            icon={faUser}
                        />
                        <span className={styles.userProfileMenuName}>
                            Edit profile
                        </span>
                    </div>
                    <Dialog
                        className={styles.MuiDialogPaperScrollPaper}
                        open={openEditProfile}
                        onClose={onCloseEditDialog}
                        aria-labelledby='form-dialog-title'
                        maxWidth={false}
                    >
                        <div className={styles.editProfile}>
                            <DialogContent className={styles.leftContent}>
                                <div className={styles.leftContentFixed}>
                                    <div className={styles.sideBtns}>
                                        <span className={styles.windowName}>
                                            Edit profile
                                        </span>
                                        <Button>
                                            <FontAwesomeIcon
                                                className={styles.buttonIcon}
                                                icon={faUser}
                                            />
                                            <span className={styles.buttonName}>
                                                Profile
                                            </span>
                                        </Button>
                                        <Button>
                                            <FontAwesomeIcon
                                                className={styles.buttonIcon}
                                                icon={faTrashAlt}
                                            />
                                            <span className={styles.buttonName}>
                                                Delete account
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogContent className={styles.rightContent}>
                                <Button
                                    className={styles.close}
                                    onClick={onCloseEditDialog}
                                >
                                    <FontAwesomeIcon
                                        className={styles.closeIicon}
                                        icon={faTimes}
                                    />
                                </Button>
                                <div className={styles.formTitle}>
                                    Profile info
                                </div>
                                <div className={styles.avatarEditProfile}>
                                    {logo}
                                </div>
                                <div className={styles.form}>
                                    <FormUpdateUserData />
                                    <FormUpdatePassword />
                                </div>
                            </DialogContent>
                        </div>
                    </Dialog>
                    <div
                        className={styles.userProfileMenu}
                        onClick={() => handleLogout()}
                    >
                        <FontAwesomeIcon
                            className={styles.userIcon}
                            icon={faSignOutAlt}
                        />
                        <span className={styles.userProfileMenuName}>
                            Log out
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserMenu
