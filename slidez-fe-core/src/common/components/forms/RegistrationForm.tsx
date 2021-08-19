import React from 'react'
import { revealPassword } from './form-utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEye,
    faEyeSlash,
    faArrowAltCircleLeft,
} from '@fortawesome/free-regular-svg-icons'
import { useAppSelector } from '../../../hooks'
import { selectError } from '../../../containers/user/store'
import { GoogleOAuth } from '../../../services/auth/google-oauth'
import GoogleLogin from 'react-google-login'
import { NavLink } from 'react-router-dom'
import { AppRoute } from '../../routes/app-route'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

type RegistrationProps = {
    onRegister: Function
    onRegisterWithGoogle: Function
}

const RegistrationForm = ({
    onRegister,
    onRegisterWithGoogle,
}: RegistrationProps) => {
    const [isPasswordRevealed, setIsPasswordRevealed] = React.useState(false)
    const [isConfirmPasswordRevealed, setIsConfirmPasswordRevealed] =
        React.useState(false)
    const registrationError = useAppSelector(selectError)

    const onRevealPasswordClick = () => {
        setIsPasswordRevealed(!isPasswordRevealed)
        revealPassword('register-password-input')
    }

    const onRevealConfirmPasswordClick = () => {
        setIsConfirmPasswordRevealed(!isConfirmPasswordRevealed)
        revealPassword('register-confirmPassword-input')
    }

    const handleRegisterWithGoogle = async (googleData: any) => {
        onRegisterWithGoogle(googleData)
    }

    return (
        <div className='sign-form'>
            <div className='form-row header-row'>Sign Up</div>

            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .required('Required')
                        .email('Invalid email address'),
                    password: Yup.string()
                        .required('Required')
                        .min(12, 'Too short - 12 symbols minimum')
                        .max(32, 'Too long - 32 symbols maximum')
                        .matches(/^\S*$/, 'Must not contain spaces')
                        .matches(/[a-z]/, 'Must have lowercase letters')
                        .matches(/[A-Z]/, 'Must have uppercase letters')
                        .matches(/[0-9]/, 'Must have digits')
                        .matches(/[^A-Za-z0-9]/, 'Must have symbols'),
                    confirmPassword: Yup.string()
                        .required('Required')
                        .oneOf([Yup.ref('password')], 'Passwords must match'),
                })}
                onSubmit={(
                    { email, password, confirmPassword },
                    { setSubmitting }
                ) => {
                    onRegister(email, password, confirmPassword)
                    setSubmitting(false)
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className='form-row form-input-holder'>
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
                            <div
                                className={
                                    registrationError ? 'error-text' : 'hidden'
                                }
                            >
                                This email is taken
                            </div>
                        </div>

                        <div className='form-row form-input-holder'>
                            <label htmlFor='password' className='label'>
                                Password
                            </label>
                            <div className='input-with-icon-holder'>
                                <Field
                                    id='register-password-input'
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
                                    onClick={onRevealPasswordClick}
                                />
                            </div>
                            <ErrorMessage name='password'>
                                {(msg) => (
                                    <div className='error-text'>{msg}</div>
                                )}
                            </ErrorMessage>
                        </div>

                        <div className='form-row form-input-holder'>
                            <label htmlFor='confirmPassword' className='label'>
                                Confirm Password
                            </label>
                            <div className='input-with-icon-holder'>
                                <Field
                                    id='register-confirmPassword-input'
                                    name='confirmPassword'
                                    className={
                                        'form-input input-with-icon' +
                                        (touched.confirmPassword &&
                                        errors.confirmPassword
                                            ? ' error-input'
                                            : '')
                                    }
                                    type='password'
                                    placeholder='Confirm password'
                                />
                                <FontAwesomeIcon
                                    className={`input-icon ${
                                        isConfirmPasswordRevealed
                                            ? 'icon-eye'
                                            : 'icon-eye-slash'
                                    }`}
                                    icon={
                                        isConfirmPasswordRevealed
                                            ? faEye
                                            : faEyeSlash
                                    }
                                    onClick={onRevealConfirmPasswordClick}
                                />
                            </div>
                            <ErrorMessage name='confirmPassword'>
                                {(msg) => (
                                    <div className='error-text'>{msg}</div>
                                )}
                            </ErrorMessage>
                        </div>

                        <div className='form-row buttons-row'>
                            <button className='form-button login-button'>
                                Sign Up
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
                    onSuccess={handleRegisterWithGoogle}
                    redirectUri={GoogleOAuth.GOOGLE_REDIRECT_URI}
                    cookiePolicy={GoogleOAuth.GOOGLE_COOKIE_POLICY}
                    scope='https://www.googleapis.com/auth/presentations'
                    render={(renderProps) => (
                        <button
                            onClick={renderProps.onClick}
                            className={'form-button login-with-google-button'}
                            disabled={renderProps.disabled}
                        >
                            Sign Up with Google
                        </button>
                    )}
                />
            </div>
            <div className='form-row back-to-login'>
                <NavLink exact to={AppRoute.LOGIN} className='link'>
                    <FontAwesomeIcon
                        icon={faArrowAltCircleLeft}
                        className='icon-arrow'
                    />
                    Back to Log In
                </NavLink>
            </div>
        </div>
    )
}

export default RegistrationForm
