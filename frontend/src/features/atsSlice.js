import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchATSScore = createAsyncThunk(
    "agent/fetchATSScore",
    async (resume)=>{
        const res = await API.post("/ats", resume);
        return res.data.score;
    }
);

const agentSlice = createSlice({
    name: "agent",
    initialState:{
        atsScore:0,
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchATSScore.fulfilled, (state, action)=>{
            state.atsScore = action.payload;
        })
    }
})

export default agentSlice.reducer;