import React, { useState } from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'

import './PollEditor.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { CreatePollDto } from './dto'
import httpHelper from '../../services/http/http-helper'
import { handleNotification } from '../../common/notification/Notification'
import { getMessageBusUnsafe } from '../../hooks/event-bus'
import { EventType, InsertSlideSuccess } from 'slidez-shared'

export type PollEditorProps = {
    presentationId: string
}

// eslint-disable-next-line react/prop-types
const PollEditor: React.FC = () => {
    const initialValues: CreatePollDto = {
        presentationId: '',
        title: '',
        options: [],
    }

    const handleSubmit = async (values: CreatePollDto) => {
        const data =
            await getMessageBusUnsafe()?.sendMessageAndListen<InsertSlideSuccess>(
                {
                    type: EventType.INSERT_SLIDE,
                    data: {
                        id: 'slidez_test_id_lol_' + new Date().getTime(),
                        title: `Poll: ${values.title}`,
                    },
                },
                EventType.INSERT_SLIDE_SUCCESS,
                5000
            )

        console.log('Created poll slide successfully, returned data: ', data)
    }

    return (
        <div className='app'>
            <h2 className='poll-name'>
                <FontAwesomeIcon className='check-icon' icon={faCheck} />
                Live poll
            </h2>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values }) => {
                    return (
                        <Form>
                            <div className='field-wrapper mx-auto'>
                                <div className='form-group'>
                                    <label>Poll name:</label>
                                    <Field
                                        id='name'
                                        type='text'
                                        name='title'
                                        className='text-input'
                                    />
                                </div>
                            </div>
                            <label>Options:</label>
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
                                                    <Field
                                                        name={`options.${index}.title`}
                                                        placeholder='Your option'
                                                        className='input-options'
                                                    />
                                                    <button
                                                        type='button'
                                                        className='options-btn'
                                                        onClick={() =>
                                                            arrayHelpers.remove(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </button>
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
                                            Add option
                                        </button>
                                    </div>
                                )}
                            />
                            <button type='submit' className='btn-submit'>
                                Submit
                            </button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
export default PollEditor
