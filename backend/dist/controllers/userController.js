"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userRegister = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield userModel_1.default.findOne({ email: email });
        if (existingUser) {
            return res.status(404).json({
                success: false,
                message: "A user with this email already exists!",
            });
        }
        //hashing password
        bcrypt_1.default.hash(password, 10, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.error("Error while hashing password :", err);
                return res
                    .status(500)
                    .send({ success: false, message: "Error while hashing password." });
            }
            //creating new user
            const user = yield userModel_1.default.create({ email: email, password: hash });
            return res.status(200).json({
                success: true,
                message: "User registered successfully!",
            });
        }));
    }
    catch (error) {
        console.error("Error while registering user.");
        return res
            .status(500)
            .json({ success: false, message: "Error while registering user." });
    }
});
exports.userRegister = userRegister;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        //finding the user
        const user = yield userModel_1.default.findOne({ email: email });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "No user found with this email." });
        }
        //comparing the passwords
        bcrypt_1.default.compare(password, user.password, (err, result) => {
            if (err) {
                console.error("Error while comparing password :", err);
                return res
                    .status(500)
                    .json({ success: false, message: "Error while comparing password." });
            }
            return !result
                ? res.status(404).json({ success: false, message: "Wrong password." })
                : res.status(200).json({ success: true, message: "Login successfull" });
        });
    }
    catch (error) {
        console.error("Error while validating user login.");
        return res
            .status(500)
            .json({ success: false, message: "Error while validating user login." });
    }
});
exports.userLogin = userLogin;
