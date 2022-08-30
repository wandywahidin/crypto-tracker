import {configureStore} from '@reduxjs/toolkit'
import { setupListeners} from '@reduxjs/toolkit/query'
import {coinsApi} from '../services/coinsApi'

export const store = configureStore({
    reducer : {
        [coinsApi.reducerPath] : coinsApi.reducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(coinsApi.middleware)
});

setupListeners(store.dispatch)