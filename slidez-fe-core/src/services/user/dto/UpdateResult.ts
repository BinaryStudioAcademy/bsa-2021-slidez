import { UserDetailsDto } from '../../../containers/user/dto/UserDetailsDto'

export interface UpdateResult {
    error?: string
    userDetailsDto?: UserDetailsDto
}
