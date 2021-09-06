import React, { FC } from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import { FieldProps } from 'formik'
import { makeStyles } from '@material-ui/core/styles'

const focusedColor = 'white'
const useStyles = makeStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: focusedColor,
            },
            '&:hover fieldset': {
                borderColor: focusedColor,
            },
        },
    },
})

export const UserField: FC<FieldProps> = ({ field }) => {
    const classes = useStyles()
    return (
        <div>
            <TextField
                className={classes.root}
                select={false}
                variant='outlined'
                size='small'
                {...field}
            />
        </div>
    )
}

UserField.propTypes = {
    field: PropTypes.any,
}
