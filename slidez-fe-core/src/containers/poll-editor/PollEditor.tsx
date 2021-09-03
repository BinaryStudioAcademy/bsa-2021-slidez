import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Field, FieldArray, Form, Formik } from 'formik'
import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import back_button_icon from '../../assets/svgs/back_button_icon.svg'
import checked_icon from '../../assets/svgs/checked_icon.svg'
import drop_down_icon from '../../assets/svgs/drop_down_icon.svg'
import './PollEditor.scss'
import { createPoll, EditorTab, setActiveTab } from './store'
import { RootState } from '../../store'
import Loader from '../../common/components/loader/Loader'

export type PollEditorProps = {
    pollId?: string | null
}

// eslint-disable-next-line react/prop-types
const PollEditor: React.FC<PollEditorProps> = ({ pollId }) => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const presentationId = useSelector(
        (state: RootState) => state.editor.presentationId
    )
    const initialValues = {
        title: '',
        options: [],
    }

    const [state, setState] = useState({ name: '' })
    const handleBackClick = useCallback(() => {
        dispatch(setActiveTab(EditorTab.MENU))
    }, [dispatch])

    const handleSubmit = async (values: typeof initialValues) => {
        setIsLoading(true)
        dispatch(
            createPoll({
                ...values,
                //TODO: Move to common function
                slideId: 'slidez_' + new Date().getTime(),
                presentationId,
            })
        )
        setIsLoading(false)
    }
    const onChangeInput = (e: { target: any }) => {
        setState(e.target.value)
    }
    const toggleRemoveClick = (
        length: number,
        index: number,
        arrayHelpers: any
    ) => {
        if (length > 1) {
            arrayHelpers.remove(index)
        } else {
            setState({ name: '' })
        }
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
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
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
                                                                {`Option ${
                                                                    index + 1
                                                                }`}
                                                                <Field
                                                                    name={`options.${index}.title`}
                                                                    placeholder='Your option'
                                                                    className='input'
                                                                    value={
                                                                        state.name
                                                                    }
                                                                    onChange={(e: {
                                                                        target: {
                                                                            value: React.SetStateAction<string>
                                                                        }
                                                                    }) =>
                                                                        onChangeInput(
                                                                            e
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <button
                                                                    type='button'
                                                                    className='options-btn'
                                                                    onClick={() => {
                                                                        toggleRemoveClick(
                                                                            values
                                                                                .options
                                                                                .length,
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
