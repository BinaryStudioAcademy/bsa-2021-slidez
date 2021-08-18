import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AuthenticationDetails, EventType, doPost } from 'slidez-shared'
import { getMessageBusUnsafe } from '../../../hooks/event-bus'

export interface AuthenticationState {
    accessToken?: string
    isLoading: boolean
    isFetchingTokenFromStorage: boolean
    error?: string
}

const initialState: AuthenticationState = {
    isLoading: false,
    isFetchingTokenFromStorage: false,
}

export const fetchUserFromStorage = createAsyncThunk(
    'popup/fetchUserFromStorage',
    async () => {
        const eb = getMessageBusUnsafe()!

        const authData = await eb.sendMessageAndListen<AuthenticationDetails>(
            { type: EventType.AUTH_REQUESTED, data: {} },
            EventType.AUTH_DETAILS,
            1000
        )

        if (!authData.data.success) {
            throw new Error(authData.data.error)
        }

        return authData.data.accessToken
    }
)

export type LoginPayload = {
    email: string
    password: string
}
export const loginUser = createAsyncThunk(
    'popup/loginUser',
    async (payload: LoginPayload) => {
        const res = await doPost('auth/login', payload)
        const authData = {
            refreshToken: res.data.data.refreshToken,
            accessToken: res.data.data.accessToken,
        }

        getMessageBusUnsafe()!.sendMessageNoCallback({
            type: EventType.EXTENSION_AUTH_SUCCESS,
            data: authData,
        })

        return res.data.data.accessToken as string
    }
)

export const authenticationSlice = createSlice({
    name: 'eventBus',
    initialState,
    reducers: {
        setToken: (state, tokenPayload: PayloadAction<string>) => {
            state.accessToken = tokenPayload.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserFromStorage.pending, (state) => {
                state.isFetchingTokenFromStorage = true
            })
            .addCase(fetchUserFromStorage.rejected, (state) => {
                state.isFetchingTokenFromStorage = false
            })
            .addCase(fetchUserFromStorage.fulfilled, (state, action) => {
                state.isFetchingTokenFromStorage = false
                state.accessToken = action.payload
            })

            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false
                state.error = 'Failed to log in :('
            })
            .addCase(loginUser.fulfilled, (state, accessToken) => {
                console.log('Setting auth token')
                state.isLoading = false
                state.accessToken = accessToken.payload
            })
    },
})

export const { setToken } = authenticationSlice.actions

export default authenticationSlice.reducer
