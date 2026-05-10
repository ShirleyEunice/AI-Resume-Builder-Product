import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resume: [],

  currentResume: {
    title: "Untitled Resume",

    personalInfo: {
      fullName: "",
      email: "",
      headLine: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
      summary: "",
      // AI helper fields
      yearsOfExperience: "",
    },

    experience: [],
    education: [],
    projects: [],

    skills: {
      technical: [],
      soft: [],
      tools: [],
    },
    certifications: [],
    achievements: [],
    languages: [],

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
    },

    //update Experience
    updateExperience: (state, action)=>{
      state.currentResume.experience = action.payload;
    },

    //update education
    updateEducation: (state, action)=>{
      state.currentResume.education = action.payload;
    },

    //update project
    updateProjects: (state, action)=>{
      state.currentResume.projects = action.payload;
    }
  }
})

export const {setActiveSection, updateExperience, updateResume, updateEducation, updateProjects} = resumeSlice.actions;

  export default resumeSlice.reducer;