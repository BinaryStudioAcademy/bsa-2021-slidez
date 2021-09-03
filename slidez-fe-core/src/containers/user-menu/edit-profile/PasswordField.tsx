import React, { FC } from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import { FieldProps } from 'formik'

export const UserPasswordField: FC<FieldProps> = ({ field }) => {
    return (
        <div>
            <TextField
                variant='outlined'
                size='small'
                {...field}
                type='password'
            />
        </div>
    )
}

UserPasswordField.propTypes = {
    field: PropTypes.any,
}
