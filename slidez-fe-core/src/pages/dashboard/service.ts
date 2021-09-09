import { GenericResponse } from 'slidez-shared/src/net/dto/GenericResponse'
import httpHelper from '../../services/http/http-helper'
import { PresentationDto } from './dto/PresentationDto'

export interface ReceiveResult {
    error?: string
    presentationDto?: PresentationDto[]
}

const route = (endpoint: string) => {
    return `/presentation/${endpoint}`
}
export const fetchPresentationInfo = async (): Promise<
    PresentationDto[] | undefined
> => {
    const { data } = await httpHelper.doGet(route('info'))
    const resp: GenericResponse<PresentationDto[], string> = data
    if (resp.data) {
        return resp.data
    }
}
