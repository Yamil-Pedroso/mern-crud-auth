import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();
colors.enable();

export const connectDB = async () => {
    const MongoDB = process.env.MONGO_URI
    try {
        await mongoose.connect(MongoDB!);
        console.log('Connected to MongoDB'.green.bold)
    } catch (error) {
        console.log(error);
    }
}
