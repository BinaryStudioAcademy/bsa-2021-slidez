import React, { useState } from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'

import './PollEditor.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
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
            <div>
                <button
                    className='back-button'
                    onClick={() => alert('Not yet realized')}
                >
                    <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='#979797'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <g opacity='0.5'>
                            <path
                                fill='white'
                                stroke='#979797'
                                d='M15.1983 16.8019C15.3153 16.6848 15.3154 16.4951 15.1985 16.3779L11.0416 12.2119C10.9247 12.0948 10.9247 11.9052 11.0416 11.7881L15.1985 7.62213C15.3154 7.50494 15.3153 7.31517 15.1983 7.1981L14.2123 6.21213C14.0951 6.09497 13.9052 6.09497 13.788 6.21213L8.21229 11.7879C8.09513 11.905 8.09513 12.095 8.21229 12.2121L13.788 17.7879C13.9052 17.905 14.0951 17.905 14.2123 17.7879L15.1983 16.8019Z'
                            />
                        </g>
                    </svg>
                </button>
            </div>
            <div>
                <svg
                    width='20'
                    height='16'
                    viewBox='0 0 20 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <mask id='path-1-inside-1' fill='white'>
                        <path d='M7.20834 15.8998C6.77298 15.8998 6.3647 15.7305 6.05777 15.4227L0.476439 9.84134C-0.159057 9.20686 -0.159057 8.17433 0.476439 7.539L1.79172 6.22372C2.42619 5.58823 3.45958 5.58823 4.09405 6.22372L7.20834 9.33801L15.905 0.642394C16.5395 0.00689739 17.5728 0.00689739 18.2073 0.642394L19.5226 1.95767C19.8305 2.26563 19.9999 2.6739 19.9999 3.10841C19.9999 3.54275 19.8305 3.95205 19.5226 4.25898L8.35993 15.4216C8.05215 15.7296 7.6437 15.8998 7.20834 15.8998ZM7.86598 14.9296H7.87535H7.86598ZM2.94246 7.1418C2.88284 7.1418 2.8234 7.16411 2.77775 7.20976L1.46247 8.52504C1.37118 8.61616 1.37118 8.76315 1.46247 8.85428L7.0438 14.4356C7.13118 14.524 7.28567 14.524 7.37305 14.4356L18.5357 3.27295C18.6268 3.18182 18.6268 3.03483 18.5357 2.9437L17.2204 1.62843C17.1291 1.53713 16.9821 1.53713 16.891 1.62843L7.70144 10.818C7.42892 11.0905 6.98691 11.0905 6.71439 10.818L3.10614 7.21061C3.06152 7.16411 3.00292 7.1418 2.94246 7.1418Z' />
                    </mask>
                    <path
                        d='M7.20834 15.8998C6.77298 15.8998 6.3647 15.7305 6.05777 15.4227L0.476439 9.84134C-0.159057 9.20686 -0.159057 8.17433 0.476439 7.539L1.79172 6.22372C2.42619 5.58823 3.45958 5.58823 4.09405 6.22372L7.20834 9.33801L15.905 0.642394C16.5395 0.00689739 17.5728 0.00689739 18.2073 0.642394L19.5226 1.95767C19.8305 2.26563 19.9999 2.6739 19.9999 3.10841C19.9999 3.54275 19.8305 3.95205 19.5226 4.25898L8.35993 15.4216C8.05215 15.7296 7.6437 15.8998 7.20834 15.8998ZM7.86598 14.9296H7.87535H7.86598ZM2.94246 7.1418C2.88284 7.1418 2.8234 7.16411 2.77775 7.20976L1.46247 8.52504C1.37118 8.61616 1.37118 8.76315 1.46247 8.85428L7.0438 14.4356C7.13118 14.524 7.28567 14.524 7.37305 14.4356L18.5357 3.27295C18.6268 3.18182 18.6268 3.03483 18.5357 2.9437L17.2204 1.62843C17.1291 1.53713 16.9821 1.53713 16.891 1.62843L7.70144 10.818C7.42892 11.0905 6.98691 11.0905 6.71439 10.818L3.10614 7.21061C3.06152 7.16411 3.00292 7.1418 2.94246 7.1418Z'
                        fill='#59D0A5'
                        stroke='#F6F4F8'
                        strokeWidth='0.2'
                        mask='url(#path-1-inside-1)'
                    />
                </svg>
                <span className='poll-name'>Live poll</span>
                <svg
                    width='12'
                    height='8'
                    viewBox='0 0 12 8'
                    fill='#59D0A5'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path d='M10.59 0.589844L6 5.16984L1.41 0.589844L0 1.99984L6 7.99984L12 1.99984L10.59 0.589844Z' />
                </svg>
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
                                                                if (index > 0) {
                                                                    arrayHelpers.remove(
                                                                        index
                                                                    )
                                                                }
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
