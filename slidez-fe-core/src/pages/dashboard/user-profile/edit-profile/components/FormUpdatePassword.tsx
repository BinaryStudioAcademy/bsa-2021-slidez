import React, { useState, useRef, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { Field, Form, Formik } from 'formik'
import {
    selectError,
    isSavingPassword,
    updatePassword,
    selectId,
} from '../../../../../containers/user/store'
import { useAppDispatch, useAppSelector } from '../../../../../hooks'
import { UserField } from '../Field'
import { updatePasswordFieldsValidation } from '../validations'
import { UpdatePasswordErrors } from './UpdatePasswordErrors'
import { Loader } from './Loader'
import { UpdatePasswordRequest } from '../../../../../services/user/dto/UpdatePasswordRequest'
import './Form.scss'

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
    const isSavingPasswordData = useAppSelector(isSavingPassword)
    const updatePasswordError = useAppSelector(selectError)
    const userId = useAppSelector(selectId)
    const dispatch = useAppDispatch()

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
                        </div>
                        <div className='input-item'>
                            <p>Confirm password</p>
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
