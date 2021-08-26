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
import { Field, Form, Formik, FormikErrors } from 'formik'
import * as Yup from 'yup'
import { handleNotification } from '../../notification/Notification'
import { NotificationTypes } from '../../notification/notification-types'

type RegistrationProps = {
    onRegister: Function
    onRegisterWithGoogle: Function
}

type RegistrationErorrsProps = {
    viewErrors: boolean
    registrationError: string | undefined
    formikErrors: FormikErrors<{
        email: string
        password: string
        confirmPassword: string
    }>
}

const registrationFieldsValidation = Yup.object({
    email: Yup.string().required('Required').email('Invalid email address'),
    password: Yup.string()
        .required('Required')
        .min(12, 'Too short - 12 symbols minimum')
        .max(32, 'Too long - 32 symbols maximum')
        .matches(/^\S*$/, 'Should not contain spaces')
        .matches(/[a-z]/, 'Should have lowercase letters')
        .matches(/[A-Z]/, 'Should have uppercase letters')
        .matches(/[0-9]/, 'Should have digits')
        .matches(/[^A-Za-z0-9]/, 'Should have symbols'),
    confirmPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password')], 'Passwords should match'),
})

const RegistrationErrors = ({
    viewErrors,
    registrationError,
    formikErrors,
}: RegistrationErorrsProps) => {
    let errorMessage: string | null = null
    if (!viewErrors) {
        errorMessage = null
    } else if (registrationError) {
        handleNotification(
            'Registration Failed',
            'This email is taken',
            NotificationTypes.ERROR
        )
    } else if (formikErrors.email) {
        errorMessage = 'Please provide valid email'
    } else if (formikErrors.password) {
        errorMessage =
            'Password should be 12-32 characters long, and should have: ' +
            'no spaces, lowercase letter (a-z), uppercase letter (A-Z), digit (0-9) and symbol'
    } else if (formikErrors.confirmPassword) {
        errorMessage = 'Please make sure your passwords match'
    }

    return <div className='error-text'>{errorMessage}</div>
}

const RegistrationForm = ({
    onRegister,
    onRegisterWithGoogle,
}: RegistrationProps) => {
    const [isPasswordRevealed, setIsPasswordRevealed] = React.useState(false)
    const [isConfirmPasswordRevealed, setIsConfirmPasswordRevealed] =
        React.useState(false)
    const [viewErrors, setViewErrors] = React.useState(false)
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
                validationSchema={registrationFieldsValidation}
                onSubmit={(
                    { email, password, confirmPassword },
                    { setSubmitting }
                ) => {
                    onRegister(email, password, confirmPassword)
                    setSubmitting(false)
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
                                    (viewErrors && errors.email
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
                            <label htmlFor='password' className='label'>
                                Password
                            </label>
                            <div className='input-with-icon-holder'>
                                <Field
                                    id='register-password-input'
                                    name='password'
                                    className={
                                        'form-input input-with-icon' +
                                        (viewErrors && errors.password
                                            ? ' error-input'
                                            : '')
                                    }
                                    onClick={() => setViewErrors(false)}
                                    type='password'
                                    autoComplete='new-password'
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
                                        (viewErrors && errors.confirmPassword
                                            ? ' error-input'
                                            : '')
                                    }
                                    onClick={() => setViewErrors(false)}
                                    type='password'
                                    autoComplete='new-password'
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
                        </div>

                        <RegistrationErrors
                            viewErrors={viewErrors}
                            registrationError={registrationError}
                            formikErrors={errors}
                        />

                        <div className='form-row buttons-row'>
                            <button
                                className='form-button login-button'
                                onClick={() => setViewErrors(true)}
                                type='submit'
                            >
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
                    scope='https://www.googleapis.com/auth/presentations,https://www.googleapis.com/auth/drive'
                    responseType='code'
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
