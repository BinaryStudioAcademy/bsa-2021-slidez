import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { LogInDto } from './dto/LogInDto'
import { RegisterDto } from './dto/RegisterDto'
import {
  isLoggedIn,
  performLogIn,
  performRegister,
} from '../../services/auth/auth-service'
import { SignStatus } from './enums/sign-status'
import { UserDetailsDto } from './dto/UserDetailsDto'

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
  },
})

export const selectId = (state: RootState) => state.user.user?.id

export const selectSignStatus = (state: RootState) => state.user.signStatus

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn

export default userSlice.reducer
