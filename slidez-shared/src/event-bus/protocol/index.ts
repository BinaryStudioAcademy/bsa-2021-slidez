import { MessageTemplate } from './message'

export enum EventType {
    EXTENSION_CONNECTED = 'extension_connected',
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
export type ProtocolMessage =
    | ExtensionConnected
    | AuthenticationRequested
    | RefreshToken
    | AuthenticationDetails
    | ExtensionAuthenticationSuccess
