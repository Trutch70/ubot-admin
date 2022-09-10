import { createSlice } from '@reduxjs/toolkit';

const LoadingSlice = createSlice({
    initialState: {
        loading: false
    },
    name: 'loading',
    reducers: {
        setLoading: (state, action) => {state.loading = action.payload}
    }
});

export const { setLoading } = LoadingSlice.actions;

export const selectLoading = (state) => state.loading.loading;

export default LoadingSlice.reducer;