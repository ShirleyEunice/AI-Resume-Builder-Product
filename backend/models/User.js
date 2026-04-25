import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
        required:false,
    },
    role:{
        type:String,
        enum:["user", "admin"],
        default:"user",
    },
    credits:{
        type:Number,
        default:100
    },
    isPremium:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
}, {timestamps:true});

export default mongoose.model("User", userSchema);