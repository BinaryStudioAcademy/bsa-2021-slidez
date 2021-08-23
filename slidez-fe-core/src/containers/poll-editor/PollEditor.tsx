import React, { useState } from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'

import './PollEditor.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { ApiGateway } from '../../services/http/api-gateway'
import { CreatePollDto } from './dto'
import httpHelper from '../../services/http/http-helper'
import { handleNotification } from '../../common/notification/Notification'

export type PollEditorProps = {
    presentationId: string
}

// eslint-disable-next-line react/prop-types
const PollEditor: React.FC<PollEditorProps> = ({ presentationId }) => {
    const initialValues: CreatePollDto = {
        presentationId: presentationId,
        title: '',
        options: [],
    }

    const handleSubmit = (values: CreatePollDto) => {
        httpHelper
            .doPost('polls', values)
            .then(() =>
                handleNotification(
                    'Saved',
                    'Poll created successfully',
                    'success'
                )
            )
            .catch(() =>
                handleNotification(
                    'Failed',
                    'Failed to save a poll :(',
                    'error'
                )
            )
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
