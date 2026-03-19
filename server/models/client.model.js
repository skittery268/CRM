// Modules
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Client full name is required!"]
    },
    description: {
        type: String,
        required: [true, "Client description is required!"]
    },
    facebook: {
        type: String,
        required: [true, "Client's facebook is required!"]
    },
    status: {
        type: String,
        enum: ["lead", "in-progress", "closed"],
        default: "lead"
    },
    telegram: {
        type: String,
        default: ""
    },
    instagram: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const Client = mongoose.model("clients", clientSchema);

module.exports = Client;