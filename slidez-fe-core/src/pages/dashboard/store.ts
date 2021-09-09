import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { fetchPresentationInfo, PresentationDto } from './service'

export let initialState: { presentations: PresentationDto[] } = {
    presentations: [],
}

export const fetchInfo = createAsyncThunk('presentation/info', async () => {
    return fetchPresentationInfo()
})

export const presentationSlice = createSlice({
    name: 'presentation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchInfo.fulfilled, (state, action) => {
            if (action.payload) {
                state.presentations = action.payload
            }
        })
    },
})

export const selectPresentations = (state: RootState) =>
    state.presentation.presentations

export default presentationSlice.reducer
