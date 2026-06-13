import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resumes: [],

  currentResume: {
    title: "Untitled Resume",

    // PERSONAL INFO
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      linkedin: "",
      websites: [],
      summary: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",

      // AI helper field (not shown as an input, used by Generate Summary)
      yearsOfExperience: "",
    },

    // EXPERIENCE
    experience: [],

    // EDUCATION
    education: [],

    // ADDITIONAL SECTIONS
    skills: {
      technical: [],
      soft: [],
      tools: [],
    },
    certifications: [],
    awards: [],
    volunteer: [],
    projects: [],
    languages: [],
    publications: [],
    interests: [],
    additional: [],

    // TEMPLATE
    template: "modern",

    // LAYOUT SETTINGS
    layoutSettings: {
      lineSpacing: "1.15",
      margin: "0.75",
    },

    // ATS
    atsScore: 0,
  },

  // WIZARD STEP
  wizardStep: 1,

  loading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: "resume",

  initialState,

  reducers: {
    setWizardStep: (state, action) => {
      state.wizardStep = action.payload;
    },

    nextStep: (state) => {
      if (state.wizardStep < 5) {
        state.wizardStep += 1;
      }
    },

    previousStep: (state) => {
      if (state.wizardStep > 1) {
        state.wizardStep -= 1;
      }
    },

    setResume: (state, action)=>{
      state.currentResume = {
        ...initialState.currentResume,
        ...action.payload
      };
      delete state.currentResume._id;
      state.wizardStep = 1;
    },

    setResumeId: (state, action) => {
      state.currentResume._id = action.payload;
    },

    setResumeTitle: (state, action) => {
      state.currentResume.title = action.payload;
    },

    updateResume: (state, action) => {
      const { section, data } = action.payload;
      state.currentResume[section] = data;
    },

    updateTemplate: (state, action) => {
      state.currentResume.template = action.payload;
    },

    updateLayoutSettings: (state, action) => {
      state.currentResume.layoutSettings = {
        ...state.currentResume.layoutSettings,
        ...action.payload,
      };
    },

    resetResume: (state) => {
      state.currentResume = initialState.currentResume;
      state.wizardStep = 1;
    },
  },
});

export const {
  // wizard
  setWizardStep,
  nextStep,
  previousStep,
  setResumeId,
  setResumeTitle,

  // resume
  updateResume,

  // template / layout
  updateTemplate,
  updateLayoutSettings,

  // reset
  resetResume,
  setResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;
