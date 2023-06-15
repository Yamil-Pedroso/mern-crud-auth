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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTask = exports.updateTask = exports.deleteTask = exports.createTask = exports.getTasks = void 0;
const task_model_1 = require("../models/task.model");
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_model_1.Task.find({
            user: req.user.id
        }).populate('user');
        res.json(tasks);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || 'Something went wrong retrieving the tasks'
        });
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, date } = req.body;
        const newTask = new task_model_1.Task({
            title,
            description,
            date,
            user: req.user.id
        });
        yield newTask.save();
        res.json({ newTask });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || 'Something went wrong creating a task'
        });
    }
});
exports.createTask = createTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteTask = yield task_model_1.Task.findByIdAndDelete(req.params.id);
        if (!deleteTask) {
            return res.status(404).json({
                message: `Task with id ${req.params.id} does not exist`
            });
            return res.sendStatus(204);
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || `Cannot delete task with id ${req.params.id}`
        });
    }
});
exports.deleteTask = deleteTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, date } = req.body;
        const updateTask = yield task_model_1.Task.findOneAndUpdate({ _id: req.params.id }, { title, description, date }, { new: true });
        return res.json(updateTask);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || `Cannot update task with id ${req.params.id}`
        });
    }
});
exports.updateTask = updateTask;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_model_1.Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                message: `Task with id ${req.params.id} does not exist`
            });
        }
        return res.json(task);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || `Error retrieving task with id ${req.params.id}`
        });
    }
});
exports.getTask = getTask;
