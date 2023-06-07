import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './conversationSlice'
import settingsReducer from './settingsSlice'
import errorReducer from './errorSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        settings: settingsReducer,
        error: errorReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
