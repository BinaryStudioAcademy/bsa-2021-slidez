import React from 'react'
import { NavLink } from 'react-router-dom'
import './sign-form.scss'
import { AppRoute } from '../../routes/app-route'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { revealPassword } from './form-utils'
import { useAppSelector } from '../../../hooks'
import { selectError } from '../../../containers/user/store'
import GoogleLogin from 'react-google-login'
import { GoogleOAuth } from '../../../services/auth/google-oauth'
import { Field, Form, Formik, FormikErrors } from 'formik'
import * as Yup from 'yup'

type LoginProps = {
    onLogin: Function
    onLoginWithGoogle: Function
}

type LoginErorrsProps = {
    viewErrors: boolean
    loginError: string | undefined
    formikErrors: FormikErrors<{ email: string; password: string }>
}

const loginFieldsValidation = Yup.object({
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
})

const LoginErrors = ({
    viewErrors,
    loginError,
    formikErrors,
}: LoginErorrsProps) => {
    let errorMessage: string | null = null
    if (!viewErrors) {
        errorMessage = null
    } else if (loginError) {
        errorMessage = "Can't log in: email or password is invalid"
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
                                        (viewErrors && errors.password
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
                            loginError={loginError}
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
