import axios from 'axios'
import { ApiGateway } from '../api-gateway'

export const createDefaultAxios = () => {
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
