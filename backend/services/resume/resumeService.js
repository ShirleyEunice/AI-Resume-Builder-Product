import Resume from "../../models/Resume.js";
import redisClient from "../../utils/redis.js";

// to get version of the resume cache for a user, if not exist create one
const getCacheVersion = async (userId)=>{
    const key = `resume_version:${userId}`;
    let version = await redisClient.get(key);
    if(!version){
        await redisClient.set(key, 1);
        version = 1;
    }
    return version;
};


//any changes - create, update, delete - to the resume should invalidate the cache by incrementing the version
export const invalidateResumeCache = async (userId)=>{
    await redisClient.incr(`resume_version:${userId}`);
}

export const fetchResumes = async (userId, {page, limit, sort, order, search})=>{
    const version = await getCacheVersion(userId);
    const cacheKey = `resumes:${userId}:v${version}:page${page}:limit${limit}:sort${sort}:order${order}:search${search}`;

    const cached = await redisClient.get(cacheKey);
    if(cached){
        return JSON.parse(cached);
    }

    const query = { userId };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { "personalInfo.jobTitle": { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const sortDir = order === "desc" ? -1 : 1;

    const [resumes, total] = await Promise.all([
      Resume.find(query)
        .sort({ [sort]: sortDir })
        .skip(skip)
        .limit(limit)
        .select("title template atsScore createdAt updatedAt personalInfo.jobTitle personalInfo.fullName"),
      Resume.countDocuments(query),
    ]);

    const result = {
      resumes,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };

    await redisClient.set(cacheKey, JSON.stringify(result), { EX: 120 });
    return result;
}