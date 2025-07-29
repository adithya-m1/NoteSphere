// import {Ratelimit} from "@upstash/ratelimit";
// import {Redis} from "@upstash/redis";
// import dotenv from "dotenv";
// dotenv.config();

// //create a rate limiter that allows 10 requests per 20s

// const ratelimit=new Ratelimit({
//     redis: Redis.fromEnv(),
//     limiter: Ratelimit.slidingWindow(5,"5 s"),
// });


// export default ratelimit;

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
console.log("✅ Redis URL ENV:", process.env.UPSTASH_REDIS_REST_URL);

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "5 s"), // 5 requests per 5 seconds
  analytics: true, // optional but useful
});

export { ratelimit };

