import React, { useState, useRef, useEffect } from 'react'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from '../user/store'
import { useAppDispatch } from '../../hooks'

import { useDetectOutsideClick } from '../../pages/dashboard/useDetectOutsideClick'
import styles from './styles.module.scss'

const UserMenu: React.FC = () => {
    const JWT = 'jwt'
    const dispatch = useAppDispatch()
    const dropdownRef = useRef<HTMLInputElement>(null)
    const [token, setToken] = useState('')
    const [userFirstName] = useState<string | undefined>('')
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
    const [userLastName] = useState<string | undefined>('')
    const [userEmail] = useState<string | undefined>('')
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
        /*const axiosInstance = createDefaultAxios()
        const axiosInstance = createDefaultAxios(
            ApiGateway.REACT_APP_API_GATEWAY
        )

        return axiosInstance.request({
            url: route,
            method: 'POST',
            data: JSON.stringify(body),
        })
        */
    }

    const performDataRequest = async (url: string, dto: object) => {
        return null
        /* const { data } = await sendAuthRequest(url, dto)

        const genericResponse: GenericResponse<LogInResponseDto, string> = data
        const userData = genericResponse.data.userDetailsDto
        setUserFirstName(userData?.firstName)
        setUserLastName(userData?.lastName)
        setUserEmail(userData?.email)

        return genericResponse
        */
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
                            <div className={styles.userName}>
                                {`${userFirstName} ${userLastName}`}
                            </div>
                            <div className={styles.email}> {userEmail} </div>
                        </div>
                    </div>
                    <hr />
                    <a href=''>
                        <FontAwesomeIcon
                            className={styles.userIcon}
                            icon={faUser}
                        />
                        Edit profile
                    </a>
                    <a href='' onClick={handleLogout}>
                        <FontAwesomeIcon
                            className={styles.userIcon}
                            icon={faSignOutAlt}
                        />
                        Log out
                    </a>
                </div>
            </div>
        </div>
    )
}
export default UserMenu
