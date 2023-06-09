import { Router } from 'express';
import { 
    createTask,
    deleteTask,
    getTasks,
    updateTask,
    getTask
 } from '../controllers/tasks.controller';
 import { auth } from '../middlewares/auth.middleware';
 import { validateSchema } from '../middlewares/validator.middleware';  
import { createTaskSchema } from '../schemas/task.schema';

const router = Router();

router.get('/tasks', getTasks);

router.post('/tasks', auth, validateSchema(createTaskSchema), createTask);

router.get('/tasks/:id', auth, getTask);

router.put('/tasks/:id', auth, updateTask);

router.delete('/tasks/:id', auth, deleteTask);

export default router;