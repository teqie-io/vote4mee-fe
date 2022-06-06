import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import employeesReducer from "./reducers/employeesReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employees: employeesReducer
    },
});