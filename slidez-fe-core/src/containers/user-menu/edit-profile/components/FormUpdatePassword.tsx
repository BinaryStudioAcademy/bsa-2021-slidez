import React, { useState, useRef, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { Field, Form, Formik } from 'formik'
import {
    selectError,
    isSavingPassword,
    updatePassword,
    selectId,
} from '../../../user/store'
import { updatePasswordFieldsValidation } from '../validations'
import './Form.scss'
import { UserField } from '../Field'
import { UpdatePasswordErrors } from './UpdatePasswordErrors'
import { Loader } from './Loader'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { UpdatePasswordRequest } from '../../../../services/user/dto/UpdatePasswordRequest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { revealPassword } from '../../../../common/components/forms/form-utils'

export interface Password {
    id: string | undefined
    password: string
    confirmPassword: string
}

const initialValuesPassword: Password = {
    id: '',
    password: '',
    confirmPassword: '',
}

const FormUpdatePassword = () => {
    const [viewErrors, setViewErrors] = React.useState(false)
    const [isPasswordRevealed, setIsPasswordRevealed] = React.useState(false)
    const [isConfirmPasswordRevealed, setIsConfirmPasswordRevealed] =
        React.useState(false)
    const isSavingPasswordData = useAppSelector(isSavingPassword)
    const updatePasswordError = useAppSelector(selectError)
    const userId = useAppSelector(selectId)
    const dispatch = useAppDispatch()

    const onRevealPasswordClick = () => {
        setIsPasswordRevealed(!isPasswordRevealed)
        revealPassword('register-password-input')
    }

    const onRevealConfirmPasswordClick = () => {
        setIsConfirmPasswordRevealed(!isConfirmPasswordRevealed)
        revealPassword('register-confirmPassword-input')
    }

    const handleUpdatePassword = async (
        id: string | undefined,
        password: string,
        confirmPassword: string
    ) => {
        const pass: UpdatePasswordRequest = {
            id: id,
            password: password,
            confirmPassword: confirmPassword,
        }
        dispatch(updatePassword(pass))
    }

    return (
        <Formik
            initialValues={initialValuesPassword}
            validationSchema={updatePasswordFieldsValidation}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting }) => {
                handleUpdatePassword(
                    userId,
                    values.password,
                    values.confirmPassword
                ),
                    setSubmitting(false)
            }}
        >
            {({ errors }) => (
                <Form className='form-body'>
                    <div className='form-inputs'>
                        <span className='title-change-password'>
                            Change password
                        </span>
                        <div className='input-item'>
                            <p>New password</p>
                            <div className='input-password'>
                                <Field
                                    id='update-password-input'
                                    name='password'
                                    type='password'
                                    autoComplete='new-password'
                                    onClick={() => setViewErrors(false)}
                                    component={UserField}
                                    value={errors.password}
                                    placeholder='Enter new password'
                                />
                                <FontAwesomeIcon
                                    className={`input-icon-password ${
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
                        <div className='input-item'>
                            <p>Confirm password</p>
                            <div className='input-password'>
                                <Field
                                    id='update-confirmPassword-input'
                                    name='confirmPassword'
                                    className={'form-input'}
                                    component={UserField}
                                    value={errors.confirmPassword}
                                    onClick={() => setViewErrors(false)}
                                    type='password'
                                    autoComplete='new-password'
                                    placeholder='Enter confirm password'
                                />
                                <FontAwesomeIcon
                                    className={`input-icon-password ${
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

                        <UpdatePasswordErrors
                            viewErrors={viewErrors}
                            updatePasswordError={updatePasswordError}
                            formikErrors={errors}
                        />

                        <Button
                            className='user-btn'
                            onClick={() => setViewErrors(true)}
                            type='submit'
                        >
                            {isSavingPasswordData ? <Loader /> : 'Save'}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default FormUpdatePassword
