import mongoose from "mongoose";

const atsAnalysisSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    resumeName:{
        type: String,
        required: true,
    },
    resumeText:{
        type: String,
        required: true,
    },
    jdText:{
        type: String,
        required: true,
    },
    score:{
        type: Number,
        required: true,
    },
    missingSkills: [String],
    strengths: [String],
    suggestions: [String],
    summary: String,
},
{
    timestamps: true
});

export default mongoose.model("ATSAnalysis", atsAnalysisSchema);