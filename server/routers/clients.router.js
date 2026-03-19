// Modules
const express = require("express");

// Controller functions
const { getAllClients, getClient, addClient, deleteClient, editClientInfo } = require("../controllers/clients.controller");

const clientsRouter = express.Router();

// Route to get all clients
clientsRouter.get("/", getAllClients);
// Route to get client by id
clientsRouter.get("/:id", getClient);
// Route to add new client
clientsRouter.post("/", addClient);
// Route to delete client by id
clientsRouter.delete("/:id", deleteClient);
// Route to edit client info
clientsRouter.patch("/:id", editClientInfo);

module.exports = clientsRouter;