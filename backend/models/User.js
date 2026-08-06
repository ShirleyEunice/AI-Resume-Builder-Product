import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
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
    // Lifetime credits ever granted (free allotment + every top-up). We never
    // decrement this — it's the denominator for "used vs. total" on the
    // dashboard, where used = creditsGranted - credits.
    creditsGranted:{
        type:Number,
        default:100
    },
    isPremium:{
        type:Boolean,
        default:false,
    },
    stripeCustomerId:{
        type: String,
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