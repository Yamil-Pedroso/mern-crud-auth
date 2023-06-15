import { Task } from '../models/task.model';

export const getTasks = async (req: any, res: any) => {
    try {
        const tasks = await Task.find({
            user: req.user.id
        }).populate('user');
        res.json(tasks);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message || 'Something went wrong retrieving the tasks'
        });
    }
};

export const createTask = async (req: any, res: any) => {
    try {
        const { title, description, date } = req.body;
        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id
        });
        await newTask.save();
        res.json({ newTask });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message || 'Something went wrong creating a task'
        });
    }
};


export const deleteTask = async (req: any, res: any) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);
        if (!deleteTask) {
            return res.status(404).json({
                message: `Task with id ${req.params.id} does not exist`
            });

            return res.sendStatus(204);
        } 
    } catch (error: any) {
        return res.status(500).json({
            message: error.message || `Cannot delete task with id ${req.params.id}`
        });
    }
};

export const updateTask = async (req: any, res: any) => {
    try {
        const { title, description, date } = req.body;
        const updateTask = await Task.findOneAndUpdate(
            { _id: req.params.id },
            { title, description, date },
            { new: true }
        );
        return res.json(updateTask);

    } catch (error: any) {
        return res.status(500).json({
            message: error.message || `Cannot update task with id ${req.params.id}`
        });
    }
};

export const getTask = async (req: any, res: any) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                message: `Task with id ${req.params.id} does not exist`
            });
        }
        return res.json(task);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message || `Error retrieving task with id ${req.params.id}`
        });
    }
};
