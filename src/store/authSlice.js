import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the auth slice
// This state will hold the authentication status and user data
const initialState = {
    status: false,
    userData: null
}
 // Create the auth slice using createSlice from Redux Toolkit
// This slice will manage the authentication state and actions
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;