import { FormikErrors } from "formik"
import { UserDetailsDto } from "../../user/dto/UserDetailsDto"

export type UpdateProps = {
    onUpdateUserProfile: Function
    onUpdatePassword: Function
}

export type UpdateUserProfileErorrsProps = {
    viewErrors: boolean
    updateUserProfileError: string | undefined
    formikErrors: FormikErrors<{
        firstName: string
        lastName: string
        email: string
    }>
}

export type UpdatePasswordErorrsProps = {
    viewErrors: boolean
    updatePasswordError: string | undefined
    formikErrors: FormikErrors<{
        password: string
        confirmPassword: string
    }>
}

export type DropdownUserInfoProps = {
    logo: string
    userData: UserDetailsDto
}
