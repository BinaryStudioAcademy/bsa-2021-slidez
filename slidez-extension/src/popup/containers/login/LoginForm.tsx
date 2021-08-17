import React from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { loginUser } from './redux/authenticationSlice'
import './login.scss'

const validationSchema = yup.object({
    email: yup
        .string()
        .email('This field must be a valid email')
        .required('This field is required'),
    password: yup.string().required('This field is required'),
})

const LoginForm = () => {
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(form) => {
                loginUser(form)
            }}
        >
            {() => (
                <div className='login-extension'>
                    <Form className='form-container'>
                        <h1>Login</h1>
                        <Field
                            as='input'
                            type='email'
                            name='email'
                            placeholder='sample@gmail.com'
                        />
                        <ErrorMessage name='email' />
                        <Field
                            as='input'
                            type='password'
                            name='password'
                            placeholder='**********'
                        />
                        <ErrorMessage name='password' />

                        <button type='submit' className='btn'>
                            Login
                        </button>
                    </Form>
                </div>
            )}
        </Formik>
    )
}

export default LoginForm
