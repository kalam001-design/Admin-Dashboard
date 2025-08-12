import { createSlice } from '@reduxjs/toolkit';

// localStorage থেকে ইউজার ও টোকেন নিয়ে আসা (যদি থাকে)
const userFromStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

const tokenFromStorage = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : null;

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: userFromStorage,
        token: tokenFromStorage,
        loading: false,
        error: null,
    },
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;

            // localStorage এ ডাটা সংরক্ষণ
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', action.payload.token);
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.error = null;
            state.loading = false;

            // localStorage থেকে ডাটা মুছে ফেলা
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
