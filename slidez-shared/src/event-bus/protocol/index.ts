import { MessageTemplate } from './message'

export enum EventType {
    EXTENSION_CONNECTED = 'extension_connected',
    INSERT_SLIDE = 'insert_slide',
    INSERT_SLIDE_SUCCESS = 'insert_slide_success',
    DELETE_SLIDE = 'delete_slide',
    DELETE_SLIDE_SUCCESS = 'delete_slide_success',
    SET_ACTIVE_SESSION = 'set_active_session',
    //DEPRECATED
    AUTH_REQUESTED = 'auth_requested',
    REFRESH_TOKEN = 'refresh_token',
    AUTH_DETAILS = 'auth_details',
    EXTENSION_AUTH_SUCCESS = 'extension_auth_success',
}

type AuthData =
    | { success: false; error: string }
    | { success: true; accessToken: string }
type ExtensionAuthData = { accessToken: string; refreshToken: string }

export type ExtensionConnected = MessageTemplate<
    EventType.EXTENSION_CONNECTED,
    {}
>
export type AuthenticationRequested = MessageTemplate<
    EventType.AUTH_REQUESTED,
    {}
>
export type RefreshToken = MessageTemplate<EventType.REFRESH_TOKEN, {}>
export type AuthenticationDetails = MessageTemplate<
    EventType.AUTH_DETAILS,
    AuthData
>
export type ExtensionAuthenticationSuccess = MessageTemplate<
    EventType.EXTENSION_AUTH_SUCCESS,
    ExtensionAuthData
>

export type InsertSlideRequest = {
    id: string
    title: string
}

export type InsertSlideRequestSuccess = {
    insertedId: string
}

export type DeleteSlideRequest = {
    id: string
}

export type DeleteSlideRequestSuccess = {
    wasDeleted: boolean
}

export type SetActiveSession = MessageTemplate<
    EventType.SET_ACTIVE_SESSION,
    {
        presentationId: string
        sessionCode: string | null
    }
>

export type InsertSlide = MessageTemplate<
    EventType.INSERT_SLIDE,
    InsertSlideRequest
>

export type InsertSlideSuccess = MessageTemplate<
    EventType.INSERT_SLIDE_SUCCESS,
    InsertSlideRequestSuccess
>

export type DeleteSlide = MessageTemplate<
    EventType.DELETE_SLIDE,
    DeleteSlideRequest
>

export type DeleteSlideSuccess = MessageTemplate<
    EventType.DELETE_SLIDE_SUCCESS,
    DeleteSlideRequestSuccess
>

export type ProtocolMessage =
    | ExtensionConnected
    | AuthenticationRequested
    | RefreshToken
    | AuthenticationDetails
    | ExtensionAuthenticationSuccess
    | InsertSlide
    | InsertSlideSuccess
    | DeleteSlide
    | DeleteSlideSuccess
    | SetActiveSession
