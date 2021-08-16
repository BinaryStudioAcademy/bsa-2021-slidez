import { UserDetailsDto } from '../../../containers/user/dto/UserDetailsDto'

export interface LogInResult {
    error?: string
    userDetailsDto?: UserDetailsDto
}
