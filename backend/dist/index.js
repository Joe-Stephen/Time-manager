"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const userRoutes_1 = __importDefault(require("./routers/userRoutes"));
dotenv_1.default.config();
const connectDB_1 = require("./configs/connectDB");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
//using morgan middleware to log requests/responses
app.use((0, morgan_1.default)("dev"));
//Connecting to database
(0, connectDB_1.connectDB)();
//route to test the server
app.get("/ping", (req, res) => {
    return res.send("pong");
});
app.use("/", userRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
