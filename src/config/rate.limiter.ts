import rate_limiter from 'express-rate-limit'


export const shortUrlRateLimiter = rate_limiter({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 5, // Limit each IP to 10 requests per window
    message: "You have exceeded the 5 requests in 1 minutes limit!",
    standardHeaders: true,
    legacyHeaders: false,
})