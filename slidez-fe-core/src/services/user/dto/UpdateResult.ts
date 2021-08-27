import { UserDetailsDto } from '../../../containers/user/dto/UserDetailsDto'
import { UpdatePasswordDto } from './UpdatePasswordDto';
import { UpdateProfileDto } from './UpdateProfileDto';

export interface UpdateResult {
    error?: string
    userDetailsDto?: UserDetailsDto
    updatePasswordDto?: UpdatePasswordDto
    updateProfileDto?: UpdateProfileDto
}
