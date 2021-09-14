import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import * as Yup from 'yup'
import { Field, Form, Formik, FormikErrors } from 'formik'
import {
    saveParticipantData,
    getParticipantData,
} from '../../../../services/participant/participant-service'
import { ParticipantData } from '../../../../services/participant/dto/ParticipantData'
import styles from './styles.module.scss'
import { getRandomFunnyName } from './funny-names-service'

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

    return <div className={styles.nameErrorText}>{errorMessage}</div>
}

const ParticipantNameDialog = (params: any) => {
    const defaultFirstName: string = 'Anonymous'
    const defaultLastName: string = getRandomFunnyName()
    const [viewErrors, setViewErrors] = useState(false)
    const [openModal, setOpenModal] = useState(true)

    const participantData: ParticipantData = getParticipantData()

    const particpantNameFieldsValidation = Yup.object({
        firstName: Yup.string()
            .required('Required')
            .min(2, '2 symbols minimum'),
        lastName: Yup.string().required('Required').min(2, '2 symbols minimum'),
    })

    const handleUserData = (firstName: string, lastName: string) => {
        const firstNameToSave: string = firstName || defaultFirstName
        const lastNameToSave: string = lastName || defaultLastName
        saveParticipantData(firstNameToSave, lastNameToSave)
        setOpenModal(false)
    }
    return (
        <Dialog
            open={openModal}
            aria-labelledby='form-dialog-title'
            className={styles.dialog}
        >
            <DialogTitle id='form-dialog-title'>How to name you?</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        firstName:
                            (participantData.participantFirstName as string) ||
                            defaultFirstName,
                        lastName:
                            (participantData.participantLastName as string) ||
                            defaultLastName,
                    }}
                    validationSchema={particpantNameFieldsValidation}
                    onSubmit={({ firstName, lastName }, { setSubmitting }) => {
                        handleUserData(firstName, lastName)
                        setSubmitting(false)
                        params.hideModal()
                    }}
                >
                    {({ errors, setFieldValue, values }) => (
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
                                    onClick={() => {
                                        setFieldValue('firstName', '')
                                        setViewErrors(false)
                                    }}
                                    onBlur={() =>
                                        setFieldValue(
                                            'firstName',
                                            values.firstName || defaultFirstName
                                        )
                                    }
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
                                    onClick={() =>
                                        setFieldValue('lastName', '')
                                    }
                                    onBlur={() =>
                                        setFieldValue(
                                            'lastName',
                                            values.lastName || defaultLastName
                                        )
                                    }
                                    type='text'
                                />
                            </div>
                            <ParticipantNameErrors
                                viewErrors={viewErrors}
                                formikErrors={errors}
                            />
                            <div className='form-row'>
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
