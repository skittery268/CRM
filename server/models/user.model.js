// Modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Utils
const sendMail = require("../utils/email");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required!"]
    },
    email: {
        type: String,
        required: [true, "User email is required!"],
        unique: [true, "User with this email already exists!"]
    },
    password: {
        type: String,
        required: [true, "User password is required!"],
        minLength: [8, "The password length must be at least 8 characters"]
    },
    role: {
        type: String,
        enum: ["manager", "general manager"],
        default: "manager"
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// We hashing user password pre save
userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
})

// Function to check user password
userSchema.methods.comparePassword = async function(candidate) {
    return await bcrypt.compare(candidate, this.password);
}

// Function to send verify link in user email
userSchema.methods.sendVerifyLink = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET);

    const link = `http://localhost:3000/api/auth/verify?token=${token}`;

    const html = `
        <h1>Verify link</h1>
        <a href="${link}">Verify Email</a>
    `

    sendMail(this.email, "Verification Code", html);
}

const User = mongoose.model("users", userSchema);

module.exports = User;