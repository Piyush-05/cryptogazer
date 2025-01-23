import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from './cryptoSlice'

const appStore = configureStore({
    reducer: {
        crypto: cryptoReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
})

export default appStore;