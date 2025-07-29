// import ratelimit from "../config/upstash.js";


// const rateLimiter = async(req, res, next) => {
//     try{
//         const {success}=await ratelimit.limit("my-limit-key");
    
//     if(!success){
//         return res.status(429).json({
//             message:"Too many requests Cant handle buddy",
//         });
//     }
//     next();
//     } catch(error){
//         console.log("Rate limit error Middle ware",error);
//         next(error);
//     }
// };


// export default rateLimiter;

import { ratelimit } from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const identifier = req.ip || "anonymous"; // fallback just in case
    const { success } = await ratelimit.limit(identifier);

    console.log("🔒 Rate limit check:", success, "for IP:", identifier);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests. Please slow down.",
      });
    }

    next();
  } catch (err) {
    console.error("RateLimiter error:", err);
    next(); // fail open, don't block user if rate limit fails
  }
};

export default rateLimiter;
