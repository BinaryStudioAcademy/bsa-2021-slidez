import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { LogInDto } from './dto/LogInDto'
import { RegisterDto } from './dto/RegisterDto'
import { performLogIn, performRegister } from '../../services/auth/auth-service'
import { SignStatus } from './enums/sign-status'

export interface UserState {
  id: string
  email: string
  firstName: string
  lastName: string
  signStatus: string
}

const initialState: UserState = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  signStatus: SignStatus.OK,
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
        // @ts-ignore
        const token: string = action.payload.token
        if (token === '') {
          state.signStatus = SignStatus.INVALID_CREDENTIALS
        } else {
          state.signStatus = SignStatus.OK
        }
      })
      .addCase(register.pending, (state) => {})
      .addCase(register.fulfilled, (state, action) => {
        // @ts-ignore
        const token: string = action.payload.token
        if (token === '') {
          state.signStatus = SignStatus.EMAIL_IS_TAKEN
        } else {
          state.signStatus = SignStatus.OK
        }
      })
  },
})

export const selectId = (state: RootState) => state.user.id

export const selectSignStatus = (state: RootState) => state.user.signStatus

export default userSlice.reducer
