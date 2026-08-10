import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId:String,
    title:String,

    //which mode this session runs in
    mode:{
        type: String,
        enum: ["interview", "coach"],
        default: "interview",
    },

    //provenance: the saves resume this session was started from
    resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume",
    },
    // resume JSON structure as snap
    resumeSnapshot: {
        type: mongoose.Schema.Types.Mixed,
    },
    //optional targeting
    targetRole: {
        type: String
    },
    jobDescription:{
        type: String
    },
    messages:[
        {
            role:String,
            content:String,
        },
    ]
}, {timestamps:true});

export default mongoose.model("Chat", chatSchema);