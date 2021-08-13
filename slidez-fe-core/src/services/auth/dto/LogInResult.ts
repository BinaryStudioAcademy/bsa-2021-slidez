import { UserDetailsDto } from '../../../containers/user/dto/UserDetailsDto'

export interface LogInResult {
    status: string
    userDetailsDto?: UserDetailsDto
}
