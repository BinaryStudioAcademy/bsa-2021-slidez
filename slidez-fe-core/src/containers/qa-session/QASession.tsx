import { Field, Form, Formik } from 'formik'
import React, { useState, useCallback } from 'react'
import Loader from '../../common/components/loader/Loader'
import back_button_icon from '../../assets/svgs/back_button_icon.svg'
import checked_icon from '../../assets/svgs/check.svg'
import { createQA, EditorTab, setActiveTab } from '../poll-editor/store'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import './QASession.scss'
import { handleNotification } from '../../common/notification/Notification'
import { NotificationTypes } from '../../common/notification/notification-types'

export type QAEditorProps = {
    qaId?: string | null
}

const CreateQA: React.FC<QAEditorProps> = ({ qaId }: QAEditorProps) => {
    const [isLoading, setIsLoading] = useState(false)
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
                'Added Failed',
                'The question was not added',
                NotificationTypes.ERROR
            )
        }
        setIsLoading(false)
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
                            <a href=''>
                                <img src={checked_icon} alt='graph'></img>
                            </a>
                        </span>
                        <span className='qanda-name'>Audience Q&#38;A</span>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {({ values }) => {
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
                                                className='input title-input'
                                                placeholder='What would you like to ask?'
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type='submit'
                                        className='btn-submit form-button'
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
