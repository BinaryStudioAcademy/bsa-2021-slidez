import React, { useState } from 'react'
import { Formik, Form, Field, FieldArray } from 'formik'
import './PollEditor.scss'

const PollOptions = () => {
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
                                        values.options.map((option, index) => (
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
                                        ))
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

export default PollOptions
