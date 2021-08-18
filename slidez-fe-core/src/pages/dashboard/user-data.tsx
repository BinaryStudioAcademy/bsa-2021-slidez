import { version } from 'process'
import { useState } from 'react'
import { UserDetailsDto } from '../../containers/user/dto/UserDetailsDto'
import { LogInDto } from '../../services/auth/dto/LogInDto'
import { LogInResponseDto } from '../../services/auth/dto/LogInResponseDto'
import { LogInResult } from '../../services/auth/dto/LogInResult'
import { RegisterDto } from '../../services/auth/dto/RegisterDto'
// import { TokenDto } from '../../services/auth/dto/TokenDto'
import { GenericResponse } from '../../services/dto/GenericResponse'
import { createDefaultAxios } from '../../services/http/http-util'
// E:\Binary\slidez-version-2\bsa-2021-slidez\slidez-fe-core\src\services\auth\dto\LogInResponseDto.ts

const JWT = 'jwt'
const refreshJWT = 'refresh_jwt'
const [userData, setUserData] = useState('')
// const [logo, setLogo] = useState('')

// get token by localstorage
export const getAccessToken = () => {
    return window.localStorage.getItem(JWT) || '{}'
}

//get userdata by token
// UserDetailsDto

//("${v1API}/auth")@PostMapping("login-by-token")

export const constructRoute = (endpoint: string) => {
    return `/auth/${endpoint}`
}

export const sendAuthRequest = async (route: string, body: object = {}) => {
    const axiosInstance = createDefaultAxios()

    return axiosInstance.request({
        url: route,
        method: 'POST',
        data: JSON.stringify(body),
    })
}

export const performSign = async (url: string, dto: object) => {
    const { data } = await sendAuthRequest(url, dto)
    const genericResponse: GenericResponse<LogInResponseDto, string> = data
    const { email } = genericResponse.data.userDetailsDto
    console.log(email)
    console.log(genericResponse.data.userDetailsDto)
    // const out: LogInResult = {
    //     error: genericResponse.error,
    //     userDetailsDto: undefined,
    // }
    // if (genericResponse.data) {
    //     const payload: UserDetailsDto = genericResponse.data
    //     console.log(payload)
    // }
    return genericResponse
}

export const performLoginByToken = async () => {
    const dto = {
        token: getAccessToken(),
    }
    return performSign(constructRoute('login-by-token'), dto)
}

// const loadUserDataByToken (token: string) =>

//create logo
// const handleLogo = (name: string, surname: string) =>
//     setLogo(name.charAt(0) + surname.charAt(0))

//delete setting
