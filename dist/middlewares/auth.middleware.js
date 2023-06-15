"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const auth = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token)
            return res.status(401).json({ message: "No token, Unauthorized" });
        jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET, (err, user) => {
            if (err)
                return res.status(401).json({ message: "Unauthorized, token is not valid" });
            req.user = user;
            next();
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.auth = auth;
