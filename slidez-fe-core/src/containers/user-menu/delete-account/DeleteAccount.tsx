import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogActions,
    Typography,
} from '@material-ui/core'
import { deleteAccount } from '../../user/store'
import { useAppDispatch } from '../../../hooks'
import './deleteAccount.scss'

const DeleteAccount = (props: {
    modalState: boolean
    handleClose: () => void
}) => {
    const dispatch = useAppDispatch()

    const handleDeleteAccountClick = () => {
        dispatch(deleteAccount())
    }

    return (
        <Dialog open={props.modalState} maxWidth='sm' fullWidth>
            <div className='dialog-title'>Confirm the action</div>
            <DialogContent>
                <Typography className='dialog-message'>
                    Are you sure to delete your account and all your
                    presentations?
                </Typography>
                <Typography variant='subtitle2' className='dialog-message'>
                    This action cannot be undone.
                </Typography>
            </DialogContent>
            <DialogActions>
                <button className='cancel-button' onClick={props.handleClose}>
                    Cancel
                </button>
                <button
                    className='confirm-button'
                    onClick={handleDeleteAccountClick}
                >
                    Confirm
                </button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteAccount
