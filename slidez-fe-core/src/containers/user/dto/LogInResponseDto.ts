import { UserDetailsDto } from './UserDetailsDto'

export interface LogInResponseDto {
  status: string
  userDetailsDto?: UserDetailsDto
}
