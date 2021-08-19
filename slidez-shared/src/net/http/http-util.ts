import axios from 'axios'

export const createDefaultAxios = (baseUrl: string) => {
    return axios.create({
        baseURL: baseUrl,
        timeout: 2500,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
}
