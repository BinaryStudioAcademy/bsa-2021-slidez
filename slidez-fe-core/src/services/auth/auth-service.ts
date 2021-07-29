import { HttpMethod } from '../http-method'
import { LogInDto } from '../../containers/user/dto/LogInDto'
import { RegisterDto } from '../../containers/user/dto/RegisterDto'
import { LogInResponseDto } from '../../containers/user/dto/LogInResponseDto'
import { SignStatus } from '../../containers/user/enums/sign-status'

const sendAuthRequest = async (endpoint: string, data: object = {}) => {
  const url: string = `http://localhost:8000/auth/${endpoint}`
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
    const out: LogInResponseDto = {
      status: SignStatus.OK,
      userDetailsDto: payload.userDetailsDto,
    }
    return out
  } else if (status === 403) {
    const out: LogInResponseDto = {
      status: errorStatus,
      userDetailsDto: undefined,
    }
    return out
  }
  throw new Error(response.statusText)
}

export const performLogIn = async (dto: LogInDto) => {
  return performSign('login', dto, SignStatus.INVALID_CREDENTIALS)
}

export const performRegister = async (dto: RegisterDto) => {
  return performSign('register', dto, SignStatus.EMAIL_IS_TAKEN)
}
