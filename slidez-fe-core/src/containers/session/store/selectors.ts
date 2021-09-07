import { RootState } from '../../../store'

export const selectConnectionStatus = (state: RootState) =>
    state.presentationSession.connectionStatus

export const selectSnapshot = (state: RootState) =>
    state.presentationSession.snapshot

export const selectCurrentInteractiveElement = (state: RootState) =>
    state.presentationSession.currentInteractiveElement

export const selectQASession = (state: RootState) =>
    state.presentationSession.qAndASession

export const selectLink = (state: RootState) => state.presentationSession.link
