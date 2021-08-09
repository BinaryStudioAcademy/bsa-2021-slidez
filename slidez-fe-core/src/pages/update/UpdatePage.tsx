import React, { FC } from 'react'
import { Button, TextField } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { Props, handleSubmit } from './helper'

export const UpdatePage: FC = () => {
    return (
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '' }}
            onSubmit={(values) => {
                handleSubmit(values)
            }}
        >
            {({ values, handleChange, handleBlur }) => (
                <Form>
                    <div>
                        <div>
                            <p>First Name</p>
                            <Field name='firstName' />
                        </div>
                        <div>
                            <p>Last Name</p>
                            <Field name='lastName' />
                        </div>
                        <div>
                            <p>Email</p>
                            <Field name='email' />
                        </div>
                        <Button type='submit'>Submit</Button>
                    </div>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                </Form>
            )}
        </Formik>
    )
}
