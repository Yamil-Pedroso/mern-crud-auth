import { Request, Response } from 'express';
import colors from 'colors';
import app from './app';
import { connectDB } from './db';
import dotenv from 'dotenv';

connectDB();
dotenv.config();
colors.enable();

const PORT: string | number = process.env.PORT || 3010;


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
    }
);


app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`.yellow.bold);
}
);
