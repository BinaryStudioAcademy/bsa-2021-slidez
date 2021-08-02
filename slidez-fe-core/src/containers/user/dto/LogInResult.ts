import { UserDetailsDto } from './UserDetailsDto'

export interface LogInResult {
    status: string
    userDetailsDto?: UserDetailsDto
}
