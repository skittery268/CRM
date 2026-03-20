// Modules
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Controllers
const globalErrorHandler = require("./controllers/error.controller");

// Routers
const authRouter = require("./routers/auth.router");
const clientsRouter = require("./routers/clients.router");
const contractRouter = require("./routers/contract.router");

// Configs
const connectDB = require("./configs/mongo.config");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))

// Controllers
app.use("/api/auth", authRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/contracts", contractRouter);

// Global error handler
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
    console.log("Server Started!");
    connectDB();
})