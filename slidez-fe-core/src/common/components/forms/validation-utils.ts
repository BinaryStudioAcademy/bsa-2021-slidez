import PasswordValidator from 'password-validator'

const schema = new PasswordValidator()
    .is()
    .min(12) // Minimum length 12
    .is()
    .max(32) // Maximum length 32
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(1) // Must have at least 1 digits
    .has()
    .not()
    .spaces()
    .has(new RegExp('[!@#$%^&*)(+=._-]'))

export const isPasswordStrongEnough = (password: string) => {
    return Boolean(schema.validate(password))
}
