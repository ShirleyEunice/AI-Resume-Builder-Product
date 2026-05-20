
export const adminOnly = (req, res, next)=>{
    try {
        if(req.user.role !== "admin"){
            return res.status(403).json({message: "Admin Only"})
        }
        next();
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}