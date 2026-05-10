import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    personalInfo: {
      fullName: { type: String },
      email: { type: String },
      phone: { type: String },
      headLine: {type: String},
      location: { type: String },
      linkedin: { type: String },
      github: { type: String },
      portfolio: { type: String },
      summary: { type: String },
    },
    education: [
      {
        institution: String,
        degree: String,
        field: String,
        startDate: String,
        endDate: String,
        cgpa: String,
      },
    ],
    experience: [
      {
        company: String,
        role: String,
        location: String,
        startDate: String,
        endDate: String,
        current: Boolean,
        description: [String],
      },
    ],
    projects: [
      {
        title: String,
        techStack: [String],
        link: String,
        description: [String],
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
      },
    ],
    achievements: [String],
    languages: [String],
    template: {
      type: String,
      default: "modern",
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