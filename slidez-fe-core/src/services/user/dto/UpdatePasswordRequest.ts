export interface UpdatePasswordRequest {
    id: string | undefined,
    password: string,
    confirmPassword: string,
}
