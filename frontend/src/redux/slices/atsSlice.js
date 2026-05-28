import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    resumeFile: null,
    jdText: "",
    loading: false,
    result: null,
    error: null,
    history:[],
    historyLoading: false,
}

const atsSlice = createSlice({
    name: "ats",
    initialState,
    reducers: {
        setResumeFile:(state, action)=>{
            state.resumeFile = action.payload;
        },
        setJDtext:(state, action)=>{
            state.jdText = action.payload;
        },
        setATSLoading:(state, action)=>{
            state.loading = action.payload;
        },
        setATSResult:(state, action)=>{
            state.result = action.payload;
        },
        setATSError:(state, action)=>{
            state.error = action.payload;
        },
        resetATSState: (state)=>{
            state.resumeFile = null;
            state.jdText = "";
            state.loading = false;
            state.result = null;
            state.error = null;
        },
        setATSHistory: (state, action)=>{
            state.history = action.payload;
        },
        setHistoryLoading: (state, action)=>{
            state.historyLoading = action.payload
        },
        removeATSHistoryItem: (state, action)=>{
            state.history = state.history.filter((item)=> item._id !== action.payload);
        }
    }
})

export const {setResumeFile, setJDtext, setATSLoading, setATSResult, setATSError, resetATSState, setATSHistory, setHistoryLoading, removeATSHistoryItem} = atsSlice.actions;
export default atsSlice.reducer;