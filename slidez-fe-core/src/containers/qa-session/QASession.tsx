import { Field, Form, Formik, FormikErrors } from 'formik'
import React, { useState, useCallback } from 'react'
import Loader from '../../common/components/loader/Loader'
import back_button_icon from '../../assets/svgs/back_button_icon.svg'
import checked_icon from '../../assets/svgs/check.svg'
import { createQA, EditorTab, setActiveTab } from '../poll-editor/store'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import * as Yup from 'yup'
import './QASession.scss'
import { handleNotification } from '../../common/notification/Notification'
import { NotificationTypes } from '../../common/notification/notification-types'

export type QAEditorProps = {
    qaId?: string | null
}

type QAErorrsProps = {
    viewErrors: boolean
    formikErrors: FormikErrors<{
        title: string
    }>
}

const qaValidation = Yup.object({
    title: Yup.string().required('Required'),
})

const QAErrors = ({ viewErrors, formikErrors }: QAErorrsProps) => {
    let errorMessage: string | null = null
    if (!viewErrors) {
        errorMessage = null
    } else if (formikErrors.title) {
        errorMessage = 'Please enter your question'
    }
    return <div className='qa-error-text'>{errorMessage}</div>
}

const CreateQA: React.FC<QAEditorProps> = ({ qaId }: QAEditorProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [viewErrors, setViewErrors] = useState(false)
    const dispatch = useDispatch()
    const qaError = useSelector((state: RootState) => state.editor.error)
    const presentationId = useSelector(
        (state: RootState) => state.editor.presentationId
    )
    const handleBackClick = useCallback(() => {
        dispatch(setActiveTab(EditorTab.MENU))
    }, [dispatch])

    const initialValues = {
        title: '',
    }
    const handleSubmit = async (values: typeof initialValues) => {
        setIsLoading(true)
        dispatch(
            createQA({
                ...values,
                slideId: 'slidez_' + new Date().getTime(),
                presentationId,
            })
        )
        if (qaError !== null) {
            handleNotification(
                'Q&A creation failed',
                'The Q&A component was not added',
                NotificationTypes.ERROR
            )
        }
    }
    return (
        <div className='app'>
            {isLoading ? (
                <div className='qa-loader'>
                    <Loader />
                    Saving, please wait..
                </div>
            ) : (
                <div>
                    <div>
                        <button
                            className='back-button'
                            onClick={() => handleBackClick()}
                        >
                            <span>
                                <img src={back_button_icon} alt='graph'></img>
                            </span>
                        </button>
                    </div>
                    <div className='qanda-name-block'>
                        <span>
                            <img src={checked_icon} alt='graph'></img>
                        </span>
                        <span className='qanda-name'>Audience Q&#38;A</span>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={qaValidation}
                        onSubmit={handleSubmit}
                    >
                        {({ errors }) => {
                            return (
                                <Form>
                                    <div className='field-wrapper mx-auto'>
                                        <div className='qanda-form-group'>
                                            <label
                                                htmlFor='title'
                                                className='label title-label'
                                            >
                                                Your question
                                            </label>
                                            <Field
                                                id='name'
                                                type='text'
                                                name='title'
                                                onClick={() =>
                                                    setViewErrors(false)
                                                }
                                                className={
                                                    'input title-input' +
                                                    (viewErrors && errors.title
                                                        ? ' qa-error-input'
                                                        : '')
                                                }
                                                placeholder='What would you like to ask?'
                                            />
                                        </div>
                                    </div>
                                    <QAErrors
                                        viewErrors={viewErrors}
                                        formikErrors={errors}
                                    />
                                    <button
                                        type='submit'
                                        className='btn-submit form-button'
                                        onClick={() => setViewErrors(true)}
                                    >
                                        Add to presentation
                                    </button>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            )}
        </div>
    )
}

export default CreateQA
