import {createSlice} from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    token: token || null,
    user: user || null,
    isAuthenticated: !!token,
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action)=>{
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        // Merge partial fields (e.g. credits, isPremium) into the logged-in
        // user and persist so a page refresh keeps the new values.
        updateUser: (state, action)=>{
            if(state.user){
                state.user = { ...state.user, ...action.payload };
                localStorage.setItem("user", JSON.stringify(state.user));
            }
        },
        logout: (state)=>{
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
        }
    }
})

export const {loginSuccess, updateUser, logout} = authSlice.actions;

export default authSlice.reducer;