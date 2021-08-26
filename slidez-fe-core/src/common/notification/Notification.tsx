import React from 'react'
import { toastr } from 'react-redux-toastr'
import { NotificationTypes } from './notification-types'

export const handleNotification = (
    title: string,
    message: string,
    type: string
) => {
    let toastrOptions = {
        timeOut: 3000,
        showCloseButton: true,
        newestOnTop: true,
        progressBar: false,
        closeOnToastrClick: false,
    }
    toastr.removeByType('error')
    toastr.removeByType('warning')
    switch (type) {
        case NotificationTypes.WARNING: {
            toastr.warning(title, message, toastrOptions)
            break
        }
        case NotificationTypes.ERROR: {
            toastr.error(title, message, toastrOptions)
            break
        }
        case NotificationTypes.SUCCESS: {
            toastr.success(title, message)
            break
        }
        case NotificationTypes.INFO: {
            toastr.info(title, message)
        }
    }
}
