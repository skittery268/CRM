// Models
const Client = require("../models/client.model");

// Utils
const CatchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Controller to get all clients
const getAllClients = CatchAsync(async (req, res, next) => {
    const clients = await Client.find();

    res.status(200).json({
        status: "success",
        data: {
            clients
        }
    })
})

// Controller to get client by id
const getClient = CatchAsync(async (req, res, next) => {
    const { id } = req.params;

    const client = await Client.findById(id);

    if (!client) {
        return next(new AppError("Client not found!", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            client
        }
    })
})

// Controller to get clients of manager
const getManagerClients = CatchAsync(async (req, res, next) => {
    const clients = await Client.find({ managerId: req.userId });

    res.status(200).json({
        status: "success",
        data: {
            clients
        }
    })
})

// Controller to add new client
const addClient = CatchAsync(async (req, res, next) => {
    const { fullname, description, facebook, status, telegram, instagram } = req.body;

    const newClient = await Client.create({ fullname, description, facebook, status, telegram, instagram, managerId: req.userId });

    res.status(200).json({
        message: "Client successfully added!",
        status: "success",
        data: {
            newClient
        }
    })
})

// Controller to delete client
const deleteClient = CatchAsync(async (req, res, next) => {
    const { id } = req.params;

    await Client.findByIdAndDelete(id);

    res.status(200).json({
        message: "Client deleted successfully!",
        status: "success"
    })
})

// Controller to edit client info
const editClientInfo = CatchAsync(async (req, res, next) => {
    const { fullname, description, facebook, status, telegram, instagram } = req.body;
    const { id } = req.params;

    const client = await Client.findById(id);

    if (fullname) client.fullname = fullname;
    if (description) client.description = description;
    if (facebook) client.facebook = facebook;
    if (status) client.status = status;
    if (telegram) client.telegram = telegram;
    if (instagram) client.instagram = instagram;

    await client.save();

    res.status(200).json({
        message: "Client information edited successfully!",
        status: "success",
        data: {
            client
        }
    })
})

module.exports = { getAllClients, getClient, addClient, deleteClient, editClientInfo, getManagerClients };