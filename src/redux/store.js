import { configureStore } from '@reduxjs/toolkit'
import passwordReducer from './slice/passwordSlice'
import uiReducer from './slice/uiSlice'

const store = configureStore({
    reducer: {
        passwords: passwordReducer,
        ui:uiReducer
    }
})

export default store;