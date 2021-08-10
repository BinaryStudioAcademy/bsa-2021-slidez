import { Method } from 'axios'
import { createDefaultAxios } from './http-util'
import { performRefreshTokens } from '../auth/auth-service'

let inProcessOfRefreshingTokens = false

const sendRequest = (
    route: string,
    method: Method,
    body: object,
    query: object,
    headers: Record<string, string>
) => {
    const axiosInstance = createDefaultAxios()
    axiosInstance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response) {
                const status = error.response.status
                if (status === 401) {
                    if (!inProcessOfRefreshingTokens) {
                        inProcessOfRefreshingTokens = true
                        performRefreshTokens().finally(
                            () => (inProcessOfRefreshingTokens = false)
                        )
                    }
                }
            }
        }
    )
    return axiosInstance.request({
        url: route,
        method: method,
        data: JSON.stringify(body),
        params: query,
        headers: {
            ...axiosInstance.defaults.headers,
            headers,
        },
    })
}

export const doGet = (
    route: string,
    query: object = {},
    headers: Record<string, string> = {}
) => {
    return sendRequest(route, 'GET', {}, query, headers)
}

export const doPost = (
    route: string,
    body: object,
    query: object = {},
    headers: Record<string, string> = {}
) => {
    return sendRequest(route, 'POST', body, query, headers)
}

export const doPut = (
    route: string,
    body: object,
    query: object = {},
    headers: Record<string, string> = {}
) => {
    return sendRequest(route, 'PUT', body, query, headers)
}

export const doPatch = (
    route: string,
    body: object,
    query: object = {},
    headers: Record<string, string> = {}
) => {
    return sendRequest(route, 'PATCH', body, query, headers)
}

export const doDelete = (
    route: string,
    body: object,
    query: object = {},
    headers: Record<string, string> = {}
) => {
    return sendRequest(route, 'DELETE', body, query, headers)
}
