import {configureStore} from "@reduxjs/toolkit";
import resumeReducer from "../features/resumeSlice";
import agentReducer from "../features/atsSlice";

export const store = configureStore({
    reducer:{
        resume: resumeReducer,
        agent: agentReducer,
    }
})