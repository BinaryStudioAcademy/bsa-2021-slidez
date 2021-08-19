import React, { FC } from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'

import './PollEditor.scss'
import { HttpHelper } from '../../services/http/http-helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const PollEditor = () => {
    const handleSubmit = (name: string) => {
        HttpHelper.getInstance()
        console.log(name)
    }

    const OptionsArray = () => {
        return (
            <div>
                <Formik
                    initialValues={{ options: [''] }}
                    onSubmit={async (values) => {
                        await new Promise((resolve) => setTimeout(resolve, 500))
                        alert(JSON.stringify(values, null, 2))
                    }}
                    render={({ values }) => (
                        <Form>
                            <FieldArray
                                name='options'
                                render={(arrayHelpers) => (
                                    <div>
                                        {values.options &&
                                        values.options.length > 0 ? (
                                            values.options.map(
                                                (option, index) => (
                                                    <div
                                                        key={index}
                                                        className='options'
                                                    >
                                                        <Field
                                                            name={`options.${index}`}
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
                                                        <button
                                                            type='button'
                                                            className='options-btn'
                                                            onClick={() =>
                                                                arrayHelpers.insert(
                                                                    index,
                                                                    ''
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <button
                                                className='btn-add-option'
                                                type='button'
                                                onClick={() =>
                                                    arrayHelpers.push('')
                                                }
                                            >
                                                Add option
                                            </button>
                                        )}
                                    </div>
                                )}
                            />
                        </Form>
                    )}
                />
            </div>
        )
    }

    return (
        <div className='app'>
            <h2 className='poll-name'>
                <FontAwesomeIcon className='check-icon' icon={faCheck} />
                Live Poll
            </h2>
            <Formik
                initialValues={{ name: '' }}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 500))
                    alert(JSON.stringify(values, null, 2))
                }}
            >
                {(values: any, handleChange: any, handleSubmit: any) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <Form className='mx-auto'>
                                <div className='field-wrapper'>
                                    <Form className='form-group'>
                                        <label>Poll name:</label>
                                        <Field
                                            id='name'
                                            type='text'
                                            value={values.name}
                                            onChange={handleChange}
                                            className='text-input'
                                        />
                                    </Form>
                                </div>
                                <Form>
                                    <label>Options:</label>
                                    <OptionsArray />
                                </Form>
                                <button type='submit' className='btn-submit'>
                                    Submit
                                </button>
                            </Form>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
export default PollEditor
