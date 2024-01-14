import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./reducer/userReducer"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

const userConfig = {
    key: "userinfo",
    storage
    // blacklist: []

}
const userReducer = persistReducer(userConfig, userSlice)
export const store = configureStore({
    reducer: {
        user: userReducer
    }
})
export const perStore = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch