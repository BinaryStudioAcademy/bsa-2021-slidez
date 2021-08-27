import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@material-ui/core/Button'
import { Field, Form, Formik } from 'formik'
import React, { useState, useRef, useEffect } from 'react'
import { selectError } from '../../../../containers/user/store'
import { useAppSelector } from '../../../../hooks'
import { FormUpdatePasswordProps } from '../editProfileTypes'
import { UserField } from '../Field'
import { updatePasswordFieldsValidation } from '../validations'
import { UpdatePasswordErrors } from './UpdatePasswordErrors'

const FormUpdatePassword = ({
    initialValuesPassword,
    handleUpdatePassword,
    userId,
    onCloseEditDialog,
    viewErrors,
    setViewErrors,
}: FormUpdatePasswordProps) => {
    const updatePasswordError = useAppSelector(selectError)

    const handlePwdSubmit = (values: typeof initialValuesPassword) => {
        console.log(values)
    }

    return (
        <Formik
            initialValues={initialValuesPassword}
            validationSchema={updatePasswordFieldsValidation}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting }) => {
                handlePwdSubmit(values),
                    handleUpdatePassword(
                        userId,
                        values.password,
                        values.confirmPassword
                    ),
                    onCloseEditDialog(),
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
                            Save
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default FormUpdatePassword
