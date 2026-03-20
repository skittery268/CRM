// Models
const Client = require("../models/client.model");

// Utils
const AppError = require("../utils/appError");
const CatchAsync = require("../utils/catchAsync");

// Controller function to add a new contract to a client
const addContract = CatchAsync(async (req, res, next) => {
    const { clientId } = req.params;
    const { name, description, price } = req.body;

    const client = await Client.findById(clientId);

    if (!client) {
        return next(new AppError("Client not found!", 404));
    }

    const newContract = { id: Date.now().toString(), name, description, price };

    client.contracts.push(newContract);

    await client.save();

    res.status(201).json({
        message: "Contract added successfully!",
        status: "success",
        data: {
            client
        }
    })
})

// Controller function to delete a contract from a client
const deleteContract = CatchAsync(async (req, res, next) => {
    const { clientId, contractId } = req.params;

    const client = await Client.findById(clientId);

    if (!client) {
        return next(new AppError("Client not found!", 404));
    }

    const contractIndex = client.contracts.findIndex(contract => contract.id === contractId);

    if (contractIndex === -1) {
        return next(new AppError("Contract not found!", 404));
    }

    client.contracts.splice(contractIndex, 1);

    await client.save();

    res.status(200).json({
        message: "Contract deleted successfully!",
        status: "success",
        data: {
            client
        }
    });
})

// Controller function to update a contract of a client
const updateContract = CatchAsync(async (req, res, next) => {
    const { clientId, contractId } = req.params;
    const { status } = req.body;

    const client = await Client.findById(clientId);

    if (!client) {
        return next(new AppError("Client not found!", 404));
    }
    
    const contract = client.contracts.find(contract => contract.id === contractId);

    if (status) contract.status = status;

    await client.save();

    res.status(200).json({
        message: "Client information changed successfully",
        status: "success",
        data: {
            client
        }
    })
})

module.exports = { addContract, deleteContract, updateContract };