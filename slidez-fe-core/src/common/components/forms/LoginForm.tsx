import React from 'react'
import { NavLink } from 'react-router-dom'
import './sign-form.scss'
import { AppRoute } from '../../routes/app-route'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { revealPassword } from './form-utils'
import { useAppSelector } from '../../../hooks'
import { selectSignStatus } from '../../../containers/user/store'
import { SignStatus } from '../../../containers/user/enums/sign-status'
import GoogleLogin from 'react-google-login'
import { GoogleOAuth } from '../../../services/auth/google-oauth'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

type LoginProps = {
    onLogin: Function
    onLoginWithGoogle: Function
}

const LoginForm = ({ onLogin, onLoginWithGoogle }: LoginProps) => {
    const [isPasswordRevealed, setIsPasswordRevealed] = React.useState(false)
    const signStatus = useAppSelector(selectSignStatus)

    const onRevealClick = () => {
        setIsPasswordRevealed(!isPasswordRevealed)
        revealPassword('sign-in-password-input')
    }

    const handleLoginWithGoogle = async (googleData: any) => {
        onLoginWithGoogle(googleData)
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
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    password: Yup.string().required('Required'),
                })}
                onSubmit={({ email, password }, { setSubmitting }) => {
                    onLogin(email, password)
                    setSubmitting(false)
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className='form-row form-input-holder'>
                            <div
                                className={
                                    signStatus ===
                                    SignStatus.INVALID_CREDENTIALS
                                        ? 'error-text'
                                        : 'hidden'
                                }
                            >
                                {"Can't log in: email or password is invalid"}
                            </div>
                            <label htmlFor='email' className='label'>
                                Email
                            </label>
                            <Field
                                name='email'
                                className={
                                    'form-input' +
                                    (touched.email && errors.email
                                        ? ' error-input'
                                        : '')
                                }
                                type='text'
                                placeholder='Enter your email'
                            />
                            <ErrorMessage name='email'>
                                {(msg) => (
                                    <div className='error-text'>{msg}</div>
                                )}
                            </ErrorMessage>
                        </div>

                        <div className='form-row form-input-holder'>
                            <label htmlFor='password' className='label'>
                                Password
                            </label>
                            <div className='input-with-icon-holder'>
                                <Field
                                    id='sign-in-password-input'
                                    name='password'
                                    className={
                                        'form-input input-with-icon' +
                                        (touched.password && errors.password
                                            ? ' error-input'
                                            : '')
                                    }
                                    type='password'
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
                            <ErrorMessage name='password'>
                                {(msg) => (
                                    <div className='error-text'>{msg}</div>
                                )}
                            </ErrorMessage>
                        </div>

                        <div className='form-row buttons-row'>
                            <button className='form-button login-button'>
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
