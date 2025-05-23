import { createSlice } from '@reduxjs/toolkit'
import {
    fetchPasswords,
    addPasswordAsync,
    deletePasswordAsync,
    updatePasswordAsync
} from '../thunks/passwordThunk'

const initialState = {
    storedPassword: [],
    addopen: false,
    passwordView: false,
    form: { title: "", site: "", username: "", password: "", note: "" },
    loading: false,
    error: null,
}

const passwordSlice = createSlice({
    name: 'passwords',
    initialState,
    reducers: {
        toggleAdd: (state, action) => {
            state.addopen = action.payload
        },
        togglepasswordView: (state, action) => {
            state.passwordView = action.payload
        },
        setForm: (state, action) => {
            state.form = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPasswords.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchPasswords.fulfilled, (state, action) => {
                state.loading = false
                state.storedPassword = action.payload;
            })
            .addCase(fetchPasswords.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(addPasswordAsync.fulfilled, (state, action) => {
                state.storedPassword = action.payload;
            })
            .addCase(deletePasswordAsync.fulfilled, (state, action) => {
                //not required therefore, left blank
            })
            .addCase(updatePasswordAsync.fulfilled, (state, action) => {
                state.storedPassword = action.payload;
                state.form = { title: "", site: "", username: "", password: "", note: "" }
            })
    }
})

export const { toggleAdd, togglepasswordView, setForm } = passwordSlice.actions
export default passwordSlice.reducer