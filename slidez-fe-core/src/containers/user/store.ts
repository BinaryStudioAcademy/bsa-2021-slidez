import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, user: PayloadAction<UserState>) => {
      state.id = user.payload.id
      state.email = user.payload.email
      state.firstName = user.payload.firstName
      state.lastName = user.payload.lastName
    },
  },
})

export const selectId = (state: RootState) => state.user.id

export default userSlice.reducer
