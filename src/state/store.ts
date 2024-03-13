import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todo';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        todoReducer
    },
});

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch: () => AppDispatchType = useDispatch;