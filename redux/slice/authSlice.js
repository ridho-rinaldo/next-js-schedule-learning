import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    isLogin: false,
    isLoading: true
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin(state, action) {
            state.isLogin = action.payload.isLogin;
        },
        setLoading(state, action) {
            state.isLoading = action.payload
        }
    },
});

export const { setLogin, setLoading } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;