import { Method } from 'axios'
import { createDefaultAxios } from './http-util'

class HttpHelper {
    private inProcessOfRefreshingTokens = false

    constructor(
        private readonly getAuthHeaderValue: () => string,
        private readonly performRefreshTokens: () => Promise<any>,
        private readonly baseUrl: string
    ) {}

    public sendRequest(
        route: string,
        method: Method,
        body: object,
        query: object,
        headers: Record<string, string>
    ) {
        const axiosInstance = createDefaultAxios(this.baseUrl)
        axiosInstance.defaults.timeout = 3600 * 1000
        axiosInstance.interceptors.response.use(
            (response) => {
                return response
            },
            async (error) => {
                if (error.response && !this.inProcessOfRefreshingTokens) {
                    if (error.response.status === 403) {
                        const originalConfig = error.config
                        originalConfig._retry = true
                        originalConfig.headers = {
                            ...originalConfig.headers,
                            authorization: this.getAuthHeaderValue(),
                        }
                        this.inProcessOfRefreshingTokens = true
                        await this.performRefreshTokens()
                        this.inProcessOfRefreshingTokens = false
                        return axiosInstance(originalConfig)
                    }
                    return error
                }
                return error
            }
        )

        return axiosInstance.request({
            url: route,
            method: method,
            data: JSON.stringify(body),
            params: query,
            headers: {
                ...axiosInstance.defaults.headers,
                ...headers,
                authorization: this.getAuthHeaderValue(),
            },
        })
    }

    public doGet(
        route: string,
        query: object = {},
        headers: Record<string, string> = {}
    ) {
        return this.sendRequest(route, 'GET', {}, query, headers)
    }

    public doPost(
        route: string,
        body: object = {},
        query: object = {},
        headers: Record<string, string> = {}
    ) {
        return this.sendRequest(route, 'POST', body, query, headers)
    }

    public doPut(
        route: string,
        body: object = {},
        query: object = {},
        headers: Record<string, string> = {}
    ) {
        return this.sendRequest(route, 'PUT', body, query, headers)
    }

    public doPatch(
        route: string,
        body: object = {},
        query: object = {},
        headers: Record<string, string> = {}
    ) {
        return this.sendRequest(route, 'PATCH', body, query, headers)
    }

    public doDelete(
        route: string,
        body: object = {},
        query: object = {},
        headers: Record<string, string> = {}
    ) {
        return this.sendRequest(route, 'DELETE', body, query, headers)
    }
}

export default HttpHelper
