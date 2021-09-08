import React from 'react'
import { NavLink } from 'react-router-dom'
import './sign-form.scss'
import { AppRoute } from '../../routes/app-route'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { revealPassword } from './form-utils'
import GoogleLogin from 'react-google-login'
import { GoogleOAuth } from '../../../services/auth/google-oauth'
import { Field, Form, Formik, FormikErrors } from 'formik'
import * as Yup from 'yup'
import { handleNotification } from '../../notification/Notification'
import { NotificationTypes } from '../../notification/notification-types'
import { useEffect } from 'react'
import { useAppSelector } from '../../../hooks'
import { selectError } from '../../../containers/user/store'

type LoginProps = {
    onLogin: Function
    onLoginWithGoogle: Function
}

type LoginErorrsProps = {
    viewErrors: boolean
    formikErrors: FormikErrors<{ email: string; password: string }>
}

const loginFieldsValidation = Yup.object({
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
})

export const handleLoginErrorNotification = (
    loginError: string | undefined,
    invalidEmail: string
) => {
    if (loginError) {
        handleNotification(
            'Login Failed',
            `The user cannot be authenticated with email ${invalidEmail} and the provided password`,
            NotificationTypes.ERROR
        )
    }
}

const LoginErrors = ({ viewErrors, formikErrors }: LoginErorrsProps) => {
    let errorMessage: string | null = null
    if (!viewErrors) {
        errorMessage = null
    } else if (formikErrors.email && formikErrors.password) {
        errorMessage = 'Please provide email and password'
    } else if (formikErrors.email) {
        errorMessage = 'Email is missing'
    } else if (formikErrors.password) {
        errorMessage = 'Password is missing'
    }
    return <div className='error-text'>{errorMessage}</div>
}

const LoginForm = ({ onLogin, onLoginWithGoogle }: LoginProps) => {
    const [isPasswordRevealed, setIsPasswordRevealed] = React.useState(false)
    const [viewErrors, setViewErrors] = React.useState(false)
    const loginError = useAppSelector(selectError)

    const onRevealClick = () => {
        setIsPasswordRevealed(!isPasswordRevealed)
        revealPassword('sign-in-password-input')
    }

    const handleLoginWithGoogle = async (googleData: any) => {
        onLoginWithGoogle(googleData)
    }

    const googleLoginFailed = () => {
        handleNotification(
            'Google Login Failed',
            'The provided user account is not registered in the system',
            NotificationTypes.ERROR
        )
    }

    return (
        <div className='sign-form'>
            <div className='form-row header-row'>Log In</div>
            <div className='form-row'>
                <div className='no-account'>No account?</div>
                <NavLink exact to={AppRoute.REGISTRATION} className='link'>
                    Sign Up
                </NavLink>
            </div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginFieldsValidation}
                onSubmit={({ email, password }, { setSubmitting }) => {
                    onLogin(email, password)
                    setSubmitting(false)
                    setViewErrors(true)
                }}
            >
                {({ errors }) => (
                    <Form>
                        <div className='form-row form-input-holder'>
                            <label htmlFor='email' className='label'>
                                Email
                            </label>
                            <Field
                                name='email'
                                className={
                                    'form-input' +
                                    (viewErrors && (errors.email || loginError)
                                        ? ' error-input'
                                        : '')
                                }
                                onClick={() => setViewErrors(false)}
                                type='text'
                                autoComplete='email'
                                placeholder='Enter your email'
                            />
                        </div>

                        <div className='form-row form-input-holder'>
                            <div className='row-with-components-on-opposite-sides'>
                                <label htmlFor='password' className='label'>
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
                                <Field
                                    id='sign-in-password-input'
                                    name='password'
                                    className={
                                        'form-input input-with-icon' +
                                        (viewErrors &&
                                        (errors.password || loginError)
                                            ? ' error-input'
                                            : '')
                                    }
                                    onClick={() => setViewErrors(false)}
                                    type='password'
                                    autoComplete='current-password'
                                    placeholder='Enter your password'
                                />
                                <FontAwesomeIcon
                                    className={`input-icon ${
                                        isPasswordRevealed
                                            ? 'icon-eye'
                                            : 'icon-eye-slash'
                                    }`}
                                    icon={
                                        isPasswordRevealed ? faEye : faEyeSlash
                                    }
                                    onClick={onRevealClick}
                                />
                            </div>
                        </div>

                        <LoginErrors
                            viewErrors={viewErrors}
                            formikErrors={errors}
                        />

                        <div className='form-row buttons-row'>
                            <button
                                className='form-button login-button'
                                onClick={() => setViewErrors(true)}
                                type='submit'
                            >
                                Log In
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            <div className='form-row button-divider'>or</div>
            <div className='form-row'>
                <GoogleLogin
                    className='form-button login-with-google-button'
                    clientId={GoogleOAuth.GOOGLE_CLIENT_ID}
                    onSuccess={handleLoginWithGoogle}
                    onFailure={googleLoginFailed}
                    redirectUri={GoogleOAuth.GOOGLE_REDIRECT_URI}
                    cookiePolicy={GoogleOAuth.GOOGLE_COOKIE_POLICY}
                    scope={[
                        'https://www.googleapis.com/auth/presentations',
                        'https://www.googleapis.com/auth/drive',
                    ].join(' ')}
                    responseType='code'
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
