import { number } from 'prop-types';
import React, { FC, useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';

import server from '../../utils/server';

const { serverFunctions } = server;

const Poll: FC = () => {
    const OptionsArray = () => (
        <div>
            <Formik
                initialValues={{ options: [''] }}
                onSubmit={async values => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
                render={({ values }) => (
                    <Form>
                        <FieldArray
                            name='options'
                            render={arrayHelpers => (
                                <div>
                                    {values.options &&
                                    values.options.length > 0 ? (
                                        values.options.map((option, index) => (
                                            <div key={index}>
                                                <Field
                                                    name={`options.${index}`}
                                                />
                                                <button
                                                    type='button'
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
    );

    return (
        <div className='app'>
            <Formik
                initialValues={{ name: '' }}
                onSubmit={async values => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                    } = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className='custom-question'>
                                <div className='field-wrapper'>
                                    <div className='form-group'>
                                        <input
                                            id='name'
                                            placeholder='Enter name'
                                            type='text'
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className='text-input'
                                        />
                                    </div>
                                </div>
                            </div>
                            <OptionsArray />
                            <button type='submit' disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
};
export default Poll;
