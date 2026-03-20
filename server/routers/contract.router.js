// Modules
const express = require("express");

// Controllers
const { addContract, deleteContract, updateContract } = require("../controllers/contract.controller");

// Middlewares
const protect = require("../middlewares/protect.middleware");

const contractRouter = express.Router();

// Route to add a new contract to a client
contractRouter.post("/:clientId", protect, addContract);
// Route to delete a contract from a client
contractRouter.delete("/:clientId/:contractId", protect, deleteContract);
// Route to update a contract of a client
contractRouter.patch("/:clientId/:contractId", protect, updateContract);

module.exports = contractRouter;