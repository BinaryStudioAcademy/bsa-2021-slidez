import { Field, FieldArray, Form, Formik } from 'formik'
import React, { useState, useCallback, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import back_button_icon from '../../assets/svgs/back_button_icon.svg'
import checked_icon from '../../assets/svgs/check.svg'
import drop_down_icon from '../../assets/svgs/drop_down_icon.svg'
import './PollEditor.scss'
import { createPoll, EditorTab, setActiveTab, updatePoll } from './store'
import { RootState } from '../../store'
import { NotificationTypes } from '../../common/notification/notification-types'
import { handleNotification } from '../../common/notification/Notification'
import Loader from '../../common/components/loader/Loader'
import { ReactComponent as TrashIcon } from '../../assets/svgs/trash.svg'
import { PollInteractiveElement } from '../../types/editor'

export type PollEditorProps = {
    poll: PollInteractiveElement | null
}

const PollEditor: React.FC<PollEditorProps> = ({ poll }: PollEditorProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const pollsError = useSelector((state: RootState) => state.editor.error)
    const presentationId = useSelector(
        (state: RootState) => state.editor.presentationId
    )
    const initialValues = {
        title: poll ? poll.title : '',
        options: poll ? poll.pollOptions : [],
    }

    const handleBackClick = useCallback(() => {
        dispatch(setActiveTab(EditorTab.MENU))
    }, [dispatch])

    const handleSubmit = async (values: typeof initialValues) => {
        setIsLoading(true)
        // create poll if it's new one
        if (!poll) {
            dispatch(
                createPoll({
                    ...values,
                    //TODO: Move to common function
                    slideId: 'slidez_' + new Date().getTime(),
                    presentationId,
                })
            )
            if (pollsError) {
                handleNotification(
                    'Poll creation Failed',
                    'The poll was not added',
                    NotificationTypes.ERROR
                )
            }
        }
        // update poll if it already exists
        else {
            dispatch(
                updatePoll({ ...values, id: poll.id, slideId: poll.slideId })
            )
            if (pollsError) {
                handleNotification(
                    'Poll updating Failed',
                    'The poll was not updated',
                    NotificationTypes.ERROR
                )
            }
        }
        setIsLoading(false)
    }
    return (
        <div className='app'>
            {isLoading ? (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        minHeight: '600px',
                        justifyContent: 'center',
                        textAlign: 'center',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        padding: '3rem',
                    }}
                >
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
                    <div className='poll-name-block'>
                        <span>
                            <a href=''>
                                <img src={checked_icon} alt='graph'></img>
                            </a>
                        </span>
                        <span className='poll-name'>Live poll</span>
                        <p className='poll-icon'>
                            <img src={drop_down_icon} alt='graph'></img>
                        </p>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ values }) => {
                            return (
                                <Form>
                                    <div className='field-wrapper mx-auto'>
                                        <div className='form-group'>
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

                                    <FieldArray
                                        name='options'
                                        render={(arrayHelpers) => (
                                            <div>
                                                {(values.options ?? []).map(
                                                    (option, index) => (
                                                        <div
                                                            key={index}
                                                            className='options'
                                                        >
                                                            <div className='label option-label'>
                                                                <Field
                                                                    name={`options.${index}.title`}
                                                                    placeholder='Your option'
                                                                    className='input'
                                                                />
                                                            </div>
                                                            <div>
                                                                <button
                                                                    type='button'
                                                                    className='options-btn'
                                                                    onClick={() =>
                                                                        arrayHelpers.remove(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <TrashIcon className='option-delete-btn' />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                )}

                                                <button
                                                    className='btn-add-option'
                                                    type='button'
                                                    onClick={() =>
                                                        arrayHelpers.push({
                                                            title: '',
                                                        })
                                                    }
                                                >
                                                    <div>
                                                        <span className='add-option-icon'>
                                                            +
                                                        </span>
                                                        Add option
                                                    </div>
                                                </button>
                                            </div>
                                        )}
                                    />
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
export default PollEditor
