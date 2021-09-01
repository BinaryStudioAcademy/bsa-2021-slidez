import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { LogInDto } from '../../services/auth/dto/LogInDto'
import { RegisterDto } from '../../services/auth/dto/RegisterDto'
import {
    isLoggedIn,
    performLogIn,
    performLoginOAuthWithGoogle,
    performLogout,
    performRegister,
    performRegisterOAuthWithGoogle,
} from '../../services/auth/auth-service'
import { UserDetailsDto } from './dto/UserDetailsDto'
import { CodeDto } from '../../services/auth/dto/CodeDto'
import {
    editUserProfile,
    editPassword,
    performDeleteAccount,
    fetchUserData,
} from '../../services/user/user-service'
import { UpdateProfileDto } from '../../services/user/dto/UpdateProfileDto'
import { UpdatePasswordRequest } from '../../services/user/dto/UpdatePasswordRequest'

export interface UserState {
    error?: string
    user?: UserDetailsDto
    isSavingUser: boolean
    isSavingPassword: boolean
    isLoggedIn: boolean
}

const initialState: UserState = {
    error: undefined,
    user: undefined,
    isSavingUser: false,
    isSavingPassword: false,
    isLoggedIn: isLoggedIn(),
}

export const logIn = createAsyncThunk('user/logIn', async (dto: LogInDto) => {
    return performLogIn(dto)
})

export const register = createAsyncThunk(
    'user/register',
    async (dto: RegisterDto) => {
        return performRegister(dto)
    }
)

export const fetchUser = createAsyncThunk('user/me', async () => {
    return fetchUserData()
})

export const updateUserProfile = createAsyncThunk(
    'user/update-profile',
    async (dto: UpdateProfileDto) => {
        return editUserProfile(dto)
    }
)

export const updatePassword = createAsyncThunk(
    'user/update-password',
    async (dto: UpdatePasswordRequest) => {
        return editPassword(dto)
    }
)

export const loginWithOAuthGoogle = createAsyncThunk(
    'user/login-with-oauth-google',
    async (dto: CodeDto) => {
        return performLoginOAuthWithGoogle(dto)
    }
)

export const registerWithOAuthGoogle = createAsyncThunk(
    'user/register-with-oauth-google',
    async (dto: CodeDto) => {
        return performRegisterOAuthWithGoogle(dto)
    }
)

export const logout = createAsyncThunk('user/logout', async () =>
    performLogout()
)

export const deleteAccount = createAsyncThunk('user/delete', async () => {
    performDeleteAccount()
    performLogout()
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logIn.pending, (state) => {
                state.error = undefined
            })
            .addCase(logIn.rejected, (state) => {
                state.error = undefined
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.error = action.payload.error
                if (action.payload.userDetailsDto) {
                    state.user = action.payload.userDetailsDto
                    state.isLoggedIn = isLoggedIn()
                }
            })
            .addCase(register.fulfilled, (state, action) => {
                state.error = action.payload.error
                if (action.payload.userDetailsDto) {
                    state.user = action.payload.userDetailsDto
                    state.isLoggedIn = isLoggedIn()
                }
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.isSavingUser = true
            })
            .addCase(updateUserProfile.rejected, (state) => {
                state.isSavingUser = false
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isSavingUser = false
                state.error = action.payload.error
                if (action.payload.userDetailsDto) {
                    state.user = action.payload.userDetailsDto
                    state.isLoggedIn = isLoggedIn()
                }
            })
            .addCase(updatePassword.pending, (state) => {
                state.isSavingPassword = true
            })
            .addCase(updatePassword.rejected, (state) => {
                state.isSavingPassword = false
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.isSavingPassword = false
                state.error = action.payload.error
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.error = action.payload.error
                if (action.payload.userDetailsDto) {
                    state.user = action.payload.userDetailsDto
                    state.isLoggedIn = isLoggedIn()
                }
            })
            .addCase(loginWithOAuthGoogle.fulfilled, (state, action) => {
                state.error = action.payload.error
                if (action.payload.userDetailsDto) {
                    state.user = action.payload.userDetailsDto
                    state.isLoggedIn = isLoggedIn()
                }
            })
            .addCase(registerWithOAuthGoogle.fulfilled, (state, action) => {
                state.error = action.payload.error
                if (action.payload.userDetailsDto) {
                    state.user = action.payload.userDetailsDto
                    state.isLoggedIn = isLoggedIn()
                }
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.error = undefined
                state.user = undefined
                state.isLoggedIn = false
            })
    },
})

export const isSavingUser = (state: RootState) => state.user.isSavingUser

export const isSavingPassword = (state: RootState) =>
    state.user.isSavingPassword

export const selectUserDetals = (state: RootState) => state.user.user

export const selectId = (state: RootState) => state.user.user?.id

export const selectError = (state: RootState) => state.user.error

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn

export default userSlice.reducer
