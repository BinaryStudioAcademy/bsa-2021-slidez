import React from 'react'
import { toastr } from 'react-redux-toastr'
import { NotificationTypes } from './notification-types'

export const handleNotification = (
    title: string,
    message: string,
    type: string
) => {
    let toastrOptions = {}
    switch (type) {
        case NotificationTypes.WARNING: {
            toastrOptions = {
                icon: type,
                status: type,
                timeOut: 0,
                showCloseButton: true,
                progressBar: false,
                closeOnToastrClick: false,
            }
            toastr.warning(title, message, toastrOptions)
            break
        }
        case NotificationTypes.ERROR: {
            toastr.error(title, message)
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
