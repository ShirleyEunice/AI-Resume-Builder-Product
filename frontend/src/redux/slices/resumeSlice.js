import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resumes: [],

  currentResume: {
    title: "Untitled Resume",

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
      yearsOfExperience: "",
    },

    experience: [],
    education: [],

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

    template: "modern",

    layoutSettings: {
      lineSpacing: "1.15",
      margin: "0.75",
      accentColor: "#0d9488",
    },

    atsScore: 0,
  },

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

    setResume: (state, action) => {
      state.currentResume = {
        ...initialState.currentResume,
        ...action.payload,
      };
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
  setWizardStep,
  nextStep,
  previousStep,
  setResumeId,
  setResumeTitle,
  updateResume,
  updateTemplate,
  updateLayoutSettings,
  resetResume,
  setResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;
