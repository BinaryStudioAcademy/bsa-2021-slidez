import React, { useEffect, useState } from 'react'
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
import httpHelper from '../../services/http/http-helper'
import { UserDetailsDto } from '../../containers/user/dto/UserDetailsDto'
import { handleNotification } from '../../common/notification/Notification'
import { Redirect } from 'react-router-dom'

type DeleteAccountProps = {
    handleClose: () => void
    show: boolean
    children?: never[]
}
const DeleteAccount = ({ handleClose, show, children }: DeleteAccountProps) => {
    const JWT = 'jwt'
    const [token, setToken] = useState('')
    const [userId, setUserId] = useState('')
    const [userEmail, setUserEmail] = useState('')
    useEffect(() => {
        if (token.length > 0) {
            performLoginByToken()
            return
        }
        getAccessToken()
    })

    const performLoginByToken = async () => {
        const dto = {
            token: token,
        }
        return performDataRequest('/auth/login-by-token', dto)
    }

    const getAccessToken = () => {
        setToken(window.localStorage.getItem(JWT) || '{}')
        console.log(token)
    }

    const performDataRequest = async (url: string, dto: object) => {
        return null
    }

    const handleDeleteAccount = (values: UserDetailsDto) => {
        httpHelper
            .doDelete('user', values)
            .then(() => {
                return <Redirect to='/login' />
            })
            .catch(() =>
                handleNotification(
                    'Failed',
                    'Failed to delete account',
                    'error'
                )
            )
    }

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
                <Button variant='contained' onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    style={{
                        backgroundColor: '#C85250',
                    }}
                    variant='contained'
                    onClick={() =>
                        handleDeleteAccount({ id: userId, email: userEmail })
                    }
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteAccount
