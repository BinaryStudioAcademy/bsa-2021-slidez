import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { LogInDto } from './dto/LogInDto'
import { RegisterDto } from './dto/RegisterDto'
import { performLogIn, performRegister } from '../../services/auth/auth-service'
import { SignStatus } from './enums/sign-status'
import { UserDetailsDto } from './dto/UserDetailsDto'
import { push } from 'react-router-redux'

export interface UserState {
  signStatus: string
  user?: UserDetailsDto
}

const initialState: UserState = {
  signStatus: SignStatus.OK,
  user: undefined,
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
      .addCase(logIn.pending, (state) => {})
      .addCase(logIn.fulfilled, (state, action) => {
        const status: string = action.payload.status
        state.signStatus = status
        if (status === SignStatus.OK) {
          state.user = action.payload.userDetailsDto
          console.log('Redirect')
          push('/main')
        }
      })
      .addCase(register.pending, (state) => {})
      .addCase(register.fulfilled, (state, action) => {
        const status: string = action.payload.status
        state.signStatus = status
        if (status === SignStatus.OK) {
          state.user = action.payload.userDetailsDto
          push('/')
        }
      })
  },
})

export const selectId = (state: RootState) => state.user.user?.id

export const selectSignStatus = (state: RootState) => state.user.signStatus

export default userSlice.reducer
