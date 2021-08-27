import { UserDetailsDto } from '../../../containers/user/dto/UserDetailsDto'
import { UpdatePasswordDto } from './UpdatePasswordDto';
import { UpdateProfileDto } from './UpdateProfileDto';

export interface UserDataResponseDto {
    accessToken: string
    refreshToken: string
    userDetailsDto?: UserDetailsDto
    updatePasswordDto?: UpdatePasswordDto
    updateProfileDto?: UpdateProfileDto
}
