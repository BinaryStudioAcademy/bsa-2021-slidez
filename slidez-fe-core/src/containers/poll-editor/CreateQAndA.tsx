import { Field, Form, Formik } from 'formik'
import React, { useState, useCallback } from 'react'
import Loader from '../../common/components/loader/Loader'
import back_button_icon from '../../assets/svgs/back_button_icon.svg'
import checked_icon from '../../assets/svgs/check.svg'
import { EditorTab, setActiveTab } from './store'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import './qa.scss'

export type QAndAEditorProps = {
    qandaId?: string | null
}

const CreateQAndA: React.FC<QAndAEditorProps> = ({
    qandaId,
}: QAndAEditorProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const presentationId = useSelector(
        (state: RootState) => state.editor.presentationId
    )

    const handleBackClick = useCallback(() => {
        dispatch(setActiveTab(EditorTab.MENU))
    }, [dispatch])

    const initialValues = {
        title: '',
    }
    const handleSubmit = async (values: typeof initialValues) => {}

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

export default CreateQAndA
