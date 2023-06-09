import { Schema, model } from 'mongoose';

interface IUser {
    username: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
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
});

const User = model<IUser>('User', userSchema);

export { User, IUser };
