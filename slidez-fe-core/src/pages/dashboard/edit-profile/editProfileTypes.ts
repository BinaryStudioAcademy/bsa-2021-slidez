import { FormikErrors } from "formik"
import { Password, User } from "../UserProfile"

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
    userData: User
}

export type FormUpdateUserDataProps = {
    userData: User
    handleUpdateUserProfile: Function
    onCloseEditDialog: Function
    viewErrors: boolean
    setViewErrors: Function
}

export type FormUpdatePasswordProps = {
    initialValuesPassword: Password
    handleUpdatePassword: Function
    userId: string | undefined
    onCloseEditDialog: Function
    viewErrors: boolean
    setViewErrors: Function
}
