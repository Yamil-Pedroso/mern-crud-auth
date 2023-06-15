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
exports.logout = exports.verifyToken = exports.login = exports.register = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../config");
const jwt_1 = require("../libs/jwt");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const userFound = yield user_model_1.User.findOne({ email });
        if (userFound)
            return res.status(400).json({ message: "The email already exists" });
        // hashing password
        const passwordHash = yield bcryptjs_1.default.hash(password, 10);
        // create a new user
        const newUser = new user_model_1.User({
            username,
            email,
            password: passwordHash
        });
        // saving the new user in the database
        const savedUser = yield newUser.save();
        // create access token
        //const token = await createAccessToken({ id: savedUser._id });
        jsonwebtoken_1.default.sign({ id: savedUser._id }, "secret123", { expiresIn: "1d" }, (err, token) => {
            if (err)
                console.log(err);
            res.json({ token });
        });
        //res.cookie("token", token, {
        //    httpOnly: process.env.NODE_ENV !== "development",
        //    secure: true,
        //    sameSite: "none"
        //);
        //res.json({
        //   id: savedUser._id,
        //   username: savedUser.username,
        //   email: savedUser.email
        //});
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userFound = yield user_model_1.User.findOne({ email });
        if (!userFound)
            return res.status(400).json({ message: "The email does not exists" });
        const matchPassword = yield bcryptjs_1.default.compare(password, userFound.password);
        if (!matchPassword)
            return res.status(401).json({ message: "Incorrect password" });
        const token = yield (0, jwt_1.createAccessToken)({ id: userFound._id, username: userFound.username });
        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none"
        });
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.login = login;
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token)
        return res.status(401).json({ message: false });
    jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.sendStatus(401).json({ message: false });
        const userFound = yield user_model_1.User.findById(user.id);
        if (!userFound)
            return res.status(401).json({ message: false });
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    }));
});
exports.verifyToken = verifyToken;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0)
    });
    res.sendStatus(200);
});
exports.logout = logout;
