import { HttpMethod } from '../http-method'
import { LogInDto } from '../../containers/user/dto/LogInDto'
import { RegisterDto } from '../../containers/user/dto/RegisterDto'
import { LogInResult } from '../../containers/user/dto/LogInResult'
import { SignStatus } from '../../containers/user/enums/sign-status'
import { LogInResponseDto } from '../../containers/user/dto/LogInResponseDto'
import { TokenDto } from '../../containers/user/dto/TokenDto'
import { ApiGateway } from '../api-gateway'

const JWT = 'jwt'
const constructUrl = (endpoint: string) => {
    return `${ApiGateway.REACT_APP_API_GATEWAY}/auth/${endpoint}`
}

const sendAuthRequest = async (url: string, data: object = {}) => {
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
    url: string,
    dto: LogInDto | RegisterDto | TokenDto,
    errorStatus: string
) => {
    const response: Response = await sendAuthRequest(url, dto)
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
    return performSign(
        constructUrl('login'),
        dto,
        SignStatus.INVALID_CREDENTIALS
    )
}

export const performRegister = async (dto: RegisterDto) => {
    return performSign(constructUrl('register'), dto, SignStatus.EMAIL_IS_TAKEN)
}

export const performLoginByToken = async (dto: TokenDto) => {
    return performSign(
        constructUrl('login-by-token'),
        dto,
        SignStatus.INVALID_TOKEN
    )
}

export const performLoginOAuthWithGoogle = async (dto: TokenDto) => {
    return performSign(
        constructUrl('login/google'),
        dto,
        SignStatus.INVALID_TOKEN
    )
}

export const performRegisterOAuthWithGoogle = async (dto: TokenDto) => {
    return performSign(
        constructUrl('register/google'),
        dto,
        SignStatus.INVALID_TOKEN
    )
}

export const isLoggedIn = () => {
    return Boolean(window.localStorage.getItem(JWT))
}

export const logout = () => {
    window.localStorage.removeItem(JWT)
}
