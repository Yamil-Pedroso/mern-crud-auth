"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 1024
    }
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.User = User;
