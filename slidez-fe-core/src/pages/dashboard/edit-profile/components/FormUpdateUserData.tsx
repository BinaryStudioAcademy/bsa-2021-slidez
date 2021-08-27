import React, { useState, useRef, useEffect } from 'react'

import Button from '@material-ui/core/Button'
import { Field, Form, Formik } from 'formik'
import { selectError } from '../../../../containers/user/store'
import { useAppSelector } from '../../../../hooks'
import '../update.scss'
import { FormUpdateUserDataProps } from '../editProfileTypes'
import { updateUserProfileFieldsValidation } from '../validations'
import { UpdateUserProfileErrors } from './UpdateUserProfileErrors'
import { UserField } from '../Field'

const FormUpdateUserData = ({
    userData,
    handleUpdateUserProfile,
    onCloseEditDialog,
    viewErrors,
    setViewErrors,
}: FormUpdateUserDataProps) => {
    const updateUserProfileError = useAppSelector(selectError)
    const handleInfoSubmit = (values: typeof userData) => {
        console.log(values)
    }
    return (
        <Formik
            initialValues={userData}
            validationSchema={updateUserProfileFieldsValidation}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting }) => {
                handleInfoSubmit(values),
                    handleUpdateUserProfile(values),
                    onCloseEditDialog(),
                    setSubmitting(false)
            }}
        >
            {({ errors }) => (
                <Form className='form-body'>
                    <div className='form-inputs'>
                        <div className='input-item'>
                            <p>Email</p>
                            <Field
                                name='email'
                                className={
                                    'form-input' +
                                    (viewErrors && errors.email
                                        ? ' error-input'
                                        : '')
                                }
                                onClick={() => setViewErrors(false)}
                                component={UserField}
                                value={errors.email}
                                type='text'
                                autoComplete='email'
                                placeholder='Enter your email'
                            />
                        </div>
                        <div className='input-item'>
                            <p>First Name</p>
                            <Field
                                id='update-firstName-input'
                                name='firstName'
                                className={
                                    'form-input input-with-icon' +
                                    (viewErrors && errors.firstName
                                        ? ' error-input'
                                        : '')
                                }
                                component={UserField}
                                value={errors.firstName}
                                onClick={() => setViewErrors(false)}
                                type='text'
                                autoComplete='firstName'
                                placeholder='Enter your firstName'
                            />
                        </div>
                        <div className='input-item'>
                            <p>Last Name</p>
                            <Field
                                id='update-lastName-input'
                                name='lastName'
                                className={
                                    'form-input input-with-icon' +
                                    (viewErrors && errors.lastName
                                        ? ' error-input'
                                        : '')
                                }
                                component={UserField}
                                value={errors.lastName}
                                onClick={() => setViewErrors(false)}
                                type='text'
                                autoComplete='lastName'
                                placeholder='Enter your lastName'
                            />
                        </div>
                        <UpdateUserProfileErrors
                            viewErrors={viewErrors}
                            updateUserProfileError={updateUserProfileError}
                            formikErrors={errors}
                        />
                        <Button
                            className='user-btn'
                            type='submit'
                            onClick={() => setViewErrors(true)}
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default FormUpdateUserData
