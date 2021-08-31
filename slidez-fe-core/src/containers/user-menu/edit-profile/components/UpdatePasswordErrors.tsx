import React from 'react'
import { UpdatePasswordErorrsProps } from '../editProfileTypes'
import './Form.scss'

export const UpdatePasswordErrors = ({
    viewErrors,
    updatePasswordError,
    formikErrors,
}: UpdatePasswordErorrsProps) => {
    let errorMessage: string | null = null
    if (!viewErrors) {
        errorMessage = null
    } else if (updatePasswordError) {
        errorMessage = 'updatePasswordError'
    } else if (formikErrors.password) {
        errorMessage =
            'Password should be 12-32 characters long, and should have: ' +
            'no spaces, lowercase letter (a-z), uppercase letter (A-Z), digit (0-9) and symbol'
    } else if (formikErrors.confirmPassword) {
        errorMessage = 'Please make sure your passwords match'
    }

    return <div className='error-text-edit-password'>{errorMessage}</div>
}
