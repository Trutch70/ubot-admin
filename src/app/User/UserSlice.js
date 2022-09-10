import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: localStorage.getItem('username') ?? '',
    token: localStorage.getItem('token') ?? '',
}

const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        storeUsername: (state, action) => {
            localStorage.setItem('username', action.payload);
            state.username = action.payload;
        },
        storeToken: (state, action) => {
            localStorage.setItem('token', action.payload);
            state.token = action.payload;
        },
        flushUser: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            state.token = '';
            state.username = ''
        }
    }
});

export const { storeUsername, storeToken, flushUser } = UserSlice.actions;

export const selectUsername = (state) => state.user.username;
export const selectToken = (state) => state.user.token;

export default UserSlice.reducer;