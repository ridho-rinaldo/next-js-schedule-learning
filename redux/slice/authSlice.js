import { createSlice } from "@reduxjs/toolkit"

// Define the initial state for the 'auth' slice
export const initialState = {
    isLogin: false, // Initial state for user login status
    isLoading: true // Initial state for loading status
};

// Create an 'auth' slice using createSlice
const authSlice = createSlice({
    name: 'auth', // Name of the slice
    initialState, // Initial state defined above
    reducers: {
        setLogin(state, action) {
            state.isLogin = action.payload.isLogin; // Update user login status
        },
        setLoading(state, action) {
            state.isLoading = action.payload; // Update loading status
        }
    },
});

// Export the action creators
export const { setLogin, setLoading } = authSlice.actions;

// Export the 'auth' reducer
const authReducer = authSlice.reducer;
export default authReducer;
