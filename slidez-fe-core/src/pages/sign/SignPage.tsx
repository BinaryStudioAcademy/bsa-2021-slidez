import React from 'react'
import { AppRoute } from '../../common/routes/app-route'
import { useLocation } from 'react-router-dom'
import LoginForm from '../../common/components/forms/LoginForm'
import RegistrationForm from '../../common/components/forms/RegistrationForm'
import styles from './styles.module.scss'
import { useAppDispatch } from '../../hooks'
import { LogInDto } from '../../services/auth/dto/LogInDto'
import { TokenDto } from '../../services/auth/dto/TokenDto'
import { RegisterDto } from '../../services/auth/dto/RegisterDto'
import Logo from '../../common/components/logo/logo'
import loginPage from '../../assets/images/LogInPageBackground.jpg'
import {
    logIn,
    loginWithOAuthGoogle,
    register,
    registerWithOAuthGoogle,
} from '../../containers/user/store'

const SignPage = () => {
    const { pathname } = useLocation()
    const dispatch = useAppDispatch()

    const handleLogin = (email: string, password: string) => {
        const dto: LogInDto = {
            email: email,
            password: password,
        }
        dispatch(logIn(dto))
    }

    const handleLoginWithGoogle = async (googleData: any) => {
        const dto: TokenDto = {
            token: googleData.tokenId,
        }
        dispatch(loginWithOAuthGoogle(dto))
    }

    const handleRegister = (
        email: string,
        password: string,
        confirmedPassword: string
    ) => {
        const dto: RegisterDto = {
            email: email,
            password: password,
            confirmedPassword: confirmedPassword,
        }
        dispatch(register(dto))
    }

    const handleRegisterWithGoogle = async (googleData: any) => {
        const dto: TokenDto = {
            token: googleData.tokenId,
        }
        dispatch(registerWithOAuthGoogle(dto))
    }

    const getForm = (path: string) => {
        switch (path) {
            case AppRoute.LOGIN: {
                return (
                    <LoginForm
                        onLogin={handleLogin}
                        onLoginWithGoogle={handleLoginWithGoogle}
                    />
                )
            }
            case AppRoute.REGISTRATION: {
                return (
                    <RegistrationForm
                        onRegister={handleRegister}
                        onRegisterWithGoogle={handleRegisterWithGoogle}
                    />
                )
            }
            default: {
                return null
            }
        }
    }

    return (
        <div className={styles.signPage}>
            <div className={styles.imageContainer}>
                <div className={styles.imageBlock}>
                    <Logo width='50%' />
                </div>
            </div>
            <div className={styles.formHolder}>{getForm(pathname)}</div>
        </div>
    )
}

export default SignPage
