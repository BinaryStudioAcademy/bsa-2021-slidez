import React from 'react'
import { NavLink } from 'react-router-dom'
import './sign-form.scss'
import { AppRoute } from '../../routes/app-route'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import validator from 'validator'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { revealPassword } from './form-utils'
import { useAppSelector } from '../../../hooks'
import { selectSignStatus } from '../../../containers/user/store'
import { SignStatus } from '../../../containers/user/enums/sign-status'
import GoogleLogin from 'react-google-login'
import { GoogleOAuth } from '../../../services/auth/google-oauth'

type LoginProps = {
    onLogin: Function
    onLoginWithGoogle: Function
}

const LoginForm = ({ onLogin, onLoginWithGoogle }: LoginProps) => {
    const [isPasswordRevealed, setIsPasswordRevealed] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [isEmailValid, setIsEmailValid] = React.useState(true)
    const [password, setPassword] = React.useState('')
    const signStatus = useAppSelector(selectSignStatus)

    const onRevealClick = () => {
        setIsPasswordRevealed(!isPasswordRevealed)
        revealPassword('sign-in-password-input')
    }

    const handleLogin = () => {
        if (isEmailValid && email !== '') {
            onLogin(email, password)
        }
    }

    const handleLoginWithGoogle = async (googleData: any) => {
        onLoginWithGoogle(googleData)
    }
    return (
        <div className='sign-form'>
            <div className='form-row'>Log In</div>
            <div className='form-row'>
                <div className='no-account'>No account?</div>
                <NavLink exact to={AppRoute.REGISTRATION} className='link'>
                    Sign Up
                </NavLink>
            </div>
            <div className='form-row form-input-holder'>
                <p
                    className={
                        signStatus === SignStatus.INVALID_CREDENTIALS
                            ? 'error-text'
                            : 'hidden'
                    }
                >
                    {`Can't log in: email or password is invalid`}
                </p>
                <label htmlFor='sign-in-email-input' className='label'>
                    Email
                </label>
                <input
                    id='sign-in-email-input'
                    className={`form-input ${
                        isEmailValid ? '' : 'error-input'
                    }`}
                    placeholder='Enter your email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    onBlur={() => setIsEmailValid(validator.isEmail(email))}
                />
            </div>
            <div className='form-row form-input-holder'>
                <div className='row-with-components-on-opposite-sides'>
                    <label htmlFor='sign-in-password-input' className='label'>
                        Password
                    </label>
                    <NavLink
                        exact
                        to={AppRoute.RESTORE_PASSWORD}
                        className='link'
                    >
                        Forgot password?
                    </NavLink>
                </div>
                <div className='input-with-icon-holder'>
                    <input
                        id='sign-in-password-input'
                        type='password'
                        className='form-input input-with-icon'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <FontAwesomeIcon
                        icon={isPasswordRevealed ? faEye : faEyeSlash}
                        className='input-icon'
                        onClick={onRevealClick}
                    />
                </div>
            </div>
            <div className='form-row' />
            <div className='form-row'>
                <button
                    className='form-button login-button'
                    onClick={handleLogin}
                >
                    Log In
                </button>
            </div>
            <div className='form-row button-divider'>or</div>
            <div className='form-row'>
                <GoogleLogin
                    className='form-button login-with-google-button'
                    clientId={GoogleOAuth.GOOGLE_CLIENT_ID}
                    onSuccess={handleLoginWithGoogle}
                    redirectUri={GoogleOAuth.GOOGLE_REDIRECT_URI}
                    cookiePolicy={GoogleOAuth.GOOGLE_COOKIE_POLICY}
                    render={(renderProps) => (
                        <button
                            onClick={renderProps.onClick}
                            className={'form-button login-with-google-button'}
                            disabled={renderProps.disabled}
                        >
                            Log In with Google
                        </button>
                    )}
                />
            </div>
        </div>
    )
}

export default LoginForm
