// Models
const User = require("../models/user.model");

// Utils
const AppError = require("../utils/appError");
const CatchAsync = require("../utils/catchAsync");

// Modules
const jwt = require("jsonwebtoken");

// Function to send token for auto login
const sendToken = (res, user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.cookie("jwt", token, {
        maxAge: process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "Lax"
    })

    user.password = undefined;

    res.status(200).json({
        message: "Login successfully!",
        status: "success",
        data: {
            user
        }
    })
}

// Controller to create new user
const register = CatchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    const newUser = await User.create({ name, email, password });

    await newUser.sendVerifyLink();

    res.status(200).json({
        message: "Register successfully!",
        status: "success"
    })
})

// Controller to login user
const login = CatchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return next(new AppError("Credentionals incorrect!", 400));
    }

    const isCorrect = await user.comparePassword(password);

    if (!isCorrect) {
        return next(new AppError("Credentionals incorrect!", 400));
    }

    if (!user.isVerified) {
        return next(new AppError("Verify your account first!", 400));
    }

    sendToken(res, user);
})

// Controller to delete cookies in user browser
const logout = CatchAsync(async (req, res, next) => {
    res.clearCookie("jwt");

    res.status(200).json({
        message: "User logged out!",
        status: "success"
    })
})

// Controller to get user for auto login
const getMe = CatchAsync(async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return next(new AppError("We cant identify you!", 401));
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.id);

    if (!user) {
        return next(new AppError("User not found!", 404));
    }

    user.password = undefined;

    res.status(200).json({
        message: "Auto login success",
        status: "success",
        data: {
            user
        }
    })
})

// Controller to verify user email
const verifyEmail = CatchAsync(async (req, res, next) => {
    const { token } = req.query;

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.id);

    user.isVerified = true;

    await user.save();

    res.status(200).send("<h1>User verified successfully!</h1>");
})

module.exports = { register, login, logout, verifyEmail, getMe };