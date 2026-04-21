import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  personalInfo: {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
  },
  education: [
    {
      school: String,
      degree: String,
      year: String,
    }
  ],
  experience: [
    {
      company: String,
      role: String,
      description: String,
    }
  ],
  skills: [{ type: String }]
}, {
  timestamps: true
});

export default mongoose.model("Resume", resumeSchema);