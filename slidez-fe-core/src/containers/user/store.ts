import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { LogInDto } from './dto/LogInDto'
import { RegisterDto } from './dto/RegisterDto'
import { performLogIn, performRegister } from '../../services/auth/auth-service'

export interface UserState {
  id: string
  email: string
  firstName: string
  lastName: string
}

const initialState: UserState = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
}

export const logIn = createAsyncThunk('user/logIn', async (dto: LogInDto) => {
  const obj: object = await performLogIn(dto)
  console.log(obj)
})

export const register = createAsyncThunk(
  'user/register',
  async (dto: RegisterDto) => {
    const obj: object = await performRegister(dto)
    console.log(obj)
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {})
      .addCase(logIn.fulfilled, (state, action) => {})
      .addCase(register.pending, (state) => {})
      .addCase(register.fulfilled, (state, action) => {})
  },
})

export const selectId = (state: RootState) => state.user.id

export default userSlice.reducer
