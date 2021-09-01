import { Method } from 'axios'
import { createDefaultAxios } from './http-util'

class HttpHelper {
    private inProcessOfRefreshingTokens = false
    private retryAfterRefreshTokenCount = 0

    constructor(
        private readonly getAuthHeaderValue: () => string,
        private readonly performRefreshTokens: () => Promise<any>,
        private readonly performLogout: () => void,
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
                if (error.response) {
                    if (error.response.status === 403) {
                        if (this.retryAfterRefreshTokenCount != 0) {
                            this.performLogout()
                            this.retryAfterRefreshTokenCount = 0
                            return Promise.reject(error)
                        }
                        const originalConfig = error.config
                        originalConfig._retry = true
                        if (!this.inProcessOfRefreshingTokens) {
                            this.inProcessOfRefreshingTokens = true
                            await this.performRefreshTokens()
                            this.retryAfterRefreshTokenCount++
                            this.inProcessOfRefreshingTokens = false
                        }
                        return axiosInstance(originalConfig)
                    }
                    return Promise.reject(error)
                }
                return Promise.reject(error)
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
