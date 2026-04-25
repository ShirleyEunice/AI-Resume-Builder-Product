import User from "../models/User.js";

export const mockAuth = async (req, res, next)=>{
    console.log("Mock auth middleware called");
    const user = await User.findOne();
    if(!user){
        return res.status(500).json({message: "No users found in DB. Please seed the database."});
    }

    req.user = user;
    next();
}