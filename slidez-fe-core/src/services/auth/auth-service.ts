import { HttpMethod } from '../http-method'
import { LogInDto } from '../../containers/user/dto/LogInDto'
import { RegisterDto } from '../../containers/user/dto/RegisterDto'
import { LogInResult } from '../../containers/user/dto/LogInResult'
import { SignStatus } from '../../containers/user/enums/sign-status'
import { LogInResponseDto } from '../../containers/user/dto/LogInResponseDto'

const JWT = 'jwt'

const sendAuthRequest = async (endpoint: string, data: object = {}) => {
    const url: string = `${process.env.REACT_APP_API_GATEWAY}/auth/${endpoint}`
    return fetch(url, {
        method: HttpMethod.POST,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
    })
}

const performSign = async (
    endpoint: string,
    dto: LogInDto | RegisterDto,
    errorStatus: string
) => {
    const response: Response = await sendAuthRequest(endpoint, dto)
    const status: number = response.status
    if (status === 200) {
        const payload: LogInResponseDto = await response.json()
        const out: LogInResult = {
            status: SignStatus.OK,
            userDetailsDto: payload.userDetailsDto,
        }
        window.localStorage.setItem(JWT, payload.accessToken)
        return out
    } else {
        const out: LogInResult = {
            status: errorStatus,
            userDetailsDto: undefined,
        }
        return out
    }
}

export const performLogIn = async (dto: LogInDto) => {
    return performSign('login', dto, SignStatus.INVALID_CREDENTIALS)
}

export const performRegister = async (dto: RegisterDto) => {
    return performSign('register', dto, SignStatus.EMAIL_IS_TAKEN)
}

export const isLoggedIn = () => {
    return Boolean(window.localStorage.getItem(JWT))
}

export const logout = () => {
    window.localStorage.removeItem(JWT)
}
