import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AuthenticationDetails, EventType } from 'slidez-shared'
import { getMessageBusUnsafe } from '../../../hooks'
import HttpHelper from 'slidez-shared/src/net/http/http-helper'
import { GenericResponse } from 'slidez-shared/src/net/dto/GenericResponse'

//TODO: CHANGE THIS TO ACTUAL VALUES
const getAuthHeaderValue = () => ''
const performRefreshTokens = () => Promise.resolve()
const apiGateway = ''
const performLogout = () => {}

const httpHelper = new HttpHelper(
    getAuthHeaderValue,
    performRefreshTokens,
    performLogout,
    apiGateway
)

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

type LoginResponseDto = {
    accessToken: string
    refreshToken: string
}

export const loginUser = createAsyncThunk(
    'popup/loginUser',
    async (payload: LoginPayload) => {
        const { data } = await httpHelper.doPost('auth/login', payload)
        const res: GenericResponse<LoginResponseDto, string> = data
        const authData = {
            refreshToken: res.data.refreshToken,
            accessToken: res.data.accessToken,
        }

        getMessageBusUnsafe()!.sendMessageNoCallback({
            type: EventType.EXTENSION_AUTH_SUCCESS,
            data: authData,
        })

        return res.data.accessToken as string
    }
)

export const authenticationSlice = createSlice({
    name: 'eventBus',
    initialState,
    reducers: {
        setToken: (state, tokenPayload: any) => {
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
                state.isLoading = false
                state.accessToken = accessToken.payload
            })
    },
})

export const { setToken } = authenticationSlice.actions

export default authenticationSlice.reducer
