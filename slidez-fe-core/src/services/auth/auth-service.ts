import { HttpMethod } from '../http-method'
import { LogInDto } from '../../containers/user/dto/LogInDto'
import { RegisterDto } from '../../containers/user/dto/RegisterDto'

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

export const performLogIn = async (dto: LogInDto) => {
  const response: object = await sendAuthRequest('login', dto).then((resp) =>
    resp.json()
  )
  // @ts-ignore
  console.log(response['token'])
  return response
}

export const performRegister = async (dto: RegisterDto) => {
  const response: object = await sendAuthRequest('register', dto).then((resp) =>
    resp.json()
  )
  // @ts-ignore
  console.log(response['token'])
  return response
}
