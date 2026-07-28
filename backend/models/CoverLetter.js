import mongoose from 'mongoose';

const coverLetterSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    resumeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume",
    },
    title:{
        type: String,
        default: "Untitled Cover Letter",
    },
    resumeText:{
        type: String,
        required: true,
    },
    jdText:{
        type: String,
        required: true,
    },
    tone:{
        type: String,
        default: "professional",
    },
    content:{
        type: String,
        required: true,
    },
},
{
    timestamps: true
});

export default mongoose.model("CoverLetter", coverLetterSchema);