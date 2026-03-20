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
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    contracts: [
        {
            id: { type: String, required: [true, "Contract ID is required!"] },
            name: { type: String, required: [true, "Contract name is required!"] },
            description: { type: String, required: [true, "Contract description is required!"] },
            price: { type: Number, required: [true, "Contract price is required!"] },
            status: { type: String, enum: ["active", "closed"], default: "active" }
        }
    ]
}, { timestamps: true });

const Client = mongoose.model("clients", clientSchema);

module.exports = Client;