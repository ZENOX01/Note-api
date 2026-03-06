const rateLimit = require('express-rate-limit');

// General limiter for all API requests
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per 15 mins
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many requests from this IP, please try again after 15 minutes"
    }
});

// Stricter limiter for Auth routes
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 15, // Limit each IP to 15 attempts per hour
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many login attempts, please try again after an hour"
    },
    validate: { xForwardedForHeader: false }
});

module.exports = { apiLimiter, authLimiter };
