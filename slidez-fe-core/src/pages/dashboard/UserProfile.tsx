import React, { useState, useRef, useEffect } from 'react'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from '../../containers/user/store'
import { useAppDispatch } from '../../hooks'
import { LogInResponseDto } from '../../services/auth/dto/LogInResponseDto'
import { GenericResponse } from '../../services/dto/GenericResponse'
import { createDefaultAxios } from '../../services/http/http-util'
import { useDetectOutsideClick } from './useDetectOutsideClick'
import './dashboard.scss'

const UserProfile = () => {
    const JWT = 'jwt'
    const refreshJWT = 'refresh_jwt'
    const [token, setToken] = useState('')
    const [userFirstName, setUserFirstName] = useState<string | undefined>('')
    const dropdownRef = useRef<HTMLInputElement>(null)
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
    const dispatch = useAppDispatch()
    const [userLastName, setUserLastName] = useState<string | undefined>('')
    const [userEmail, setUserEmail] = useState<string | undefined>('')
    const [logo, setLogo] = useState('')

    useEffect(() => {
        if (token.length > 0) {
            performLoginByToken()
            handleLogo()
            return
        }
        getAccessToken()
    })

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
        const axiosInstance = createDefaultAxios()

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
        setUserFirstName(userData?.firstName)
        setUserLastName(userData?.lastName)
        setUserEmail(userData?.email)

        return genericResponse
    }

    const performLoginByToken = async () => {
        const dto = {
            token: token,
        }
        return performDataRequest('/auth/login-by-token', dto)
    }

    const handleLogo = () => {
        if (userFirstName && userLastName) {
            setLogo(
                userFirstName.charAt(0).toUpperCase() +
                    userLastName.charAt(0).toUpperCase()
            )
        } else if (userEmail) {
            setLogo(
                userEmail.charAt(0).toUpperCase() +
                    userEmail.charAt(1).toUpperCase()
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
                    <div className='user-info'>
                        <div className='avatar'> {logo} </div>
                        <div>
                            <div className='user-name'>
                                {userFirstName}&nbsp;
                                {userLastName}
                            </div>
                            <div className='user-email'> {userEmail} </div>
                        </div>
                    </div>
                    <hr />
                    <a href=''>
                        <FontAwesomeIcon className='user-icon' icon={faUser} />
                        Edit profile
                    </a>
                    <a href='' onClick={handleLogout}>
                        <FontAwesomeIcon
                            className='user-icon'
                            icon={faSignOutAlt}
                        />
                        Log out
                    </a>
                </div>
            </div>
        </div>
    )
}
export default UserProfile
