import { HttpMethod } from '../http-method'
import { LogInDto } from '../../containers/user/dto/LogInDto'
import { RegisterDto } from '../../containers/user/dto/RegisterDto'
import { LogInResult } from '../../containers/user/dto/LogInResult'
import { SignStatus } from '../../containers/user/enums/sign-status'
import { LogInResponseDto } from '../../containers/user/dto/LogInResponseDto'
import { TokenDto } from '../../containers/user/dto/TokenDto'

const JWT = 'jwt'
const getAuthUrl = (endpoint: string) => {
    return `http://localhost:5000/auth/${endpoint}`
}
const OAuthWithGoogleUrl: string = 'http://localhost:5000/auth/login/google'

const sendInitOAuthRequest = async (url: string) => {
    return fetch(url, {
        method: HttpMethod.GET,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    })
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
    return performSign(getAuthUrl('login'), dto, SignStatus.INVALID_CREDENTIALS)
}

export const performRegister = async (dto: RegisterDto) => {
    return performSign(getAuthUrl('register'), dto, SignStatus.EMAIL_IS_TAKEN)
}

export const performLoginByToken = async (dto: TokenDto) => {
    return performSign(
        getAuthUrl('login-by-token'),
        dto,
        SignStatus.INVALID_TOKEN
    )
}

export const initGoogleOAuth = async (dto: TokenDto) => {
    const res = await fetch(OAuthWithGoogleUrl, {
        method: HttpMethod.POST,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
    })
    // const data = await res.json()
    // store returned user somehow
    console.log('Sent request')
    // return data
}

export const isLoggedIn = () => {
    return Boolean(window.localStorage.getItem(JWT))
}

export const logout = () => {
    window.localStorage.removeItem(JWT)
}
