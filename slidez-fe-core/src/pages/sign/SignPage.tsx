import React from 'react'
import { AppRoute } from '../../common/routes/app-route'
import { useLocation } from 'react-router-dom'
import LoginForm from '../../common/components/forms/LoginForm'
import RegistrationForm from '../../common/components/forms/RegistrationForm'
import './sign-page.scss'
import { useAppDispatch } from '../../hooks'
import { LogInDto } from '../../containers/user/dto/LogInDto'
import { RegisterDto } from '../../containers/user/dto/RegisterDto'
import {
    logIn,
    loginWithOAuthGoogle,
    register,
} from '../../containers/user/store'
import { TokenDto } from '../../containers/user/dto/TokenDto'

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

    const handleRegisterWithGoogle = () => {}

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
        <div className='signPage'>
            <div>
                <img
                    src='http://i.piccy.info/i9/b444f9c17363dd803519567805706967/1627469540/39479/1437067/welcome.jpg'
                    alt='Piccy.info - Free Image Hosting'
                    className='welcome-image'
                />
            </div>
            <div className='form-holder'>{getForm(pathname)}</div>
        </div>
    )
}

export default SignPage
