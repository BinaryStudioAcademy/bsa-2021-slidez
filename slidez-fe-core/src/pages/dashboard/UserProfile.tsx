import React, { useState, useRef, useEffect } from 'react'
import {
    faUser,
    faSignOutAlt,
    faTimes,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout, selectError } from '../../containers/user/store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { LogInResponseDto } from '../../services/auth/dto/LogInResponseDto'
import { GenericResponse } from 'slidez-shared/src/net/dto/GenericResponse'
import { createDefaultAxios } from 'slidez-shared/src/net/http/http-util'
import './dashboard.scss'
import './edit-profile/update.scss'
import { ApiGateway } from '../../services/http/api-gateway'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { Formik, Form, Field, FormikErrors } from 'formik'

import { revealPassword } from '../../common/components/forms/form-utils'
import { UpdateProps } from './edit-profile/editProfileTypes'
import { DropdownUserInfo } from './edit-profile/components/DropdownUserInfo'
import FormUpdateUserData from './edit-profile/components/FormUpdateUserData'
import FormUpdatePassword from './edit-profile/components/FormUpdatePassword'

export interface User {
    id: string | undefined
    firstName: string | undefined
    lastName: string | undefined
    email: string | undefined
}

const initialValuesUserData: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
}

export interface Password {
    id: string | undefined
    password: string
    confirmPassword: string
}

const initialValuesPassword: Password = {
    id: '',
    password: '',
    confirmPassword: '',
}

const UserProfile = ({
    onUpdateUserProfile,
    onUpdatePassword,
}: UpdateProps) => {
    const JWT = 'jwt'
    const refreshJWT = 'refresh_jwt'
    const dispatch = useAppDispatch()
    const dropdownRef = useRef<HTMLInputElement>(null)
    const [token, setToken] = useState('')
    const [isActive, setIsActive] = useState(false)
    const [logo, setLogo] = useState('')
    const [openEditProfile, setOpenEditProfile] = useState(false)
    const [isPasswordRevealed, setIsPasswordRevealed] = React.useState(false)
    const [isConfirmPasswordRevealed, setIsConfirmPasswordRevealed] =
        React.useState(false)
    const [viewErrors, setViewErrors] = React.useState(false)
    const [userData, setUserData] = useState<User>(initialValuesUserData)
    const [userPassword, setUserPassword] = useState<Password>(
        initialValuesPassword
    )
    const [isUpdatedUserData, setIsUpdatedUserData] = useState(false)

    useEffect(() => {
        if (token.length > 0 && !isUpdatedUserData) {
            performLoginByToken()
            setIsUpdatedUserData(true)
            return
        }
        getAccessToken()
        handleLogo()
    })

    const onOpenEditDialog = () => {
        setOpenEditProfile(true)
        handleDropDown()
    }

    const onCloseEditDialog = () => {
        setOpenEditProfile(false)
    }

    const onRevealPasswordClick = () => {
        setIsPasswordRevealed(!isPasswordRevealed)
        revealPassword('update-password-input')
    }

    const onRevealConfirmPasswordClick = () => {
        setIsConfirmPasswordRevealed(!isConfirmPasswordRevealed)
        revealPassword('update-confirmPassword-input')
    }

    const handleUpdateUserProfile = async (data: any) => {
        onUpdateUserProfile(data)
        setIsUpdatedUserData(false)
    }

    const handleUpdatePassword = async (
        id: string | undefined,
        password: string,
        confirmPassword: string
    ) => {
        const pass: Password = {
            id: id,
            password: password,
            confirmPassword: confirmPassword,
        }
        onUpdatePassword(pass)
    }

    const handleDropDown = () => {
        setIsActive(!isActive)
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    const getAccessToken = () => {
        setToken(window.localStorage.getItem(JWT) || '{}')
    }

    const sendAuthRequest = async (route: string, body: object = {}) => {
        const axiosInstance = createDefaultAxios(
            ApiGateway.REACT_APP_API_GATEWAY
        )

        return axiosInstance.request({
            url: route,
            method: 'POST',
            data: JSON.stringify(body),
        })
    }

    const performDataRequest = async (url: string, dto: object) => {
        const { data } = await sendAuthRequest(url, dto)

        const genericResponse: GenericResponse<LogInResponseDto, string> = data
        const userData = genericResponse.data.userDetailsDto
        const user: User = {
            id: userData?.id,
            email: userData?.email,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
        }
        setUserData(user)
        return genericResponse
    }

    const performLoginByToken = async () => {
        const dto = {
            token: token,
        }
        return performDataRequest('/auth/login-by-token', dto)
    }

    const handleLogo = () => {
        if (userData.firstName && userData.lastName) {
            setLogo(
                userData.firstName.charAt(0).toUpperCase() +
                    userData.lastName.charAt(0).toUpperCase()
            )
        } else if (userData.email) {
            setLogo(
                userData.email.charAt(0).toUpperCase() +
                    userData.email.charAt(1).toUpperCase()
            )
        }
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
                            </DialogContent>
                            <div className='verticalLine' />
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
                                    <FormUpdateUserData
                                        userData={userData}
                                        handleUpdateUserProfile={
                                            handleUpdateUserProfile
                                        }
                                        onCloseEditDialog={onCloseEditDialog}
                                        viewErrors={viewErrors}
                                        setViewErrors={setViewErrors}
                                    />
                                    <FormUpdatePassword
                                        initialValuesPassword={
                                            initialValuesPassword
                                        }
                                        handleUpdatePassword={
                                            handleUpdatePassword
                                        }
                                        userId={userData.id}
                                        onCloseEditDialog={onCloseEditDialog}
                                        viewErrors={viewErrors}
                                        setViewErrors={setViewErrors}
                                    />
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
