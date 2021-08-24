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
                                fill='#979797'
                                stroke='#979797'
                                d='M15.1983 16.8019C15.3153 16.6848 15.3154 16.4951 15.1985 16.3779L11.0416 12.2119C10.9247 12.0948 10.9247 11.9052 11.0416 11.7881L15.1985 7.62213C15.3154 7.50494 15.3153 7.31517 15.1983 7.1981L14.2123 6.21213C14.0951 6.09497 13.9052 6.09497 13.788 6.21213L8.21229 11.7879C8.09513 11.905 8.09513 12.095 8.21229 12.2121L13.788 17.7879C13.9052 17.905 14.0951 17.905 14.2123 17.7879L15.1983 16.8019Z'
                            />
                        </g>
                    </svg>
                </button>
            </div>
            <div>
                <svg
                    className='svg-icon'
                    width='20'
                    height='16'
                    viewBox='0 0 20 16'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path d='M6.71439 10.818L6.74974 10.7826C7.00274 11.0356 7.41309 11.0356 7.66609 10.7826L16.8556 1.5931C16.9663 1.48222 17.145 1.48227 17.2558 1.59307L18.5711 2.90835C18.6817 3.019 18.6817 3.19765 18.5711 3.30831L7.40861 14.4708C7.40857 14.4708 7.40852 14.4708 7.40848 14.4709C7.30155 14.5789 7.1153 14.5789 7.00837 14.4709C7.00833 14.4708 7.00829 14.4708 7.00824 14.4708L1.42715 8.88967L6.71439 10.818ZM6.71439 10.818L6.74974 10.7826L3.14222 7.17599C3.14209 7.17586 3.14197 7.17573 3.14185 7.1756C3.08715 7.11882 3.01535 7.0918 2.94246 7.0918C2.8703 7.0918 2.79792 7.11888 2.74239 7.1744L1.42715 8.48965M6.71439 10.818L1.42715 8.48965M1.42715 8.48965C1.42714 8.48966 1.42713 8.48967 1.42712 8.48968L1.42715 8.48965ZM6.09317 15.3874L6.09313 15.3873L0.511795 9.80598L0.511766 9.80595C-0.104153 9.19102 -0.104187 8.19018 0.51179 7.57436L0.511795 7.57436L1.82707 6.25908L1.8271 6.25905C2.44204 5.64312 3.44372 5.64312 4.05867 6.25905L4.05869 6.25908L7.17298 9.37337L7.20834 9.40872L7.24369 9.37337L15.9403 0.677751L15.9404 0.677721C16.5553 0.0617884 17.557 0.0617885 18.1719 0.677721L18.172 0.677749L19.4872 1.99303C19.7858 2.29163 19.9499 2.6872 19.9499 3.10841C19.9499 3.5295 19.7858 3.92605 19.4873 4.22357L19.4872 4.22363L8.32458 15.3863L8.32457 15.3863C8.02611 15.6849 7.63036 15.8498 7.20834 15.8498C6.78624 15.8498 6.39071 15.6857 6.09317 15.3874ZM7.87535 14.8796H7.86598V14.9296V14.9796H7.87535V14.9296V14.8796Z' />
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
                                        Your question:
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
