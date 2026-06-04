import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resumes: [],

  currentResume: {
    _id: null,
    title: "Untitled Resume",

    // PERSONAL INFO
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

      // AI helper field
      yearsOfExperience: "",
    },

    // EXPERIENCE
    experience: [],

    // EDUCATION
    education: [],

    // PROJECTS
    projects: [],

    // SKILLS
    skills: {
      technical: [],
      soft: [],
      tools: [],
    },

    // CERTIFICATIONS
    certifications: [],

    // ACHIEVEMENTS
    achievements: [],

    // LANGUAGES
    languages: [],

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

  // OLD SIDEBAR SUPPORT
  activeSection: "personalInfo",

  loading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: "resume",

  initialState,

  reducers: {
    // =========================================
    // SIDEBAR SECTION
    // =========================================

    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },

    // =========================================
    // WIZARD STEP
    // =========================================

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

    setResumeId: (state, action) => {
      state.currentResume._id = action.payload;
    },

    // =========================================
    // UPDATE ENTIRE SECTION
    // =========================================

    updateResume: (state, action) => {
      const { section, data } = action.payload;

      state.currentResume[section] = data;
    },

    // =========================================
    // EXPERIENCE
    // =========================================

    updateExperience: (state, action) => {
      state.currentResume.experience = action.payload;
    },

    // =========================================
    // EDUCATION
    // =========================================

    updateEducation: (state, action) => {
      state.currentResume.education = action.payload;
    },

    // =========================================
    // PROJECTS
    // =========================================

    updateProjects: (state, action) => {
      state.currentResume.projects = action.payload;
    },

    // =========================================
    // SKILLS
    // =========================================

    updateSkills: (state, action) => {
      state.currentResume.skills = action.payload;
    },

    // =========================================
    // CERTIFICATIONS
    // =========================================

    updateCertifications: (state, action) => {
      state.currentResume.certifications = action.payload;
    },

    // =========================================
    // TEMPLATE
    // =========================================

    updateTemplate: (state, action) => {
      state.currentResume.template = action.payload;
    },

    // =========================================
    // LAYOUT SETTINGS
    // =========================================

    updateLayoutSettings: (state, action) => {
      state.currentResume.layoutSettings = {
        ...state.currentResume.layoutSettings,
        ...action.payload,
      };
    },

    // =========================================
    // RESET RESUME
    // =========================================

    resetResume: (state) => {
      state.currentResume = initialState.currentResume;
    },
  },
});

export const {

  // sidebar
  setActiveSection,

  // wizard
  setWizardStep,
  nextStep,
  previousStep,

  // resume
  updateResume,
  updateExperience,
  updateEducation,
  updateProjects,
  updateSkills,
  updateCertifications,

  // template
  updateTemplate,

  // layout
  updateLayoutSettings,
  setResumeId,

  // reset
  resetResume,

} = resumeSlice.actions;

export default resumeSlice.reducer;