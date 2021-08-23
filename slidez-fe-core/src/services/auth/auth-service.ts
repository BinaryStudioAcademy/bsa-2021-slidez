import { LogInDto } from './dto/LogInDto'
import { RegisterDto } from './dto/RegisterDto'
import { LogInResult } from './dto/LogInResult'
import { LogInResponseDto } from './dto/LogInResponseDto'
import { TokenDto } from './dto/TokenDto'
import { createDefaultAxios } from 'slidez-shared/src/net/http/http-util'
import { RefreshTokensDto } from './dto/RefreshTokensDto'
import { RefreshTokensResponseDto } from './dto/RefreshTokensResponseDto'
import { GenericResponse } from 'slidez-shared/src/net/dto/GenericResponse'
import { ApiGateway } from '../http/api-gateway'
import { CodeDto } from './dto/CodeDto'

const JWT = 'jwt'
const refreshJWT = 'refresh_jwt'
const bearer = 'Bearer '
const constructRoute = (endpoint: string) => {
    return `/auth/${endpoint}`
}

const sendAuthRequest = async (route: string, body: object = {}) => {
    const axiosInstance = createDefaultAxios(ApiGateway.REACT_APP_API_GATEWAY)
    return axiosInstance.request({
        url: route,
        method: 'POST',
        data: JSON.stringify(body),
    })
}

const performSign = async (
    url: string,
    dto: LogInDto | RegisterDto | TokenDto | CodeDto
) => {
    const { data } = await sendAuthRequest(url, dto)
    const genericResponse: GenericResponse<LogInResponseDto, string> = data
    const out: LogInResult = {
        error: genericResponse.error,
        userDetailsDto: undefined,
    }
    if (genericResponse.data) {
        const payload: LogInResponseDto = genericResponse.data
        out.userDetailsDto = payload.userDetailsDto
        window.localStorage.setItem(JWT, payload.accessToken)
        window.localStorage.setItem(refreshJWT, payload.refreshToken)
    }
    return out
}

export const performLogIn = async (dto: LogInDto) => {
    return performSign(constructRoute('login'), dto)
}

export const performRegister = async (dto: RegisterDto) => {
    return performSign(constructRoute('register'), dto)
}

export const performLoginByToken = async (dto: TokenDto) => {
    return performSign(constructRoute('login-by-token'), dto)
}

export const performRefreshTokens = async () => {
    const dto: RefreshTokensDto = {
        refreshToken: window.localStorage.getItem(refreshJWT) || '',
    }
    const { data } = await sendAuthRequest(
        constructRoute('refresh-tokens'),
        dto
    )
    const genericResponse: GenericResponse<LogInResponseDto, string> = data
    if (genericResponse.data) {
        const payload: RefreshTokensResponseDto = genericResponse.data
        window.localStorage.setItem(JWT, payload.accessToken)
        window.localStorage.setItem(refreshJWT, payload.refreshToken)
    } else if (genericResponse.error) {
        performLogout()
    }
}

export const performLoginOAuthWithGoogle = async (dto: CodeDto) => {
    return performSign(constructRoute('login/google'), dto)
}

export const performRegisterOAuthWithGoogle = async (dto: CodeDto) => {
    return performSign(constructRoute('register/google'), dto)
}

export const isLoggedIn = () => {
    return (
        Boolean(window.localStorage.getItem(JWT)) &&
        Boolean(window.localStorage.getItem(refreshJWT))
    )
}

export const performLogout = () => {
    window.localStorage.removeItem(JWT)
    window.localStorage.removeItem(refreshJWT)
}

export const getAuthHeaderValue = () => {
    return bearer + window.localStorage.getItem(JWT)
}
