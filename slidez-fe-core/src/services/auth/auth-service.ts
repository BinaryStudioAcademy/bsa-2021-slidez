import { LogInDto } from '../../containers/user/dto/LogInDto'
import { RegisterDto } from '../../containers/user/dto/RegisterDto'
import { LogInResult } from '../../containers/user/dto/LogInResult'
import { SignStatus } from '../../containers/user/enums/sign-status'
import { LogInResponseDto } from '../../containers/user/dto/LogInResponseDto'
import { TokenDto } from '../../containers/user/dto/TokenDto'
import { doPost } from '../http/HttpHelper'

const JWT = 'jwt'
const constructRoute = (endpoint: string) => {
    return `/auth/${endpoint}`
}

const sendAuthRequest = async (route: string, body: object = {}) => {
    return doPost(route, body)
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
    return Boolean(window.localStorage.getItem(JWT))
}

export const logout = () => {
    window.localStorage.removeItem(JWT)
}
