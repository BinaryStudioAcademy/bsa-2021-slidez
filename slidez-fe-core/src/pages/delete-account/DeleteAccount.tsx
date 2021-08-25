import React, { useRef, useState } from 'react'
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

type DeleteAccountProps = {
    handleClose: () => void
    show: boolean
    children?: never[]
}
const DeleteAccount = ({ handleClose, show, children }: DeleteAccountProps) => {
    return (
        <Dialog open={show} maxWidth='sm' fullWidth>
            <DialogTitle>Confirm the action</DialogTitle>
            <Box position='absolute' top={0} right={0}>
                <IconButton onClick={handleClose}>
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
                <Button
                    color='primary'
                    variant='contained'
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button color='secondary' variant='contained'>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteAccount
