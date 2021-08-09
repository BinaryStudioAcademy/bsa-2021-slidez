import React, { FC } from 'react'
import { TextField } from '@material-ui/core'
import { FieldProps } from 'formik'

interface Props extends FieldProps {}

export const Field: FC<Props> = ({ field }) => {
    return (
        <div>
            <TextField {...field} />
        </div>
    )
}
