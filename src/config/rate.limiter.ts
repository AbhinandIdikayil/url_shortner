import rate_limiter from 'express-rate-limit'


export const shortUrlRateLimiter = rate_limiter({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10, // Limit each IP to 10 requests per window
    message: "You have exceeded the 10 requests in 5 minutes limit!",
    standardHeaders: true,
    legacyHeaders: false,
})