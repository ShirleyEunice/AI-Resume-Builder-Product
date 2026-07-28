import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedResumeId: null,
  resumeText: "",
  jdText: "",
  tone: "professional",
  loading: false,
  result: null,
  error: null,
  history: [],
  historyLoading: false,
};

const coverLetterSlice = createSlice({
  name: "coverLetter",
  initialState,
  reducers: {
    setSelectedResumeId: (state, action) => {
      state.selectedResumeId = action.payload;
    },
    setResumeText: (state, action) => {
      state.resumeText = action.payload;
    },
    setJdText: (state, action) => {
      state.jdText = action.payload;
    },
    setTone: (state, action) => {
      state.tone = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetCoverLetterState: (state) => {
      state.selectedResumeId = null;
      state.resumeText = "";
      state.jdText = "";
      state.tone = "professional";
      state.loading = false;
      state.result = null;
      state.error = null;
    },
    setHistory: (state, action)=>{
        state.history = action.payload;
    },
    setHistoryLoading: (state, action)=>{
        state.historyLoading = action.payload;
    },
    removeHistoryItem: (state, action)=>{
        state.history = state.history.filter((item)=> item._id !== action.payload)
    }
  },
});

export const {
      setSelectedResumeId,
      setResumeText,
      setJdText,
      setTone,
      setLoading,
      setResult,
      setError,
      resetCoverLetterState,
      setHistory,
      setHistoryLoading,
      removeHistoryItem,
  } = coverLetterSlice.actions;

  export default coverLetterSlice.reducer;
