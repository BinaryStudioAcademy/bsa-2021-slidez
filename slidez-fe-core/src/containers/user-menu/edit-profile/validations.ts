import * as Yup from 'yup'

export const updatePasswordFieldsValidation = Yup.object({
    password: Yup.string()
        .required('Required')
        .min(12, 'Too short - 12 symbols minimum')
        .max(32, 'Too long - 32 symbols maximum')
        .matches(/^\S*$/, 'Should not contain spaces')
        .matches(/[a-z]/, 'Should have lowercase letters')
        .matches(/[A-Z]/, 'Should have uppercase letters')
        .matches(/[0-9]/, 'Should have digits')
        .matches(/[^A-Za-z0-9]/, 'Should have symbols'),
    confirmPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password')], 'Passwords should match'),
})

export const updateUserProfileFieldsValidation = Yup.object({
    email: Yup.string()
        .required('Required')
        .email('Invalid email address')
        .max(64),
    firstName: Yup.string()
        .required('Required')
        .min(3, 'Too short - 3 symbols minimum')
        .max(30, 'Too long - 30 symbols maximum'),
    lastName: Yup.string()
        .required('Required')
        .min(3, 'Too short - 3 symbols minimum')
        .max(30, 'Too long - 30 symbols maximum'),
})
