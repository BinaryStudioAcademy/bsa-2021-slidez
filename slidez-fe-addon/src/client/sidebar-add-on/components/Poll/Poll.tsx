import React, { FC } from 'react';
import { Formik, Field, FieldArray } from 'formik';

import server from '../../../utils/server';
import { Form } from 'react-bootstrap';
import './styles.scss';

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
                                            <div
                                                key={index}
                                                className='options'
                                            >
                                                <Field
                                                    name={`options.${index}`}
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
            <h2>Poll</h2>
            <Formik
                initialValues={{ name: '' }}
                onSubmit={async values => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                {props => {
                    const { values, handleChange, handleSubmit } = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            <Form className='mx-auto'>
                                <div className='field-wrapper'>
                                    <Form.Group className='form-group'>
                                        <Form.Label>Poll name:</Form.Label>
                                        <Field
                                            id='name'
                                            type='text'
                                            value={values.name}
                                            onChange={handleChange}
                                            className='text-input'
                                        />
                                    </Form.Group>
                                </div>
                                <Form.Group>
                                    <Form.Label>Options:</Form.Label>
                                    <OptionsArray />
                                </Form.Group>
                                <button type='submit'>Submit</button>
                            </Form>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
};
export default Poll;
