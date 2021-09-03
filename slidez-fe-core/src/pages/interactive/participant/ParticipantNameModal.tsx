import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import * as Yup from 'yup'
import { Field, Form, Formik, FormikErrors } from 'formik'
import { saveParticipantData } from '../../../services/participant/participant-service'

type ParticipantNameErorrsProps = {
    viewErrors: boolean
    formikErrors: FormikErrors<{
        firstName: string
        lastName: string
    }>
}

const ParticipantNameErrors = ({
    viewErrors,
    formikErrors,
}: ParticipantNameErorrsProps) => {
    let errorMessage: string | null = null
    if (!viewErrors) {
        errorMessage = null
    } else if (formikErrors.firstName) {
        errorMessage = 'First name should be 2 or more characters long'
    } else if (formikErrors.lastName) {
        errorMessage = 'Last name should be 2 or more characters long'
    }

    return <div className='error-text'>{errorMessage}</div>
}

const ParticipantNameDialog = () => {
    const [viewErrors, setViewErrors] = useState(false)
    const [openModal, setOpenModal] = useState(true)

    const handleUserData = (firstName: string, lastName: string) => {
        saveParticipantData(firstName, lastName)
        setOpenModal(false)
    }

    const particpantNameFieldsValidation = Yup.object({
        firstName: Yup.string()
            .required('Required')
            .min(2, '2 symbols minimum'),
        lastName: Yup.string().required('Required').min(2, '2 symbols minimum'),
    })
    return (
        <Dialog open={openModal} aria-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>How to name you?</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{ firstName: '', lastName: '' }}
                    validationSchema={particpantNameFieldsValidation}
                    onSubmit={({ firstName, lastName }, { setSubmitting }) => {
                        handleUserData(firstName, lastName)
                        setSubmitting(false)
                    }}
                >
                    {({ errors }) => (
                        <Form>
                            <div className='form-row form-input-holder'>
                                <label htmlFor='firstName' className='label'>
                                    First Name
                                </label>
                                <Field
                                    name='firstName'
                                    className={
                                        'form-input' +
                                        (viewErrors && errors.firstName
                                            ? ' error-input'
                                            : '')
                                    }
                                    onClick={() => setViewErrors(false)}
                                    type='text'
                                />
                            </div>

                            <div className='form-row form-input-holder'>
                                <div className='row-with-components-on-opposite-sides'>
                                    <label htmlFor='lastName' className='label'>
                                        Last Name
                                    </label>
                                </div>
                                <Field
                                    name='lastName'
                                    className={
                                        'form-input' +
                                        (viewErrors && errors.lastName
                                            ? ' error-input'
                                            : '')
                                    }
                                    onClick={() => setViewErrors(false)}
                                    type='text'
                                />
                            </div>
                            <ParticipantNameErrors
                                viewErrors={viewErrors}
                                formikErrors={errors}
                            />
                            <div className='form-row buttons-row'>
                                <button
                                    className='form-button login-button'
                                    onClick={() => setViewErrors(true)}
                                    type='submit'
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}

export default ParticipantNameDialog
