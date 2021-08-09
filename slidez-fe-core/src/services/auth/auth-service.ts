import { LogInDto } from './dto/LogInDto'
import { RegisterDto } from './dto/RegisterDto'
import { LogInResult } from './dto/LogInResult'
import { SignStatus } from '../../containers/user/enums/sign-status'
import { LogInResponseDto } from './dto/LogInResponseDto'
import { TokenDto } from './dto/TokenDto'
import { createDefaultAxios } from '../http/http-util'
import { RefreshTokensDto } from './dto/RefreshTokensDto'
import { RefreshTokensResponseDto } from './dto/RefreshTokensResponseDto'

export const JWT = 'jwt'
export const refreshJWT = 'refresh_jwt'
const constructRoute = (endpoint: string) => {
    return `/auth/${endpoint}`
}

const sendAuthRequest = async (route: string, body: object = {}) => {
    const axiosInstance = createDefaultAxios()
    return axiosInstance.request({
        url: route,
        method: 'POST',
        data: JSON.stringify(body),
    })
}

const performSign = async (
    url: string,
    dto: LogInDto | RegisterDto | TokenDto,
    errorStatus: string
) => {
    const { data, status } = await sendAuthRequest(url, dto)
    if (status === 200) {
        const payload: LogInResponseDto = data
        const out: LogInResult = {
            status: SignStatus.OK,
            userDetailsDto: payload.userDetailsDto,
        }
        window.localStorage.setItem(JWT, payload.accessToken)
        window.localStorage.setItem(refreshJWT, payload.refreshToken)
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
        constructRoute('login'),
        dto,
        SignStatus.INVALID_CREDENTIALS
    )
}

export const performRegister = async (dto: RegisterDto) => {
    return performSign(
        constructRoute('register'),
        dto,
        SignStatus.EMAIL_IS_TAKEN
    )
}

export const performLoginByToken = async (dto: TokenDto) => {
    return performSign(
        constructRoute('login-by-token'),
        dto,
        SignStatus.INVALID_TOKEN
    )
}

export const performRefreshTokens = async () => {
    const dto: RefreshTokensDto = {
        refreshToken: window.localStorage.getItem(refreshJWT) || '',
    }
    return sendAuthRequest(constructRoute('refresh-tokens'), dto)
        .then((response) => {
            const payload: RefreshTokensResponseDto = response.data
            window.localStorage.setItem(JWT, payload.accessToken)
            window.localStorage.setItem(refreshJWT, payload.refreshToken)
        })
        .catch((error) => {
            if (error.response) {
                logout()
            }
        })
}

export const performLoginOAuthWithGoogle = async (dto: TokenDto) => {
    return performSign(
        constructRoute('login/google'),
        dto,
        SignStatus.INVALID_TOKEN
    )
}

export const performRegisterOAuthWithGoogle = async (dto: TokenDto) => {
    return performSign(
        constructRoute('register/google'),
        dto,
        SignStatus.INVALID_TOKEN
    )
}

export const isLoggedIn = () => {
    return (
        Boolean(window.localStorage.getItem(JWT)) &&
        Boolean(window.localStorage.getItem(refreshJWT))
    )
}

export const logout = () => {
    window.localStorage.removeItem(JWT)
    window.localStorage.removeItem(refreshJWT)
}
