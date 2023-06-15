import { Schema, model, Types } from 'mongoose';

interface ITask {
    title: string;
    description: string;
    date: Date;
    user: string | undefined;
}

const taskSchema = new Schema<ITask>({
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
        type: Types.ObjectId,
        ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Task = model<ITask>('Task', taskSchema);

export { Task, ITask };