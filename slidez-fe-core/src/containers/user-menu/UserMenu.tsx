import React, { useState, useRef } from 'react'
import { logout, selectUserDetails } from '../user/store'
import { useAppDispatch, useAppSelector } from '../../hooks'

import { ReactComponent as UserGreyIcon } from '../../assets/svgs/grey-user.svg'
import { ReactComponent as ExitIcon } from '../../assets/svgs/exit.svg'

import { useDetectOutsideClick } from '../../pages/dashboard/useDetectOutsideClick'
import styles from './styles.module.scss'
import './edit-profile/components/Form.scss'
import { UserDetailsDto } from '../user/dto/UserDetailsDto'
import { UserLogo } from '../../common/components/user-logo/UserLogo'
import UpdateProfileDialog from './update-profile-dialog/UpdateProfileDialog'

export const initialValuesUserData: UserDetailsDto = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
}

const UserMenu: React.FC = () => {
    const dispatch = useAppDispatch()
    const dropdownRef = useRef<HTMLInputElement>(null)
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
    const [isEditModalOpened, setEditModalOpened] = useState(false)
    const userData = useAppSelector(selectUserDetails) || initialValuesUserData

    const onOpenEditDialog = () => {
        setEditModalOpened(true)
        handleDropDown()
    }

    const handleDropDown = () => {
        console.log(isActive, isEditModalOpened)
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

    const logoComponent = (
        <UserLogo
            email={userData.email}
            firstName={userData.firstName}
            lastName={userData.lastName}
            width={43}
        />
    )

    return (
        <div className={styles.userProfile}>
            <div className={styles.userAvatar} ref={dropdownRef}>
                <div onClick={handleDropDown} className={styles.logo}>
                    {logoComponent}
                </div>
                <div
                    className={`${styles.dropdownContent} ${
                        isActive ? styles.active : styles.inactive
                    }`}
                >
                    <div className={styles.userInfo}>
                        {logoComponent}
                        <div className={styles.userInfoText}>
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
                        <UserGreyIcon className={styles.userIcon} />
                        <span className={styles.userProfileMenuName}>
                            Edit profile
                        </span>
                    </div>
                    <div
                        className={styles.userProfileMenu}
                        onClick={() => handleLogout()}
                    >
                        <ExitIcon className={styles.userIcon} />
                        <span className={styles.userProfileMenuName}>
                            Log out
                        </span>
                    </div>
                </div>
            </div>
            <UpdateProfileDialog
                isDialogOpened={isEditModalOpened}
                onDialogClose={() => setEditModalOpened(false)}
            />
        </div>
    )
}
export default UserMenu
