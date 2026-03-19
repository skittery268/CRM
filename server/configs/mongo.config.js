// Modules
const mongoose = require("mongoose");

// Function to connect mongo data base
const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Data base connected successfully!");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;