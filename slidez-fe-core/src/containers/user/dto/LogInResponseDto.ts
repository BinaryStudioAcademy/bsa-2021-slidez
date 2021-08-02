import { UserDetailsDto } from './UserDetailsDto'

export interface LogInResponseDto {
    accessToken: string
    userDetailsDto?: UserDetailsDto
}
