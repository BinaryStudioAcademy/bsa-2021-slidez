import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GenericResponse } from 'slidez-shared/src/net/dto/GenericResponse'
import { ReactionDto } from '../../../../containers/session/dto/ReactionDto'
import { SessionResponse } from '../../../../containers/session/dto/SessionResponse'
import { SessionResponseType } from '../../../../containers/session/enums/SessionResponse'
import { WsConnectionStatus } from '../../../../containers/session/enums/ws-connection-status'
import { Reactions } from '../../../../types/reactions'
import * as SessionService from '../../../../services/session/session-service'

type PresenterReactionState = {
    connectionStatus: WsConnectionStatus
    reactions: Reactions[]
}

const responseHandler =
    (dispatch: any) => (response: GenericResponse<SessionResponse, string>) => {
        if (response.error || !response.data) {
            throw new Error(response.error || 'No data')
        }
        switch (response.data.type) {
            case SessionResponseType.reactionAdded:
                dispatch(
                    addReaction((response.data.data as ReactionDto).reaction)
                )
        }
    }

export const initReactionWebSocketSession = createAsyncThunk(
    'presentationSession/initWebSocketSession',
    async (link: string, { dispatch }) => {
        const onConnectionSuccess = () => {
            dispatch(connectionSuccess())
        }
        const onResponse = responseHandler(dispatch)

        await SessionService.connectToInteractiveEvents(
            link,
            onConnectionSuccess,
            onResponse
        )
    }
)

const initialState: PresenterReactionState = {
    connectionStatus: WsConnectionStatus.ESTABLISHING,
    reactions: [],
}

const reactionSlice = createSlice({
    name: 'presenter-reaction',
    initialState,
    reducers: {
        addReaction: (
            state: PresenterReactionState,
            reaction: PayloadAction<Reactions>
        ) => {
            state.reactions.push(reaction.payload)
        },
        pullReaction: (state: PresenterReactionState) => {
            state.reactions.shift()
        },
        connectionSuccess: (state: PresenterReactionState) => {
            state.connectionStatus = WsConnectionStatus.CONNECTED
        },
    },
})

export const { addReaction, pullReaction, connectionSuccess } =
    reactionSlice.actions

export default reactionSlice.reducer
