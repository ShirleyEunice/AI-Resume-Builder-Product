export const checkCredits = (cost)=>{
    return (req, res, next)=>{
        const user = req.user;

        if(!user){
            return res.status(401).json({message: "Unauthorized"});
        }
        
        if(user.credits < cost){
            return res.status(403).json({
                message: "Not enough credits. Upgrade required"
            })
        }
        next();
    }
}