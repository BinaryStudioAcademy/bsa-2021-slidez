import { UserDetailsDto } from '../../../../containers/user/dto/UserDetailsDto'

export const handleLogo = (userData: UserDetailsDto) => {
    if (userData.firstName && userData.lastName) {
        return (
            userData.firstName.charAt(0).toUpperCase() +
            userData.lastName.charAt(0).toUpperCase()
        )
    } else if (userData.email) {
        return (
            userData?.email.charAt(0).toUpperCase() +
            userData?.email.charAt(1).toUpperCase()
        )
    } else {
        return ''
    }
}
