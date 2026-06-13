import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      default: "Untitled Resume",
    },
    personalInfo: {
      fullName: { type: String },
      jobTitle: { type: String },
      email: { type: String },
      phone: { type: String },
      linkedin: { type: String },
      websites: [String],
      summary: { type: String },
      address: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    education: [
      {
        institution: String,
        location: String,
        degreeType: String,
        areaOfStudy: String,
        startDate: String,
        endDate: String,
        gpa: String,
        url: String,
        minor: [String],
        coursework: [String],
      },
    ],
    experience: [
      {
        jobTitle: String,
        employer: String,
        location: String,
        url: String,
        startDate: String,
        endDate: String,
        current: Boolean,
        summary: String,
        highlights: [String],
      },
    ],
    skills: {
      technical: [String],
      soft: [String],
      tools: [String],
    },
    certifications: [
      {
        name: String,
        issuer: String,
        year: String,
        url: String,
      },
    ],
    awards: [
      {
        title: String,
        issuer: String,
        year: String,
      },
    ],
    volunteer: [
      {
        organization: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],
    projects: [
      {
        title: String,
        techStack: [String],
        link: String,
        description: String,
      },
    ],
    languages: [
      {
        name: String,
        proficiency: String,
      },
    ],
    publications: [
      {
        title: String,
        publisher: String,
        year: String,
        url: String,
      },
    ],
    interests: [String],
    additional: [
      {
        title: String,
        description: String,
      },
    ],
    template: {
      type: String,
      default: "modern",
    },
    layoutSettings: {
      lineSpacing: { type: String, default: "1.15" },
      margin: { type: String, default: "0.75" },
      accentColor: { type: String, default: "#0d9488" },
    },
    atsScore: {
      type: Number,
      default: 0,
    },
    version: {
      type: Number,
      default: 1,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    publicId: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Resume", resumeSchema);
