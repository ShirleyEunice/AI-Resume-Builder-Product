import redisClient from "../utils/redis.js";

export const rateLimiter = async (req, res, next) =>{
    try {
        const userId = req.user._id;

        const cacheKey = `rate:${userId}`;
        //increment request count
        const requests = await redisClient.incr(cacheKey);

        if(requests === 1){
            //set expiry fro 60 seconds
            await redisClient.expire(cacheKey, 60);
        }

        if(requests > 5){
            return res.status(429).json({message: "Too many request. Please try again later"});
            console.log("Too many requests");
            
        };
        next();
    } catch (error) {
        console.error("Rate limiter error:", error);
        next();
    }
}