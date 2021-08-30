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
import { handleNotification } from '../../common/notification/Notification'
import { Redirect } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import { GenericResponse } from '../../../../slidez-shared/src/net/dto/GenericResponse'
import { UserDetailsDto } from '../user/dto/UserDetailsDto'

const DeleteAccount = () => {
    const JWT = 'jwt'
    const [showModal, setShowModal] = useState(true)
    const [token, setToken] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(() => {
        setToken(window.localStorage.getItem(JWT) || '{}')
        const dto = {
            token: token,
        }
        getAccessToken(dto, '')
    })

    const hideDeleteAccountModal = () => {
        setShowModal(false)
    }

    const getAccessToken = async (dto: object, route: string) => {
        const axiosResp: AxiosResponse = await httpHelper.doPost(route, dto)
        const { data } = axiosResp
        const resp: GenericResponse<UserDetailsDto, string> = data
        setUserId(resp.data.id)
    }

    const handleDeleteAccount = () => {
        const user = {
            id: userId,
        }
        httpHelper
            .doDelete('user', user)
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
        <Dialog open={showModal} maxWidth='sm' fullWidth>
            <DialogTitle>Confirm the action</DialogTitle>
            <Box position='absolute' top={0} right={0}>
                <IconButton onClick={hideDeleteAccountModal}>
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
                <Button variant='contained' onClick={hideDeleteAccountModal}>
                    Cancel
                </Button>
                <Button
                    style={{
                        backgroundColor: '#C85250',
                    }}
                    variant='contained'
                    onClick={handleDeleteAccount}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteAccount
