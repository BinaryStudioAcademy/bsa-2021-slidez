import React from 'react'
import PropTypes from 'prop-types'

export interface Values {
    firstName: string
    lastName: string
    email: string
}
export interface Props {
    onSubmit: (values: Values) => void
}
export function handleSubmit(values: Values) {
    console.log(values)
}

handleSubmit.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
}
