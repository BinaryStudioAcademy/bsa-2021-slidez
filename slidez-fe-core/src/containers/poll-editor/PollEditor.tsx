import React from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'

import './PollEditor.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import back_button_icon from '../../assets/svgs/back_button_icon.svg'
import checked_icon from '../../assets/svgs/checked_icon.svg'
import drop_down_icon from '../../assets/svgs/drop_down_icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { createPoll } from './store'
import { RootState } from '../../store'

export type PollEditorProps = {
    pollId?: string | null
}

// eslint-disable-next-line react/prop-types
const PollEditor: React.FC<PollEditorProps> = ({ pollId }) => {
    const dispatch = useDispatch()
    const presentationId = useSelector(
        (state: RootState) => state.editor.presentationId
    )

    const initialValues = {
        title: '',
        options: [],
    }

    const handleSubmit = async (values: typeof initialValues) => {
        dispatch(
            createPoll({
                ...values,
                //TODO: Move to common function
                slideId: 'slidez_' + new Date().getTime(),
                presentationId,
            })
        )
    }

    const toggleRemoveClick = (index: number, arrayHelpers: any) => {
        if (index > 0) {
            arrayHelpers.remove(index)
        }
    }
    return (
        <div className='app'>
            <div>
                <button
                    className='back-button'
                    onClick={() => alert('Not yet realized')}
                >
                    <span>
                        <a href=''>
                            <img src={back_button_icon} alt='graph'></img>
                        </a>
                    </span>
                </button>
            </div>
            <div>
                <span>
                    <a href=''>
                        <img src={checked_icon} alt='graph'></img>
                    </a>
                </span>
                <span className='poll-name'>Live poll</span>
                <span>
                    <a href=''>
                        <img src={drop_down_icon} alt='graph'></img>
                    </a>
                </span>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                                        placeholder='What would you like ask?'
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
                                                        {`Option ${index + 1}`}
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
                                                            onClick={() => {
                                                                toggleRemoveClick(
                                                                    index,
                                                                    arrayHelpers
                                                                )
                                                            }}
                                                        >
                                                            <FontAwesomeIcon
                                                                className='option-delete-btn'
                                                                icon={
                                                                    faTrashAlt
                                                                }
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        )}

                                        <button
                                            className='btn-add-option'
                                            type='button'
                                            onClick={() =>
                                                arrayHelpers.push({ title: '' })
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
    )
}
export default PollEditor
