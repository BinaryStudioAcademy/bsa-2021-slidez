import { Method } from 'axios'
import { createDefaultAxios } from './http-util'
import { performRefreshTokens } from '../auth/auth-service'

export interface HttpHelper {
    doGet: Function
    doPost: Function
    doPut: Function
    doPatch: Function
    doDelete: Function
}

export const HttpHelper = (() => {
    let instance: HttpHelper | undefined = undefined

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
                    if (status === 403) {
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

    const doGet = (
        route: string,
        query: object = {},
        headers: Record<string, string> = {}
    ) => {
        return sendRequest(route, 'GET', {}, query, headers)
    }

    const doPost = (
        route: string,
        body: object,
        query: object = {},
        headers: Record<string, string> = {}
    ) => {
        return sendRequest(route, 'POST', body, query, headers)
    }

    const doPut = (
        route: string,
        body: object,
        query: object = {},
        headers: Record<string, string> = {}
    ) => {
        return sendRequest(route, 'PUT', body, query, headers)
    }

    const doPatch = (
        route: string,
        body: object,
        query: object = {},
        headers: Record<string, string> = {}
    ) => {
        return sendRequest(route, 'PATCH', body, query, headers)
    }

    const doDelete = (
        route: string,
        body: object,
        query: object = {},
        headers: Record<string, string> = {}
    ) => {
        return sendRequest(route, 'DELETE', body, query, headers)
    }
    const createInstance = () => {
        return {
            doGet: doGet,
            doPost: doPost,
            doPut: doPut,
            doPatch: doPatch,
            doDelete: doDelete,
        }
    }

    return {
        getInstance: () => {
            return instance || (instance = createInstance())
        },
    }
})()
