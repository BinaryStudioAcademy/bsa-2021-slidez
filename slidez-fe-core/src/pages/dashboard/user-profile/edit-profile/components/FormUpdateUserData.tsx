import React, { useState, useRef, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { Field, Form, Formik } from 'formik'
import {
    selectError,
    isSavingUser,
    updateUserProfile,
    selectUserDetals,
} from '../../../../../containers/user/store'
import { useAppDispatch, useAppSelector } from '../../../../../hooks'
import { updateUserProfileFieldsValidation } from '../validations'
import { UpdateUserProfileErrors } from './UpdateUserProfileErrors'

import { UserField } from '../Field'
import { Loader } from './Loader'
import { UpdateProfileDto } from '../../../../../services/user/dto/UpdateProfileDto'
import { initialValuesUserData } from '../../UserProfile'
import './Form.scss'

const FormUpdateUserData = () => {
    const isSavingUserData = useAppSelector(isSavingUser)
    const updateUserProfileError = useAppSelector(selectError)
    const userData = useAppSelector(selectUserDetals) || initialValuesUserData
    const [viewErrors, setViewErrors] = React.useState(false)
    const dispatch = useAppDispatch()

    const handleUpdateUserProfile = (dto: UpdateProfileDto) => {
        dispatch(updateUserProfile(dto))
    }

    return (
        <Formik
            initialValues={userData}
            validationSchema={updateUserProfileFieldsValidation}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting }) => {
                handleUpdateUserProfile(values), setSubmitting(false)
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
                            {isSavingUserData ? <Loader /> : 'Save'}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default FormUpdateUserData
