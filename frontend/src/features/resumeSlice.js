import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

//1. Thunk first
//Fetch all Resumes
export const fetchResumes = createAsyncThunk(
  "resume/fetchResumes",
  async () => {
    const res = await API.get("/resume");
    return res.data;
  }
);

//Create Resume
export const createResume = createAsyncThunk(
    "resume/createResume",
    async (data)=>{
        const res = await API.post("/resume", data);
        console.log("API sending:", JSON.stringify(data));
        return res.data;
    }
)

//2. initialState MUST exist
const initialState = {
  resumes: [],
  loading: false,
};

//3. Slice
const resumeSlice = createSlice({
  name: "resume",
  initialState, // MUST NOT be undefined
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchResumes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = action.payload;
      })
      .addCase(fetchResumes.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createResume.fulfilled, (state,action)=>{
        state.resumes.unshift(action.payload);
      });
  },
});

// 4. Export reducer ONLY
export default resumeSlice.reducer;