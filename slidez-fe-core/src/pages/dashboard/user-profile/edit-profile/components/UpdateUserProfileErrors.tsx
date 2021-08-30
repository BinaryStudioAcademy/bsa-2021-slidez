import React from 'react'
import { UpdateUserProfileErorrsProps } from '../editProfileTypes'
import './Form.scss'

export const UpdateUserProfileErrors = ({
    viewErrors,
    updateUserProfileError,
    formikErrors,
}: UpdateUserProfileErorrsProps) => {
    let errorMessage: string | null = null
    if (!viewErrors) {
        errorMessage = null
    } else if (updateUserProfileError) {
        errorMessage = 'updateUserProfileError'
    } else if (formikErrors.email) {
        errorMessage = 'Please provide valid email'
    } else if (formikErrors.firstName) {
        errorMessage = 'FirstName should be 3-30 characters long'
    } else if (formikErrors.lastName) {
        errorMessage = 'FirstName should be 3-30 characters long'
    }
    return <div className='error-text-user-profile'>{errorMessage}</div>
}
