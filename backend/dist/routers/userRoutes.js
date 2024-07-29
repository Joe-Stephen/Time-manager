"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controllers/userController.js");
const userRouter = express_1.default.Router();
//user routes
userRouter.post("/login", userController_js_1.userLogin);
userRouter.post("/register", userController_js_1.userRegister);
exports.default = userRouter;
