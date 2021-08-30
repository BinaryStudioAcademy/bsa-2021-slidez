import httpHelper from '../http/http-helper'
import { GenericResponse } from 'slidez-shared/src/net/dto/GenericResponse'
import { UpdatePasswordRequest } from './dto/UpdatePasswordRequest'
import { UpdateResult } from './dto/UpdateResult'
import { AxiosResponse } from 'axios'
import { UserDetailsDto } from '../../containers/user/dto/UserDetailsDto'
import { handleNotification } from '../../common/notification/Notification'

const route = (endpoint: string) => {
    return `/users/${endpoint}`
}

type UpdateProfileDto = {
    id?: string
    email?: string
    firstName?: string
    lastName?: string
}

export const editUserProfile = async (dto: UpdateProfileDto) => {
    const { data } = await httpHelper.doPost(route('update-profile'), dto)
    handleNotification('Saved', 'Profile updated successfully', 'success')
    const resp: GenericResponse<UserDetailsDto, string> = data
    const out: UpdateResult = {
        error: resp.error,
        userDetailsDto: undefined,
    }
    if (resp.data) {
        const payload: UserDetailsDto = resp.data
        out.userDetailsDto = payload
    }
    return out
}

export const editPassword = async (dto: UpdatePasswordRequest) => {
    const axiosResp: AxiosResponse = await httpHelper.doPost(
        route('update-password'),
        dto
    )
    handleNotification('Saved', 'Password edited successfully', 'success')
    const { data } = axiosResp
    const resp: GenericResponse<UserDetailsDto, string> = data
    const out: UpdateResult = {
        error: resp.error,
    }
    return out
}