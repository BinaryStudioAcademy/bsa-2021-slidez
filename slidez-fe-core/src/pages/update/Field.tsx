import React, { FC } from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import { FieldProps } from 'formik'

export const UserField: FC<FieldProps> = ({ field }) => {
    return (
        <div>
            <TextField variant='outlined' size='small' {...field} />
        </div>
    )
}

UserField.propTypes = {
    field: PropTypes.any,
}
