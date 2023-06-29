import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface typeState {
    isStatus: boolean
}

const initialState: typeState = {
    isStatus: false,
}

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setstatus(state) {
            state.isStatus = !state.isStatus
        }
    }
})

export const { setstatus } = statusSlice.actions

export default statusSlice.reducer



