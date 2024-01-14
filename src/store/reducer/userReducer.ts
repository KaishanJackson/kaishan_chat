import { createSlice } from "@reduxjs/toolkit"

export interface CounterState {
    info: {
        token: string | null,
        userInfo: {
            username: string,
            friends: string
        }
    }
}

const initialState: CounterState = {
    info: {
        token: null,
        userInfo: {
            username: "",
            friends: ""
        }
    }
}

const userSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.info.token = action.payload
        },
        delToken: (state) => {
            state.info.token = null
        },
        setUserInfo: (state, action) => {
            state.info.userInfo = action.payload
        },
        resetInfo: (state) => {
            state.info = initialState.info
        }
    }
})
export const { setToken, delToken, setUserInfo, resetInfo } = userSlice.actions
export default userSlice.reducer