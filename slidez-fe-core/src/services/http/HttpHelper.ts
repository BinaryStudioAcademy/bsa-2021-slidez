import axios, { Method } from 'axios'
import { ApiGateway } from '../api-gateway'

const createDefaultAxios = () => {
    return axios.create({
        baseURL: ApiGateway.REACT_APP_API_GATEWAY,
        timeout: 2500,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
}

const sendRequest = (
    route: string,
    method: Method,
    body: object,
    query: object,
    headers: Record<string, string>
) => {
    const axiosInstance = createDefaultAxios()
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
