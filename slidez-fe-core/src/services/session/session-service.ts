import httpHelper from '../http/http-helper'
import { CreatePresentationSessionDto } from './dto/CreatePresentationSessionDto'
import { GenericResponse } from 'slidez-shared/src/net/dto/GenericResponse'
import { AxiosResponse } from 'axios'
import { CreatePresentationSessionResponseDto } from './dto/CreatePresentationSessionResponseDto'
import { SessionResponse } from '../../containers/session/dto/SessionResponse'
import { WsHelper } from '../ws/ws-helper'
import { WsEndpoint } from '../ws/ws-endpoint'
import { Message } from 'webstomp-client'
import { DomainEvent } from '../../containers/session/event/DomainEvent'

const route = '/sessions/new'

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

export const connectToInteractiveEvents = (
    sessionLink: string,
    onConnectionSuccess: () => void,
    onResponse: (response: GenericResponse<SessionResponse, string>) => void
) => {
    return WsHelper.getInstance()
        .connect(WsEndpoint.ENDPOINT)
        .then(() =>
            WsHelper.getInstance().subscribe(
                `${WsEndpoint.TOPIC_EVENT}/${sessionLink}`,
                (message: Message) => {
                    console.log('get reaction')
                    onResponse(JSON.parse(message.body))
                }
            )
        )
        .then(() => onConnectionSuccess())
        .catch((error: any) => console.log(error))
}

export const disconnect = () => {
    WsHelper.getInstance().disconnect()
}

export const sendRequest = (link: string, event: DomainEvent) => {
    WsHelper.getInstance().send(`${WsEndpoint.QUEUE_EVENT}/${link}`, event)
}
