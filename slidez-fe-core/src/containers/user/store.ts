import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { LogInDto } from './dto/LogInDto'
import { RegisterDto } from './dto/RegisterDto'
import {
    performLoginOAuthWithGoogle,
    isLoggedIn,
    performLogIn,
    performLoginByToken,
    performRegister,
    performRegisterOAuthWithGoogle,
    performLogout,
} from '../../services/auth/auth-service'
import { SignStatus } from './enums/sign-status'
import { UserDetailsDto } from './dto/UserDetailsDto'
import { TokenDto } from './dto/TokenDto'

export interface UserState {
    signStatus: string
    user?: UserDetailsDto
    isLoggedIn: boolean
}

const initialState: UserState = {
    signStatus: SignStatus.OK,
    user: undefined,
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

export const loginByToken = createAsyncThunk(
    'user/login-by-token',
    async (dto: TokenDto) => {
        return performLoginByToken(dto)
    }
)

export const loginWithOAuthGoogle = createAsyncThunk(
    'user/login-with-oauth-google',
    async (dto: TokenDto) => {
        return performLoginOAuthWithGoogle(dto)
    }
)

export const registerWithOAuthGoogle = createAsyncThunk(
    'user/register-with-oauth-google',
    async (dto: TokenDto) => {
        return performRegisterOAuthWithGoogle(dto)
    }
)

export const logout = createAsyncThunk('user/logout', async () =>
    performLogout()
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logIn.fulfilled, (state, action) => {
                const status: string = action.payload.status
                state.signStatus = status
                if (status === SignStatus.OK) {
                    state.user = action.payload.userDetailsDto
                    state.isLoggedIn = isLoggedIn()
                }
            })
            .addCase(register.fulfilled, (state, action) => {
                const status: string = action.payload.status
                state.signStatus = status
                if (status === SignStatus.OK) {
                    state.user = action.payload.userDetailsDto
                    state.isLoggedIn = isLoggedIn()
                }
            })
            .addCase(loginByToken.fulfilled, (state, action) => {
                const status: string = action.payload.status
                state.signStatus = status
                if (status === SignStatus.OK) {
                    state.user = action.payload.userDetailsDto
                    state.isLoggedIn = isLoggedIn()
                }
            })
            .addCase(loginWithOAuthGoogle.fulfilled, (state, action) => {
                const status: string = action.payload.status
                state.signStatus = status
                if (status === SignStatus.OK) {
                    state.user = action.payload.userDetailsDto
                    state.isLoggedIn = isLoggedIn()
                }
            })
            .addCase(registerWithOAuthGoogle.fulfilled, (state, action) => {
                const status: string = action.payload.status
                state.signStatus = status
                if (status === SignStatus.OK) {
                    state.user = action.payload.userDetailsDto
                    state.isLoggedIn = isLoggedIn()
                }
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.signStatus = SignStatus.OK
                state.user = undefined
                state.isLoggedIn = false
            })
    },
})

export const selectId = (state: RootState) => state.user.user?.id

export const selectSignStatus = (state: RootState) => state.user.signStatus

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn

export default userSlice.reducer
