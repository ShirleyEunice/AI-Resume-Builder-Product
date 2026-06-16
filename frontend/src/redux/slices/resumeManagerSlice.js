import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    resumes: [],
    total:0,
    page:1,
    limit:10,
    totalPages:0,
    sort: "updatedAt",
    order: "desc",
    search: "",
    loading:false,
    error:null
};

const resumeManagerSlice = createSlice({
    name: "resumeManager",
    initialState,
    reducers:{
        setManagerResumes: (state, action)=>{
            state.resumes = action.payload.resumes;
            state.total = action.payload.total;
            state.page = action.payload.page;
            state.limit = action.payload.limit;
            state.totalPages = action.payload.totalPages;
        },
        setManagerLoading: (state, action)=>{
            state.loading = action.payload;
        },
        setManagerError: (state, action)=>{
            state.error = action.payload;
        },
        setManagerPage: (state, action)=>{
            state.page = action.payload
        },
        setManagerSearch: (state, action)=>{
            state.search = action.payload;
            state.page = 1;
        },
        setManagerSort: (state, action)=>{
            state.sort = action.payload.sort;
            state.order = action.payload.order;
            state.page = 1;
        },
        removeManagerResume: (state, action)=>{
            state.resumes = state.resumes.filter((r)=> r._id !== action.payload);
            state.total -= 1;
        }
    }
});

export const {setManagerResumes, setManagerLoading, setManagerError, setManagerSearch, setManagerSort, removeManagerResume, setManagerPage} = resumeManagerSlice.actions;

export default resumeManagerSlice.reducer;