import {configureStore} from "@reduxjs/toolkit";
import resumeReducer from "../redux/slices/resumeSlice.js";
import agentReducer from "../redux/slices/atsSlice.js";
import authReducer from "../redux/slices/authSlice.js";

export const store = configureStore({
    reducer:{
        resume: resumeReducer,
        agent: agentReducer,
        auth: authReducer
    }
})