// Modules
const express = require("express");

// Controller functions
const { register, login, verifyEmail, getMe, logout } = require("../controllers/auth.controller");

const authRouter = express.Router();

// Route to register new user
authRouter.post("/register", register);
// Route to login user
authRouter.post("/login", login);
// Route to delete cookies user
authRouter.delete("/logout", logout);
// Route to verify user email
authRouter.get("/verify", verifyEmail);
// Route to get user object (Auto login)
authRouter.get("/me", getMe);

module.exports = authRouter;