import {configureStore} from "@reduxjs/toolkit";
import resumeReducer from "../redux/slices/resumeSlice.js";
import agentReducer from "../redux/slices/atsSlice.js";

export const store = configureStore({
    reducer:{
        resume: resumeReducer,
        agent: agentReducer,
    }
})