// Modules
const express = require("express");

// Controller functions
const { getAllClients, getClient, addClient, deleteClient, editClientInfo, getManagerClients } = require("../controllers/clients.controller");

// Middlewares
const protect = require("../middlewares/protect.middleware");

const clientsRouter = express.Router();

// Route to get all clients
clientsRouter.get("/", getAllClients);
// Route to get clients of manager
clientsRouter.get("/managerclients", protect, getManagerClients);
// Route to get client by id
clientsRouter.get("/:id", getClient);
// Route to add new client
clientsRouter.post("/", protect, addClient);
// Route to delete client by id
clientsRouter.delete("/:id", protect, deleteClient);
// Route to edit client info
clientsRouter.patch("/:id", protect, editClientInfo);

module.exports = clientsRouter;