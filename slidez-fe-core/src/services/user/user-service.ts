import httpHelper from '../http/http-helper'
import { GenericResponse } from 'slidez-shared/src/net/dto/GenericResponse'
import { UpdatePasswordDto } from './dto/UpdatePasswordDto'
import { UserDataResponseDto } from './dto/UserDataResponseDto'
import { UpdateResult } from './dto/UpdateResult'
import { AxiosResponse } from 'axios'

const route = (endpoint: string) => {
    return `/users/${endpoint}`
}

type UpdateProfilezDto = {
    id?: string
    email?: string
    firstName?: string
    lastName?: string
}

export const editUserProfile = async (dto: UpdateProfilezDto) => {
    const { data } = await httpHelper.doPost(route('update-profile'), dto)
    const resp: GenericResponse<UserDataResponseDto, string> = data
    const out: UpdateResult = {
        error: resp.error,
        userDetailsDto: undefined,
        updatePasswordDto: undefined,
        updateProfileDto: undefined,
    }
    if (resp.data) {
        const payload: UserDataResponseDto = resp.data
        out.userDetailsDto = payload.userDetailsDto
        out.updatePasswordDto = payload.updatePasswordDto
        out.updateProfileDto = payload.updateProfileDto
    }
    return out
}

export const editPassword = async (dto: UpdatePasswordDto) => {
    const axiosResp: AxiosResponse = await httpHelper.doPost(
        route('update-password'),
        dto
    )
    const { data } = axiosResp
    const resp: GenericResponse<UserDataResponseDto, string> = data
    const out: UpdateResult = {
        error: resp.error,
        userDetailsDto: undefined,
        updatePasswordDto: undefined,
        updateProfileDto: undefined,
    }
    if (resp.data) {
        const payload: UserDataResponseDto = resp.data
        out.userDetailsDto = payload.userDetailsDto
        out.updatePasswordDto = payload.updatePasswordDto
        out.updateProfileDto = payload.updateProfileDto
    }
    return out
}
