import { Method } from 'axios'
import { createDefaultAxios } from './http-util'

class HttpHelper {
    private readonly getAuthHeaderValue: () => string;
    private readonly performRefreshTokens: () => Promise<any>;
    private inProcessOfRefreshingTokens = false

    constructor(getAuthHeaderValue: () => string, performRefreshTokens: () => Promise<any>) {
        this.getAuthHeaderValue = getAuthHeaderValue
        this.performRefreshTokens = performRefreshTokens
    }

    public sendRequest (
        route: string,
        method: Method,
        body: object,
        query: object,
        headers: Record<string, string>
    ) {
        const axiosInstance = createDefaultAxios()
        axiosInstance.interceptors.response.use(
            (response) => {
                return response
            },
            (error) => {
                if (error.response) {
                    const status = error.response.status
                    if (status === 403) {
                        if (!this.inProcessOfRefreshingTokens) {
                            this.inProcessOfRefreshingTokens = true
                            this.performRefreshTokens().finally(
                                () => (this.inProcessOfRefreshingTokens = false)
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
                authorization: this.getAuthHeaderValue(),
            },
        })
    }

    public doGet (
        route: string,
        query: object = {},
        headers: Record<string, string> = {}
    ) {
        return this.sendRequest(route, 'GET', {}, query, headers)
    }

    public doPost (
        route: string,
        body: object,
        query: object = {},
        headers: Record<string, string> = {}
    ) {
        return this.sendRequest(route, 'POST', body, query, headers)
    }

    public doPut (
        route: string,
        body: object,
        query: object = {},
        headers: Record<string, string> = {}
    ) {
        return this.sendRequest(route, 'PUT', body, query, headers)
    }

    public doPatch (
        route: string,
        body: object,
        query: object = {},
        headers: Record<string, string> = {}
    ) {
        return this.sendRequest(route, 'PATCH', body, query, headers)
    }

    public doDelete (
        route: string,
        body: object,
        query: object = {},
        headers: Record<string, string> = {}
    ) {
        return this.sendRequest(route, 'DELETE', body, query, headers)
    }
}

export default HttpHelper
