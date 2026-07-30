import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import {OAuth2Client} from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async(req, res)=>{
    try {
        const {name, email, password} = req.body;

        //check if exisiting user
        const exisitingUser = await User.findOne({email});

        if (exisitingUser) {
          return res.status(400).json({ message: "User already exists" });
        }

        // PASSWORD REGEX
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        // VALIDATE PASSWORD
        if (!passwordRegex.test(password)) {
          return res.status(400).json({
            message:
              "Password must contain uppercase, lowercase, number and special character",
          });
        }

        //hash password
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPassword
        });

        const token = await generateToken(user);

        res.status(200).json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                credits:user.credits,
                isPremium:user.isPremium
            }
        })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

//Login
export const login = async(req, res)=>{
    try {
        const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({message: "Invalid Credentials"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({message: "Invalid Credentials"})
    }

    const token = generateToken(user);

    res.json({
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            credits:user.credits,
            isPremium:user.isPremium
        },
    })
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const googleLogin = async (req, res)=>{
    try {
        const {credential} = req.body;

        const ticket = await client.verifyIdToken({
            idToken: credential,
        
        audience: process.env.GOOGLE_CLIENT_ID,});

        const payload = ticket.getPayload();
        const {email, name} = payload;

        //check user
        let user = await User.findOne({email});

        if(!user){
            user = await User.create({
            name, email, password: "google-oauth-user",
        })
        }

        //generate token
        const token = generateToken(user);
        res.json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                credits:user.credits,
                isPremium:user.isPremium,
            },
        })
        
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Google aunthentication failed",
        })
    }
}