"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_controller_1 = require("../controllers/tasks.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const task_schema_1 = require("../schemas/task.schema");
const router = (0, express_1.Router)();
router.get('/tasks', tasks_controller_1.getTasks);
router.post('/tasks', auth_middleware_1.auth, (0, validator_middleware_1.validateSchema)(task_schema_1.createTaskSchema), tasks_controller_1.createTask);
router.get('/tasks/:id', auth_middleware_1.auth, tasks_controller_1.getTask);
router.put('/tasks/:id', auth_middleware_1.auth, tasks_controller_1.updateTask);
router.delete('/tasks/:id', auth_middleware_1.auth, tasks_controller_1.deleteTask);
exports.default = router;
