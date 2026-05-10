import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resume: [],

  currentResume: {
    title: "Untitled Resume",

  personalInfo:{
    fullName:"",
    email:"",
    headLine:"",
    phone:"",
    location:"",
    linkedin:"",
    github:"",
    portfolio:"",
    summary:""
  },

  experience: [],
  education: [],
  projects: [],

  skills:{
    technical:[],
    soft:[],
    tools:[],
  },
  certifications:[],
  achievements:[],
  languages:[],

  template: "modern",
  atsScore: 0,
  },

  activeSection: "personalInfo",
  loading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    //Sidebar Navigation
    setActiveSection: (state, action)=>{
      state.activeSection = action.payload;
    },

    //update Resume
    updateResume: (state, action)=>{
      const {section, data}= action.payload;
      state.currentResume[section] = data;
    }
  }
})

export const {setActiveSection, updateResume} = resumeSlice.actions;

  export default resumeSlice.reducer;