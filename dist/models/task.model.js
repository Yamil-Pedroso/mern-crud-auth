"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});
const Task = (0, mongoose_1.model)('Task', taskSchema);
exports.Task = Task;
