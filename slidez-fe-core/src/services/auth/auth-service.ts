import { HttpMethod } from '../http-method'
import { LogInDto } from '../../containers/user/dto/LogInDto'
import { RegisterDto } from '../../containers/user/dto/RegisterDto'

const sendAuthRequest = async (endpoint: string, data: object = {}) => {
  const url: string = `auth/${endpoint}`
  return fetch(url, {
    method: HttpMethod.POST,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  })
}

export const performLogIn = async (dto: LogInDto) => {
  const response: Response = await sendAuthRequest('login', dto)
  const json: string = await response.json()
  return JSON.parse(json)
}

export const performRegister = async (dto: RegisterDto) => {
  const response: Response = await sendAuthRequest('register', dto)
  const json: string = await response.json()
  return JSON.parse(json)
}
