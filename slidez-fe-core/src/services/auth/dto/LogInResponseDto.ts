import { UserDetailsDto } from '../../../containers/user/dto/UserDetailsDto'

export interface LogInResponseDto {
    accessToken: string
    refreshToken: string
    userDetailsDto?: UserDetailsDto
}
