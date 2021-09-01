import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    IconButton,
    Typography,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { deleteAccount } from '../user/store'
import { useAppDispatch } from '../../hooks'

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
            <DialogTitle>Confirm the action</DialogTitle>
            <Box position='absolute' top={0} right={0}>
                <IconButton onClick={props.handleClose}>
                    <Close />
                </IconButton>
            </Box>
            <DialogContent>
                <Typography>
                    Are you sure to delete your account and all your
                    presntations?
                </Typography>
                <Typography variant='subtitle2'>
                    This action cannot be undone.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button
                    style={{
                        backgroundColor: '#C85250',
                    }}
                    variant='contained'
                    onClick={handleDeleteAccountClick}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteAccount
