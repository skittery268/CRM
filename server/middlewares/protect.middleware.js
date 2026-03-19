// Utils
const AppError = require("../utils/appError");
const CatchAsync = require("../utils/catchAsync");

// Modules
const jwt = require("jsonwebtoken");

// Function to check user authorization
const protect = CatchAsync(async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return next(new AppError("We cant identify you!", 400));
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
        return next(new AppError("The token does not belong to you!", 401));
    }
    
    req.userId = payload.id;

    next();
})

module.exports = protect;