import jwt from "jsonwebtoken";

export const generateToken = (user)=>{
    return jwt.sign(
        {
            //payload
            id:user._id,
            role:user.role,
        },
        //secret key
        process.env.JWT_SECRET,
        {
            //option
            expiresIn: "7d",
        }
    )
}
// JWT contains
// HEADER   -> Stores token metadata like algorithm and token type
// PAYLOAD  -> Stores user data like id and role
// SIGNATURE -> Verifies token authenticity using secret key(header + payload + jwt secret key)