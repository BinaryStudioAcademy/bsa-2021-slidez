import httpHelper from '../http/http-helper'
import { CreatePresentationSessionDto } from './dto/CreatePresentationSessionDto'
import { GenericResponse } from 'slidez-shared/src/net/dto/GenericResponse'
import { AxiosResponse } from 'axios'
import { CreatePresentationSessionResponseDto } from './dto/CreatePresentationSessionResponseDto'

const route = '/session/new'

export const createPresentationSession = async (
    dto: CreatePresentationSessionDto
) => {
    const axiosResp: AxiosResponse = await httpHelper.doPost(route, dto)
    const { data } = axiosResp
    const resp: GenericResponse<CreatePresentationSessionResponseDto, string> =
        data
    if (resp.error) {
        throw new Error(resp.error)
    } else if (resp.data) {
        return resp.data
    }
    throw new Error('Unpredicted state')
}
